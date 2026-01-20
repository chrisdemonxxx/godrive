'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { GuestNavbar } from '@/components/layout/GuestNavbar';
import { GuestFooter } from '@/components/layout/GuestFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';
import { 
  ArrowLeft, Heart, Share2, MapPin, Fuel, Settings, Users, 
  Star, Calendar, Shield, CheckCircle, Crown, Zap, ChevronLeft, 
  ChevronRight, Phone, MessageCircle, Clock, Car
} from 'lucide-react';
import { format, addDays, differenceInDays, setHours, setMinutes } from 'date-fns';
import Link from 'next/link';

// Sample car data - in a real app this would come from an API
const carsData: Record<string, {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  rating: number;
  trips: number;
  fuel: string;
  transmission: string;
  seats: number;
  mileage: string;
  images: string[];
  location: { area: string; city: string; address: string };
  host: { name: string; verified: boolean; superhost: boolean; rating: number; responseTime: string; joined: string; };
  instantBook: boolean;
  deliveryAvailable: boolean;
  deposit: number;
  features: string[];
  guidelines: string[];
  description: string;
}> = {
  '1': {
    id: '1',
    name: 'BMW M3 Competition',
    make: 'BMW',
    model: 'M3 Competition',
    year: 2023,
    price: 15999,
    originalPrice: 18999,
    rating: 4.9,
    trips: 89,
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    mileage: '10 km/l',
    images: [
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80',
      'https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=1200&q=80',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80',
    ],
    location: { area: 'Koramangala', city: 'Bangalore', address: 'Near Forum Mall, Koramangala 5th Block' },
    host: { name: 'Rajesh Kumar', verified: true, superhost: true, rating: 4.9, responseTime: 'within an hour', joined: 'March 2022' },
    instantBook: true,
    deliveryAvailable: true,
    deposit: 5000,
    features: ['Bluetooth', 'Sunroof', 'Apple CarPlay', 'Android Auto', 'Leather Seats', 'Cruise Control', 'Parking Sensors', 'Reverse Camera'],
    guidelines: ['No smoking inside the car', 'Return with same fuel level', 'No pets allowed', 'Valid driving license required'],
    description: 'Experience the thrill of driving the iconic BMW M3 Competition. This beast delivers 510 HP and accelerates from 0-100 km/h in just 3.9 seconds. Perfect for weekend getaways or making a statement at events.',
  },
  '2': {
    id: '2',
    name: 'Mercedes-Benz S-Class',
    make: 'Mercedes-Benz',
    model: 'S-Class',
    year: 2024,
    price: 17999,
    originalPrice: 20999,
    rating: 5.0,
    trips: 124,
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    mileage: '8 km/l',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80',
      'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1200&q=80',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80',
    ],
    location: { area: 'Indiranagar', city: 'Bangalore', address: '100 Feet Road, Indiranagar' },
    host: { name: 'Priya Sharma', verified: true, superhost: false, rating: 4.7, responseTime: 'within 2 hours', joined: 'January 2023' },
    instantBook: true,
    deliveryAvailable: true,
    deposit: 7000,
    features: ['Massage Seats', 'Ambient Lighting', 'MBUX System', 'Burmester Sound', 'Heads Up Display', 'Night Vision', 'Air Suspension'],
    guidelines: ['No smoking', 'Professional chauffeur available on request', 'Premium insurance included'],
    description: 'The epitome of luxury - the Mercedes-Benz S-Class. Featuring the latest MBUX infotainment system, massage seats, and whisper-quiet cabin. Perfect for executives and special occasions.',
  },
  '3': {
    id: '3',
    name: 'Porsche Cayenne',
    make: 'Porsche',
    model: 'Cayenne',
    year: 2023,
    price: 14999,
    originalPrice: 17999,
    rating: 4.9,
    trips: 156,
    fuel: 'Hybrid',
    transmission: 'Automatic',
    seats: 5,
    mileage: '12 km/l',
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80',
    ],
    location: { area: 'HSR Layout', city: 'Bangalore', address: 'HSR Layout Sector 2' },
    host: { name: 'Vikram Joshi', verified: true, superhost: true, rating: 4.9, responseTime: 'within 30 minutes', joined: 'June 2021' },
    instantBook: false,
    deliveryAvailable: true,
    deposit: 6000,
    features: ['Panoramic Roof', 'Sport Chrono Package', 'Bose Sound System', 'Adaptive Cruise', 'Lane Assist', 'Off-Road Mode'],
    guidelines: ['Fuel: Return with full tank', 'Off-road driving allowed on request', 'Minimum 2-day booking'],
    description: 'The Porsche Cayenne combines SUV practicality with sports car performance. Hybrid powertrain for efficiency without compromising on Porsche DNA.',
  },
  '4': {
    id: '4',
    name: 'Tesla Model S',
    make: 'Tesla',
    model: 'Model S',
    year: 2024,
    price: 8999,
    originalPrice: 10999,
    rating: 4.9,
    trips: 312,
    fuel: 'Electric',
    transmission: 'Automatic',
    seats: 5,
    mileage: '500 km range',
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&q=80',
      'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=1200&q=80',
    ],
    location: { area: 'Whitefield', city: 'Bangalore', address: 'ITPL Main Road, Whitefield' },
    host: { name: 'Arjun Reddy', verified: true, superhost: true, rating: 5.0, responseTime: 'within 15 minutes', joined: 'April 2022' },
    instantBook: true,
    deliveryAvailable: true,
    deposit: 5000,
    features: ['Autopilot', '17" Touchscreen', 'Glass Roof', 'Premium Audio', 'Supercharging Access', 'Dog Mode', 'Sentry Mode'],
    guidelines: ['Return with at least 20% charge', 'Free Supercharging included', 'Autopilot usage at your own risk'],
    description: 'The future of driving is here. Tesla Model S with Autopilot, over-the-air updates, and access to Tesla Supercharger network. Zero emissions, maximum fun.',
  },
};

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const carId = params.id as string;
  const car = carsData[carId];

  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Booking dates
  const defaultPickup = setMinutes(setHours(addDays(new Date(), 1), 10), 0);
  const defaultReturn = setMinutes(setHours(addDays(new Date(), 3), 10), 0);
  
  const [pickupDate, setPickupDate] = useState(format(defaultPickup, 'yyyy-MM-dd'));
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnDate, setReturnDate] = useState(format(defaultReturn, 'yyyy-MM-dd'));
  const [returnTime, setReturnTime] = useState('10:00');

  const tripDays = useMemo(() => {
    try {
      const start = new Date(`${pickupDate}T${pickupTime}`);
      const end = new Date(`${returnDate}T${returnTime}`);
      return Math.max(1, differenceInDays(end, start));
    } catch {
      return 2;
    }
  }, [pickupDate, pickupTime, returnDate, returnTime]);

  const totalPrice = car ? car.price * tripDays : 0;
  const discount = car?.originalPrice ? (car.originalPrice - car.price) * tripDays : 0;
  const serviceFee = Math.round(totalPrice * 0.12);

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <GuestNavbar />
        <div className="pt-32 pb-16 text-center">
          <Car className="w-16 h-16 mx-auto text-gray-300 dark:text-white/20 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Car Not Found</h1>
          <p className="text-gray-600 dark:text-white/70 mb-6">The car you're looking for doesn't exist or has been removed.</p>
          <Link href="/search">
            <Button variant="primary">Browse All Cars</Button>
          </Link>
        </div>
        <GuestFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <GuestNavbar />

      <main className="pt-20 pb-16">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to search
          </button>
        </div>

        {/* Image Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-gray-200 dark:bg-white/5">
            <img
              src={car.images[currentImage]}
              alt={car.name}
              className="w-full h-full object-cover"
            />

            {/* Image Navigation */}
            {car.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImage((prev) => (prev - 1 + car.images.length) % car.images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentImage((prev) => (prev + 1) % car.images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Thumbnails */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {car.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all",
                        i === currentImage 
                          ? "bg-white w-8" 
                          : "bg-white/50 hover:bg-white/75"
                      )}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition",
                  isFavorite 
                    ? "bg-red-500 text-white" 
                    : "bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-white hover:scale-110"
                )}
              >
                <Heart className={cn("w-5 h-5", isFavorite && "fill-white")} />
              </button>
              <button className="w-12 h-12 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center shadow-lg text-gray-700 dark:text-white hover:scale-110 transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {car.instantBook && (
                <Badge variant="info" className="bg-gradient-to-r from-primary-600 to-primary-500 text-white border-0">
                  <Zap className="w-3.5 h-3.5 mr-1" />
                  Instant Book
                </Badge>
              )}
              {car.originalPrice && (
                <Badge variant="error">
                  {Math.round((1 - car.price / car.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title & Rating */}
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {car.name}
                    </h1>
                    <p className="text-gray-600 dark:text-white/70 mt-1">{car.year}</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-50 dark:bg-yellow-500/10">
                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    <span className="font-bold text-gray-900 dark:text-white">{car.rating}</span>
                    <span className="text-gray-500 dark:text-white/60">({car.trips} trips)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-white/70">
                  <MapPin className="w-4 h-4" />
                  <span>{car.location.area}, {car.location.city}</span>
                </div>
              </div>

              {/* Specs */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/5">
                  <Fuel className="w-5 h-5 text-gray-600 dark:text-white/70" />
                  <span className="text-gray-900 dark:text-white font-medium">{car.fuel}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/5">
                  <Settings className="w-5 h-5 text-gray-600 dark:text-white/70" />
                  <span className="text-gray-900 dark:text-white font-medium">{car.transmission}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/5">
                  <Users className="w-5 h-5 text-gray-600 dark:text-white/70" />
                  <span className="text-gray-900 dark:text-white font-medium">{car.seats} Seats</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/5">
                  <span className="text-gray-900 dark:text-white font-medium">{car.mileage}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">About this car</h2>
                <p className="text-gray-600 dark:text-white/70 leading-relaxed">{car.description}</p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {car.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-gray-700 dark:text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guidelines */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Guidelines</h2>
                <ul className="space-y-2">
                  {car.guidelines.map((guideline, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-white/70">
                      <span className="text-primary-600 dark:text-accent-cyan mt-1">•</span>
                      {guideline}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Host */}
              <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Hosted by</h2>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                    {car.host.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{car.host.name}</span>
                      {car.host.verified && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      {car.host.superhost && (
                        <Badge variant="warning" size="sm">
                          <Crown className="w-3 h-3 mr-1" />
                          Superhost
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-white/70">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        {car.host.rating} rating
                      </div>
                      <span>Joined {car.host.joined}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-sm text-gray-600 dark:text-white/70">
                      <Clock className="w-4 h-4" />
                      Responds {car.host.responseTime}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Message
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-lg">
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ₹{car.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 dark:text-white/60">/day</span>
                  </div>
                  {car.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{car.originalPrice.toLocaleString()}/day
                    </span>
                  )}
                </div>

                {/* Date Pickers */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                      Pickup
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        min={format(new Date(), 'yyyy-MM-dd')}
                        className={cn(
                          "flex-1 px-3 py-2 rounded-lg border",
                          "bg-white dark:bg-gray-800",
                          "border-gray-300 dark:border-white/10",
                          "text-gray-900 dark:text-white",
                          "focus:outline-none focus:ring-2 focus:ring-primary-600"
                        )}
                      />
                      <input
                        type="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className={cn(
                          "w-24 px-3 py-2 rounded-lg border",
                          "bg-white dark:bg-gray-800",
                          "border-gray-300 dark:border-white/10",
                          "text-gray-900 dark:text-white",
                          "focus:outline-none focus:ring-2 focus:ring-primary-600"
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                      Return
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        min={pickupDate}
                        className={cn(
                          "flex-1 px-3 py-2 rounded-lg border",
                          "bg-white dark:bg-gray-800",
                          "border-gray-300 dark:border-white/10",
                          "text-gray-900 dark:text-white",
                          "focus:outline-none focus:ring-2 focus:ring-primary-600"
                        )}
                      />
                      <input
                        type="time"
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        className={cn(
                          "w-24 px-3 py-2 rounded-lg border",
                          "bg-white dark:bg-gray-800",
                          "border-gray-300 dark:border-white/10",
                          "text-gray-900 dark:text-white",
                          "focus:outline-none focus:ring-2 focus:ring-primary-600"
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 py-4 border-t border-b border-gray-200 dark:border-white/10 mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-white/70">
                    <span>₹{car.price.toLocaleString()} x {tripDays} day{tripDays > 1 ? 's' : ''}</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600 dark:text-white/70">
                    <span>Service fee</span>
                    <span>₹{serviceFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-white/70">
                    <span>Security deposit (refundable)</span>
                    <span>₹{car.deposit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-white/10">
                    <span className="font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      ₹{(totalPrice - discount + serviceFee + car.deposit).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Book Button */}
                <Button variant="primary" className="w-full py-4">
                  {car.instantBook ? 'Book Instantly' : 'Request to Book'}
                </Button>

                {/* Trust Badges */}
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-white/60">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    Verified
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Insured
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <GuestFooter />
    </div>
  );
}
