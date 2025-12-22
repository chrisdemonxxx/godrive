-- Add UPI payment fields to bookings table
-- Run this in Supabase SQL Editor

ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS upi_transaction_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS payment_submitted_at TIMESTAMPTZ;

-- Create index for payment queries
CREATE INDEX IF NOT EXISTS idx_bookings_upi_txn ON bookings(upi_transaction_id) WHERE upi_transaction_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_bookings_payment_submitted ON bookings(payment_submitted_at) WHERE payment_submitted_at IS NOT NULL;

-- Add comment
COMMENT ON COLUMN bookings.upi_transaction_id IS 'UPI transaction ID/UTR number submitted by guest';
COMMENT ON COLUMN bookings.payment_submitted_at IS 'Timestamp when payment was submitted for verification';
