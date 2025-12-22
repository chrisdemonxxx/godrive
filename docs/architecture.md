# GoDrive System Architecture

> **Version**: 1.0
> **Last Updated**: December 15, 2024
> **Status**: Design Phase

---

## Architecture Overview

GoDrive follows a **serverless-first** architecture optimized for solo development with AI assistance. The system prioritizes:

1. **Managed Services** - Minimize operational overhead
2. **Type Safety** - End-to-end TypeScript
3. **Real-time** - Instant updates for bookings/messages
4. **Mobile-First** - Responsive web, future native apps
5. **Cost Efficiency** - Scale from ₹0 to production

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  React Web App     │    React Native App (Phase 2)              │
│  (Vite + TS)       │    (Expo)                                  │
└────────────────────┴────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API LAYER                                 │
├─────────────────────────────────────────────────────────────────┤
│  Supabase Client SDK                                            │
│  ├── Auth (Phone OTP, Email Magic Link)                         │
│  ├── Database (PostgreSQL via PostgREST)                        │
│  ├── Realtime (WebSocket subscriptions)                         │
│  ├── Storage (Images, Documents)                                │
│  └── Edge Functions (Deno - Custom Logic)                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     EXTERNAL SERVICES                            │
├─────────────────────────────────────────────────────────────────┤
│  Razorpay       │  Google Maps  │  MSG91/Twilio │  Resend       │
│  (Payments)     │  (Location)   │  (SMS/OTP)    │  (Email)      │
└─────────────────┴───────────────┴───────────────┴───────────────┘
```

---

## Component Architecture

### 1. Authentication System

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                          │
└─────────────────────────────────────────────────────────────────┘

Phone OTP Flow:
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Enter   │───▶│  Send    │───▶│  Enter   │───▶│  Create  │
│  Phone   │    │  OTP     │    │  OTP     │    │  Session │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                     │
                     ▼
              ┌──────────────┐
              │  MSG91 API   │
              │  (SMS Send)  │
              └──────────────┘

Session Management:
- JWT tokens via Supabase Auth
- 7-day session duration
- Refresh token rotation
- Stored in httpOnly cookies (web)
- SecureStore (mobile)
```

**Design Decisions**:
- Phone-first for India market (99% phone penetration)
- Email as secondary for professionals
- No password = no password reset issues
- Supabase handles token management

### 2. Booking System

```
┌─────────────────────────────────────────────────────────────────┐
│                     BOOKING STATE MACHINE                        │
└─────────────────────────────────────────────────────────────────┘

                    ┌──────────────────┐
                    │     PENDING      │
                    │  (Guest Request) │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
       ┌──────────┐   ┌──────────┐   ┌──────────┐
       │ DECLINED │   │ EXPIRED  │   │ ACCEPTED │
       │ (by host)│   │ (timeout)│   │ (by host)│
       └──────────┘   └──────────┘   └─────┬────┘
                                           │
                                    ┌──────┴──────┐
                                    ▼             ▼
                             ┌──────────┐  ┌───────────┐
                             │CONFIRMED │  │ CANCELLED │
                             │(payment) │  │(by either)│
                             └────┬─────┘  └───────────┘
                                  │
                                  ▼
                             ┌──────────┐
                             │  ACTIVE  │
                             │(trip on) │
                             └────┬─────┘
                                  │
                    ┌─────────────┼─────────────┐
                    ▼             ▼             ▼
             ┌──────────┐  ┌──────────┐  ┌──────────┐
             │COMPLETED │  │DISPUTED  │  │CANCELLED │
             │(returned)│  │(issue)   │  │(mid-trip)│
             └──────────┘  └──────────┘  └──────────┘
```

**Booking Flow Details**:

```
1. SEARCH → Guest finds car
   - Query cars by location (PostGIS radius)
   - Filter by dates, transmission, fuel type
   - Check availability calendar
   
2. REQUEST → Guest submits booking
   - Create booking record (status: PENDING)
   - Notify host (push + SMS)
   - Start 4-hour response timer

3. ACCEPT → Host confirms
   - Update status to ACCEPTED
   - Notify guest
   - Redirect to payment

4. PAYMENT → Guest pays
   - Create Razorpay order
   - Collect booking amount + security deposit
   - On success: Update to CONFIRMED
   - Block calendar dates
   - Send confirmation to both parties

5. PICKUP → Trip starts
   - Guest arrives at location
   - Record odometer, fuel level
   - Take pre-trip photos
   - Update status to ACTIVE

6. RETURN → Trip ends
   - Record end odometer, fuel
   - Take post-trip photos
   - Calculate any extra charges
   - Update status to COMPLETED
   - Release security deposit (minus charges)
   - Trigger review prompts
```

