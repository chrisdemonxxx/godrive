-- GoDrive Database Schema - Part 3: Bookings & Payments
-- Run this THIRD in Supabase SQL Editor

-- ============================================
-- BOOKINGS TABLE
-- ============================================

CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_number VARCHAR(20) UNIQUE NOT NULL,
    
    -- Participants
    car_id UUID NOT NULL REFERENCES cars(id),
    guest_id UUID NOT NULL REFERENCES users(id),
    host_id UUID NOT NULL REFERENCES users(id),
    
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
    base_amount INT NOT NULL,
    service_fee INT NOT NULL,
    security_deposit INT NOT NULL,
    extra_km_charges INT DEFAULT 0,
    late_return_charges INT DEFAULT 0,
    damage_charges INT DEFAULT 0,
    discount_amount INT DEFAULT 0,
    total_amount INT NOT NULL,
    host_payout INT NOT NULL,
    
    -- Cancellation
    cancelled_at TIMESTAMPTZ,
    cancelled_by cancellation_by,
    cancellation_reason TEXT,
    refund_amount INT DEFAULT 0,
    
    -- Trip Details
    odometer_start INT,
    odometer_end INT,
    fuel_level_start VARCHAR(20),
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

-- ============================================
-- BOOKING PAYMENTS
-- ============================================

CREATE TABLE booking_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    
    -- Razorpay Details
    razorpay_order_id VARCHAR(50),
    razorpay_payment_id VARCHAR(50),
    razorpay_signature VARCHAR(255),
    razorpay_transfer_id VARCHAR(50),
    
    -- Payment Details
    amount INT NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    type payment_type NOT NULL,
    status transaction_status DEFAULT 'pending',
    
    -- Method Details
    payment_method VARCHAR(30),
    payment_method_details JSONB,
    
    -- Failure Details
    failure_reason TEXT,
    failure_code VARCHAR(50),
    
    -- Metadata
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- HOST PAYOUTS
-- ============================================

CREATE TABLE host_payouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID NOT NULL REFERENCES users(id),
    
    -- Amount
    amount INT NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    
    -- Linked Bookings
    booking_ids UUID[] NOT NULL,
    
    -- Razorpay
    razorpay_payout_id VARCHAR(50),
    razorpay_fund_account_id VARCHAR(50),
    
    -- Status
    status payout_status DEFAULT 'pending',
    failure_reason TEXT,
    
    -- Bank Details (snapshot)
    bank_account_number VARCHAR(20),
    bank_ifsc VARCHAR(11),
    bank_name VARCHAR(100),
    
    -- Metadata
    scheduled_for DATE,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
