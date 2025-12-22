-- GoDrive Database Schema
-- PostgreSQL (Supabase)
-- Version: 1.0.0
-- Last Updated: December 15, 2024

-- ============================================
-- EXTENSIONS
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE user_role AS ENUM ('guest', 'host', 'both', 'admin');
CREATE TYPE kyc_status AS ENUM ('pending', 'submitted', 'verified', 'rejected');
CREATE TYPE document_type AS ENUM ('driving_license', 'aadhaar', 'pan', 'rc');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');

CREATE TYPE car_status AS ENUM ('draft', 'pending_approval', 'active', 'inactive', 'suspended');
CREATE TYPE transmission_type AS ENUM ('manual', 'automatic');
CREATE TYPE fuel_type AS ENUM ('petrol', 'diesel', 'cng', 'electric', 'hybrid');

CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'active', 'completed', 'cancelled', 'disputed');
CREATE TYPE payment_status AS ENUM ('pending', 'deposit_paid', 'fully_paid', 'refund_pending', 'refunded', 'failed');
CREATE TYPE cancellation_by AS ENUM ('guest', 'host', 'admin', 'system');

CREATE TYPE payment_type AS ENUM ('booking_payment', 'security_deposit', 'refund', 'host_payout', 'penalty');
CREATE TYPE transaction_status AS ENUM ('pending', 'processing', 'captured', 'refunded', 'failed');

CREATE TYPE review_type AS ENUM ('guest_to_host', 'host_to_guest');
CREATE TYPE payout_status AS ENUM ('pending', 'processing', 'completed', 'failed');

-- ============================================
-- TABLES
-- ============================================

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    full_name VARCHAR(100),
    avatar_url TEXT,
    role user_role DEFAULT 'guest',
    kyc_status kyc_status DEFAULT 'pending',
    is_phone_verified BOOLEAN DEFAULT FALSE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    date_of_birth DATE,
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    
    -- Stats (denormalized for performance)
    total_trips_as_guest INT DEFAULT 0,
    total_trips_as_host INT DEFAULT 0,
    average_rating_as_guest DECIMAL(2,1) DEFAULT 0,
    average_rating_as_host DECIMAL(2,1) DEFAULT 0,
    
    -- Razorpay
    razorpay_contact_id VARCHAR(50),
    razorpay_fund_account_id VARCHAR(50),
    
    -- Metadata
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Documents (KYC)
CREATE TABLE user_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    document_type document_type NOT NULL,
    document_number VARCHAR(50),
    front_image_url TEXT NOT NULL,
    back_image_url TEXT,
    expiry_date DATE,
    verification_status verification_status DEFAULT 'pending',
    rejection_reason TEXT,
    verified_at TIMESTAMPTZ,
    verified_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, document_type)
);

-- Cars Table
CREATE TABLE cars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Vehicle Details
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL CHECK (year >= 2010 AND year <= EXTRACT(YEAR FROM NOW()) + 1),
    variant VARCHAR(100),
    transmission transmission_type NOT NULL,
    fuel_type fuel_type NOT NULL,
    seats INT NOT NULL CHECK (seats >= 2 AND seats <= 8),
    color VARCHAR(30),
    registration_number VARCHAR(20) NOT NULL,
    
    -- Status
    status car_status DEFAULT 'draft',
    rejection_reason TEXT,
    approved_at TIMESTAMPTZ,
    approved_by UUID REFERENCES users(id),
    
    -- Location
    location_address TEXT NOT NULL,
    location_area VARCHAR(100) NOT NULL,
    location_city VARCHAR(50) DEFAULT 'Bangalore',
    location_lat DECIMAL(10, 8),
    location_lng DECIMAL(11, 8),
    location_point GEOGRAPHY(POINT, 4326),
    
    -- Pricing (stored in paise)
    hourly_rate INT CHECK (hourly_rate >= 0),
    daily_rate INT NOT NULL CHECK (daily_rate >= 50000), -- Minimum ₹500/day
    weekly_rate INT,
    monthly_rate INT,
    security_deposit INT NOT NULL DEFAULT 300000, -- ₹3000 default
    
    -- Kilometer Policy
    unlimited_km BOOLEAN DEFAULT TRUE,
    km_limit_per_day INT,
    extra_km_charge INT, -- per km in paise
    
    -- Features & Amenities
    features JSONB DEFAULT '[]',
    -- Example: ["AC", "Bluetooth", "USB Charger", "Sunroof", "Backup Camera"]
    
    -- Host Instructions
    guidelines TEXT,
    pickup_instructions TEXT,
    
    -- Settings
    instant_booking BOOLEAN DEFAULT FALSE,
    min_booking_hours INT DEFAULT 4,
    max_booking_days INT DEFAULT 30,
    advance_notice_hours INT DEFAULT 2,
    
    -- Stats (denormalized)
    total_trips INT DEFAULT 0,
    total_earnings INT DEFAULT 0, -- in paise
    average_rating DECIMAL(2,1) DEFAULT 0,
    total_reviews INT DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Car Images
