import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/shared/lib/supabase';
import { toast } from 'sonner';
import { 
  Car, Shield, Clock, Wallet, MapPin, Headphones, CheckCircle,
  Search, Star, TrendingUp, Key, CreditCard, Instagram, Twitter, Linkedin,
  ArrowRight, Sparkles
} from 'lucide-react';
import { Container } from '@/components';
import { Button, Badge } from '@/components';
import { SearchForm } from '@/components/SearchForm';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function Landing(): JSX.Element {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert({
          email: email.trim().toLowerCase(),
          source: 'landing_page',
        });

      if (error) {
        if (error.code === '23505') {
          toast.success('You\'re already on the waitlist!');
        } else {
          throw error;
        }
      } else {
        toast.success('Thanks! We\'ll notify you when we launch.');
        setEmail('');
      }
    } catch (error) {
      console.error('Waitlist error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const testimonials = [
    {
      text: "Best car rental experience in Bangalore! No hidden fees, clean cars, and amazing support.",
      name: "Rahul K.",
      trip: "Coorg Trip - Dec 2024"
    },
    {
      text: "Earned ₹35,000 last month just by renting out my car on weekends. GoDrive made it so easy!",
      name: "Priya S.",
      trip: "Host since Nov 2024"
    },
    {
      text: "30-second response time is real! Had an issue and got help immediately. Highly recommend.",
      name: "Arjun M.",
      trip: "Airport Pickup - Dec 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        {/* Floating gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <Container className="relative z-10 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="text-white space-y-8">
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>500+ Happy Customers in Bangalore</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Drive Your Way.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">
                  Your Car Awaits.
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-lg">
                Rent verified self-drive cars in Bangalore. No hidden fees. 
                Real humans answer in 30 seconds. Every car inspected.
              </p>
              
              {/* Search Box */}
              <div className="bg-white rounded-2xl p-6 shadow-2xl">
                <SearchForm />
              </div>
              
              {/* Stats */}
              <div className="flex gap-8">
                <div>
                  <p className="text-3xl font-bold">200+</p>
                  <p className="text-gray-400 text-sm">Verified Cars</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">4.8★</p>
                  <p className="text-gray-400 text-sm">Average Rating</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">20%</p>
                  <p className="text-gray-400 text-sm">Host Commission</p>
                </div>
              </div>
            </div>
            
            {/* Right: Car showcase */}
            <div className="relative hidden lg:block">
              <div className="w-full h-96 bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-3xl flex items-center justify-center animate-float">
                <Car className="w-64 h-64 text-white/30" />
              </div>
              {/* Floating cards */}
              <div className="absolute -left-8 top-20 bg-white rounded-xl p-4 shadow-xl animate-float-delayed">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">100% Insured</p>
                    <p className="text-xs text-gray-500">All trips covered</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 bottom-32 bg-white rounded-xl p-4 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold">30 Sec Response</p>
                    <p className="text-xs text-gray-500">Real human support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Value Propositions Section */}
      <section className="py-24 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="primary">Why Choose GoDrive</Badge>
            <h2 className="text-4xl font-bold mb-4">
              The <span className="gradient-text">Smarter</span> Way to Rent Cars
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We built GoDrive because we were tired of hidden fees, poor support, and unreliable cars. Here's how we're different.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "No Hidden Fees",
                description: "What you see is what you pay. No surge pricing, no surprise charges at pickup.",
                color: "bg-green-100 text-green-600"
              },
              {
                icon: <Headphones className="w-8 h-8" />,
                title: "30-Second Support",
                description: "Real humans answer your calls. Not bots. Not 30-minute hold queues.",
                color: "bg-blue-100 text-blue-600"
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Every Car Inspected",
                description: "Our team physically verifies every car before it goes live. No surprises.",
                color: "bg-purple-100 text-purple-600"
              },
              {
                icon: <Wallet className="w-8 h-8" />,
                title: "20% Commission",
                description: "Hosts keep 80% of earnings. Not 60% like other platforms.",
                color: "bg-orange-100 text-orange-600"
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Doorstep Delivery",
                description: "Get the car delivered to your location. Or pick up from the host.",
                color: "bg-pink-100 text-pink-600"
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Flexible Timings",
                description: "Hourly, daily, weekly rentals. Start and end on your schedule.",
                color: "bg-cyan-100 text-cyan-600"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 card-hover border border-gray-100">
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How GoDrive Works</h2>
            <p className="text-gray-600">Book your car in under 2 minutes</p>
          </div>
          
          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-primary-500 to-primary-200 -translate-y-1/2" />
            
            <div className="grid lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Search", desc: "Enter your location and dates", icon: <Search className="w-6 h-6" /> },
                { step: "2", title: "Choose", desc: "Browse verified cars near you", icon: <Car className="w-6 h-6" /> },
                { step: "3", title: "Book", desc: "Instant booking via UPI", icon: <CreditCard className="w-6 h-6" /> },
                { step: "4", title: "Drive", desc: "Pick up and hit the road", icon: <Key className="w-6 h-6" /> },
              ].map((item, i) => (
                <div key={i} className="relative text-center">
                  <div className="relative z-10 w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-primary-200">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-900 text-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Bangalore</h2>
            <p className="text-gray-400">Real reviews from real customers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center font-semibold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-gray-400">{t.trip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Host CTA Section */}
      <section className="py-24">
        <Container>
          <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-3xl p-12 lg:p-20 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  Your Car Can Earn ₹30,000+/Month
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  Join 100+ hosts earning passive income. We only take 20% - you keep 80% of every booking.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/host/become">
                    <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100">
                      Start Earning <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Calculate Earnings
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "₹30K+", label: "Avg Monthly Earnings" },
                  { value: "20%", label: "Our Commission" },
                  { value: "100+", label: "Active Hosts" },
                  { value: "4.9★", label: "Host Rating" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
