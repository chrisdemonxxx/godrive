/**
 * Seed script for GoDrive database
 * Run with: tsx scripts/seed-data.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local');
  console.error('Required: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedUsers() {
  console.log('Seeding users...');

  const users = [
    {
      phone: '+919876543210',
      email: 'guest1@godrive.in',
      full_name: 'Rahul Sharma',
      role: 'guest',
      kyc_status: 'verified',
      is_phone_verified: true,
      is_email_verified: true,
    },
    {
      phone: '+919876543211',
      email: 'host1@godrive.in',
      full_name: 'Priya Patel',
      role: 'host',
      kyc_status: 'verified',
      is_phone_verified: true,
      is_email_verified: true,
    },
    {
      phone: '+919876543212',
      email: 'admin@godrive.in',
      full_name: 'Admin User',
      role: 'admin',
      kyc_status: 'verified',
      is_phone_verified: true,
      is_email_verified: true,
    },
  ];

  for (const user of users) {
    const { data, error } = await supabase.from('users').upsert(user, { onConflict: 'phone' });
    if (error) {
      console.error(`Error seeding user ${user.phone}:`, error);
    } else {
      console.log(`✓ Seeded user: ${user.full_name}`);
    }
  }
}

async function seedCars() {
  console.log('Seeding cars...');

  // Get a host user
  const { data: host } = await supabase.from('users').select('id').eq('role', 'host').limit(1).single();

  if (!host) {
    console.error('No host user found. Please seed users first.');
    return;
  }

  const cars = [
    {
      host_id: host.id,
      make: 'Maruti',
      model: 'Swift',
      year: 2022,
      variant: 'VDI',
      transmission: 'manual',
      fuel_type: 'diesel',
      seats: 5,
      color: 'White',
      registration_number: 'KA01AB1234',
      status: 'active',
      location_address: '123 MG Road, Bangalore',
      location_area: 'MG Road',
      location_city: 'Bangalore',
      location_lat: 12.9716,
      location_lng: 77.5946,
      daily_rate: 150000, // ₹1500/day
      security_deposit: 300000, // ₹3000
      unlimited_km: true,
      features: ['AC', 'Bluetooth', 'GPS'],
      instant_booking: true,
    },
    {
      host_id: host.id,
      make: 'Hyundai',
      model: 'i20',
      year: 2021,
      variant: 'Sportz',
      transmission: 'automatic',
      fuel_type: 'petrol',
      seats: 5,
      color: 'Red',
      registration_number: 'KA02CD5678',
      status: 'active',
      location_address: '456 Koramangala, Bangalore',
      location_area: 'Koramangala',
      location_city: 'Bangalore',
      location_lat: 12.9352,
      location_lng: 77.6245,
      daily_rate: 180000, // ₹1800/day
      security_deposit: 350000, // ₹3500
      unlimited_km: true,
      features: ['AC', 'Bluetooth', 'Sunroof'],
      instant_booking: false,
    },
  ];

  for (const car of cars) {
    const { data, error } = await supabase.from('cars').upsert(car, { onConflict: 'registration_number' });
    if (error) {
      console.error(`Error seeding car ${car.registration_number}:`, error);
    } else {
      console.log(`✓ Seeded car: ${car.make} ${car.model}`);
    }
  }
}

async function main() {
  console.log('Starting database seeding...\n');

  try {
    await seedUsers();
    console.log('');
    await seedCars();
    console.log('\n✓ Seeding completed successfully!');
  } catch (error) {
    console.error('\n✗ Seeding failed:', error);
    process.exit(1);
  }
}

main();
