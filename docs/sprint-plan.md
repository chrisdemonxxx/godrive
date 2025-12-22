# GoDrive Sprint Plan: 8-Week MVP Development

> **Goal**: Launch minimal viable product with 10 hosts, 15 cars, and 20 completed bookings
> **Developer**: Solo + AI agents (Claude Code, Cursor)
> **Work Hours**: 4-6 focused hours/day

---

## Phase Overview

| Phase | Weeks | Focus | Deliverables |
|-------|-------|-------|--------------|
| **Foundation** | 1-2 | Setup + Core Infrastructure | Project scaffold, DB, Auth, Landing |
| **Listings** | 3-4 | Car Management | Host onboarding, Car CRUD, Search |
| **Transactions** | 5-6 | Booking + Payments | Booking flow, Razorpay, Notifications |
| **Polish** | 7-8 | Dashboards + Launch | User dashboards, Testing, Soft launch |

---

## Week 1: Foundation & Infrastructure

### Day 1 (Monday) - Project Setup
**Morning (2h)**
- [x] Create project directory structure
- [x] Initialize CLAUDE.md context file
- [x] Write README.md
- [x] Design database schema

**Afternoon (2h)**
- [ ] Create Supabase project (godrive-prod)
- [ ] Run database migrations
- [ ] Configure Supabase Auth (Phone OTP)
- [ ] Set up environment variables

**Evening (1h)**
- [ ] Initialize React + Vite + TypeScript project
- [ ] Configure Tailwind CSS
- [ ] Set up ESLint + Prettier
- [ ] Create folder structure in src/

### Day 2 (Tuesday) - Auth Foundation
**Morning (3h)**
- [ ] Create Supabase client configuration
- [ ] Build phone input component
- [ ] Implement OTP request flow
- [ ] Build OTP verification screen

**Afternoon (2h)**
- [ ] Create auth context/provider
- [ ] Build protected route wrapper
- [ ] Implement session persistence
- [ ] Add logout functionality

**Evening (1h)**
- [ ] Test auth flow end-to-end
- [ ] Fix any auth edge cases
- [ ] Document auth implementation

### Day 3 (Wednesday) - User Profile
**Morning (2h)**
- [ ] Create user profile types
- [ ] Build profile completion form
- [ ] Implement profile update API

**Afternoon (2h)**
- [ ] Create avatar upload component
- [ ] Configure Supabase Storage bucket
- [ ] Build profile view page

**Evening (1h)**
- [ ] Add form validation (Zod)
- [ ] Test profile flows
- [ ] Update CLAUDE.md with progress

### Day 4 (Thursday) - Landing Page
**Morning (3h)**
- [ ] Design landing page wireframe
- [ ] Build hero section with value prop
- [ ] Create "How it works" section
- [ ] Add host/guest CTA buttons

**Afternoon (2h)**
- [ ] Build footer with links
- [ ] Add responsive navigation
- [ ] Implement smooth scrolling

**Evening (1h)**
- [ ] Mobile responsiveness testing
- [ ] Performance optimization
- [ ] SEO meta tags

### Day 5 (Friday) - Core Components
**Morning (2h)**
- [ ] Create Button component variants
- [ ] Build Input/TextArea components
- [ ] Create Select/Dropdown component

**Afternoon (2h)**
- [ ] Build Card component
- [ ] Create Modal/Dialog component
- [ ] Add Toast notification system

**Evening (1h)**
- [ ] Document component library
- [ ] Week 1 review and retrospective
- [ ] Plan Week 2 priorities

---

## Week 2: Listings Foundation

### Day 6 (Monday) - Car Model Setup
**Morning (2h)**
- [ ] Create car TypeScript types
- [ ] Define car validation schemas (Zod)
- [ ] Build car service layer

**Afternoon (2h)**
- [ ] Create car API hooks (React Query)
- [ ] Set up Supabase RLS policies for cars
- [ ] Test CRUD operations

**Evening (1h)**
- [ ] Add car image storage bucket
- [ ] Configure image upload limits
- [ ] Document car data model

