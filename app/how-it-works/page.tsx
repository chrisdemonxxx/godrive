'use client';

import Link from 'next/link';
import { GuestNavbar } from '@/components/layout/GuestNavbar';
import { GuestFooter } from '@/components/layout/GuestFooter';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';
import { 
  Search, Calendar, Car, Key, Star, Shield, 
  CreditCard, Phone, CheckCircle, ArrowRight 
} from 'lucide-react';

const guestSteps = [
  {
    icon: Search,
    title: 'Find Your Car',
    description: 'Browse hundreds of verified cars across Bangalore. Filter by location, date, price, and features.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Calendar,
    title: 'Book Instantly',
    description: 'Select your dates and book in seconds. Many cars offer instant booking with no wait time.',
    color: 'from-cyan-500 to-green-500',
  },
  {
    icon: Key,
    title: 'Pick Up & Drive',
    description: 'Meet the host at the pickup location. Quick handover and you are ready to hit the road.',
    color: 'from-green-500 to-yellow-500',
  },
  {
    icon: Star,
    title: 'Return & Review',
    description: 'Return the car at the agreed location. Leave a review to help others find great cars.',
    color: 'from-yellow-500 to-orange-500',
  },
];

const hostSteps = [
  {
    icon: Car,
    title: 'List Your Car',
    description: 'Create your listing in minutes. Add photos, set your price, and describe your car.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Phone,
    title: 'Get Verified',
    description: 'Our team verifies your documents and inspects your car. Takes just 24-48 hours.',
    color: 'from-pink-500 to-red-500',
  },
  {
    icon: CreditCard,
    title: 'Accept Bookings',
    description: 'Approve booking requests and hand over the keys. We handle payments securely.',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: CheckCircle,
    title: 'Get Paid',
    description: 'Receive 80% of the booking amount directly to your bank account weekly.',
    color: 'from-orange-500 to-yellow-500',
  },
];

