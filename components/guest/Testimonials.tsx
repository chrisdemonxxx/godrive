'use client';

import { Star, Heart } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils/cn';

interface Testimonial {
  name: string;
  avatar: string;
  role: string;
  text: string;
  rating: number;
  trip: string;
}

const testimonials: Testimonial[] = [
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
    text: "I've listed 3 cars on GoDrive. Making ₹45K/month passive income. Much better than Zoomcar where they take 40% commission.",
    rating: 5,
    trip: 'Host since 2024',
  },
];

export function Testimonials() {
  return (
    <section className={cn(
      "py-20 md:py-32",
      "bg-slate-900 dark:bg-[#0a0118]",
      "text-white relative overflow-hidden"
    )}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6",
            "bg-white/10 backdrop-blur-sm border border-white/20"
          )}>
            <Heart className="w-4 h-4" />
            <span className="text-sm font-semibold">Customer Love</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by Bangalore
          </h2>
          <p className="text-xl text-white/60">
            Real reviews from real customers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card
              key={i}
              variant="glass"
              className={cn(
                "p-8",
                "bg-white/5 backdrop-blur-sm",
                "border-white/10"
              )}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-white/80 mb-6 text-lg leading-relaxed">
                &quot;{t.text}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-full",
                  "bg-gradient-primary",
                  "flex items-center justify-center",
                  "font-bold text-lg text-white"
                )}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-white/60">{t.trip}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