### Day 7 (Tuesday) - Add Car Form (Part 1)
**Morning (3h)**
- [ ] Design multi-step form flow
- [ ] Build Step 1: Basic details (make, model, year)
- [ ] Add car make/model autocomplete

**Afternoon (2h)**
- [ ] Build Step 2: Vehicle specs (transmission, fuel, seats)
- [ ] Add color picker
- [ ] Registration number input with format validation

**Evening (1h)**
- [ ] Form state persistence between steps
- [ ] Back/Next navigation
- [ ] Progress indicator

### Day 8 (Wednesday) - Add Car Form (Part 2)
**Morning (2h)**
- [ ] Build Step 3: Location selection
- [ ] Integrate Google Maps autocomplete
- [ ] Store lat/lng coordinates

**Afternoon (2h)**
- [ ] Build Step 4: Pricing
- [ ] Daily/hourly/weekly rate inputs
- [ ] Security deposit setting

**Evening (1h)**
- [ ] Kilometer policy options
- [ ] Price preview calculator
- [ ] Form validation for pricing

### Day 9 (Thursday) - Add Car Form (Part 3)
**Morning (2h)**
- [ ] Build Step 5: Photos upload
- [ ] Multi-image upload component
- [ ] Image preview and reordering

**Afternoon (2h)**
- [ ] Image compression before upload
- [ ] Primary image selection
- [ ] Delete image functionality

**Evening (1h)**
- [ ] Build Step 6: Features & guidelines
- [ ] Feature checkbox grid
- [ ] Guidelines text editor

### Day 10 (Friday) - Car Listing Complete
**Morning (2h)**
- [ ] Build review/preview step
- [ ] Submit car for approval flow
- [ ] Success confirmation page

**Afternoon (2h)**
- [ ] Create car detail page
- [ ] Image gallery/carousel
- [ ] Specs and features display

**Evening (1h)**
- [ ] Host's "My Cars" list view
- [ ] Edit car functionality
- [ ] Week 2 retrospective

---

## Week 3: Search & Discovery

### Day 11 (Monday) - Search Infrastructure
**Morning (2h)**
- [ ] Build search query builder
- [ ] Location-based search with PostGIS
- [ ] Date range availability filter

**Afternoon (2h)**
- [ ] Create search results API
- [ ] Pagination implementation
- [ ] Sort options (price, rating, distance)

**Evening (1h)**
- [ ] Search performance optimization
- [ ] Add search indexes
- [ ] Test with sample data

### Day 12 (Tuesday) - Search UI
**Morning (3h)**
- [ ] Build search bar component
- [ ] Location autocomplete input
- [ ] Date picker (pickup/return)

**Afternoon (2h)**
- [ ] Search results page layout
- [ ] Car card component for listings
- [ ] Empty state design

**Evening (1h)**
- [ ] Loading skeletons
- [ ] Error handling
- [ ] Mobile search experience

### Day 13 (Wednesday) - Filters
**Morning (2h)**
- [ ] Build filter sidebar
- [ ] Price range slider
- [ ] Transmission filter

**Afternoon (2h)**
- [ ] Fuel type filter
- [ ] Seats filter
- [ ] Features filter

**Evening (1h)**
- [ ] Filter URL persistence
- [ ] Clear filters functionality
- [ ] Filter count badges

### Day 14 (Thursday) - Map View
**Morning (3h)**
- [ ] Integrate Google Maps
- [ ] Display car markers on map
- [ ] Custom marker design

**Afternoon (2h)**
- [ ] Map/list view toggle
- [ ] Marker click → car preview
- [ ] Bounds-based search

**Evening (1h)**
- [ ] Map clustering for many results
- [ ] Mobile map optimization
- [ ] Update CLAUDE.md

### Day 15 (Friday) - Car Detail Page
**Morning (2h)**
- [ ] Full car detail layout
- [ ] Photo gallery with zoom
- [ ] Specs table

