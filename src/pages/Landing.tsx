import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Clock, Wallet, MapPin, Star, 
  Car, Key, CreditCard, Search,
  Users, Fuel, ArrowRight, Instagram, Twitter, 
  Linkedin, Facebook, Headphones, BadgeCheck,
  Sparkles, TrendingUp, Heart, Zap
} from 'lucide-react';
import { SearchForm } from '@/shared/components/SearchForm';

// Premium car images (use real car images)
const HERO_CARS = [
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80', // Red sports car
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80', // Ferrari
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80', // Porsche
];

const POPULAR_CARS = [
  {
    id: '1',
    name: 'Hyundai i20',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80',
    price: 1500,
    rating: 4.8,
    trips: 45,
    location: 'Koramangala',
    fuel: 'Petrol',
    seats: 5,
    transmission: 'Manual',
  },
  {
    id: '2',
    name: 'Maruti Swift',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80',
    price: 1200,
    rating: 4.9,
    trips: 78,
    location: 'Indiranagar',
    fuel: 'Petrol',
    seats: 5,
    transmission: 'Manual',
  },
  {
    id: '3',
    name: 'Honda City',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&q=80',
    price: 2200,
    rating: 4.7,
    trips: 32,
    location: 'HSR Layout',
    fuel: 'Petrol',
    seats: 5,
    transmission: 'Automatic',
  },
  {
    id: '4',
    name: 'Hyundai Creta',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&q=80',
    price: 2800,
    rating: 4.9,
    trips: 56,
    location: 'Whitefield',
    fuel: 'Diesel',
    seats: 5,
    transmission: 'Automatic',
  },
];

const TESTIMONIALS = [
  {
    name: 'Rahul Sharma',
    avatar: 'R',
    role: 'Software Engineer',
    text: 'Best car rental experience in Bangalore! The car was spotless, and the host was super responsive. No hidden charges, unlike other platforms.',
    rating: 5,
    trip: 'Bangalore to Coorg',
  },
  {
    name: 'Priya Mehta',
    avatar: 'P',
    role: 'Marketing Manager',
    text: 'Finally, a platform that cares about customers! Support answered my call in 20 seconds. The 20% commission means hosts offer better cars.',
    rating: 5,
    trip: 'Weekend trip to Mysore',
  },
  {
    name: 'Arjun Reddy',
    avatar: 'A',
    role: 'Startup Founder',
    text: 'I\'ve listed 3 cars on GoDrive. Making ₹45K/month passive income. Much better than Zoomcar where they take 40% commission.',
    rating: 5,
    trip: 'Host since 2024',
  },
];

const VALUE_PROPS = [
  {
    icon: Shield,
    title: 'No Hidden Fees',
    description: 'What you see is what you pay. No surge pricing, no surprise charges at pickup. Ever.',
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Headphones,
    title: '30-Second Support',
    description: 'Real humans answer your calls. Not bots, not IVRs, not 30-minute hold queues.',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50 text-blue-600',
  },
  {
    icon: BadgeCheck,
    title: 'Every Car Inspected',
    description: 'Our team physically verifies every car before it goes live. No unpleasant surprises.',
    color: 'bg-violet-500',
    lightColor: 'bg-violet-50 text-violet-600',
  },
  {
    icon: Wallet,
    title: '20% Host Commission',
    description: 'Hosts keep 80% of earnings. Better economics = better cars on the platform.',
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50 text-amber-600',
  },
  {
    icon: MapPin,
    title: 'Doorstep Delivery',
    description: 'Get the car delivered to your location. Or pick up directly from the host.',
    color: 'bg-rose-500',
    lightColor: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Hourly, daily, or weekly rentals. Start and end your trip on your schedule.',
    color: 'bg-cyan-500',
    lightColor: 'bg-cyan-50 text-cyan-600',
  },
];

