'use client';

import Link from 'next/link';
import { Zap, TrendingUp, Wallet, Users, Star, ArrowRight, Car } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

export function HostCTA() {
  const stats = [
    { icon: TrendingUp, value: '₹30K+', label: 'Avg Monthly Earnings' },
    { icon: Wallet, value: '20%', label: 'Our Commission' },
    { icon: Users, value: '100+', label: 'Active Hosts' },
    { icon: Star, value: '4.9★', label: 'Host Rating' },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "relative rounded-3xl p-12 lg:p-20",
          "bg-gradient-to-br from-primary-600 via-primary-700 to-blue-700",
          "text-white overflow-hidden"
        )}>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6",
                "bg-white/20 backdrop-blur-sm"
              )}>
                <Zap className="w-4 h-4" />
                <span className="text-sm font-semibold">Become a Host</span>
              </div>
              <h2 className={cn(
                "text-4xl lg:text-5xl font-bold mb-6 leading-tight"
              )}>
                Your Car Can Earn
                <span className="block text-yellow-300 mt-2">₹30,000+/Month</span>
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Join 100+ hosts earning passive income. We only take 20% — you keep 80% of every booking. No lock-in, cancel anytime.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/host">
                  <Button
                    variant="secondary"
                    className="bg-white text-primary-600 hover:bg-gray-100"
                  >
                    <Car className="w-5 h-5 mr-2" />
                    Start Earning
                  </Button>
                </Link>
                <Link href="/host/calculator">
                  <Button
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10"
                  >
                    Calculate Earnings
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className={cn(
                      "bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center",
                      "border border-white/20 hover:bg-white/20 transition"
                    )}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-white/70">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