### 3. Payment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     PAYMENT FLOW                                 │
└─────────────────────────────────────────────────────────────────┘

Guest Payment:
┌──────────┐    ┌──────────────┐    ┌──────────────┐
│ Checkout │───▶│ Create Order │───▶│   Razorpay   │
│   Page   │    │ (Edge Func)  │    │   Checkout   │
└──────────┘    └──────────────┘    └──────┬───────┘
                                          │
                      ┌───────────────────┴───────────────────┐
                      ▼                                       ▼
               ┌──────────────┐                       ┌──────────────┐
               │   Success    │                       │   Failure    │
               │   Webhook    │                       │   Handler    │
               └──────┬───────┘                       └──────────────┘
                      │
                      ▼
               ┌──────────────┐
               │ Update DB    │
               │ Confirm Book │
               │ Notify Users │
               └──────────────┘

Host Payout (Weekly):
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ CRON: Wed    │───▶│ Calc Payouts │───▶│  Razorpay    │
│ 10am IST     │    │ (Edge Func)  │    │  Route       │
└──────────────┘    └──────────────┘    └──────────────┘
                          │
                          ▼
                    ┌──────────────┐
                    │ Transfer to  │
                    │ Host Bank    │
                    └──────────────┘
```

**Money Flow**:
```
Guest Pays: ₹1,500 (booking) + ₹3,000 (deposit) = ₹4,500

Platform Collects: ₹4,500
├── Booking Amount: ₹1,500
│   ├── Host Share (80%): ₹1,200
│   └── Platform Fee (20%): ₹300
└── Security Deposit: ₹3,000 (held)

After Trip:
├── If no issues: Return ₹3,000 deposit to guest
├── If damage: Deduct from deposit, return remainder
└── Host payout: ₹1,200 (after 7-day hold)
```

### 4. Real-time System

```
┌─────────────────────────────────────────────────────────────────┐
│                   REAL-TIME SUBSCRIPTIONS                        │
└─────────────────────────────────────────────────────────────────┘

Supabase Realtime Channels:
                                      
┌──────────────────┐
│  booking:{id}    │ ── Status updates, messages
└──────────────────┘

┌──────────────────┐
│  user:{id}       │ ── Notifications, booking requests
└──────────────────┘

┌──────────────────┐
│  car:{id}        │ ── Availability changes, new reviews
└──────────────────┘

Client Subscription Pattern:
```typescript
// Subscribe to booking updates
const channel = supabase
  .channel(`booking:${bookingId}`)
  .on(
    'postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'bookings', filter: `id=eq.${bookingId}` },
    (payload) => handleBookingUpdate(payload.new)
  )
  .subscribe()
```

### 5. Search & Discovery

```
┌─────────────────────────────────────────────────────────────────┐
│                      SEARCH ARCHITECTURE                         │
└─────────────────────────────────────────────────────────────────┘

Search Query Flow:
┌──────────────────────────────────────────────────────────────────┐
│                         SEARCH INPUT                              │
│  Location: "HSR Layout" | Dates: Dec 20-22 | Filters: Auto, SUV  │
└─────────────────────────────────┬────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────┐
│                       QUERY BUILDER                               │
│  1. Geocode location → lat/lng                                    │
│  2. Build PostGIS radius query (5km default)                     │
│  3. Join with availability (exclude booked dates)                │
│  4. Apply filters (transmission, fuel, seats)                    │
│  5. Sort (distance, price, rating)                               │
└─────────────────────────────────┬────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────┐
│                       POSTGRES QUERY                              │
│  SELECT cars.*, ST_Distance(location_point, search_point) as dist│
│  FROM cars                                                        │
│  WHERE status = 'active'                                         │
│    AND ST_DWithin(location_point, search_point, 5000)           │
│    AND NOT EXISTS (conflicting bookings)                         │
│  ORDER BY dist, daily_rate                                       │
│  LIMIT 20 OFFSET 0                                               │
└──────────────────────────────────────────────────────────────────┘
```