**Afternoon (2h)**
- [ ] Host profile preview
- [ ] Reviews section (placeholder)
- [ ] Similar cars recommendations

**Evening (1h)**
- [ ] Booking widget sidebar
- [ ] Share car functionality
- [ ] Week 3 retrospective

---

## Week 4: Availability & Booking Request

### Day 16 (Monday) - Availability Calendar
**Morning (2h)**
- [ ] Build calendar component
- [ ] Fetch availability data
- [ ] Available/blocked date styling

**Afternoon (2h)**
- [ ] Date range selection
- [ ] Minimum booking duration check
- [ ] Blocked dates handling

**Evening (1h)**
- [ ] Price variation display
- [ ] Mobile calendar UX
- [ ] Document availability logic

### Day 17 (Tuesday) - Host Availability Management
**Morning (2h)**
- [ ] Host calendar view
- [ ] Block dates functionality
- [ ] Unblock dates functionality

**Afternoon (2h)**
- [ ] Custom pricing for dates
- [ ] Recurring availability patterns
- [ ] Bulk date operations

**Evening (1h)**
- [ ] Sync with bookings
- [ ] Calendar conflict prevention
- [ ] Test edge cases

### Day 18 (Wednesday) - Booking Request Flow
**Morning (3h)**
- [ ] Create booking request form
- [ ] Date/time selection
- [ ] Pickup location confirmation

**Afternoon (2h)**
- [ ] Price breakdown display
- [ ] Terms acceptance checkbox
- [ ] Submit booking request

**Evening (1h)**
- [ ] Request confirmation screen
- [ ] Guest booking history view
- [ ] Update booking types

### Day 19 (Thursday) - Host Booking Management
**Morning (2h)**
- [ ] Host booking requests list
- [ ] Request detail view
- [ ] Guest profile preview

**Afternoon (2h)**
- [ ] Accept booking flow
- [ ] Decline booking flow
- [ ] Response deadline tracking

**Evening (1h)**
- [ ] Booking status updates
- [ ] Host notification preferences
- [ ] Test accept/decline flows

### Day 20 (Friday) - Email Notifications
**Morning (2h)**
- [ ] Set up email service (Resend/SendGrid)
- [ ] Create email templates
- [ ] Booking request notification

**Afternoon (2h)**
- [ ] Booking confirmation email
- [ ] Booking cancellation email
- [ ] Trip reminder email

**Evening (1h)**
- [ ] Email delivery testing
- [ ] Unsubscribe handling
- [ ] Week 4 retrospective

---

## Week 5: Payments Integration

### Day 21 (Monday) - Razorpay Setup
**Morning (2h)**
- [ ] Create Razorpay account
- [ ] Get API keys (test mode)
- [ ] Install Razorpay SDK

**Afternoon (2h)**
- [ ] Create payment service
- [ ] Order creation API
- [ ] Payment verification flow

**Evening (1h)**
- [ ] Test payment in sandbox
- [ ] Handle payment failures
- [ ] Document payment flow

### Day 22 (Tuesday) - Checkout Flow
**Morning (3h)**
- [ ] Build checkout page
- [ ] Price breakdown display
- [ ] Security deposit explanation

**Afternoon (2h)**
- [ ] Razorpay checkout integration
- [ ] Payment success handling
- [ ] Payment failure handling

**Evening (1h)**
- [ ] Retry payment functionality
- [ ] Payment receipt generation
- [ ] Update booking on payment

### Day 23 (Wednesday) - Payment Records
**Morning (2h)**
- [ ] Store payment records
- [ ] Transaction history view
- [ ] Payment status tracking

**Afternoon (2h)**
- [ ] Guest payment history
- [ ] Download invoice/receipt
- [ ] Refund status display

**Evening (1h)**
- [ ] Payment webhooks setup
- [ ] Webhook verification
- [ ] Handle webhook events

### Day 24 (Thursday) - Host Payouts
**Morning (2h)**
- [ ] Host bank account linking
- [ ] Payout calculation logic
- [ ] Create payout records