CREATE TABLE car_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Car Availability Calendar
CREATE TABLE car_availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    custom_daily_rate INT, -- Override default rate for this date (in paise)
    reason VARCHAR(50), -- 'blocked_by_host', 'booked', 'maintenance'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(car_id, date)
);

-- Bookings Table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_number VARCHAR(20) UNIQUE NOT NULL, -- GD-XXXXXX
    
    -- Participants
    car_id UUID NOT NULL REFERENCES cars(id),
    guest_id UUID NOT NULL REFERENCES users(id),
    host_id UUID NOT NULL REFERENCES users(id), -- Denormalized for queries
    
    -- Status
    status booking_status DEFAULT 'pending',
    payment_status payment_status DEFAULT 'pending',
    
    -- Timing
    pickup_datetime TIMESTAMPTZ NOT NULL,
    return_datetime TIMESTAMPTZ NOT NULL,
    actual_pickup_datetime TIMESTAMPTZ,
    actual_return_datetime TIMESTAMPTZ,
    
    -- Location
    pickup_location TEXT NOT NULL,
    pickup_lat DECIMAL(10, 8),
    pickup_lng DECIMAL(11, 8),
    return_location TEXT,
    
    -- Pricing (all in paise)
    duration_hours INT NOT NULL,
    base_amount INT NOT NULL, -- Car rental cost
    service_fee INT NOT NULL, -- Platform commission (20% of base)
    security_deposit INT NOT NULL,
    extra_km_charges INT DEFAULT 0,
    late_return_charges INT DEFAULT 0,
    damage_charges INT DEFAULT 0,
    discount_amount INT DEFAULT 0,
    total_amount INT NOT NULL, -- base + service_fee (deposit separate)
    host_payout INT NOT NULL, -- base - (base * 0.20) = 80% of base
    
    -- Cancellation
    cancelled_at TIMESTAMPTZ,
    cancelled_by cancellation_by,
    cancellation_reason TEXT,
    refund_amount INT DEFAULT 0,
    
    -- Trip Details
    odometer_start INT,
    odometer_end INT,
    fuel_level_start VARCHAR(20), -- 'full', '3/4', '1/2', '1/4', 'empty'
    fuel_level_end VARCHAR(20),
    
    -- Notes
    guest_notes TEXT,
    host_notes TEXT,
    admin_notes TEXT,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CHECK (return_datetime > pickup_datetime),
    CHECK (total_amount >= base_amount)
);

-- Booking Payments
CREATE TABLE booking_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    
    -- Razorpay Details
    razorpay_order_id VARCHAR(50),
    razorpay_payment_id VARCHAR(50),
    razorpay_signature VARCHAR(255),
    razorpay_transfer_id VARCHAR(50), -- For host payouts
    
    -- Payment Details
    amount INT NOT NULL, -- in paise
    currency VARCHAR(3) DEFAULT 'INR',
    type payment_type NOT NULL,
    status transaction_status DEFAULT 'pending',
    
    -- Method Details
    payment_method VARCHAR(30), -- 'upi', 'card', 'netbanking', 'wallet'
    payment_method_details JSONB, -- Store method-specific details
    
    -- Failure Details
    failure_reason TEXT,
    failure_code VARCHAR(50),
    
    -- Metadata
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES users(id),
    reviewee_id UUID NOT NULL REFERENCES users(id),
    car_id UUID REFERENCES cars(id), -- Only for guest_to_host reviews
    
    type review_type NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    
    -- Individual Ratings (for detailed feedback)
    cleanliness_rating INT CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
    communication_rating INT CHECK (communication_rating >= 1 AND communication_rating <= 5),
    accuracy_rating INT CHECK (accuracy_rating >= 1 AND accuracy_rating <= 5),
    value_rating INT CHECK (value_rating >= 1 AND value_rating <= 5),
    
    -- Moderation
    is_public BOOLEAN DEFAULT TRUE,
    is_flagged BOOLEAN DEFAULT FALSE,
    flagged_reason TEXT,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(booking_id, type) -- One review per type per booking
);