**Search Optimization**:
- PostGIS spatial index for location queries
- Availability pre-computed in car_availability table
- Redis cache for hot search queries (Phase 2)
- Elasticsearch for text search (Phase 3)

---

## Data Flow Diagrams

### Guest Booking Flow

```
┌────────┐     ┌────────┐     ┌─────────┐     ┌────────┐     ┌────────┐
│ Guest  │     │  App   │     │Supabase │     │Razorpay│     │  Host  │
└───┬────┘     └───┬────┘     └────┬────┘     └───┬────┘     └───┬────┘
    │              │               │              │              │
    │ Search Cars  │               │              │              │
    │─────────────▶│               │              │              │
    │              │  Query DB     │              │              │
    │              │──────────────▶│              │              │
    │              │  Results      │              │              │
    │              │◀──────────────│              │              │
    │ Display Cars │               │              │              │
    │◀─────────────│               │              │              │
    │              │               │              │              │
    │ Select Car   │               │              │              │
    │─────────────▶│               │              │              │
    │              │ Check Avail   │              │              │
    │              │──────────────▶│              │              │
    │              │ Available     │              │              │
    │              │◀──────────────│              │              │
    │              │               │              │              │
    │ Book Request │               │              │              │
    │─────────────▶│               │              │              │
    │              │ Insert Booking│              │              │
    │              │──────────────▶│              │              │
    │              │               │ Notify Host  │              │
    │              │               │─────────────────────────────▶│
    │              │               │              │              │
    │              │               │              │ Accept       │
    │              │               │◀─────────────────────────────│
    │              │               │              │              │
    │ Payment Page │               │              │              │
    │◀─────────────│               │              │              │
    │              │               │              │              │
    │ Pay          │               │              │              │
    │─────────────▶│               │              │              │
    │              │ Create Order  │              │              │
    │              │──────────────────────────────▶│              │
    │              │ Order ID      │              │              │
    │              │◀──────────────────────────────│              │
    │              │               │              │              │
    │ Razorpay UI  │               │              │              │
    │─────────────────────────────────────────────▶│              │
    │              │               │              │              │
    │              │               │ Webhook      │              │
    │              │               │◀─────────────│              │
    │              │               │ Update DB    │              │
    │              │               │──────────────│              │
    │              │               │              │              │
    │ Confirmation │               │ Notify Both  │              │
    │◀─────────────│◀──────────────│─────────────────────────────▶│
    │              │               │              │              │
```

---

## Security Architecture

### Authentication & Authorization

```
┌─────────────────────────────────────────────────────────────────┐
│                     SECURITY LAYERS                              │
└─────────────────────────────────────────────────────────────────┘

Layer 1: Network
├── HTTPS only (TLS 1.3)
├── Cloudflare DDoS protection
└── Rate limiting (100 req/min per IP)

Layer 2: Authentication
├── Supabase Auth (JWT)
├── Phone OTP verification
├── Session tokens (7-day expiry)
└── Refresh token rotation

Layer 3: Authorization (RLS)
├── Row-Level Security on all tables
├── Policy-based access control
├── Users see only their own data
└── Admins have elevated access

Layer 4: Application
├── Input validation (Zod schemas)
├── SQL injection prevention (parameterized)
├── XSS prevention (React escaping)
└── CSRF tokens on mutations

Layer 5: Payment
├── Razorpay handles PCI compliance
├── No card data stored locally
├── Webhook signature verification
└── Idempotency keys for transactions
```

### Row-Level Security Examples

```sql
-- Users can only view their own bookings
CREATE POLICY "Users view own bookings" ON bookings
  FOR SELECT
  USING (auth.uid() = guest_id OR auth.uid() = host_id);

-- Guests can only create bookings for themselves
CREATE POLICY "Guests create own bookings" ON bookings
  FOR INSERT
  WITH CHECK (auth.uid() = guest_id);

-- Only active cars are visible to guests
CREATE POLICY "View active cars" ON cars
  FOR SELECT
  USING (status = 'active' OR host_id = auth.uid());
```

---

## Deployment Architecture

### Production Environment

