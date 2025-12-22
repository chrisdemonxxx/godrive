# CLAUDE.md - GoDrive AI Development Context

> **Last Updated**: December 15, 2024
> **Project Phase**: Foundation Setup (Week 1)
> **Status**: Pre-development - Architecture & Planning

---

## 🎯 Project Overview

**GoDrive** is a peer-to-peer self-drive car rental marketplace for Bangalore, India. Car owners (Hosts) list their vehicles; travelers (Guests) rent them by the hour/day. Think "Airbnb for cars" or "Turo for India."

### Business Model
- **Commission**: 20% platform fee (Host receives 80% of booking revenue)
- **Security Deposit**: ₹3,000-5,000 (refundable, based on car category)
- **Minimum Booking**: 4 hours
- **Cancellation**: Free cancellation up to 24 hours before pickup

### Target Market
- **City**: Bangalore, Karnataka, India
- **Primary Use Cases**: Weekend trips (Coorg, Chikmagalur, Mysore), airport pickups, daily errands
- **Target Hosts**: Car owners with vehicles idle 15+ days/month
- **Target Guests**: Tech professionals, young families, tourists

---

## 🛠 Technology Stack

### Frontend (Mobile-First Web App)
- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query) for server state
- **Forms**: React Hook Form + Zod validation
- **Maps**: Google Maps JavaScript API
- **Build**: Vite

### Backend (Supabase BaaS)
- **Database**: PostgreSQL (Supabase hosted)
- **Auth**: Supabase Auth (Phone OTP + Email)
- **Storage**: Supabase Storage (car images, documents)
- **Realtime**: Supabase Realtime (booking updates, chat)
- **Edge Functions**: Deno-based serverless functions

### External Services
- **Payments**: Razorpay (UPI, cards, netbanking) + Razorpay Route for splits
- **SMS/OTP**: MSG91 or Twilio
- **Email**: Resend or SendGrid
- **Push Notifications**: OneSignal
- **KYC** (Phase 2): Surepass or IDcentral for Aadhaar/DL verification

### DevOps
- **Hosting**: Vercel (frontend) + Supabase (backend)
- **Domain**: godrive.in (to be acquired)
- **Monitoring**: Supabase Dashboard + Vercel Analytics
- **Error Tracking**: Sentry (Phase 2)

---

## 📊 Database Schema Overview

### Core Entities

```
users
├── id (uuid, PK)
├── phone (unique, required)
├── email (unique, optional)
├── full_name
├── avatar_url
├── role (enum: guest, host, both, admin)
├── kyc_status (enum: pending, submitted, verified, rejected)
├── is_phone_verified (boolean)
├── created_at, updated_at

user_documents (KYC)
├── user_id (FK)
├── document_type (enum: driving_license, aadhaar, pan)
├── document_number
├── front_image_url
├── back_image_url
├── verification_status
├── verified_at, verified_by

cars
├── id (uuid, PK)
├── host_id (FK → users)
├── make, model, year
├── variant (trim level)
├── transmission (enum: manual, automatic)
├── fuel_type (enum: petrol, diesel, cng, electric)
├── seats (int)
├── registration_number
├── color
├── status (enum: draft, pending_approval, active, inactive, suspended)
├── location_lat, location_lng
├── location_address
├── location_area (neighborhood)
├── daily_rate (int, in paise)
├── hourly_rate (int, in paise)
├── weekly_rate (int, in paise)
├── security_deposit (int, in paise)
├── unlimited_km (boolean)
├── km_limit_per_day (int, if not unlimited)
├── extra_km_charge (int, per km in paise)
├── features (jsonb array: AC, bluetooth, sunroof, etc.)
├── guidelines (text, host instructions)
├── instant_booking (boolean)
├── created_at, updated_at

car_images
├── car_id (FK)
├── image_url
├── is_primary (boolean)
├── display_order (int)

car_availability
├── car_id (FK)
├── date (date)
├── is_available (boolean)
├── custom_daily_rate (nullable, for surge pricing)

bookings
├── id (uuid, PK)
├── booking_number (unique, human-readable: GD-XXXXXX)
├── car_id (FK)
├── guest_id (FK → users)
├── host_id (FK → users, denormalized for queries)
├── status (enum: pending, confirmed, active, completed, cancelled, disputed)
├── pickup_datetime (timestamptz)
├── return_datetime (timestamptz)
├── actual_pickup_datetime
├── actual_return_datetime
├── pickup_location (text)
├── pickup_lat, pickup_lng
├── base_amount (int, paise)
├── service_fee (int, platform fee in paise)
├── security_deposit (int, paise)
├── total_amount (int, paise)
├── host_payout (int, paise)
├── payment_status (enum: pending, deposit_paid, fully_paid, refund_pending, refunded)
├── cancellation_reason
├── cancelled_by (enum: guest, host, admin)
├── cancelled_at
├── created_at, updated_at

booking_payments
├── booking_id (FK)
├── razorpay_order_id
├── razorpay_payment_id
├── amount (int, paise)
├── type (enum: booking_payment, security_deposit, refund, host_payout)
├── status (enum: pending, captured, refunded, failed)
├── created_at

reviews
├── id (uuid, PK)
├── booking_id (FK, unique)
├── reviewer_id (FK → users)
├── reviewee_id (FK → users)
├── car_id (FK, nullable for guest reviews)
├── type (enum: guest_to_host, host_to_guest)
├── rating (int, 1-5)
├── comment (text)
├── created_at

messages (Phase 2)
├── id, booking_id, sender_id, content, created_at

host_payouts
├── id (uuid, PK)
├── host_id (FK)
├── amount (int, paise)
├── status (enum: pending, processing, completed, failed)
├── payout_batch_id
├── razorpay_transfer_id
├── completed_at
├── created_at
```