**Afternoon (2h)**
- [ ] Razorpay Route integration
- [ ] Scheduled payout processing
- [ ] Payout status tracking

**Evening (1h)**
- [ ] Host earnings dashboard
- [ ] Payout history view
- [ ] Test payout flow

### Day 25 (Friday) - Refunds & Cancellations
**Morning (2h)**
- [ ] Guest cancellation flow
- [ ] Refund calculation logic
- [ ] Process refund API

**Afternoon (2h)**
- [ ] Host cancellation flow
- [ ] Cancellation penalties
- [ ] Dispute initiation

**Evening (1h)**
- [ ] Cancellation email notifications
- [ ] Refund status tracking
- [ ] Week 5 retrospective

---

## Week 6: Trip Management

### Day 26 (Monday) - Trip Start Flow
**Morning (2h)**
- [ ] Pre-trip checklist
- [ ] Host handover confirmation
- [ ] Guest acceptance confirmation

**Afternoon (2h)**
- [ ] Odometer reading capture
- [ ] Fuel level recording
- [ ] Photo documentation

**Evening (1h)**
- [ ] Trip status update
- [ ] Start trip notifications
- [ ] Document trip flows

### Day 27 (Tuesday) - Active Trip
**Morning (2h)**
- [ ] Active trip view
- [ ] Trip details display
- [ ] Emergency contact info

**Afternoon (2h)**
- [ ] Trip extension request
- [ ] Early return handling
- [ ] Issue reporting

**Evening (1h)**
- [ ] In-trip messaging (basic)
- [ ] Support contact
- [ ] Test active trip scenarios

### Day 28 (Wednesday) - Trip End Flow
**Morning (2h)**
- [ ] End trip checklist
- [ ] Odometer end reading
- [ ] Fuel level end recording

**Afternoon (2h)**
- [ ] Damage inspection flow
- [ ] Photo comparison
- [ ] Late return calculation

**Evening (1h)**
- [ ] Extra charges calculation
- [ ] Security deposit release
- [ ] Trip completion email

### Day 29 (Thursday) - Reviews System
**Morning (2h)**
- [ ] Review prompt after trip
- [ ] Guest review form (host + car)
- [ ] Host review form (guest)

**Afternoon (2h)**
- [ ] Star rating component
- [ ] Comment text input
- [ ] Submit review API

**Evening (1h)**
- [ ] Display reviews on profiles
- [ ] Average rating calculation
- [ ] Review response (Phase 2)

### Day 30 (Friday) - SMS Notifications
**Morning (2h)**
- [ ] Set up MSG91/Twilio
- [ ] SMS template creation
- [ ] Critical notifications via SMS

**Afternoon (2h)**
- [ ] Booking confirmation SMS
- [ ] Trip reminder SMS
- [ ] OTP SMS (already done)

**Evening (1h)**
- [ ] SMS delivery tracking
- [ ] Fallback handling
- [ ] Week 6 retrospective

---

## Week 7: Dashboards & Admin

### Day 31 (Monday) - Guest Dashboard
**Morning (2h)**
- [ ] Dashboard layout
- [ ] Upcoming bookings section
- [ ] Past trips section

**Afternoon (2h)**
- [ ] Booking detail view
- [ ] Cancel booking action
- [ ] Modify booking request

**Evening (1h)**
- [ ] Favorites/saved cars
- [ ] Quick rebook
- [ ] Dashboard stats

### Day 32 (Tuesday) - Host Dashboard
**Morning (2h)**
- [ ] Host dashboard layout
- [ ] Pending requests section
- [ ] Active bookings section

**Afternoon (2h)**
- [ ] Earnings overview
- [ ] Car performance stats
- [ ] Payout history

**Evening (1h)**
- [ ] Quick actions
- [ ] Notification center
- [ ] Calendar overview

### Day 33 (Wednesday) - Admin Panel Foundation
**Morning (2h)**
- [ ] Admin route protection
- [ ] Admin dashboard layout
- [ ] Key metrics display

**Afternoon (2h)**
- [ ] User management list
- [ ] User detail view
- [ ] User actions (suspend, verify)

