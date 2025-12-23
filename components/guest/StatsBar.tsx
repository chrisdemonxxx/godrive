'use client';

import { Shield, Clock, Star, Award } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils/cn';

interface Stat {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  color: string;
}

const stats: Stat[] = [
  { 
    icon: Shield, 
    value: '100%', 
    label: 'Verified', 
    color: 'text-green-500 dark:text-green-400' 
  },
  { 
    icon: Clock, 
    value: '<2min', 
    label: 'Response', 
    color: 'text-blue-500 dark:text-accent-cyan' 
  },
  { 
    icon: Star, 
    value: '4.9★', 
    label: 'Rating', 
    color: 'text-yellow-500 dark:text-yellow-400' 
  },
  { 
    icon: Award, 
    value: '20%', 
    label: 'Commission', 
    color: 'text-purple-500 dark:text-purple-400' 
  },
];

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Card
            key={i}
            variant="default"
            className={cn(
              "p-4 md:p-6",
              "flex items-center gap-4",
              "border-gray-100 dark:border-white/10"
            )}
          >
            <div className={cn(
              "w-12 h-12 md:w-14 md:h-14 rounded-xl",
              "flex items-center justify-center",
              "bg-gray-100 dark:bg-white/10"
            )}>
              <Icon className={cn("w-6 h-6 md:w-7 md:h-7", stat.color)} />
            </div>
            <div>
              <div className={cn(
                "text-xl md:text-2xl font-bold",
                "text-gray-900 dark:text-white"
              )}>
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-500 dark:text-white/60">
                {stat.label}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

