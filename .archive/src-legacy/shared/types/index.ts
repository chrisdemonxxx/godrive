// GoDrive Core Type Definitions
// src/shared/types/index.ts

// ============================================
// ENUMS
// ============================================

export type UserRole = 'guest' | 'host' | 'both' | 'admin';
export type KycStatus = 'pending' | 'submitted' | 'verified' | 'rejected';
export type DocumentType = 'driving_license' | 'aadhaar' | 'pan' | 'rc';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export type CarStatus = 'draft' | 'pending_approval' | 'active' | 'inactive' | 'suspended';
export type TransmissionType = 'manual' | 'automatic';
export type FuelType = 'petrol' | 'diesel' | 'cng' | 'electric' | 'hybrid';

export type BookingStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled' | 'disputed';
export type PaymentStatus = 'pending' | 'deposit_paid' | 'fully_paid' | 'refund_pending' | 'refunded' | 'failed';
export type CancellationBy = 'guest' | 'host' | 'admin' | 'system';

export type PaymentType = 'booking_payment' | 'security_deposit' | 'refund' | 'host_payout' | 'penalty';
export type TransactionStatus = 'pending' | 'processing' | 'captured' | 'refunded' | 'failed';

export type ReviewType = 'guest_to_host' | 'host_to_guest';
export type PayoutStatus = 'pending' | 'processing' | 'completed' | 'failed';

// ============================================
// USER TYPES
// ============================================

export interface User {
  id: string;
  phone: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  role: UserRole;
  kyc_status: KycStatus;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  date_of_birth?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  total_trips_as_guest: number;
  total_trips_as_host: number;
  average_rating_as_guest: number;
  average_rating_as_host: number;
  razorpay_contact_id?: string;
  razorpay_fund_account_id?: string;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
}

export interface UserDocument {
  id: string;
  user_id: string;
  document_type: DocumentType;
  document_number?: string;
  front_image_url: string;
  back_image_url?: string;
  expiry_date?: string;
  verification_status: VerificationStatus;
  rejection_reason?: string;
  verified_at?: string;
  verified_by?: string;
  created_at: string;
  updated_at: string;
}

// ============================================
// CAR TYPES
// ============================================

export interface Car {
  id: string;
  host_id: string;
  make: string;
  model: string;
  year: number;
  variant?: string;
  transmission: TransmissionType;
  fuel_type: FuelType;
  seats: number;
  color?: string;
  registration_number: string;
  status: CarStatus;
  rejection_reason?: string;
  approved_at?: string;
  approved_by?: string;
  location_address: string;
  location_area: string;
  location_city: string;
  location_lat?: number;
  location_lng?: number;
  hourly_rate?: number;
  daily_rate: number;
  weekly_rate?: number;
  monthly_rate?: number;
  security_deposit: number;
  unlimited_km: boolean;
  km_limit_per_day?: number;
  extra_km_charge?: number;
  features: string[];
  guidelines?: string;
  pickup_instructions?: string;
  instant_booking: boolean;
  min_booking_hours: number;
  max_booking_days: number;
  advance_notice_hours: number;
  total_trips: number;
  total_earnings: number;
  average_rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
  // Relations
  host?: User;
  images?: CarImage[];
}

export interface CarImage {
  id: string;
  car_id: string;
  image_url: string;
  thumbnail_url?: string;
  is_primary: boolean;
  display_order: number;
  created_at: string;
}

export interface CarAvailability {
  id: string;
  car_id: string;
  date: string;
  is_available: boolean;
  custom_daily_rate?: number;
  reason?: 'blocked_by_host' | 'booked' | 'maintenance';
  created_at: string;
}

// ============================================
// BOOKING TYPES
// ============================================

export interface Booking {
  id: string;
  booking_number: string;
  car_id: string;
  guest_id: string;
  host_id: string;
  status: BookingStatus;
  payment_status: PaymentStatus;
  pickup_datetime: string;
  return_datetime: string;
  actual_pickup_datetime?: string;
  actual_return_datetime?: string;
  pickup_location: string;
  pickup_lat?: number;
  pickup_lng?: number;
  return_location?: string;
  duration_hours: number;
  base_amount: number;
  service_fee: number;
  security_deposit: number;
  extra_km_charges: number;
  late_return_charges: number;
  damage_charges: number;
  discount_amount: number;
  total_amount: number;
  host_payout: number;
  cancelled_at?: string;
  cancelled_by?: CancellationBy;
  cancellation_reason?: string;
  refund_amount: number;
  odometer_start?: number;
  odometer_end?: number;
  fuel_level_start?: string;
  fuel_level_end?: string;
  guest_notes?: string;
  host_notes?: string;
  admin_notes?: string;
  upi_transaction_id?: string;
  payment_submitted_at?: string;
  created_at: string;
  updated_at: string;
  // Relations
  car?: Car;
  guest?: User;
  host?: User;
  payments?: BookingPayment[];
  reviews?: Review[];
}

