'use client';

import { Shield, Zap, Crown, Phone, TrendingUp, Fingerprint } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils/cn';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  gradient: string;
}

const features: Feature[] = [
  { 
    icon: Shield, 
    title: 'Zero Worry', 
    desc: 'Comprehensive insurance with zero excess option',
    gradient: 'from-green-500 to-cyan-500'
  },
  { 
    icon: Zap, 
    title: 'Instant Access', 
    desc: 'Book in seconds, drive in minutes',
    gradient: 'from-cyan-500 to-purple-500'
  },
  { 
    icon: Crown, 
    title: 'Superhost Network', 
    desc: 'Curated hosts with exceptional ratings',
    gradient: 'from-purple-500 to-pink-500'
  },
  { 
    icon: Phone, 
    title: '24/7 Concierge', 
    desc: 'Premium support whenever you need',
    gradient: 'from-pink-500 to-yellow-500'
  },
  { 
    icon: TrendingUp, 
    title: 'Fair Pricing', 
    desc: 'Only 20% commission for hosts',
    gradient: 'from-yellow-500 to-green-500'
  },
  { 
    icon: Fingerprint, 
    title: 'Verified Users', 
    desc: 'Multi-layer verification for safety',
    gradient: 'from-cyan-500 to-green-500'
  },
];

export function WhyGoDrive() {
  return (
    <section className={cn(
      "py-20 md:py-32",
      "bg-gradient-to-b from-purple-50/50 to-transparent",
      "dark:from-purple-500/5 dark:to-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={cn(
            "text-4xl md:text-5xl font-bold mb-4",
            "text-gray-900 dark:text-white"
          )}>
            Why <span className="gradient-text">GoDrive</span>?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-white/70">
            The future of premium mobility
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card
                key={i}
                variant="default"
                hover
                className={cn(
                  "p-8",
                  "border-gray-100 dark:border-white/10"
                )}
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl mb-6",
                  "bg-gradient-to-br",
                  feature.gradient,
                  "flex items-center justify-center",
                  "shadow-lg"
                )}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className={cn(
                  "text-xl font-semibold mb-2",
                  "text-gray-900 dark:text-white"
                )}>
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-white/70 leading-relaxed">
                  {feature.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

