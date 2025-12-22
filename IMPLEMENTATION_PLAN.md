# GoDrive Implementation Plan

> **Complete Development Roadmap** | Created: December 15, 2024  
> **Goal**: Production-ready marketplace with all core features

---

## 📋 Overview

This plan breaks down all missing features into actionable tasks organized by phase, priority, and dependencies. Each task includes:
- **What** to build
- **Why** it's needed
- **How** to implement
- **Dependencies** on other tasks

---

## 🎯 Implementation Phases

```
Phase 1: Foundation (Week 1-2)     → Database, Components, Infrastructure
Phase 2: Core Features (Week 3-5)   → Listings, Search, Bookings
Phase 3: Transactions (Week 6-7)    → Payments, Dashboards
Phase 4: Polish & Launch (Week 8)  → Testing, Deployment, Admin
```

---

# PHASE 1: FOUNDATION (Week 1-2)

## 1.1 Database Deployment & Setup

### Task 1.1.1: Create Supabase Project
**Priority**: 🔴 Critical  
**Estimated Time**: 30 minutes  
**Dependencies**: None

**TODO:**
- [ ] Sign up/login to Supabase (https://supabase.com)
- [ ] Create new project: `godrive-prod`
- [ ] Select region: Mumbai (ap-south-1) for low latency
- [ ] Note down project URL and API keys
- [ ] Update `.env.local` with credentials:
  ```env
  VITE_SUPABASE_URL=https://xxx.supabase.co
  VITE_SUPABASE_ANON_KEY=xxx
  SUPABASE_SERVICE_ROLE_KEY=xxx
  ```

**Files to Create/Modify:**
- `.env.local` (update)
- `.env.example` (create template)

---

### Task 1.1.2: Deploy Database Schema
**Priority**: 🔴 Critical  
**Estimated Time**: 1 hour  
**Dependencies**: Task 1.1.1

**TODO:**
- [ ] Open Supabase SQL Editor
- [ ] Run `complete_schema.sql` in parts (as documented):
  - [ ] Part 1: Extensions & Enums
  - [ ] Part 2: Core Tables (users, cars, bookings, etc.)
  - [ ] Part 3: Bookings & Payments
  - [ ] Part 4: Reviews, Messages, Notifications
  - [ ] Part 5: Indexes & Functions
  - [ ] Part 6: Triggers & RLS Policies
- [ ] Verify all tables created (check `public` schema)
- [ ] Verify all functions created
- [ ] Verify all triggers active
- [ ] Test RLS policies with test user

**Verification:**
```sql
-- Check tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' ORDER BY table_name;

-- Check functions
SELECT routine_name FROM information_schema.routines 
WHERE routine_schema = 'public';

-- Check RLS enabled
SELECT tablename, rowsecurity FROM pg_tables 
WHERE schemaname = 'public';
```

**Files to Create/Modify:**
- `supabase/migrations/001_initial_schema.sql` (copy from complete_schema.sql)

---

### Task 1.1.3: Configure Storage Buckets
**Priority**: 🔴 Critical  
**Estimated Time**: 30 minutes  
**Dependencies**: Task 1.1.2

**TODO:**
- [ ] Go to Supabase Dashboard → Storage
- [ ] Create bucket: `car-images` (public)
  - [ ] Enable public access
  - [ ] Set file size limit: 5MB
  - [ ] Allowed MIME types: image/jpeg, image/png, image/webp
- [ ] Create bucket: `documents` (private)
  - [ ] Private access only
  - [ ] Set file size limit: 10MB
  - [ ] Allowed MIME types: image/jpeg, image/png, application/pdf
- [ ] Create bucket: `avatars` (public)
  - [ ] Enable public access
  - [ ] Set file size limit: 2MB
  - [ ] Allowed MIME types: image/jpeg, image/png, image/webp
- [ ] Verify storage policies are active (from schema Part 6)

**Files to Create/Modify:**
- `supabase/storage-policies.sql` (document policies)

---

### Task 1.1.4: Create Seed Data Script
**Priority**: 🟡 High  
**Estimated Time**: 2 hours  
**Dependencies**: Task 1.1.2

**TODO:**
- [ ] Create `scripts/seed-data.ts`
- [ ] Seed test users (3 guests, 2 hosts, 1 admin)
- [ ] Seed test cars (5-10 cars with images)
- [ ] Seed test bookings (mix of statuses)
- [ ] Seed test reviews
- [ ] Add script to `package.json`: `"seed": "tsx scripts/seed-data.ts"`
- [ ] Test seed script runs successfully

**Files to Create:**
- `scripts/seed-data.ts`
- `scripts/seed-helpers.ts` (utilities)

**Example Structure:**
```typescript
// scripts/seed-data.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  // Seed users
  // Seed cars
  // Seed bookings
  // etc.
}
```

---

## 1.2 Shared Component Library

### Task 1.2.1: Create Component Structure
**Priority**: 🔴 Critical  
**Estimated Time**: 1 hour  
**Dependencies**: None

**TODO:**
- [ ] Create folder structure:
  ```
  src/shared/components/
  ├── ui/
  │   ├── Button.tsx
  │   ├── Input.tsx
  │   ├── Card.tsx
  │   ├── Modal.tsx
  │   ├── Select.tsx
  │   ├── Textarea.tsx
  │   ├── Checkbox.tsx
  │   ├── Radio.tsx
  │   ├── Badge.tsx
  │   ├── Avatar.tsx
  │   ├── Skeleton.tsx
  │   └── index.ts
  ├── layout/
  │   ├── Header.tsx
  │   ├── Footer.tsx
  │   ├── Container.tsx
  │   └── index.ts
  └── index.ts
  ```
- [ ] Create `src/shared/components/ui/index.ts` (barrel exports)
- [ ] Create `src/shared/components/index.ts` (main exports)

**Files to Create:**
- Component structure (folders)

---

### Task 1.2.2: Build Button Component
**Priority**: 🔴 Critical  
**Estimated Time**: 1 hour  
**Dependencies**: Task 1.2.1

**TODO:**
- [ ] Create `Button.tsx` with variants:
  - [ ] Primary (blue)
  - [ ] Secondary (orange)
  - [ ] Outline
  - [ ] Ghost
  - [ ] Destructive
- [ ] Add sizes: sm, md, lg
- [ ] Add loading state
- [ ] Add disabled state
- [ ] Add icon support (lucide-react)
- [ ] Add TypeScript props interface
- [ ] Add Storybook story (optional)
- [ ] Update existing buttons to use component

**Files to Create:**
- `src/shared/components/ui/Button.tsx`

**Example:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: LucideIcon;
  // ... other props
}
```

---

### Task 1.2.3: Build Input Component
**Priority**: 🔴 Critical  
**Estimated Time**: 1.5 hours  
**Dependencies**: Task 1.2.1

**TODO:**
- [ ] Create `Input.tsx` with:
  - [ ] Label support
  - [ ] Error message display
  - [ ] Helper text
  - [ ] Icon support (left/right)
  - [ ] Password toggle
  - [ ] Phone number formatting
  - [ ] Currency formatting
- [ ] Integrate with React Hook Form
- [ ] Add validation styling
- [ ] Add disabled/readonly states
- [ ] Update existing inputs to use component

**Files to Create:**
- `src/shared/components/ui/Input.tsx`

---

### Task 1.2.4: Build Card Component
**Priority**: 🟡 High  
**Estimated Time**: 30 minutes  
**Dependencies**: Task 1.2.1

**TODO:**
- [ ] Create `Card.tsx` with:
  - [ ] Header section
  - [ ] Body section
  - [ ] Footer section
  - [ ] Image support
  - [ ] Hover effects
  - [ ] Clickable variant
- [ ] Add variants: default, elevated, outlined
- [ ] Update existing cards to use component

**Files to Create:**
- `src/shared/components/ui/Card.tsx`

---

### Task 1.2.5: Build Modal/Dialog Component
**Priority**: 🟡 High  
**Estimated Time**: 1.5 hours  
**Dependencies**: Task 1.2.1

**TODO:**
- [ ] Install @radix-ui/react-dialog (already in package.json)
- [ ] Create `Modal.tsx` wrapper around Radix Dialog
- [ ] Add:
  - [ ] Title
  - [ ] Description
  - [ ] Close button
  - [ ] Backdrop click to close
  - [ ] Size variants (sm, md, lg, full)
  - [ ] Animation
- [ ] Create `ConfirmDialog.tsx` (reusable confirmation)
- [ ] Test accessibility (keyboard, screen reader)

**Files to Create:**
- `src/shared/components/ui/Modal.tsx`
- `src/shared/components/ui/ConfirmDialog.tsx`

---

### Task 1.2.6: Build Form Components
**Priority**: 🟡 High  
**Estimated Time**: 2 hours  
**Dependencies**: Task 1.2.3

**TODO:**
- [ ] Create `Select.tsx` (using @radix-ui/react-select)
- [ ] Create `Textarea.tsx`
- [ ] Create `Checkbox.tsx` (using @radix-ui/react-checkbox)
- [ ] Create `Radio.tsx` (using @radix-ui/react-radio-group)
- [ ] Create `DatePicker.tsx` (using react-day-picker)
- [ ] Create `FileUpload.tsx` (for images)
- [ ] Integrate all with React Hook Form
- [ ] Add validation error display

**Files to Create:**
- `src/shared/components/ui/Select.tsx`
- `src/shared/components/ui/Textarea.tsx`
- `src/shared/components/ui/Checkbox.tsx`
- `src/shared/components/ui/Radio.tsx`
- `src/shared/components/ui/DatePicker.tsx`
- `src/shared/components/ui/FileUpload.tsx`

---

### Task 1.2.7: Build Layout Components
**Priority**: 🟡 High  
**Estimated Time**: 1.5 hours  
**Dependencies**: Task 1.2.1

**TODO:**
- [ ] Create `Header.tsx` with:
  - [ ] Logo
  - [ ] Navigation menu
  - [ ] User menu (when authenticated)
  - [ ] Mobile hamburger menu
- [ ] Create `Footer.tsx` with:
  - [ ] Links (Terms, Privacy, About)
  - [ ] Social media
  - [ ] Copyright
- [ ] Create `Container.tsx` (max-width wrapper)
- [ ] Add to Landing page
- [ ] Make responsive

**Files to Create:**
- `src/shared/components/layout/Header.tsx`
- `src/shared/components/layout/Footer.tsx`
- `src/shared/components/layout/Container.tsx`

---

### Task 1.2.8: Build Utility Components
**Priority**: 🟡 Medium  
**Estimated Time**: 1 hour  
**Dependencies**: Task 1.2.1

**TODO:**
- [ ] Create `Badge.tsx` (status indicators)
- [ ] Create `Avatar.tsx` (user profile images)
- [ ] Create `Skeleton.tsx` (loading placeholders)
- [ ] Create `EmptyState.tsx` (no data states)
- [ ] Create `ErrorState.tsx` (error display)
- [ ] Create `LoadingSpinner.tsx`

**Files to Create:**
- `src/shared/components/ui/Badge.tsx`
- `src/shared/components/ui/Avatar.tsx`
- `src/shared/components/ui/Skeleton.tsx`
- `src/shared/components/ui/EmptyState.tsx`
- `src/shared/components/ui/ErrorState.tsx`
- `src/shared/components/ui/LoadingSpinner.tsx`

---

## 1.3 Error Handling & Infrastructure

### Task 1.3.1: Add Error Boundaries
**Priority**: 🔴 Critical  
**Estimated Time**: 1.5 hours  
**Dependencies**: None

**TODO:**
- [ ] Install `react-error-boundary` (or build custom)
- [ ] Create `ErrorBoundary.tsx` component
- [ ] Create `ErrorFallback.tsx` (user-friendly error display)
- [ ] Wrap App.tsx with ErrorBoundary
- [ ] Wrap major routes with ErrorBoundary
- [ ] Add error logging (console for now, Sentry later)
- [ ] Test error boundary (intentionally throw error)

**Files to Create:**
- `src/shared/components/ErrorBoundary.tsx`
- `src/shared/components/ErrorFallback.tsx`

---

### Task 1.3.2: Create Error Handling Utilities
**Priority**: 🟡 High  
**Estimated Time**: 1 hour  
**Dependencies**: None

**TODO:**
- [ ] Create `src/shared/utils/errors.ts`:
  - [ ] `handleApiError()` - format Supabase errors
  - [ ] `getErrorMessage()` - extract user-friendly messages
  - [ ] `logError()` - error logging utility
  - [ ] Error type definitions
- [ ] Create error constants (error codes, messages)
- [ ] Update existing error handling to use utilities
- [ ] Add error toast notifications

**Files to Create:**
- `src/shared/utils/errors.ts`
- `src/shared/utils/errorMessages.ts`

---

### Task 1.3.3: Environment Variable Validation
**Priority**: 🟡 High  
**Estimated Time**: 1 hour  
**Dependencies**: None

**TODO:**
- [ ] Create `.env.example` with all required variables
- [ ] Create `src/shared/config/env.ts`:
  - [ ] Validate all env vars on app start
  - [ ] Throw clear errors if missing
  - [ ] Type-safe env access
- [ ] Add validation in `main.tsx` before app render
- [ ] Document all env vars in README

**Files to Create:**
- `.env.example`
- `src/shared/config/env.ts`

**Example:**
```typescript
// src/shared/config/env.ts
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  // ... etc
];

