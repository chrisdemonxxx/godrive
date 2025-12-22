-- GoDrive Database Schema - Part 6: Triggers & RLS Policies
-- Run this SIXTH (LAST) in Supabase SQL Editor

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

-- Update stats on booking completion
CREATE TRIGGER tr_bookings_update_stats
    AFTER UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_car_stats();

-- Update ratings after review
CREATE TRIGGER tr_reviews_update_ratings
    AFTER INSERT ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_user_ratings();

-- Auth trigger for new users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
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
ALTER TABLE host_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- ============================================
-- USERS POLICIES
-- ============================================

CREATE POLICY "Users can view all profiles"
    ON users FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON users FOR UPDATE
    USING (auth.uid() = id);

-- ============================================
-- USER DOCUMENTS POLICIES
-- ============================================

CREATE POLICY "Users can view own documents"
    ON user_documents FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents"
    ON user_documents FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents"
    ON user_documents FOR UPDATE
    USING (auth.uid() = user_id);

-- ============================================
-- CARS POLICIES
-- ============================================

CREATE POLICY "Anyone can view active cars"
    ON cars FOR SELECT
    USING (status = 'active' OR host_id = auth.uid());

CREATE POLICY "Hosts can insert own cars"
    ON cars FOR INSERT
    WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Hosts can update own cars"
    ON cars FOR UPDATE
    USING (auth.uid() = host_id);

CREATE POLICY "Hosts can delete own cars"
    ON cars FOR DELETE
    USING (auth.uid() = host_id);

-- ============================================
-- CAR IMAGES POLICIES
-- ============================================

CREATE POLICY "Anyone can view car images"
    ON car_images FOR SELECT
    USING (true);

CREATE POLICY "Hosts can manage car images"
    ON car_images FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM cars 
            WHERE cars.id = car_images.car_id 
            AND cars.host_id = auth.uid()
        )
    );

-- ============================================
-- CAR AVAILABILITY POLICIES
-- ============================================

CREATE POLICY "Anyone can view availability"
    ON car_availability FOR SELECT
    USING (true);

CREATE POLICY "Hosts can manage availability"
    ON car_availability FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM cars 
            WHERE cars.id = car_availability.car_id 
            AND cars.host_id = auth.uid()
        )
    );

-- ============================================
-- BOOKINGS POLICIES
-- ============================================

CREATE POLICY "Users can view own bookings"
    ON bookings FOR SELECT
    USING (guest_id = auth.uid() OR host_id = auth.uid());

CREATE POLICY "Guests can create bookings"
    ON bookings FOR INSERT
    WITH CHECK (guest_id = auth.uid());

CREATE POLICY "Participants can update bookings"
    ON bookings FOR UPDATE
    USING (guest_id = auth.uid() OR host_id = auth.uid());

-- ============================================
-- BOOKING PAYMENTS POLICIES
-- ============================================

CREATE POLICY "Participants can view payments"
    ON booking_payments FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM bookings 
            WHERE bookings.id = booking_payments.booking_id 
            AND (bookings.guest_id = auth.uid() OR bookings.host_id = auth.uid())
        )
    );

-- ============================================
-- REVIEWS POLICIES
-- ============================================

CREATE POLICY "Anyone can view public reviews"
    ON reviews FOR SELECT
    USING (is_public = true OR reviewer_id = auth.uid() OR reviewee_id = auth.uid());

CREATE POLICY "Users can create reviews"
    ON reviews FOR INSERT
    WITH CHECK (reviewer_id = auth.uid());

-- ============================================
-- MESSAGES POLICIES
-- ============================================

CREATE POLICY "Users can view own messages"
    ON messages FOR SELECT
    USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages"
    ON messages FOR INSERT
    WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can update own received messages"
    ON messages FOR UPDATE
    USING (receiver_id = auth.uid());

-- ============================================
-- NOTIFICATIONS POLICIES
-- ============================================

CREATE POLICY "Users can view own notifications"
    ON notifications FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
    ON notifications FOR UPDATE
    USING (user_id = auth.uid());

-- ============================================
-- HOST PAYOUTS POLICIES
-- ============================================

CREATE POLICY "Hosts can view own payouts"
    ON host_payouts FOR SELECT
    USING (host_id = auth.uid());

-- ============================================
-- WAITLIST POLICIES (Public insert)
-- ============================================

CREATE POLICY "Anyone can join waitlist"
    ON waitlist FOR INSERT
    WITH CHECK (true);

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Create storage buckets (run separately if needed)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('car-images', 'car-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can view car images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'car-images');

CREATE POLICY "Authenticated users can upload car images"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'car-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can manage own avatars"
    ON storage.objects FOR ALL
    USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can manage own documents"
    ON storage.objects FOR ALL
    USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