### Key Relationships
- User can be Guest, Host, or Both
- One Host → Many Cars
- One Car → Many Bookings (non-overlapping time slots)
- One Booking → Two Reviews (guest→host, host→guest)
- Payments linked to Bookings via booking_payments table

---

## 🔐 Authentication Flow

1. **Phone OTP Login** (primary)
   - User enters phone number
   - Supabase sends OTP via SMS
   - User enters OTP → creates session
   - If new user, prompt for name/email

2. **Email Magic Link** (secondary)
   - For users who prefer email
   - Click link → creates session

3. **Session Management**
   - JWT tokens stored in httpOnly cookies
   - 7-day session duration
   - Refresh token rotation enabled

---

## 💰 Payment Flow

### Guest Booking Payment
1. Guest selects car, dates → calculates total
2. Create Razorpay Order (total + security deposit)
3. Guest pays via Razorpay Checkout (UPI/Card/NetBanking)
4. On success: Update booking status → Notify host
5. Security deposit held until trip completion

### Host Payout
1. Trip completed + 7-day dispute window
2. Calculate: booking_amount × 0.80 (host share)
3. Batch payouts weekly (Wednesday)
4. Transfer via Razorpay Route to host's linked bank account

### Refund Scenarios
- Guest cancels >24h before: Full refund
- Guest cancels <24h before: 50% refund
- Host cancels anytime: Full refund + ₹500 credit to guest
- Security deposit: Refund within 24h of trip completion (minus damages if any)

---

## 📁 Project Structure

```
/godrive
├── CLAUDE.md                 # This file - AI context
├── README.md                 # Setup instructions
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
│
├── /docs
│   ├── architecture.md       # System design decisions
│   ├── api-spec.md          # API endpoints documentation
│   ├── database-schema.sql   # Full SQL schema
│   ├── user-flows.md        # User journey documentation
│   └── sprint-plan.md       # 8-week development plan
│
├── /src
│   ├── /app                  # App entry, routing
│   │   ├── App.tsx
│   │   ├── Router.tsx
│   │   └── providers.tsx
│   │
│   ├── /modules
│   │   ├── /auth            # Login, signup, session
│   │   ├── /cars            # Listings, search, details
│   │   ├── /bookings        # Booking flow, management
│   │   ├── /users           # Profile, KYC, settings
│   │   ├── /payments        # Razorpay integration
│   │   ├── /reviews         # Rating system
│   │   └── /notifications   # Push, email, SMS
│   │
│   ├── /shared
│   │   ├── /components      # Reusable UI components
│   │   ├── /hooks           # Custom React hooks
│   │   ├── /utils           # Helper functions
│   │   ├── /types           # TypeScript interfaces
│   │   ├── /config          # Environment config
│   │   └── /lib             # Third-party integrations
│   │
│   └── /styles
│       └── globals.css      # Tailwind imports
│
├── /supabase
│   ├── /migrations          # SQL migrations
│   ├── /functions           # Edge functions
│   └── config.toml          # Supabase config
│
├── /scripts
│   ├── seed-data.ts         # Test data seeding
│   └── migrate.ts           # Migration runner
│
└── /public
    └── /images              # Static assets
```

---

## 🎨 Design System

### Brand Colors
- **Primary**: #0066FF (GoDrive Blue)
- **Secondary**: #FF6B00 (Action Orange)
- **Success**: #10B981
- **Warning**: #F59E0B
- **Error**: #EF4444
- **Neutral**: Gray scale (50-900)

### Typography
- **Headings**: Inter (600, 700)
- **Body**: Inter (400, 500)
- **Sizes**: Following Tailwind defaults (sm, base, lg, xl, 2xl)