export function validateEnv() {
  const missing = requiredEnvVars.filter(key => !import.meta.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing env vars: ${missing.join(', ')}`);
  }
}
```

---

### Task 1.3.4: Set Up Logging System
**Priority**: 🟡 Medium  
**Estimated Time**: 1 hour  
**Dependencies**: Task 1.3.2

**TODO:**
- [ ] Create `src/shared/utils/logger.ts`:
  - [ ] `logInfo()`, `logError()`, `logWarn()`, `logDebug()`
  - [ ] Environment-based logging (dev vs prod)
  - [ ] Structured logging format
- [ ] Replace console.log with logger
- [ ] Add request/response logging for API calls
- [ ] Prepare for Sentry integration (later)

**Files to Create:**
- `src/shared/utils/logger.ts`

---

## 1.4 Custom Hooks & API Layer

### Task 1.4.1: Create API Service Layer
**Priority**: 🔴 Critical  
**Estimated Time**: 2 hours  
**Dependencies**: Task 1.1.2

**TODO:**
- [ ] Create `src/shared/lib/api/` folder structure:
  ```
  api/
  ├── cars.ts
  ├── bookings.ts
  ├── users.ts
  ├── payments.ts
  ├── reviews.ts
  └── index.ts
  ```
- [ ] Create base API client wrapper
- [ ] Create typed API functions for each entity
- [ ] Add error handling to all API calls
- [ ] Add request/response logging
- [ ] Document API functions

**Files to Create:**
- `src/shared/lib/api/base.ts`
- `src/shared/lib/api/cars.ts`
- `src/shared/lib/api/bookings.ts`
- `src/shared/lib/api/users.ts`
- `src/shared/lib/api/payments.ts`
- `src/shared/lib/api/reviews.ts`

---

### Task 1.4.2: Create React Query Hooks
**Priority**: 🔴 Critical  
**Estimated Time**: 3 hours  
**Dependencies**: Task 1.4.1

**TODO:**
- [ ] Create `src/shared/hooks/api/` folder
- [ ] Create hooks for cars:
  - [ ] `useCars()` - list cars
  - [ ] `useCar(id)` - get single car
  - [ ] `useCreateCar()` - create car
  - [ ] `useUpdateCar()` - update car
  - [ ] `useDeleteCar()` - delete car
- [ ] Create hooks for bookings:
  - [ ] `useBookings()` - list bookings
  - [ ] `useBooking(id)` - get single booking
  - [ ] `useCreateBooking()` - create booking
  - [ ] `useUpdateBooking()` - update booking
- [ ] Create hooks for users:
  - [ ] `useUser(id)` - get user
  - [ ] `useUpdateProfile()` - update profile
- [ ] Add optimistic updates where appropriate
- [ ] Add error handling to all hooks

**Files to Create:**
- `src/shared/hooks/api/useCars.ts`
- `src/shared/hooks/api/useBookings.ts`
- `src/shared/hooks/api/useUsers.ts`
- `src/shared/hooks/api/index.ts`

---

### Task 1.4.3: Create Utility Hooks
**Priority**: 🟡 High  
**Estimated Time**: 1.5 hours  
**Dependencies**: None

**TODO:**
- [ ] Create `useAuth()` hook (wrap Supabase auth)
- [ ] Create `useDebounce()` hook
- [ ] Create `useLocalStorage()` hook
- [ ] Create `useMediaQuery()` hook (responsive)
- [ ] Create `useClickOutside()` hook
- [ ] Create `useImageUpload()` hook (for Supabase Storage)

**Files to Create:**
- `src/shared/hooks/useAuth.ts`
- `src/shared/hooks/useDebounce.ts`
- `src/shared/hooks/useLocalStorage.ts`
- `src/shared/hooks/useMediaQuery.ts`
- `src/shared/hooks/useClickOutside.ts`
- `src/shared/hooks/useImageUpload.ts`

---

## 1.5 Form Validation

### Task 1.5.1: Create Zod Schemas
**Priority**: 🔴 Critical  
**Estimated Time**: 2 hours  
**Dependencies**: None

**TODO:**
- [ ] Create `src/shared/schemas/` folder
- [ ] Create schemas for:
  - [ ] `auth.ts` - login, OTP verification
  - [ ] `user.ts` - profile, KYC
  - [ ] `car.ts` - car creation, update
  - [ ] `booking.ts` - booking request
  - [ ] `review.ts` - review submission
  - [ ] `payment.ts` - payment data
- [ ] Export all schemas from `index.ts`
- [ ] Add validation messages (user-friendly)

**Files to Create:**
- `src/shared/schemas/auth.ts`
- `src/shared/schemas/user.ts`
- `src/shared/schemas/car.ts`
- `src/shared/schemas/booking.ts`
- `src/shared/schemas/review.ts`
- `src/shared/schemas/payment.ts`
- `src/shared/schemas/index.ts`

---

### Task 1.5.2: Integrate React Hook Form + Zod
**Priority**: 🔴 Critical  
**Estimated Time**: 1 hour  
**Dependencies**: Task 1.5.1

**TODO:**
- [ ] Update Login page to use RHF + Zod
- [ ] Update VerifyOtp page to use RHF + Zod
- [ ] Create form validation helper utilities
- [ ] Add form error display components
- [ ] Test all forms with validation

**Files to Modify:**
- `src/modules/auth/pages/Login.tsx`
- `src/modules/auth/pages/VerifyOtp.tsx`

**Files to Create:**
- `src/shared/utils/formValidation.ts`

---

# PHASE 2: CORE FEATURES (Week 3-5)

## 2.1 Car Listing Functionality

### Task 2.1.1: Create Car Types & API
**Priority**: 🔴 Critical  
**Estimated Time**: 1 hour  
**Dependencies**: Task 1.4.1

**TODO:**
- [ ] Verify car types exist in `src/shared/types/index.ts`
- [ ] Create `src/shared/lib/api/cars.ts`:
  - [ ] `getCars()` - list with filters
  - [ ] `getCar(id)` - get single car
  - [ ] `createCar(data)` - create car
  - [ ] `updateCar(id, data)` - update car
  - [ ] `deleteCar(id)` - delete car
  - [ ] `uploadCarImage(carId, file)` - upload image
  - [ ] `deleteCarImage(imageId)` - delete image
- [ ] Create React Query hooks (Task 1.4.2)

**Files to Create/Modify:**
- `src/shared/lib/api/cars.ts` (complete implementation)

---

### Task 2.1.2: Build Add Car Form (Step 1: Basic Details)
**Priority**: 🔴 Critical  
**Estimated Time**: 2 hours  
**Dependencies**: Task 1.2.6, Task 1.5.1

**TODO:**
- [ ] Create `src/modules/cars/pages/AddCar.tsx`
- [ ] Create multi-step form state management
- [ ] Build Step 1: Basic Details
  - [ ] Make dropdown (Maruti, Hyundai, Tata, etc.)
  - [ ] Model dropdown (filtered by make)
  - [ ] Year input (2010-current year)
  - [ ] Variant input (optional)
- [ ] Add form validation (Zod)
- [ ] Add progress indicator
- [ ] Add navigation (Next button)

**Files to Create:**
- `src/modules/cars/pages/AddCar.tsx`
- `src/modules/cars/components/AddCarForm.tsx`
- `src/modules/cars/components/Step1BasicDetails.tsx`

---

### Task 2.1.3: Build Add Car Form (Step 2: Vehicle Specs)
**Priority**: 🔴 Critical  
**Estimated Time**: 1.5 hours  
**Dependencies**: Task 2.1.2

**TODO:**
- [ ] Create Step 2 component
- [ ] Add fields:
  - [ ] Transmission (Manual/Automatic)
  - [ ] Fuel Type (Petrol/Diesel/CNG/Electric)
  - [ ] Seats (2-8)
  - [ ] Color (text input or color picker)
  - [ ] Registration Number (with validation)
- [ ] Add form validation
- [ ] Add Back/Next navigation

**Files to Create:**
- `src/modules/cars/components/Step2VehicleSpecs.tsx`

---

### Task 2.1.4: Build Add Car Form (Step 3: Location)
**Priority**: 🔴 Critical  
**Estimated Time**: 2.5 hours  
**Dependencies**: Task 2.1.3, Task 2.3.1 (Google Maps)

**TODO:**
- [ ] Create Step 3 component
- [ ] Integrate Google Maps Autocomplete
- [ ] Add fields:
  - [ ] Address (autocomplete)
  - [ ] Area/Neighborhood
  - [ ] City (default: Bangalore)
  - [ ] Lat/Lng (from autocomplete)
- [ ] Add map preview
- [ ] Add form validation
- [ ] Add Back/Next navigation

**Files to Create:**
- `src/modules/cars/components/Step3Location.tsx`
- `src/shared/lib/googleMaps.ts` (autocomplete utility)

---

### Task 2.1.5: Build Add Car Form (Step 4: Pricing)
**Priority**: 🔴 Critical  
**Estimated Time**: 2 hours  
**Dependencies**: Task 2.1.4

**TODO:**
- [ ] Create Step 4 component
- [ ] Add fields:
  - [ ] Daily Rate (₹/day, minimum ₹500)
  - [ ] Hourly Rate (optional)
  - [ ] Weekly Rate (optional)
  - [ ] Security Deposit (₹3000-5000)
- [ ] Add kilometer policy:
  - [ ] Unlimited KM (checkbox)
  - [ ] KM Limit per day (if not unlimited)
  - [ ] Extra KM Charge (₹/km)
- [ ] Add price preview calculator
- [ ] Add form validation
- [ ] Add Back/Next navigation

**Files to Create:**
- `src/modules/cars/components/Step4Pricing.tsx`

---

### Task 2.1.6: Build Add Car Form (Step 5: Photos)
**Priority**: 🔴 Critical  
**Estimated Time**: 3 hours  
**Dependencies**: Task 2.1.5, Task 1.4.3 (useImageUpload)

**TODO:**
- [ ] Create Step 5 component
- [ ] Create image upload component:
  - [ ] Drag & drop support
  - [ ] File picker
  - [ ] Image preview
  - [ ] Multiple images (max 8)
  - [ ] Image reordering (drag to reorder)
  - [ ] Primary image selection
  - [ ] Delete image
  - [ ] Image compression before upload
- [ ] Integrate with Supabase Storage
- [ ] Show upload progress
- [ ] Add form validation (min 3 images)
- [ ] Add Back/Next navigation

**Files to Create:**
- `src/modules/cars/components/Step5Photos.tsx`
- `src/modules/cars/components/ImageUpload.tsx`
- `src/shared/hooks/useImageUpload.ts` (enhance)

---

### Task 2.1.7: Build Add Car Form (Step 6: Features & Guidelines)
**Priority**: 🟡 High  
**Estimated Time**: 1.5 hours  
**Dependencies**: Task 2.1.6

**TODO:**
- [ ] Create Step 6 component
- [ ] Add features checklist:
  - [ ] AC, Bluetooth, Sunroof, GPS, etc.
- [ ] Add guidelines textarea (host instructions)
- [ ] Add pickup instructions textarea
- [ ] Add instant booking toggle
- [ ] Add minimum booking hours (default: 4)
- [ ] Add form validation
- [ ] Add Back/Next navigation

**Files to Create:**
- `src/modules/cars/components/Step6Features.tsx`

---

### Task 2.1.8: Build Add Car Form (Step 7: Review & Submit)
**Priority**: 🔴 Critical  
**Estimated Time**: 2 hours  
**Dependencies**: Task 2.1.7

**TODO:**
- [ ] Create Step 7 component
- [ ] Show summary of all entered data
- [ ] Show car preview (as it will appear)
- [ ] Add edit buttons (go back to specific step)
- [ ] Add submit button
- [ ] Handle form submission:
  - [ ] Create car record
  - [ ] Upload images
  - [ ] Set status to 'pending_approval'
  - [ ] Show success message
  - [ ] Redirect to "My Cars" page
- [ ] Add loading state
- [ ] Add error handling

**Files to Create:**
- `src/modules/cars/components/Step7Review.tsx`

---

### Task 2.1.9: Build Car Detail Page
**Priority**: 🔴 Critical  
**Estimated Time**: 3 hours  
**Dependencies**: Task 2.1.1

**TODO:**
- [ ] Create `src/modules/cars/pages/CarDetail.tsx`
- [ ] Build layout:
  - [ ] Image gallery (carousel with zoom)
  - [ ] Car specs table
  - [ ] Host profile preview
  - [ ] Features list
  - [ ] Guidelines section
  - [ ] Reviews section (placeholder)
  - [ ] Booking widget (sidebar)
- [ ] Add share functionality
- [ ] Add favorite/save functionality
- [ ] Make responsive
- [ ] Add loading state
- [ ] Add error handling

**Files to Create:**
- `src/modules/cars/pages/CarDetail.tsx`
- `src/modules/cars/components/CarImageGallery.tsx`
- `src/modules/cars/components/CarSpecs.tsx`
- `src/modules/cars/components/BookingWidget.tsx`

---

### Task 2.1.10: Build Host Dashboard - My Cars
**Priority**: 🔴 Critical  
**Estimated Time**: 2.5 hours  
**Dependencies**: Task 2.1.1

**TODO:**
- [ ] Create `src/modules/cars/pages/MyCars.tsx`
- [ ] Build car list view:
  - [ ] Car cards with image, name, status
  - [ ] Quick stats (trips, earnings, rating)
  - [ ] Actions (Edit, View, Delete)
- [ ] Add filters (Active, Pending, Inactive)
- [ ] Add "Add New Car" button
- [ ] Add empty state
- [ ] Add loading state
- [ ] Make responsive

**Files to Create:**
- `src/modules/cars/pages/MyCars.tsx`
- `src/modules/cars/components/CarCard.tsx` (host view)

---

### Task 2.1.11: Build Edit Car Functionality
**Priority**: 🟡 High  
**Estimated Time**: 2 hours  
**Dependencies**: Task 2.1.10

**TODO:**
- [ ] Create `src/modules/cars/pages/EditCar.tsx`
- [ ] Reuse AddCar form components
- [ ] Pre-populate form with existing data
- [ ] Handle image updates (add/remove/reorder)
- [ ] Handle status changes (if needed)
- [ ] Add confirmation for status changes
- [ ] Test edit flow

**Files to Create:**
- `src/modules/cars/pages/EditCar.tsx`

---

## 2.2 Image Upload Functionality

### Task 2.2.1: Create Image Upload Hook
**Priority**: 🔴 Critical  
**Estimated Time**: 2 hours  
**Dependencies**: Task 1.1.3

**TODO:**
- [ ] Create `src/shared/hooks/useImageUpload.ts`:
  - [ ] Upload to Supabase Storage
  - [ ] Progress tracking
  - [ ] Error handling
  - [ ] Image compression (before upload)
  - [ ] Multiple file support
  - [ ] Return uploaded URLs
- [ ] Add image validation (size, type)
- [ ] Add image optimization (resize if needed)
- [ ] Test with car images

**Files to Create:**
- `src/shared/hooks/useImageUpload.ts`
- `src/shared/utils/imageOptimization.ts`

---

### Task 2.2.2: Create Image Upload Component
**Priority**: 🔴 Critical  
**Estimated Time**: 2 hours  
**Dependencies**: Task 2.2.1

**TODO:**
- [ ] Create `src/shared/components/ui/ImageUpload.tsx`:
  - [ ] Drag & drop zone
  - [ ] File picker button
  - [ ] Image preview grid
  - [ ] Progress indicators
  - [ ] Delete button
  - [ ] Reorder functionality (drag)
  - [ ] Primary image selection
  - [ ] Max files limit
  - [ ] File size validation
- [ ] Make it reusable for different use cases
- [ ] Add accessibility (keyboard, screen reader)

**Files to Create:**
- `src/shared/components/ui/ImageUpload.tsx`

---

## 2.3 Google Maps Integration

### Task 2.3.1: Set Up Google Maps API
**Priority**: 🔴 Critical  
**Estimated Time**: 1 hour  
**Dependencies**: None

**TODO:**
- [ ] Get Google Maps API key (https://console.cloud.google.com)
- [ ] Enable APIs:
  - [ ] Maps JavaScript API
  - [ ] Places API
  - [ ] Geocoding API
- [ ] Set up API key restrictions (HTTP referrer)
- [ ] Add to `.env.local`: `VITE_GOOGLE_MAPS_API_KEY=xxx`
- [ ] Install `@react-google-maps/api` or use script tag
- [ ] Create Google Maps context/provider

**Files to Create:**
- `src/shared/lib/googleMaps.ts`
- `src/shared/contexts/GoogleMapsContext.tsx`

---

### Task 2.3.2: Create Location Autocomplete Component
**Priority**: 🔴 Critical  
**Estimated Time**: 2 hours  
**Dependencies**: Task 2.3.1

**TODO:**
- [ ] Create `src/shared/components/LocationAutocomplete.tsx`
- [ ] Integrate Google Places Autocomplete
- [ ] Add features:
  - [ ] Address input with autocomplete
  - [ ] Location suggestions dropdown
  - [ ] Extract lat/lng from selection
  - [ ] Extract address components (area, city, etc.)
  - [ ] Show selected location on map
- [ ] Add validation
- [ ] Make it reusable

**Files to Create:**
- `src/shared/components/LocationAutocomplete.tsx`

---

### Task 2.3.3: Create Map Component
**Priority**: 🟡 High  
**Estimated Time**: 2 hours  
**Dependencies**: Task 2.3.1

**TODO:**
- [ ] Create `src/shared/components/Map.tsx`
- [ ] Add features:
  - [ ] Display map with markers
  - [ ] Custom marker icons
  - [ ] Marker click events
  - [ ] Info windows
  - [ ] Center on location
  - [ ] Zoom controls
- [ ] Make it reusable
- [ ] Add loading state
- [ ] Add error handling

**Files to Create:**
- `src/shared/components/Map.tsx`

---

## 2.4 Search & Discovery

### Task 2.4.1: Create Search API Functions
**Priority**: 🔴 Critical  
**Estimated Time**: 2 hours  
**Dependencies**: Task 1.4.1

**TODO:**
- [ ] Create `src/shared/lib/api/search.ts`:
  - [ ] `searchCars(params)` - main search function
  - [ ] Location-based search (PostGIS)
  - [ ] Date availability filtering
  - [ ] Filter application (transmission, fuel, etc.)
  - [ ] Sorting (distance, price, rating)
  - [ ] Pagination
- [ ] Add search result caching (optional)
- [ ] Add error handling

**Files to Create:**
- `src/shared/lib/api/search.ts`

---

### Task 2.4.2: Create Search Page
**Priority**: 🔴 Critical  
**Estimated Time**: 3 hours  
**Dependencies**: Task 2.4.1, Task 2.3.2

**TODO:**
- [ ] Create `src/modules/cars/pages/Search.tsx`
- [ ] Build search form:
  - [ ] Location input (autocomplete)
  - [ ] Pickup date picker
  - [ ] Return date picker
  - [ ] Search button
- [ ] Add URL query params for search state
- [ ] Handle search submission
- [ ] Show loading state
- [ ] Show error state
- [ ] Make responsive

**Files to Create:**
- `src/modules/cars/pages/Search.tsx`
- `src/modules/cars/components/SearchForm.tsx`

---

### Task 2.4.3: Create Search Results Page
**Priority**: 🔴 Critical  
**Estimated Time**: 3 hours  
**Dependencies**: Task 2.4.2

**TODO:**
- [ ] Create `src/modules/cars/pages/SearchResults.tsx`
- [ ] Build layout:
  - [ ] Filters sidebar
  - [ ] Results grid/list
  - [ ] Map view toggle
- [ ] Create CarCard component (guest view)
- [ ] Add pagination
- [ ] Add sorting dropdown
- [ ] Add empty state
- [ ] Add loading skeletons
- [ ] Make responsive

**Files to Create:**
- `src/modules/cars/pages/SearchResults.tsx`
- `src/modules/cars/components/CarCard.tsx` (guest view)
- `src/modules/cars/components/SearchFilters.tsx`

---

### Task 2.4.4: Build Search Filters
**Priority**: 🟡 High  
**Estimated Time**: 2 hours  
**Dependencies**: Task 2.4.3

**TODO:**
- [ ] Create filter components:
  - [ ] Price range slider
  - [ ] Transmission filter (checkboxes)
  - [ ] Fuel type filter (checkboxes)
  - [ ] Seats filter (min/max)
  - [ ] Features filter (checkboxes)
  - [ ] Instant booking toggle
- [ ] Add filter state management
- [ ] Add "Clear filters" button
- [ ] Add active filter count badge
- [ ] Persist filters in URL
- [ ] Make filters collapsible (mobile)

**Files to Create:**
- `src/modules/cars/components/SearchFilters.tsx`
- `src/modules/cars/components/PriceFilter.tsx`
- `src/modules/cars/components/TransmissionFilter.tsx`
- (etc.)

---

### Task 2.4.5: Build Map View for Search
**Priority**: 🟡 Medium  
**Estimated Time**: 2.5 hours  
**Dependencies**: Task 2.4.3, Task 2.3.3

**TODO:**
- [ ] Add map view to SearchResults page
- [ ] Display car markers on map
- [ ] Add marker clustering (if many results)
- [ ] Add marker click → show car preview
- [ ] Add list/map toggle
- [ ] Sync map bounds with search area
- [ ] Make responsive

**Files to Modify:**
- `src/modules/cars/pages/SearchResults.tsx`

---

## 2.5 Car Availability Calendar

### Task 2.5.1: Create Availability API
**Priority**: 🔴 Critical  
**Estimated Time**: 1.5 hours  
**Dependencies**: Task 1.4.1

**TODO:**
- [ ] Create `src/shared/lib/api/availability.ts`:
  - [ ] `getCarAvailability(carId, startDate, endDate)`
  - [ ] `checkAvailability(carId, pickupDate, returnDate)`
  - [ ] `blockDates(carId, dates)`
  - [ ] `unblockDates(carId, dates)`
  - [ ] `setCustomPricing(carId, date, price)`
- [ ] Add booking conflict checking
- [ ] Add error handling

**Files to Create:**
- `src/shared/lib/api/availability.ts`

---

### Task 2.5.2: Build Availability Calendar Component
**Priority**: 🔴 Critical  
**Estimated Time**: 3 hours  
**Dependencies**: Task 2.5.1

**TODO:**
- [ ] Create `src/modules/cars/components/AvailabilityCalendar.tsx`
- [ ] Use `react-day-picker` library
- [ ] Add features:
  - [ ] Show available/blocked dates
  - [ ] Show booked dates
  - [ ] Date range selection
  - [ ] Minimum booking duration check
  - [ ] Disable past dates
  - [ ] Show custom pricing (if any)
- [ ] Add styling (available = green, blocked = red)
- [ ] Make responsive
- [ ] Add loading state

**Files to Create:**
- `src/modules/cars/components/AvailabilityCalendar.tsx`

---

### Task 2.5.3: Build Host Availability Management
**Priority**: 🟡 High  
**Estimated Time**: 2 hours  
**Dependencies**: Task 2.5.2

**TODO:**
- [ ] Create `src/modules/cars/pages/ManageAvailability.tsx`
- [ ] Add calendar view for host
- [ ] Add "Block Dates" functionality
- [ ] Add "Unblock Dates" functionality
- [ ] Add custom pricing per date
- [ ] Show existing bookings on calendar
- [ ] Add bulk operations (block week, month)

**Files to Create:**
- `src/modules/cars/pages/ManageAvailability.tsx`

---

# PHASE 3: TRANSACTIONS (Week 6-7)

## 3.1 Booking System

### Task 3.1.1: Create Booking API
**Priority**: 🔴 Critical  
**Estimated Time**: 2 hours  
**Dependencies**: Task 1.4.1

**TODO:**
- [ ] Create `src/shared/lib/api/bookings.ts`:
  - [ ] `createBookingRequest(data)` - create pending booking
  - [ ] `getBooking(id)` - get single booking
  - [ ] `getBookings(filters)` - list bookings
  - [ ] `acceptBooking(id)` - host accepts
  - [ ] `declineBooking(id, reason)` - host declines
  - [ ] `cancelBooking(id, reason, by)` - cancel booking
  - [ ] `updateBookingStatus(id, status)` - status update
- [ ] Add booking conflict checking
- [ ] Add validation (dates, availability)
- [ ] Add error handling

**Files to Create:**
- `src/shared/lib/api/bookings.ts` (complete implementation)

---

### Task 3.1.2: Build Booking Request Flow
**Priority**: 🔴 Critical  
**Estimated Time**: 3 hours  
**Dependencies**: Task 3.1.1, Task 2.5.2

**TODO:**
- [ ] Create `src/modules/bookings/pages/BookingRequest.tsx`
- [ ] Build booking form:
  - [ ] Car details display
  - [ ] Date/time selection (availability calendar)
  - [ ] Pickup location confirmation
  - [ ] Guest notes (optional)
- [ ] Add price breakdown:
  - [ ] Base amount
  - [ ] Service fee (20%)
  - [ ] Security deposit
  - [ ] Total
- [ ] Add terms acceptance checkbox
- [ ] Add form validation
- [ ] Handle submission:
  - [ ] Create booking (status: pending)
  - [ ] Notify host
  - [ ] Show confirmation
  - [ ] Redirect to booking detail

**Files to Create:**
- `src/modules/bookings/pages/BookingRequest.tsx`
- `src/modules/bookings/components/BookingForm.tsx`
- `src/modules/bookings/components/PriceBreakdown.tsx`

---

### Task 3.1.3: Build Booking Detail Page
**Priority**: 🔴 Critical  
**Estimated Time**: 2.5 hours  
**Dependencies**: Task 3.1.1

**TODO:**
- [ ] Create `src/modules/bookings/pages/BookingDetail.tsx`
- [ ] Build layout:
  - [ ] Booking status badge
  - [ ] Car details
  - [ ] Dates & times
  - [ ] Pickup location
  - [ ] Price breakdown
  - [ ] Payment status
  - [ ] Actions (based on status):
    - [ ] Guest: Cancel, Pay
    - [ ] Host: Accept, Decline
- [ ] Add real-time updates (Supabase Realtime)
- [ ] Add loading state
- [ ] Add error handling
- [ ] Make responsive

**Files to Create:**
- `src/modules/bookings/pages/BookingDetail.tsx`
- `src/modules/bookings/components/BookingStatusBadge.tsx`
- `src/modules/bookings/components/BookingActions.tsx`

---

### Task 3.1.4: Build Host Booking Management
**Priority**: 🔴 Critical  
**Estimated Time**: 2 hours  
**Dependencies**: Task 3.1.3

**TODO:**
- [ ] Create `src/modules/bookings/pages/HostBookings.tsx`
- [ ] Build booking list:
  - [ ] Filter by status (Pending, Confirmed, Active, etc.)
  - [ ] Booking cards with key info
  - [ ] Quick actions (Accept/Decline)
- [ ] Add booking detail modal/expand
- [ ] Add empty state
- [ ] Add loading state
- [ ] Make responsive

**Files to Create:**
- `src/modules/bookings/pages/HostBookings.tsx`
- `src/modules/bookings/components/HostBookingCard.tsx`

---

### Task 3.1.5: Build Booking Cancellation Flow
**Priority**: 🟡 High  
**Estimated Time**: 2 hours  
**Dependencies**: Task 3.1.3

**TODO:**
- [ ] Create cancellation modal/component
- [ ] Add cancellation reason input
- [ ] Add refund calculation:
  - [ ] Guest cancels >24h: Full refund
  - [ ] Guest cancels <24h: 50% refund
  - [ ] Host cancels: Full refund + ₹500 credit
- [ ] Add confirmation step
- [ ] Handle cancellation:
  - [ ] Update booking status
  - [ ] Process refund (if needed)
  - [ ] Notify both parties
  - [ ] Free up calendar dates
- [ ] Add cancellation history

**Files to Create:**
- `src/modules/bookings/components/CancelBookingModal.tsx`
- `src/shared/utils/refundCalculation.ts`

---

## 3.2 Payment Integration (Razorpay)

### Task 3.2.1: Set Up Razorpay
**Priority**: 🔴 Critical  
**Estimated Time**: 1.5 hours  
**Dependencies**: None

**TODO:**
- [ ] Create Razorpay account (https://razorpay.com)
- [ ] Get API keys (test mode):
  - [ ] Key ID
  - [ ] Key Secret
- [ ] Add to `.env.local`:
  ```env
  VITE_RAZORPAY_KEY_ID=rzp_test_xxx
  RAZORPAY_KEY_SECRET=xxx
  ```
- [ ] Install Razorpay SDK: `npm install razorpay`
- [ ] Create Razorpay client utility

**Files to Create:**
- `src/shared/lib/razorpay.ts`
- `.env.example` (update)

---

### Task 3.2.2: Create Payment Service (Backend)
**Priority**: 🔴 Critical  
**Estimated Time**: 3 hours  
**Dependencies**: Task 3.2.1, Task 1.1.2

**TODO:**
- [ ] Create Supabase Edge Function: `create-payment-order`
  - [ ] Location: `supabase/functions/create-payment-order/index.ts`
  - [ ] Create Razorpay order
  - [ ] Store order in database
  - [ ] Return order details to client
- [ ] Create Edge Function: `verify-payment`
  - [ ] Verify Razorpay signature
  - [ ] Update booking payment status
  - [ ] Create payment record
  - [ ] Notify users
- [ ] Deploy Edge Functions
- [ ] Test with Razorpay test mode

**Files to Create:**
- `supabase/functions/create-payment-order/index.ts`
- `supabase/functions/verify-payment/index.ts`
- `supabase/functions/_shared/razorpay.ts` (shared utilities)

---

### Task 3.2.3: Build Payment Checkout Flow
**Priority**: 🔴 Critical  
**Estimated Time**: 3 hours  
**Dependencies**: Task 3.2.2

**TODO:**
- [ ] Create `src/modules/payments/pages/Checkout.tsx`
- [ ] Build checkout page:
  - [ ] Booking summary
  - [ ] Price breakdown
  - [ ] Payment method selection (UPI, Card, NetBanking)
  - [ ] Razorpay checkout integration
- [ ] Handle payment flow:
  - [ ] Call Edge Function to create order
  - [ ] Open Razorpay checkout
  - [ ] Handle success callback
  - [ ] Verify payment (Edge Function)
  - [ ] Update booking status
  - [ ] Redirect to confirmation
- [ ] Handle payment failure
- [ ] Add retry functionality
- [ ] Add loading states

**Files to Create:**
- `src/modules/payments/pages/Checkout.tsx`
- `src/modules/payments/components/PaymentMethodSelector.tsx`
- `src/modules/payments/hooks/useRazorpay.ts`

---

### Task 3.2.4: Build Payment Webhook Handler
**Priority**: 🔴 Critical  
**Estimated Time**: 2 hours  
**Dependencies**: Task 3.2.2

**TODO:**
- [ ] Create Edge Function: `razorpay-webhook`
  - [ ] Verify webhook signature
  - [ ] Handle events:
    - [ ] `payment.captured` - update booking
    - [ ] `payment.failed` - notify user
    - [ ] `refund.processed` - update refund status
  - [ ] Idempotency handling
- [ ] Configure webhook URL in Razorpay dashboard
- [ ] Test webhook with Razorpay test events
- [ ] Add logging for webhook events

**Files to Create:**
- `supabase/functions/razorpay-webhook/index.ts`

---

### Task 3.2.5: Build Refund Processing
**Priority**: 🟡 High  
**Estimated Time**: 2.5 hours  
**Dependencies**: Task 3.2.4

**TODO:**
- [ ] Create Edge Function: `process-refund`
  - [ ] Calculate refund amount
  - [ ] Create Razorpay refund
  - [ ] Update booking payment status
  - [ ] Create refund record
  - [ ] Notify user
- [ ] Create refund UI:
  - [ ] Refund status display
  - [ ] Refund history
- [ ] Handle partial refunds
- [ ] Handle refund failures
- [ ] Add refund tracking

**Files to Create:**
- `supabase/functions/process-refund/index.ts`
- `src/modules/payments/components/RefundStatus.tsx`

---

### Task 3.2.6: Build Host Payout System
**Priority**: 🟡 High  
**Estimated Time**: 4 hours  
**Dependencies**: Task 3.2.1

**TODO:**
- [ ] Set up Razorpay Route (marketplace product)
- [ ] Create Edge Function: `create-host-payout`
  - [ ] Calculate host share (80% of booking)
  - [ ] Create payout record
  - [ ] Transfer to host bank account (Razorpay Route)
- [ ] Create scheduled payout job (weekly, Wednesday):
  - [ ] Edge Function: `scheduled-payouts`
  - [ ] Find completed bookings (7+ days old)
  - [ ] Batch process payouts
  - [ ] Update payout status
- [ ] Build host payout dashboard:
  - [ ] Earnings overview
  - [ ] Payout history
  - [ ] Pending payouts
  - [ ] Bank account linking
- [ ] Add payout notifications

**Files to Create:**
- `supabase/functions/create-host-payout/index.ts`
- `supabase/functions/scheduled-payouts/index.ts`
- `src/modules/payments/pages/HostPayouts.tsx`
- `src/modules/payments/components/PayoutHistory.tsx`

---

## 3.3 User Dashboards

### Task 3.3.1: Build Guest Dashboard
**Priority**: 🔴 Critical  
**Estimated Time**: 3 hours  
**Dependencies**: Task 3.1.1

**TODO:**
- [ ] Create `src/modules/users/pages/GuestDashboard.tsx`
- [ ] Build dashboard layout:
  - [ ] Upcoming bookings section
  - [ ] Past trips section
  - [ ] Quick stats (total trips, total spent)
- [ ] Add booking cards:
  - [ ] Car image, name
  - [ ] Dates
  - [ ] Status badge
  - [ ] Quick actions (View, Cancel)
- [ ] Add filters (Upcoming, Past, Cancelled)
- [ ] Add empty states
- [ ] Add loading states
- [ ] Make responsive

**Files to Create:**
- `src/modules/users/pages/GuestDashboard.tsx`
- `src/modules/users/components/GuestBookingCard.tsx`

---

### Task 3.3.2: Build Host Dashboard
**Priority**: 🔴 Critical  
**Estimated Time**: 3.5 hours  
**Dependencies**: Task 2.1.10, Task 3.1.4, Task 3.2.6

**TODO:**
- [ ] Create `src/modules/users/pages/HostDashboard.tsx`
- [ ] Build dashboard layout:
  - [ ] Earnings overview (total, pending, paid)
  - [ ] Pending booking requests
  - [ ] Active bookings
  - [ ] Car performance stats
  - [ ] Quick actions
- [ ] Add booking request cards:
  - [ ] Guest info
  - [ ] Car, dates
  - [ ] Accept/Decline buttons
- [ ] Add earnings chart (optional)
- [ ] Add filters
- [ ] Add empty states
- [ ] Add loading states
- [ ] Make responsive

**Files to Create:**
- `src/modules/users/pages/HostDashboard.tsx`
- `src/modules/users/components/HostStats.tsx`
- `src/modules/users/components/BookingRequestCard.tsx`

---

### Task 3.3.3: Build User Profile Page
**Priority**: 🟡 High  
**Estimated Time**: 2.5 hours  
**Dependencies**: Task 1.4.2

**TODO:**
- [ ] Create `src/modules/users/pages/Profile.tsx`
- [ ] Build profile display:
  - [ ] Avatar
  - [ ] Name, email, phone
  - [ ] Stats (trips, ratings)
  - [ ] Reviews received
- [ ] Add edit profile button
- [ ] Add role switcher (Guest/Host/Both)
- [ ] Add verification badges (KYC)
- [ ] Make responsive

**Files to Create:**
- `src/modules/users/pages/Profile.tsx`
- `src/modules/users/components/ProfileHeader.tsx`
- `src/modules/users/components/ProfileStats.tsx`

---

### Task 3.3.4: Build Profile Edit Form
**Priority**: 🟡 High  
**Estimated Time**: 2 hours  
**Dependencies**: Task 3.3.3, Task 1.5.1

**TODO:**
- [ ] Create `src/modules/users/pages/EditProfile.tsx`
- [ ] Build edit form:
  - [ ] Full name
  - [ ] Email
  - [ ] Date of birth
  - [ ] Address fields
  - [ ] Avatar upload
- [ ] Add form validation (Zod)
- [ ] Handle form submission
- [ ] Show success message
- [ ] Redirect to profile

**Files to Create:**
- `src/modules/users/pages/EditProfile.tsx`
- `src/modules/users/components/ProfileForm.tsx`

---

# PHASE 4: POLISH & LAUNCH (Week 8)

## 4.1 Admin Panel

### Task 4.1.1: Create Admin Authentication
**Priority**: 🔴 Critical  
**Estimated Time**: 1 hour  
**Dependencies**: Task 1.4.3 (useAuth)

**TODO:**
- [ ] Add admin role check to `useAuth()` hook
- [ ] Create admin route protection
- [ ] Create `AdminRoute` component
- [ ] Add admin check to all admin pages
- [ ] Redirect non-admins

**Files to Create:**
- `src/shared/components/AdminRoute.tsx`

---

### Task 4.1.2: Build Admin Dashboard
**Priority**: 🔴 Critical  
**Estimated Time**: 3 hours  
**Dependencies**: Task 4.1.1

**TODO:**
- [ ] Create `src/modules/admin/pages/Dashboard.tsx`
- [ ] Build dashboard:
  - [ ] Key metrics (users, cars, bookings, revenue)
  - [ ] Recent activity
  - [ ] Quick actions
  - [ ] Charts (optional)
- [ ] Add real-time updates
- [ ] Make responsive

**Files to Create:**
- `src/modules/admin/pages/Dashboard.tsx`
- `src/modules/admin/components/MetricsCard.tsx`

---

### Task 4.1.3: Build User Management
**Priority**: 🟡 High  
**Estimated Time**: 2.5 hours  
**Dependencies**: Task 4.1.2

**TODO:**
- [ ] Create `src/modules/admin/pages/Users.tsx`
- [ ] Build user list:
  - [ ] Search/filter users
  - [ ] User cards with key info
  - [ ] Actions (View, Suspend, Verify)
- [ ] Create user detail page:
  - [ ] Full profile
  - [ ] Bookings history
  - [ ] KYC documents
  - [ ] Admin actions
- [ ] Add bulk actions

**Files to Create:**
- `src/modules/admin/pages/Users.tsx`
- `src/modules/admin/pages/UserDetail.tsx`
- `src/modules/admin/components/UserCard.tsx`

---

### Task 4.1.4: Build Car Approval Queue
**Priority**: 🔴 Critical  
**Estimated Time**: 2 hours  
**Dependencies**: Task 4.1.2

**TODO:**
- [ ] Create `src/modules/admin/pages/CarApprovals.tsx`
- [ ] Build approval queue:
  - [ ] List pending cars
  - [ ] Car preview
  - [ ] Approve/Reject buttons
  - [ ] Rejection reason input
- [ ] Add bulk approval
- [ ] Add filters

**Files to Create:**
- `src/modules/admin/pages/CarApprovals.tsx`
- `src/modules/admin/components/CarApprovalCard.tsx`

---

### Task 4.1.5: Build Booking Management
**Priority**: 🟡 High  
**Estimated Time**: 2 hours  
**Dependencies**: Task 4.1.2

**TODO:**
- [ ] Create `src/modules/admin/pages/Bookings.tsx`
- [ ] Build booking list:
  - [ ] Search/filter bookings
  - [ ] Booking cards
  - [ ] Status filters
- [ ] Add admin actions:
  - [ ] View details
  - [ ] Cancel booking
  - [ ] Process refund
  - [ ] Resolve disputes

**Files to Create:**
- `src/modules/admin/pages/Bookings.tsx`
- `src/modules/admin/components/AdminBookingCard.tsx`

---

## 4.2 Notifications

### Task 4.2.1: Set Up Email Service
**Priority**: 🔴 Critical  
**Estimated Time**: 2 hours  
**Dependencies**: None

**TODO:**
- [ ] Sign up for Resend (https://resend.com) or SendGrid
- [ ] Get API key
- [ ] Add to `.env.local`: `RESEND_API_KEY=xxx`
- [ ] Create Edge Function: `send-email`
- [ ] Create email templates:
  - [ ] Booking confirmation
  - [ ] Booking request
  - [ ] Booking cancellation
  - [ ] Payment receipt
  - [ ] Trip reminder
- [ ] Test email sending

**Files to Create:**
- `supabase/functions/send-email/index.ts`
- `supabase/functions/_shared/email-templates.ts`

---

### Task 4.2.2: Set Up SMS Service
**Priority**: 🟡 High  
**Estimated Time**: 2 hours  
**Dependencies**: None

**TODO:**
- [ ] Sign up for MSG91 (https://msg91.com) or Twilio
- [ ] Get API key/auth token
- [ ] Add to `.env.local`: `MSG91_AUTH_KEY=xxx`
- [ ] Create Edge Function: `send-sms`
- [ ] Create SMS templates:
  - [ ] OTP (already handled by Supabase)
  - [ ] Booking confirmation
  - [ ] Trip reminder
  - [ ] Payment success
- [ ] Test SMS sending

**Files to Create:**
- `supabase/functions/send-sms/index.ts`
- `supabase/functions/_shared/sms-templates.ts`

---

### Task 4.2.3: Create Notification System
**Priority**: 🟡 High  
**Estimated Time**: 3 hours  
**Dependencies**: Task 4.2.1, Task 4.2.2

**TODO:**
- [ ] Create notification service:
  - [ ] `createNotification()` - store in DB
  - [ ] `sendEmail()` - call email function
  - [ ] `sendSMS()` - call SMS function
  - [ ] `sendPush()` - push notification (later)
- [ ] Create notification triggers:
  - [ ] On booking created → notify host
  - [ ] On booking accepted → notify guest
  - [ ] On payment success → notify both
  - [ ] On booking cancelled → notify both
- [ ] Create notification center UI:
  - [ ] Notification list
  - [ ] Mark as read
  - [ ] Notification preferences

**Files to Create:**
- `src/shared/lib/api/notifications.ts`
- `src/modules/notifications/pages/NotificationCenter.tsx`
- `src/modules/notifications/components/NotificationList.tsx`

---

## 4.3 Reviews System

### Task 4.3.1: Create Review API
**Priority**: 🟡 High  
**Estimated Time**: 1.5 hours  
**Dependencies**: Task 1.4.1

**TODO:**
- [ ] Create `src/shared/lib/api/reviews.ts`:
  - [ ] `createReview(data)` - submit review
  - [ ] `getReviews(filters)` - list reviews
  - [ ] `getCarReviews(carId)` - car reviews
  - [ ] `getUserReviews(userId)` - user reviews
- [ ] Add validation (only after trip completion)
- [ ] Add review window check (14 days)

**Files to Create:**
- `src/shared/lib/api/reviews.ts` (complete implementation)

---

### Task 4.3.2: Build Review Submission Form
**Priority**: 🟡 High  
**Estimated Time**: 2.5 hours  
**Dependencies**: Task 4.3.1

**TODO:**
- [ ] Create `src/modules/reviews/pages/SubmitReview.tsx`
- [ ] Build review form:
  - [ ] Star rating (1-5)
  - [ ] Comment textarea
  - [ ] Additional ratings (cleanliness, communication, etc.)
  - [ ] For car reviews: car-specific ratings
- [ ] Add form validation
- [ ] Handle submission
- [ ] Show success message
- [ ] Redirect to booking

**Files to Create:**
- `src/modules/reviews/pages/SubmitReview.tsx`
- `src/modules/reviews/components/ReviewForm.tsx`
- `src/modules/reviews/components/StarRating.tsx`

---

### Task 4.3.3: Build Review Display
**Priority**: 🟡 High  
**Estimated Time**: 2 hours  
**Dependencies**: Task 4.3.1

**TODO:**
- [ ] Create `src/modules/reviews/components/ReviewCard.tsx`
- [ ] Create `src/modules/reviews/components/ReviewList.tsx`
- [ ] Add to:
  - [ ] Car detail page
  - [ ] User profile page
- [ ] Add pagination
- [ ] Add filters (rating, date)
- [ ] Make responsive

**Files to Create:**
- `src/modules/reviews/components/ReviewCard.tsx`
- `src/modules/reviews/components/ReviewList.tsx`

---

## 4.4 Testing

### Task 4.4.1: Set Up Testing Infrastructure
**Priority**: 🟡 High  
**Estimated Time**: 2 hours  
**Dependencies**: None

**TODO:**
- [ ] Configure Vitest (already in package.json)
- [ ] Create `vitest.config.ts`
- [ ] Set up test utilities:
  - [ ] Test helpers
  - [ ] Mock Supabase client
  - [ ] Mock React Query
- [ ] Create test folder structure
- [ ] Add test scripts to package.json

**Files to Create:**
- `vitest.config.ts`
- `src/test/setup.ts`
- `src/test/utils.ts`
- `src/test/mocks/`

---

### Task 4.4.2: Write Unit Tests
**Priority**: 🟡 High  
**Estimated Time**: 4 hours  
**Dependencies**: Task 4.4.1

**TODO:**
- [ ] Test utility functions:
  - [ ] `formatCurrency()`
  - [ ] `formatPhoneNumber()`
  - [ ] `validatePhoneNumber()`
- [ ] Test API functions:
  - [ ] Car API
  - [ ] Booking API
  - [ ] User API
- [ ] Test hooks:
  - [ ] `useAuth()`
  - [ ] `useImageUpload()`
- [ ] Aim for >50% coverage

**Files to Create:**
- `src/shared/utils/__tests__/index.test.ts`
- `src/shared/lib/api/__tests__/cars.test.ts`
- `src/shared/hooks/__tests__/useAuth.test.ts`
- (etc.)

---

### Task 4.4.3: Write Integration Tests
**Priority**: 🟡 Medium  
**Estimated Time**: 3 hours  
**Dependencies**: Task 4.4.1

**TODO:**
- [ ] Test critical flows:
  - [ ] Auth flow (login → OTP → dashboard)
  - [ ] Car creation flow
  - [ ] Booking flow
  - [ ] Payment flow
- [ ] Use test database
- [ ] Clean up after tests

**Files to Create:**
- `src/test/integration/auth.test.ts`
- `src/test/integration/booking.test.ts`
- (etc.)

---

## 4.5 Production Deployment

### Task 4.5.1: Set Up Vercel Deployment
**Priority**: 🔴 Critical  
**Estimated Time**: 1.5 hours  
**Dependencies**: None

**TODO:**
- [ ] Create Vercel account
- [ ] Connect GitHub repository
- [ ] Configure build settings:
  - [ ] Framework: Vite
  - [ ] Build command: `npm run build`
  - [ ] Output directory: `dist`
- [ ] Add environment variables
- [ ] Deploy preview
- [ ] Test preview deployment

---

### Task 4.5.2: Configure Production Environment
**Priority**: 🔴 Critical  
**Estimated Time**: 2 hours  
**Dependencies**: Task 4.5.1

**TODO:**
- [ ] Set up production Supabase project
- [ ] Run database migrations on production
- [ ] Configure production storage buckets
- [ ] Set up production Razorpay account
- [ ] Configure production Google Maps API
- [ ] Update environment variables in Vercel
- [ ] Test production deployment

---

### Task 4.5.3: Set Up Domain & SSL
**Priority**: 🔴 Critical  
**Estimated Time**: 1 hour  
**Dependencies**: Task 4.5.1

**TODO:**
- [ ] Purchase domain: godrive.in
- [ ] Configure DNS:
  - [ ] Add A record (or CNAME) to Vercel
  - [ ] Add CAA records for SSL
- [ ] SSL certificate (automatic with Vercel)
- [ ] Test domain access
- [ ] Update app URLs in config

---

### Task 4.5.4: Set Up Monitoring & Error Tracking
**Priority**: 🔴 Critical  
**Estimated Time**: 2 hours  
**Dependencies**: Task 4.5.2

**TODO:**
- [ ] Sign up for Sentry (https://sentry.io)
- [ ] Install Sentry SDK: `npm install @sentry/react`
- [ ] Configure Sentry:
  - [ ] Add DSN to env vars
  - [ ] Initialize in `main.tsx`
  - [ ] Set up error boundaries
  - [ ] Configure release tracking
- [ ] Set up Vercel Analytics
- [ ] Set up uptime monitoring (Better Uptime or similar)
- [ ] Configure alerts

**Files to Create/Modify:**
- `src/shared/lib/sentry.ts`
- `main.tsx` (add Sentry init)

---

### Task 4.5.5: Performance Optimization
**Priority**: 🟡 High  
**Estimated Time**: 3 hours  
**Dependencies**: Task 4.5.2

**TODO:**
- [ ] Image optimization:
  - [ ] Use WebP format
  - [ ] Lazy load images
  - [ ] Add image CDN (Supabase Storage CDN)
- [ ] Code splitting:
  - [ ] Verify Vite config
  - [ ] Route-based code splitting
  - [ ] Lazy load routes
- [ ] Bundle analysis:
  - [ ] Run `npm run build -- --analyze`
  - [ ] Remove unused dependencies
  - [ ] Optimize imports
- [ ] Lighthouse audit:
  - [ ] Run audit
  - [ ] Fix issues
  - [ ] Aim for >90 score

**Files to Modify:**
- `vite.config.ts` (optimize build)
- `src/App.tsx` (lazy load routes)

---

### Task 4.5.6: Security Audit
**Priority**: 🔴 Critical  
**Estimated Time**: 2 hours  
**Dependencies**: Task 4.5.2

**TODO:**
- [ ] Review RLS policies
- [ ] Test authorization (users can't access others' data)
- [ ] Review input validation
- [ ] Check for SQL injection risks (none with Supabase)
- [ ] Review XSS prevention (React escapes by default)
- [ ] Review CSRF protection
- [ ] Review environment variable security
- [ ] Run security scan (npm audit)
- [ ] Fix vulnerabilities

---

## 4.6 Documentation & Launch

### Task 4.6.1: Update Documentation
**Priority**: 🟡 Medium  
**Estimated Time**: 2 hours  
**Dependencies**: None

**TODO:**
- [ ] Update README.md with:
  - [ ] Production deployment steps
  - [ ] Environment variables
  - [ ] Troubleshooting
- [ ] Update CLAUDE.md with:
  - [ ] Completed features
  - [ ] Known issues
  - [ ] Post-launch priorities
- [ ] Create API documentation
- [ ] Create user guides (optional)

---

### Task 4.6.2: Pre-Launch Checklist
**Priority**: 🔴 Critical  
**Estimated Time**: 2 hours  
**Dependencies**: All previous tasks

**TODO:**
- [ ] Test all critical flows:
  - [ ] User registration
  - [ ] Car listing
  - [ ] Search & booking
  - [ ] Payment
  - [ ] Host payout
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Verify all integrations work
- [ ] Check error handling
- [ ] Verify monitoring is working
- [ ] Prepare rollback plan
- [ ] Notify team of launch

---

### Task 4.6.3: Launch
**Priority**: 🔴 Critical  
**Estimated Time**: 1 day  
**Dependencies**: Task 4.6.2

**TODO:**
- [ ] Final production deployment
- [ ] Switch Razorpay to live mode
- [ ] Monitor for issues
- [ ] Onboard first hosts (manual)
- [ ] Test with real transactions
- [ ] Launch announcement
- [ ] Monitor metrics

---

# SUMMARY

## Total Estimated Time

**Phase 1 (Foundation)**: ~40-50 hours  
**Phase 2 (Core Features)**: ~60-70 hours  
**Phase 3 (Transactions)**: ~50-60 hours  
**Phase 4 (Polish & Launch)**: ~40-50 hours

**Total**: ~190-230 hours

**Timeline** (solo, 4-6h/day): **8-10 weeks**  
**Timeline** (full-time, 8h/day): **5-6 weeks**

---

## Priority Order

1. **Week 1-2**: Foundation (Database, Components, Infrastructure)
2. **Week 3-4**: Core Features (Listings, Search)
3. **Week 5**: Bookings & Availability
4. **Week 6**: Payments
5. **Week 7**: Dashboards & Admin
6. **Week 8**: Testing, Deployment, Launch

---

## Dependencies Map

```
Database → Components → API Layer → Features
    ↓
Storage → Image Upload → Car Listings
    ↓
Google Maps → Search → Bookings
    ↓
Razorpay → Payments → Dashboards
    ↓
Email/SMS → Notifications → Complete System
    ↓
Testing → Deployment → Launch
```

---

*This plan is comprehensive and should be followed sequentially. Adjust timelines based on actual progress and priorities.*
