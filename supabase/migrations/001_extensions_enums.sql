-- GoDrive Database Schema - Part 1: Extensions & Enums
-- Run this FIRST in Supabase SQL Editor

-- ============================================
-- EXTENSIONS
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