const faqs = [
  {
    q: 'What documents do I need to rent a car?',
    a: 'You need a valid driving license and Aadhaar card. International visitors can use their passport with a valid International Driving Permit.',
  },
  {
    q: 'Is insurance included?',
    a: 'Yes! All rentals include comprehensive insurance with zero excess option available. You are covered from the moment you pick up the car.',
  },
  {
    q: 'What is the cancellation policy?',
    a: 'Free cancellation up to 24 hours before pickup. Cancellations within 24 hours may incur a 50% charge.',
  },
  {
    q: 'How much can I earn as a host?',
    a: 'Top hosts earn ₹30,000-50,000 per month. Your earnings depend on your car type, availability, and pricing.',
  },
  {
    q: 'What commission does GoDrive charge?',
    a: 'We only take 20% commission - much lower than competitors. You keep 80% of every booking.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <GuestNavbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              How <span className="gradient-text">GoDrive</span> Works
            </h1>
            <p className="text-xl text-gray-600 dark:text-white/70 mb-8">
              Renting a car or earning from your car has never been easier. 
              Simple, transparent, and secure.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/search">
                <Button variant="primary" size="lg">
                  <Search className="w-5 h-5 mr-2" />
                  Find a Car
                </Button>
              </Link>
              <Link href="/host">
                <Button variant="outline" size="lg">
                  <Car className="w-5 h-5 mr-2" />
                  List Your Car
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* For Guests */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                For Guests
              </h2>
              <p className="text-lg text-gray-600 dark:text-white/70">
                Book your perfect ride in 4 simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {guestSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="relative">
                    {/* Connector Line */}
                    {i < guestSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-200 dark:from-white/10 dark:to-white/10">
                        <ArrowRight className="absolute -right-3 -top-2 w-5 h-5 text-gray-300 dark:text-white/20" />
                      </div>
                    )}
                    
                    <div className={cn(
                      "p-8 rounded-2xl text-center relative z-10",
                      "bg-white dark:bg-white/5",
                      "border border-gray-200 dark:border-white/10"
                    )}>
                      <div className={cn(
                        "w-16 h-16 rounded-2xl mx-auto mb-6",
                        "bg-gradient-to-br",
                        step.color,
                        "flex items-center justify-center",
                        "shadow-lg"
                      )}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-sm font-medium text-primary-600 dark:text-accent-cyan mb-2">
                        Step {i + 1}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-white/70">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* For Hosts */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                For Hosts
              </h2>
              <p className="text-lg text-gray-600 dark:text-white/70">
                Start earning from your car in 4 easy steps
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {hostSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="relative">
                    {i < hostSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-200 dark:from-white/10 dark:to-white/10">
                        <ArrowRight className="absolute -right-3 -top-2 w-5 h-5 text-gray-300 dark:text-white/20" />
                      </div>
                    )}
                    
                    <div className={cn(
                      "p-8 rounded-2xl text-center relative z-10",
                      "bg-white dark:bg-white/5",
                      "border border-gray-200 dark:border-white/10"
                    )}>
                      <div className={cn(
                        "w-16 h-16 rounded-2xl mx-auto mb-6",
                        "bg-gradient-to-br",
                        step.color,
                        "flex items-center justify-center",
                        "shadow-lg"
                      )}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-sm font-medium text-primary-600 dark:text-accent-cyan mb-2">
                        Step {i + 1}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-white/70">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Safety Features */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Safety & Trust
                </h2>
                <p className="text-lg text-gray-600 dark:text-white/70 mb-8">
                  Your safety is our top priority. Every car and user is verified before they can use the platform.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Shield, text: 'Comprehensive insurance on all trips' },
                    { icon: CheckCircle, text: 'Verified hosts and guests with ID verification' },
                    { icon: Phone, text: '24/7 roadside assistance and support' },
                    { icon: CreditCard, text: 'Secure payments with fraud protection' },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-lg",
                          "bg-green-100 dark:bg-green-500/20",
                          "flex items-center justify-center"
                        )}>
                          <Icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-gray-700 dark:text-white/80">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={cn(
                "p-8 rounded-2xl",
                "bg-gradient-to-br from-primary-500 to-primary-700",
                "text-white"
              )}>
                <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
                <p className="text-white/80 mb-6">
                  Our support team is available 24/7 to help you with any questions or issues.
                </p>
                <div className="space-y-3">
                  <a href="tel:+919876543210" className="flex items-center gap-3 text-white hover:underline">
                    <Phone className="w-5 h-5" />
                    +91 98765 43210
                  </a>
                  <a href="mailto:support@godrive.in" className="flex items-center gap-3 text-white hover:underline">
                    <span className="w-5 h-5 flex items-center justify-center">@</span>
                    support@godrive.in
                  </a>
                </div>
                <Button variant="secondary" className="mt-6 bg-white text-primary-600 hover:bg-gray-100">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className={cn(
                    "group p-6 rounded-2xl",
                    "bg-white dark:bg-white/5",
                    "border border-gray-200 dark:border-white/10",
                    "[&_summary::-webkit-details-marker]:hidden"
                  )}
                >
                  <summary className="flex items-center justify-between cursor-pointer">
                    <span className="font-semibold text-gray-900 dark:text-white pr-4">
                      {faq.q}
                    </span>
                    <span className={cn(
                      "w-6 h-6 rounded-full",
                      "bg-gray-100 dark:bg-white/10",
                      "flex items-center justify-center",
                      "text-gray-500 dark:text-white/60",
                      "transition-transform group-open:rotate-45"
                    )}>
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-600 dark:text-white/70">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 dark:text-white/70 mb-8">
              Join thousands of happy customers and hosts on GoDrive
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/search">
                <Button variant="primary" size="lg">
                  Find Your Perfect Car
                </Button>
              </Link>
              <Link href="/host">
                <Button variant="outline" size="lg">
                  Start Earning Today
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <GuestFooter />
    </div>
  );
}