### Component Patterns
- Cards with rounded-xl, shadow-sm
- Buttons: Primary (blue), Secondary (outline), Ghost
- Form inputs with visible focus states
- Loading skeletons for async content
- Toast notifications for feedback

---

## 🚦 Current Sprint Tasks

### Week 1: Foundation (Current)
- [x] Project structure setup
- [x] CLAUDE.md context file
- [ ] Supabase project creation
- [ ] Database schema migration
- [ ] Basic auth flow (phone OTP)
- [ ] Landing page with value prop

### Week 2: Listings
- [ ] Host: Add car form (multi-step)
- [ ] Car image upload (max 8)
- [ ] Car details page
- [ ] Basic search (location + dates)

### Week 3: Booking Flow
- [ ] Availability calendar
- [ ] Booking request flow
- [ ] Razorpay integration
- [ ] Booking confirmation

### Week 4: Dashboards
- [ ] Guest dashboard (my bookings)
- [ ] Host dashboard (my cars, requests)
- [ ] Booking status management

---

## 🔑 Environment Variables

```env
# Supabase
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx (server only)

# Razorpay
VITE_RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx (server only)

# Google Maps
VITE_GOOGLE_MAPS_API_KEY=xxx

# SMS (MSG91)
MSG91_AUTH_KEY=xxx
MSG91_TEMPLATE_ID=xxx

# App
VITE_APP_URL=http://localhost:5173
VITE_APP_ENV=development
```

---

## 📋 Coding Conventions

### TypeScript
- Strict mode enabled
- Explicit return types on functions
- Interface over Type for object shapes
- Zod schemas for runtime validation

### React Patterns
- Functional components only
- Custom hooks for shared logic
- Compound components for complex UI
- Error boundaries around major sections

### Naming
- Components: PascalCase (CarCard.tsx)
- Hooks: camelCase with use prefix (useBooking.ts)
- Utils: camelCase (formatCurrency.ts)
- Types: PascalCase with suffix (BookingStatus, UserRole)

### File Organization
- One component per file
- Co-locate tests with components
- Index files for module exports

---

## 🚨 Important Business Rules

1. **Booking Overlap Prevention**: A car cannot have overlapping confirmed bookings. Use database constraints + application checks.

2. **Host Approval**: New car listings require admin approval before going live (for MVP, can be instant).

3. **KYC Before Booking**: Guests must have verified DL before confirming a booking.

4. **Security Deposit**: Always collected upfront, separate from booking amount.

5. **Cancellation Windows**: 
   - Guest: Free >24h, 50% fee <24h
   - Host: Full refund anytime, reputation penalty

6. **Review Window**: Both parties can review within 14 days of trip completion.

7. **Payout Delay**: Host payouts processed 7 days after trip completion (dispute window).

---

## 🤖 AI Development Guidelines

When generating code for this project:

1. **Always use TypeScript** with strict types
2. **Follow existing patterns** in the codebase
3. **Use Supabase client** for all database operations
4. **Handle errors** with try-catch and user-friendly messages
5. **Add loading states** for all async operations
6. **Mobile-first responsive** design with Tailwind
7. **Comment complex logic** but avoid obvious comments
8. **Write Zod schemas** for all form inputs and API responses

### Example Component Pattern

```tsx
// src/modules/cars/components/CarCard.tsx
import { Car } from '@/shared/types';
import { formatCurrency } from '@/shared/utils';

interface CarCardProps {
  car: Car;
  onSelect?: (carId: string) => void;
}

export function CarCard({ car, onSelect }: CarCardProps) {
  return (
    <div 
      className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onSelect?.(car.id)}
    >
      <img 
        src={car.primaryImage} 
        alt={`${car.make} ${car.model}`}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="mt-3 font-semibold text-lg">
        {car.make} {car.model}
      </h3>
      <p className="text-gray-600 text-sm">{car.year} • {car.transmission}</p>
      <p className="mt-2 font-bold text-blue-600">
        {formatCurrency(car.dailyRate)}/day
      </p>
    </div>
  );
}
```

---

## 📞 Key Contacts & Resources

- **Project Lead**: Billy (BSW Crow LLC / USA Home Services)
- **On-Ground Team**: Bangalore-based for host onboarding & inspections
- **Legal**: TBD (lawyer consultation pending for entity structure)

### Reference Links
- Zoomcar Host Policies: https://host-policy.zoomcar.com
- Razorpay Route Docs: https://razorpay.com/docs/payments/route
- Supabase Docs: https://supabase.com/docs
- Google Maps Platform: https://developers.google.com/maps

---

*This file should be updated with each sprint. AI assistants should reference this for all project context.*
