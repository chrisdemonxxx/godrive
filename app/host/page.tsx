'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GuestNavbar } from '@/components/layout/GuestNavbar';
import { GuestFooter } from '@/components/layout/GuestFooter';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils/cn';
import { 
  Car, TrendingUp, Shield, Wallet, Calendar, 
  CheckCircle, ArrowRight, Calculator, Star, Users
} from 'lucide-react';
import { toast } from 'sonner';

const benefits = [
  {
    icon: Wallet,
    title: 'Earn ₹30,000+/Month',
    description: 'Top hosts earn over ₹30,000 monthly with just one car. Your car could be generating income when you are not using it.',
  },
  {
    icon: TrendingUp,
    title: 'Only 20% Commission',
    description: 'We take the lowest commission in the industry. You keep 80% of every booking - much better than competitors at 40%.',
  },
  {
    icon: Shield,
    title: 'Full Protection',
    description: 'Comprehensive insurance covers your car. All guests are verified with ID and driving license checks.',
  },
  {
    icon: Calendar,
    title: 'You Are in Control',
    description: 'Set your own prices, availability, and rules. Accept or decline booking requests. Cancel anytime.',
  },
];

const testimonials = [
  {
    name: 'Arjun Reddy',
    car: 'BMW 3 Series',
    earnings: '₹45,000/month',
    quote: 'GoDrive transformed my idle car into a passive income source. The 20% commission means I actually make money!',
  },
  {
    name: 'Sneha Kulkarni',
    car: 'Toyota Fortuner',
    earnings: '₹38,000/month',
    quote: 'The support team is incredible. They helped me set up everything and I got my first booking within 2 days.',
  },
  {
    name: 'Vikram Joshi',
    car: 'Porsche Cayenne',
    earnings: '₹55,000/month',
    quote: 'My Porsche was just sitting in the garage. Now it earns more than my monthly EMI. Best decision ever.',
  },
];