-- Host Payouts (Weekly batch payouts)
CREATE TABLE host_payouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID NOT NULL REFERENCES users(id),
    
    -- Amount
    amount INT NOT NULL, -- in paise
    currency VARCHAR(3) DEFAULT 'INR',
    
    -- Linked Bookings
    booking_ids UUID[] NOT NULL,
    
    -- Razorpay
    razorpay_payout_id VARCHAR(50),
    razorpay_fund_account_id VARCHAR(50),
    
    -- Status
    status payout_status DEFAULT 'pending',
    failure_reason TEXT,
    
    -- Bank Details (snapshot at time of payout)
    bank_account_number VARCHAR(20),
    bank_ifsc VARCHAR(11),
    bank_name VARCHAR(100),
    
    -- Metadata
    scheduled_for DATE,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages (Phase 2)
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id),
    receiver_id UUID NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    body TEXT NOT NULL,
    type VARCHAR(50), -- 'booking_request', 'booking_confirmed', 'payment', etc.
    data JSONB, -- Additional context
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Audit Log
CREATE TABLE admin_audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID NOT NULL REFERENCES users(id),
    action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

-- Users
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_kyc_status ON users(kyc_status);

-- User Documents
CREATE INDEX idx_user_documents_user ON user_documents(user_id);
CREATE INDEX idx_user_documents_status ON user_documents(verification_status);

-- Cars
CREATE INDEX idx_cars_host ON cars(host_id);
CREATE INDEX idx_cars_status ON cars(status);
CREATE INDEX idx_cars_location_area ON cars(location_area);
CREATE INDEX idx_cars_location_city ON cars(location_city);
CREATE INDEX idx_cars_transmission ON cars(transmission);
CREATE INDEX idx_cars_fuel_type ON cars(fuel_type);
CREATE INDEX idx_cars_daily_rate ON cars(daily_rate);
CREATE INDEX idx_cars_location_point ON cars USING GIST(location_point);

-- Car Availability
CREATE INDEX idx_car_availability_car_date ON car_availability(car_id, date);
CREATE INDEX idx_car_availability_available ON car_availability(date, is_available) WHERE is_available = TRUE;