const HOW_IT_WORKS = [
  { step: 1, icon: Search, title: 'Search', desc: 'Enter your location, dates, and preferred car type' },
  { step: 2, icon: Car, title: 'Choose', desc: 'Browse verified cars with real photos and reviews' },
  { step: 3, icon: CreditCard, title: 'Book', desc: 'Pay securely via UPI. Instant confirmation.' },
  { step: 4, icon: Key, title: 'Drive', desc: 'Pick up the car and enjoy your journey!' },
];

export default function Landing() {
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  // Rotate hero car images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarIndex((prev) => (prev + 1) % HERO_CARS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">GoDrive</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link to="/search" className="text-gray-600 hover:text-gray-900 font-medium">Find a Car</Link>
              <Link to="/host/become" className="text-gray-600 hover:text-gray-900 font-medium">List Your Car</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 font-medium">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 font-medium">Support</Link>
            </div>
            
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-gray-700 hover:text-gray-900 font-medium px-4 py-2">
                Sign In
              </Link>
              <Link 
                to="/login" 
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-5 py-2.5 rounded-xl transition shadow-lg shadow-primary-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-40 left-10 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-12rem)]">
            {/* Left Content */}
            <div className="text-white space-y-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                </span>
                <span className="text-sm font-medium">500+ Happy Customers in Bangalore</span>
              </div>
              
              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Drive Your Way.
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400">
                  Your Car Awaits.
                </span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                Rent verified self-drive cars in Bangalore. No hidden fees. 
                Real humans answer in 30 seconds. Every car inspected.
              </p>
              
              {/* Search Form */}
              <div className="pt-4">
                <SearchForm />
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="text-center">
                  <p className="text-4xl font-bold">200+</p>
                  <p className="text-gray-400 text-sm mt-1">Verified Cars</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold">4.8<span className="text-yellow-400">★</span></p>
                  <p className="text-gray-400 text-sm mt-1">Average Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary-400">20%</p>
                  <p className="text-gray-400 text-sm mt-1">Host Commission</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold">30<span className="text-sm font-normal">sec</span></p>
                  <p className="text-gray-400 text-sm mt-1">Support Response</p>
                </div>
              </div>
            </div>
            
            {/* Right - Car Display */}
            <div className="relative hidden lg:block">
              {/* Main car image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent rounded-3xl" />
                <img
                  src={HERO_CARS[currentCarIndex]}
                  alt="Premium car"
                  className="w-full h-[500px] object-cover rounded-3xl shadow-2xl transition-all duration-1000"
                />
                
                {/* Image indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {HERO_CARS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentCarIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentCarIndex ? 'bg-white w-6' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -left-8 top-20 bg-white rounded-2xl p-4 shadow-2xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">100% Insured</p>
                    <p className="text-xs text-gray-500">All trips covered</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-4 top-40 bg-white rounded-2xl p-4 shadow-2xl animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Headphones className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">30 Sec Response</p>
                    <p className="text-xs text-gray-500">Real human support</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -left-4 bottom-20 bg-white rounded-2xl p-4 shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">4.8★ Rated</p>
                    <p className="text-xs text-gray-500">By 500+ customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Trusted By / Social Proof Bar */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <p className="text-gray-400 text-sm font-medium">TRUSTED BY TEAMS AT</p>
            {['Google', 'Microsoft', 'Flipkart', 'Infosys', 'Wipro'].map((company) => (
              <span key={company} className="text-gray-300 font-bold text-xl">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Why Choose GoDrive
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              The <span className="text-primary-600">Smarter</span> Way to Rent Cars
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We built GoDrive because we were tired of hidden fees, poor support, and unreliable cars. Here's how we're different.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VALUE_PROPS.map((prop, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 ${prop.lightColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <prop.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{prop.title}</h3>
                <p className="text-gray-600 leading-relaxed">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How GoDrive Works
            </h2>
            <p className="text-xl text-gray-600">Book your perfect car in under 2 minutes</p>
          </div>
          
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-500 to-primary-200" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={i} className="relative text-center group">
                  <div className="relative z-10 w-20 h-20 bg-primary-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white text-sm font-bold rounded-full flex items-center justify-center z-20">
                    {step.step}
                  </span>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cars */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <TrendingUp className="w-4 h-4" />
                Most Booked
              </span>
              <h2 className="text-4xl font-bold text-gray-900">Popular Cars in Bangalore</h2>
            </div>
            <Link 
              to="/search" 
              className="flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all"
            >
              View All Cars <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_CARS.map((car) => (
              <Link 
                key={car.id} 
                to={`/cars/${car.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm">{car.rating}</span>
                    <span className="text-gray-500 text-xs">({car.trips} trips)</span>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-primary-600 transition">
                    {car.name}
                  </h3>
                  <p className="text-gray-500 text-sm flex items-center gap-1 mb-3">
                    <MapPin className="w-4 h-4" />
                    {car.location}
                  </p>
                  
                  <div className="flex gap-2 mb-4">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md flex items-center gap-1">
                      <Fuel className="w-3 h-3" /> {car.fuel}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md flex items-center gap-1">
                      <Users className="w-3 h-3" /> {car.seats}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                      {car.transmission}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <span className="text-2xl font-bold text-primary-600">₹{car.price.toLocaleString()}</span>
                      <span className="text-gray-500 text-sm">/day</span>
                    </div>
                    <span className="text-xs text-gray-400">Excl. fuel</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-white/20">
              <Heart className="w-4 h-4" />
              Customer Love
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by Bangalore</h2>
            <p className="text-xl text-gray-400">Real reviews from real customers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div 
                key={i} 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center font-bold text-lg">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-gray-400">{t.trip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Host CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-blue-700 rounded-3xl p-12 lg:p-20 text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Zap className="w-4 h-4" />
                  Become a Host
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Your Car Can Earn
                  <span className="block text-yellow-300">₹30,000+/Month</span>
                </h2>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  Join 100+ hosts earning passive income. We only take 20% — you keep 80% of every booking. No lock-in, cancel anytime.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/host/become"
                    className="bg-white text-primary-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition flex items-center gap-2 shadow-lg"
                  >
                    Start Earning <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link 
                    to="/host/calculator"
                    className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition"
                  >
                    Calculate Earnings
                  </Link>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '₹30K+', label: 'Avg Monthly Earnings', icon: TrendingUp },
                  { value: '20%', label: 'Our Commission', icon: Wallet },
                  { value: '100+', label: 'Active Hosts', icon: Users },
                  { value: '4.9★', label: 'Host Rating', icon: Star },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition">
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Download CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Coming Soon to Mobile</h2>
            <p className="text-xl text-gray-600 mb-8">Get notified when our app launches</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="bg-primary-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-primary-700 transition shadow-lg shadow-primary-200">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">GoDrive</span>
              </Link>
              <p className="text-gray-400 mb-6 max-w-sm">
                India's most trusted peer-to-peer car rental platform. Rent verified cars or list yours to earn passive income.
              </p>
              <div className="flex gap-4">
                {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                  <a 
                    key={i}
                    href="#" 
                    className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary-500 transition"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Links */}
            {[
              {
                title: 'For Guests',
                links: [
                  { label: 'Search Cars', href: '/search' },
                  { label: 'How it Works', href: '/#how-it-works' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'FAQs', href: '/faq' },
                ],
              },
              {
                title: 'For Hosts',
                links: [
                  { label: 'List Your Car', href: '/host/become' },
                  { label: 'Host Calculator', href: '/host/calculator' },
                  { label: 'Host FAQs', href: '/host/faq' },
                  { label: 'Insurance', href: '/insurance' },
                ],
              },
              {
                title: 'Company',
                links: [
                  { label: 'About Us', href: '/about' },
                  { label: 'Careers', href: '/careers' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'Contact', href: '/contact' },
                ],
              },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-6">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <Link to={link.href} className="text-gray-400 hover:text-white transition">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Bottom */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 GoDrive. All rights reserved. Made with ❤️ in Bangalore
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link to="/terms" className="hover:text-white transition">Terms</Link>
              <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
              <Link to="/refund" className="hover:text-white transition">Refund Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