export default function HostPage() {
  const [carPrice, setCarPrice] = useState('2000');
  const [daysPerMonth, setDaysPerMonth] = useState('15');

  const dailyRate = parseInt(carPrice) || 0;
  const days = parseInt(daysPerMonth) || 0;
  const grossEarnings = dailyRate * days;
  const platformFee = Math.round(grossEarnings * 0.20);
  const netEarnings = grossEarnings - platformFee;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <GuestNavbar />

      <main className="pt-20">
        {/* Hero */}
        <section className={cn(
          "relative py-20 md:py-32 px-4 sm:px-6 lg:px-8",
          "bg-gradient-to-br from-primary-600 via-primary-700 to-blue-800",
          "text-white overflow-hidden"
        )}>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6",
                  "bg-white/20 backdrop-blur-sm"
                )}>
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-semibold">Trusted by 100+ Hosts</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Turn Your Car Into a
                  <span className="block text-yellow-300">Money Machine</span>
                </h1>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  Join 100+ Bangalore hosts earning passive income. We only take 20% — 
                  the lowest in India. Get verified in 24 hours and start earning.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-primary-600 hover:bg-gray-100"
                    onClick={() => toast.success('Coming soon! Our team will contact you.')}
                  >
                    <Car className="w-5 h-5 mr-2" />
                    List Your Car
                  </Button>
                  <a href="#calculator">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-white text-white hover:bg-white/10"
                    >
                      <Calculator className="w-5 h-5 mr-2" />
                      Calculate Earnings
                    </Button>
                  </a>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
                  <div>
                    <div className="text-3xl font-bold">₹30K+</div>
                    <div className="text-white/60 text-sm">Avg Monthly Earnings</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">20%</div>
                    <div className="text-white/60 text-sm">Platform Fee</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">24hr</div>
                    <div className="text-white/60 text-sm">Quick Verification</div>
                  </div>
                </div>
              </div>

              {/* Earnings Calculator */}
              <div id="calculator" className={cn(
                "p-8 rounded-3xl",
                "bg-white text-gray-900",
                "shadow-2xl"
              )}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-primary-600" />
                  Earnings Calculator
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Daily Rate (₹)
                    </label>
                    <Input
                      type="number"
                      value={carPrice}
                      onChange={(e) => setCarPrice(e.target.value)}
                      placeholder="2000"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Average rates: Hatchback ₹1,500 | Sedan ₹2,500 | SUV ₹4,000
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Booking Days/Month
                    </label>
                    <Input
                      type="number"
                      value={daysPerMonth}
                      onChange={(e) => setDaysPerMonth(e.target.value)}
                      placeholder="15"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Most hosts book 12-20 days/month
                    </p>
                  </div>

                  <div className={cn(
                    "p-6 rounded-xl",
                    "bg-gradient-to-br from-primary-50 to-blue-50"
                  )}>
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>Gross Earnings</span>
                        <span>₹{grossEarnings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Platform Fee (20%)</span>
                        <span className="text-red-500">-₹{platformFee.toLocaleString()}</span>
                      </div>
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex justify-between">
                          <span className="font-bold text-gray-900">Your Earnings</span>
                          <span className="text-2xl font-bold text-green-600">
                            ₹{netEarnings.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Per month</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    className="w-full py-4"
                    onClick={() => toast.success('Coming soon! Our team will contact you.')}
                  >
                    Get Started Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Host on GoDrive?
              </h2>
              <p className="text-lg text-gray-600 dark:text-white/70">
                The smartest way to earn from your car
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={i}
                    className={cn(
                      "p-8 rounded-2xl text-center",
                      "bg-white dark:bg-white/5",
                      "border border-gray-200 dark:border-white/10",
                      "hover:shadow-xl transition-shadow"
                    )}
                  >
                    <div className={cn(
                      "w-16 h-16 rounded-2xl mx-auto mb-6",
                      "bg-gradient-to-br from-primary-500 to-primary-600",
                      "flex items-center justify-center",
                      "shadow-lg"
                    )}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-white/70">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Host Success Stories
              </h2>
              <p className="text-lg text-gray-600 dark:text-white/70">
                Real hosts sharing their experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-8 rounded-2xl",
                    "bg-white dark:bg-white/5",
                    "border border-gray-200 dark:border-white/10"
                  )}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={cn(
                      "w-14 h-14 rounded-full",
                      "bg-gradient-to-br from-primary-500 to-primary-600",
                      "flex items-center justify-center",
                      "text-white font-bold text-lg"
                    )}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{t.name}</p>
                      <p className="text-sm text-gray-500 dark:text-white/60">{t.car}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-white/70 mb-4 italic">
                    "{t.quote}"
                  </p>
                  <div className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full",
                    "bg-green-100 dark:bg-green-500/20",
                    "text-green-700 dark:text-green-400 font-semibold"
                  )}>
                    <TrendingUp className="w-4 h-4" />
                    {t.earnings}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Get Started in 3 Steps
              </h2>
            </div>

            <div className="space-y-8">
              {[
                { step: '1', title: 'List Your Car', desc: 'Add photos, set your price, and describe your car. Takes just 10 minutes.' },
                { step: '2', title: 'Get Verified', desc: 'Our team reviews your listing and verifies documents within 24-48 hours.' },
                { step: '3', title: 'Start Earning', desc: 'Accept bookings and receive payments directly to your bank account.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex-shrink-0",
                    "bg-gradient-to-br from-primary-500 to-primary-600",
                    "flex items-center justify-center",
                    "text-white font-bold text-xl"
                  )}>
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-white/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                variant="primary"
                size="lg"
                onClick={() => toast.success('Coming soon! Our team will contact you.')}
              >
                <Car className="w-5 h-5 mr-2" />
                List Your Car Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      <GuestFooter />
    </div>
  );
}