-- Bookings
CREATE INDEX idx_bookings_car ON bookings(car_id);
CREATE INDEX idx_bookings_guest ON bookings(guest_id);
CREATE INDEX idx_bookings_host ON bookings(host_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX idx_bookings_dates ON bookings(pickup_datetime, return_datetime);
CREATE INDEX idx_bookings_number ON bookings(booking_number);

-- Booking Payments
CREATE INDEX idx_booking_payments_booking ON booking_payments(booking_id);
CREATE INDEX idx_booking_payments_razorpay_order ON booking_payments(razorpay_order_id);
CREATE INDEX idx_booking_payments_status ON booking_payments(status);

-- Reviews
CREATE INDEX idx_reviews_booking ON reviews(booking_id);
CREATE INDEX idx_reviews_reviewee ON reviews(reviewee_id);
CREATE INDEX idx_reviews_car ON reviews(car_id);

-- Messages
CREATE INDEX idx_messages_booking ON messages(booking_id);
CREATE INDEX idx_messages_participants ON messages(sender_id, receiver_id);
CREATE INDEX idx_messages_unread ON messages(receiver_id, is_read) WHERE is_read = FALSE;

-- Notifications
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;

-- ============================================
-- FUNCTIONS
-- ============================================

-- Generate booking number
CREATE OR REPLACE FUNCTION generate_booking_number()
RETURNS TEXT AS $$
DECLARE
    new_number TEXT;
    counter INT;
BEGIN
    SELECT COALESCE(MAX(CAST(SUBSTRING(booking_number FROM 4) AS INT)), 100000) + 1
    INTO counter
    FROM bookings;
    
    new_number := 'GD-' || LPAD(counter::TEXT, 6, '0');
    RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Update car stats after booking completion
CREATE OR REPLACE FUNCTION update_car_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        UPDATE cars
        SET 
            total_trips = total_trips + 1,
            total_earnings = total_earnings + NEW.host_payout
        WHERE id = NEW.car_id;
        
        UPDATE users
        SET total_trips_as_guest = total_trips_as_guest + 1
        WHERE id = NEW.guest_id;
        
        UPDATE users
        SET total_trips_as_host = total_trips_as_host + 1
        WHERE id = NEW.host_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Update location point from lat/lng
CREATE OR REPLACE FUNCTION update_car_location_point()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.location_lat IS NOT NULL AND NEW.location_lng IS NOT NULL THEN
        NEW.location_point = ST_SetSRID(ST_MakePoint(NEW.location_lng, NEW.location_lat), 4326);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Update average ratings
CREATE OR REPLACE FUNCTION update_user_ratings()
RETURNS TRIGGER AS $$
BEGIN
    -- Update reviewee's average rating
    IF NEW.type = 'guest_to_host' THEN
        UPDATE users
        SET average_rating_as_host = (
            SELECT AVG(rating)::DECIMAL(2,1)
            FROM reviews
            WHERE reviewee_id = NEW.reviewee_id AND type = 'guest_to_host'
        )
        WHERE id = NEW.reviewee_id;
        
        -- Update car rating
        IF NEW.car_id IS NOT NULL THEN
            UPDATE cars
            SET 
                average_rating = (
                    SELECT AVG(rating)::DECIMAL(2,1)
                    FROM reviews
                    WHERE car_id = NEW.car_id
                ),
                total_reviews = (
                    SELECT COUNT(*)
                    FROM reviews
                    WHERE car_id = NEW.car_id
                )
            WHERE id = NEW.car_id;
        END IF;
    ELSE
        UPDATE users
        SET average_rating_as_guest = (
            SELECT AVG(rating)::DECIMAL(2,1)
            FROM reviews
            WHERE reviewee_id = NEW.reviewee_id AND type = 'host_to_guest'
        )
        WHERE id = NEW.reviewee_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS
-- ============================================

-- Updated_at triggers
CREATE TRIGGER tr_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tr_user_documents_updated_at
    BEFORE UPDATE ON user_documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tr_cars_updated_at
    BEFORE UPDATE ON cars
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tr_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Booking number generation
CREATE TRIGGER tr_bookings_generate_number
    BEFORE INSERT ON bookings
    FOR EACH ROW
    WHEN (NEW.booking_number IS NULL)
    EXECUTE FUNCTION generate_booking_number();

-- Update car location point
CREATE TRIGGER tr_cars_location_point
    BEFORE INSERT OR UPDATE ON cars
    FOR EACH ROW EXECUTE FUNCTION update_car_location_point();

-- Update stats on booking completion
CREATE TRIGGER tr_bookings_update_stats
    AFTER UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_car_stats();

-- Update ratings after review
CREATE TRIGGER tr_reviews_update_ratings
    AFTER INSERT ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_user_ratings();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile"
    ON users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON users FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Public profiles are viewable"
    ON users FOR SELECT
    USING (true); -- Simplified for MVP

-- Cars policies
CREATE POLICY "Active cars are viewable"
    ON cars FOR SELECT
    USING (status = 'active' OR host_id = auth.uid());

CREATE POLICY "Hosts can manage own cars"
    ON cars FOR ALL
    USING (host_id = auth.uid());

-- Bookings policies
CREATE POLICY "Users can view own bookings"
    ON bookings FOR SELECT
    USING (guest_id = auth.uid() OR host_id = auth.uid());

CREATE POLICY "Guests can create bookings"
    ON bookings FOR INSERT
    WITH CHECK (guest_id = auth.uid());

CREATE POLICY "Participants can update bookings"
    ON bookings FOR UPDATE
    USING (guest_id = auth.uid() OR host_id = auth.uid());

-- Messages policies
CREATE POLICY "Users can view own messages"
    ON messages FOR SELECT
    USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages"
    ON messages FOR INSERT
    WITH CHECK (sender_id = auth.uid());

-- Notifications policies
CREATE POLICY "Users can view own notifications"
    ON notifications FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
    ON notifications FOR UPDATE
    USING (user_id = auth.uid());

-- ============================================
-- SEED DATA (Development Only)
-- ============================================

-- This section should be run separately for development environments

/*
-- Insert test admin user
INSERT INTO users (id, phone, email, full_name, role, kyc_status, is_phone_verified)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    '+919999999999',
    'admin@godrive.in',
    'GoDrive Admin',
    'admin',
    'verified',
    true
);

-- Insert test host
INSERT INTO users (id, phone, email, full_name, role, kyc_status, is_phone_verified)
VALUES (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    '+919876543210',
    'host@example.com',
    'Test Host',
    'host',
    'verified',
    true
);

-- Insert test guest
INSERT INTO users (id, phone, email, full_name, role, kyc_status, is_phone_verified)
VALUES (
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    '+919123456789',
    'guest@example.com',
    'Test Guest',
    'guest',
    'verified',
    true
);

-- Insert test car
INSERT INTO cars (
    id, host_id, make, model, year, variant, transmission, fuel_type, seats, color,
    registration_number, status, location_address, location_area, location_lat, location_lng,
    daily_rate, security_deposit, unlimited_km, features, instant_booking
)
VALUES (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'Hyundai', 'i20', 2022, 'Asta', 'manual', 'petrol', 5, 'White',
    'KA01MX1234', 'active',
    'HSR Layout, Sector 2, Bangalore', 'HSR Layout',
    12.9141, 77.6411,
    150000, -- ₹1500/day
    300000, -- ₹3000 deposit
    true,
    '["AC", "Bluetooth", "USB Charger", "Backup Camera"]',
    true
);
*/