```
┌─────────────────────────────────────────────────────────────────┐
│                   DEPLOYMENT TOPOLOGY                            │
└─────────────────────────────────────────────────────────────────┘

DNS: godrive.in → Cloudflare

┌──────────────┐
│  Cloudflare  │ ── CDN, DDoS, SSL
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────────┐
│                         VERCEL                                    │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  React App (Static + SSR)                                    │ │
│  │  - Edge Network (Global CDN)                                 │ │
│  │  - Automatic HTTPS                                           │ │
│  │  - Preview deployments                                       │ │
│  └─────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────────┐
│                        SUPABASE                                   │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐        │
│  │ PostgreSQL│ │   Auth    │ │  Storage  │ │Edge Funcs │        │
│  │   (DB)    │ │  (Users)  │ │ (Images)  │ │  (Deno)   │        │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘        │
│                                                                   │
│  Region: Mumbai (ap-south-1) for low latency                     │
└──────────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                              │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐        │
│  │ Razorpay  │ │Google Maps│ │  MSG91    │ │  Resend   │        │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘        │
└──────────────────────────────────────────────────────────────────┘
```

### CI/CD Pipeline

```
┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐
│   GitHub   │───▶│  Vercel    │───▶│  Preview   │───▶│ Production │
│   Push     │    │  Build     │    │  Deploy    │    │  Deploy    │
└────────────┘    └────────────┘    └────────────┘    └────────────┘
                        │
                        ▼
                  ┌────────────┐
                  │ TypeScript │
                  │   Check    │
                  └────────────┘
                        │
                        ▼
                  ┌────────────┐
                  │   ESLint   │
                  │   Check    │
                  └────────────┘
                        │
                        ▼
                  ┌────────────┐
                  │   Tests    │
                  │   (Vitest) │
                  └────────────┘
```

---

## Scalability Considerations

### Phase 1 (MVP): 0-100 bookings/month
- Supabase Free/Pro tier
- Vercel Hobby/Pro
- Single region deployment
- Manual scaling

### Phase 2 (Growth): 100-1000 bookings/month
- Supabase Pro with read replicas
- Redis for session/cache
- Background job queue
- Multi-region CDN

### Phase 3 (Scale): 1000+ bookings/month
- Database connection pooling
- Elasticsearch for search
- Dedicated Edge Functions
- APM and advanced monitoring

---

## Monitoring & Observability

```
┌─────────────────────────────────────────────────────────────────┐
│                   MONITORING STACK                               │
└─────────────────────────────────────────────────────────────────┘

Application:
├── Sentry (Error tracking)
├── Vercel Analytics (Web vitals)
└── Custom events (Posthog/Mixpanel)

Infrastructure:
├── Supabase Dashboard (DB metrics)
├── Vercel Dashboard (Edge metrics)
└── Uptime monitoring (Better Uptime)

Business:
├── Metabase (SQL dashboards)
├── Daily metrics email
└── Slack alerts for critical events
```

---

## Disaster Recovery

### Backup Strategy
- **Database**: Supabase daily backups (7-day retention)
- **Storage**: Supabase replication
- **Code**: GitHub repository
- **Config**: Environment variables in Vercel

### Recovery Procedures
1. **DB corruption**: Restore from Supabase backup
2. **Deployment failure**: Vercel instant rollback
3. **Service outage**: Status page + user communication
4. **Data breach**: Incident response plan (TBD)

---

## Architecture Decision Records (ADRs)

### ADR-001: Supabase over Custom Backend
**Decision**: Use Supabase BaaS instead of custom Node.js/Python backend
**Rationale**: 
- Solo developer cannot maintain custom infrastructure
- Auth, DB, Storage, Realtime in one platform
- PostgreSQL provides relational integrity for bookings
- Row-Level Security simplifies authorization
**Trade-offs**: Vendor lock-in, less customization

### ADR-002: React Web over Native Mobile First
**Decision**: Build responsive web app before native mobile
**Rationale**:
- Faster iteration with single codebase
- AI tools better at web code generation
- PWA provides app-like experience
- React Native shares most code later
**Trade-offs**: Native features limited, app store presence delayed

### ADR-003: Razorpay over Stripe
**Decision**: Use Razorpay for payments
**Rationale**:
- UPI is dominant payment method in India
- Better local payment method support
- Route product for marketplace splits
- Local support and documentation
**Trade-offs**: Less international reach

### ADR-004: Phone OTP over Email/Password
**Decision**: Phone number as primary authentication
**Rationale**:
- 99% phone penetration in India
- No password management/reset flows
- Trust signal for P2P marketplace
- Standard in Indian apps
**Trade-offs**: International users need Indian phone

---

*Architecture document maintained alongside code. Update with each significant technical decision.*
