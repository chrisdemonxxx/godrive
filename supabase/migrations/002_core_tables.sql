-- GoDrive Database Schema - Part 2: Core Tables
-- Run this SECOND in Supabase SQL Editor

-- ============================================
-- USERS TABLE
-- ============================================

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

-- ============================================
-- USER DOCUMENTS (KYC)
-- ============================================

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

-- ============================================
-- CARS TABLE
-- ============================================

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
    total_earnings INT DEFAULT 0,
    average_rating DECIMAL(2,1) DEFAULT 0,
    total_reviews INT DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CAR IMAGES
-- ============================================

CREATE TABLE car_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CAR AVAILABILITY
-- ============================================

CREATE TABLE car_availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    custom_daily_rate INT,
    reason VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(car_id, date)
);