export interface BookingPayment {
  id: string;
  booking_id: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  razorpay_transfer_id?: string;
  amount: number;
  currency: string;
  type: PaymentType;
  status: TransactionStatus;
  payment_method?: string;
  payment_method_details?: Record<string, unknown>;
  failure_reason?: string;
  failure_code?: string;
  processed_at?: string;
  created_at: string;
}

// ============================================
// REVIEW TYPES
// ============================================

export interface Review {
  id: string;
  booking_id: string;
  reviewer_id: string;
  reviewee_id: string;
  car_id?: string;
  type: ReviewType;
  rating: number;
  comment?: string;
  cleanliness_rating?: number;
  communication_rating?: number;
  accuracy_rating?: number;
  value_rating?: number;
  is_public: boolean;
  is_flagged: boolean;
  flagged_reason?: string;
  created_at: string;
  // Relations
  reviewer?: User;
  reviewee?: User;
  car?: Car;
}

// ============================================
// PAYOUT TYPES
// ============================================

export interface HostPayout {
  id: string;
  host_id: string;
  amount: number;
  currency: string;
  booking_ids: string[];
  razorpay_payout_id?: string;
  razorpay_fund_account_id?: string;
  status: PayoutStatus;
  failure_reason?: string;
  bank_account_number?: string;
  bank_ifsc?: string;
  bank_name?: string;
  scheduled_for?: string;
  processed_at?: string;
  created_at: string;
}

// ============================================
// MESSAGE TYPES
// ============================================

export interface Message {
  id: string;
  booking_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  read_at?: string;
  created_at: string;
}

// ============================================
// NOTIFICATION TYPES
// ============================================

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  body: string;
  type?: string;
  data?: Record<string, unknown>;
  is_read: boolean;
  read_at?: string;
  created_at: string;
}

// ============================================
// API TYPES
// ============================================

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ============================================
// SEARCH TYPES
// ============================================

export interface CarSearchParams {
  location?: string;
  lat?: number;
  lng?: number;
  radius?: number; // in meters
  pickup_date?: string;
  return_date?: string;
  transmission?: TransmissionType;
  fuel_type?: FuelType;
  min_seats?: number;
  max_seats?: number;
  min_price?: number;
  max_price?: number;
  features?: string[];
  instant_booking?: boolean;
  sort_by?: 'distance' | 'price_asc' | 'price_desc' | 'rating';
  page?: number;
  limit?: number;
}

export interface CarSearchResult extends Car {
  distance?: number; // in meters
  total_price?: number; // calculated for selected dates
  primary_image?: string;
}

// ============================================
// FORM TYPES
// ============================================

export interface LoginFormData {
  phone: string;
}

export interface OtpVerifyFormData {
  phone: string;
  otp: string;
}

export interface ProfileFormData {
  full_name: string;
  email?: string;
  date_of_birth?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export interface CarFormData {
  make: string;
  model: string;
  year: number;
  variant?: string;
  transmission: TransmissionType;
  fuel_type: FuelType;
  seats: number;
  color?: string;
  registration_number: string;
  location_address: string;
  location_area: string;
  location_lat?: number;
  location_lng?: number;
  hourly_rate?: number;
  daily_rate: number;
  weekly_rate?: number;
  security_deposit: number;
  unlimited_km: boolean;
  km_limit_per_day?: number;
  extra_km_charge?: number;
  features: string[];
  guidelines?: string;
  pickup_instructions?: string;
  instant_booking: boolean;
}

export interface BookingRequestFormData {
  car_id: string;
  pickup_datetime: string;
  return_datetime: string;
  pickup_location: string;
  guest_notes?: string;
}

export interface ReviewFormData {
  booking_id: string;
  type: ReviewType;
  rating: number;
  comment?: string;
  cleanliness_rating?: number;
  communication_rating?: number;
  accuracy_rating?: number;
  value_rating?: number;
}

// ============================================
// UTILITY TYPES
// ============================================

export type Nullable<T> = T | null;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface SelectOption {
  label: string;
  value: string;
}

export interface DateRange {
  from: Date;
  to: Date;
}
