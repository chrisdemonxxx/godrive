-- GoDrive Database Schema - Part 5: Indexes & Functions
-- Run this FIFTH in Supabase SQL Editor

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

-- Car Availability
CREATE INDEX idx_car_availability_car_date ON car_availability(car_id, date);

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

-- Notifications
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;

-- ============================================
-- FUNCTIONS
-- ============================================

-- Generate booking number
CREATE OR REPLACE FUNCTION generate_booking_number()
RETURNS TRIGGER AS $$
DECLARE
    new_number TEXT;
    counter INT;
BEGIN
    SELECT COALESCE(MAX(CAST(SUBSTRING(booking_number FROM 4) AS INT)), 100000) + 1
    INTO counter
    FROM bookings;
    
    NEW.booking_number := 'GD-' || LPAD(counter::TEXT, 6, '0');
    RETURN NEW;
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

-- Update average ratings
CREATE OR REPLACE FUNCTION update_user_ratings()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.type = 'guest_to_host' THEN
        UPDATE users
        SET average_rating_as_host = (
            SELECT COALESCE(AVG(rating)::DECIMAL(2,1), 0)
            FROM reviews
            WHERE reviewee_id = NEW.reviewee_id AND type = 'guest_to_host'
        )
        WHERE id = NEW.reviewee_id;
        
        IF NEW.car_id IS NOT NULL THEN
            UPDATE cars
            SET 
                average_rating = (
                    SELECT COALESCE(AVG(rating)::DECIMAL(2,1), 0)
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
            SELECT COALESCE(AVG(rating)::DECIMAL(2,1), 0)
            FROM reviews
            WHERE reviewee_id = NEW.reviewee_id AND type = 'host_to_guest'
        )
        WHERE id = NEW.reviewee_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Handle new user from auth
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, phone, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.phone, ''),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        NEW.raw_user_meta_data->>'avatar_url'
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, users.full_name),
        avatar_url = COALESCE(EXCLUDED.avatar_url, users.avatar_url),
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