**Evening (1h)**
- [ ] Car approval queue
- [ ] Approve/reject car
- [ ] Admin audit logging

### Day 34 (Thursday) - Admin Booking Management
**Morning (2h)**
- [ ] All bookings list
- [ ] Booking filters
- [ ] Booking detail view

**Afternoon (2h)**
- [ ] Manual booking actions
- [ ] Issue resolution
- [ ] Refund processing

**Evening (1h)**
- [ ] Transaction ledger
- [ ] Export to CSV
- [ ] Admin notifications

### Day 35 (Friday) - Settings & Profile
**Morning (2h)**
- [ ] User settings page
- [ ] Notification preferences
- [ ] Privacy settings

**Afternoon (2h)**
- [ ] Password/security settings
- [ ] Delete account flow
- [ ] Data export

**Evening (1h)**
- [ ] Help/FAQ section
- [ ] Contact support
- [ ] Week 7 retrospective

---

## Week 8: Testing & Launch

### Day 36 (Monday) - Bug Fixing
**Morning (3h)**
- [ ] Auth flow edge cases
- [ ] Booking flow testing
- [ ] Payment flow testing

**Afternoon (2h)**
- [ ] Mobile responsiveness fixes
- [ ] Form validation bugs
- [ ] API error handling

**Evening (1h)**
- [ ] Document known issues
- [ ] Prioritize fixes
- [ ] Update CLAUDE.md

### Day 37 (Tuesday) - Performance
**Morning (2h)**
- [ ] Image optimization
- [ ] Lazy loading implementation
- [ ] Bundle size analysis

**Afternoon (2h)**
- [ ] Database query optimization
- [ ] Add missing indexes
- [ ] API response caching

**Evening (1h)**
- [ ] Lighthouse audit
- [ ] Core Web Vitals
- [ ] Performance baseline

### Day 38 (Wednesday) - Security Review
**Morning (2h)**
- [ ] Review RLS policies
- [ ] Input sanitization audit
- [ ] API rate limiting

**Afternoon (2h)**
- [ ] Auth token security
- [ ] Payment security review
- [ ] Environment variables audit

**Evening (1h)**
- [ ] Security checklist
- [ ] Vulnerability scan
- [ ] Document security measures

### Day 39 (Thursday) - Pre-launch
**Morning (2h)**
- [ ] Production environment setup
- [ ] Domain configuration
- [ ] SSL certificate

**Afternoon (2h)**
- [ ] Database backup setup
- [ ] Monitoring alerts
- [ ] Error tracking (Sentry)

**Evening (1h)**
- [ ] Smoke testing production
- [ ] Rollback plan
- [ ] Launch checklist

### Day 40 (Friday) - LAUNCH 🚀
**Morning (2h)**
- [ ] Final production deployment
- [ ] DNS propagation check
- [ ] Payment gateway live mode

**Afternoon (2h)**
- [ ] Onboard first 5 hosts (on-ground team)
- [ ] Manual testing with real data
- [ ] Monitor for issues

**Evening (1h)**
- [ ] Launch announcement
- [ ] Week 8 / MVP retrospective
- [ ] Plan post-launch priorities

---

## Success Metrics (End of Week 8)

| Metric | Target |
|--------|--------|
| Hosts onboarded | 10 |
| Cars listed | 15 |
| Bookings completed | 20 |
| Active guests | 30 |
| NPS Score | > 30 |
| Uptime | > 99% |

---

## Post-MVP Priorities (Week 9+)

1. **KYC Automation** - Integrate Surepass/IDcentral for instant verification
2. **In-app Chat** - Real-time messaging between host and guest
3. **Push Notifications** - OneSignal integration
4. **Native Mobile App** - React Native with Expo
5. **GPS Tracking** - IoT device integration for trip monitoring
6. **Advanced Analytics** - Host insights, demand forecasting
7. **Insurance Integration** - Trip protection product

---

*Updated after each sprint. AI assistants should reference this for task context.*
