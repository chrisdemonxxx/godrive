'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Car, Menu, X, Bell, User, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

export function GuestNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50",
      "bg-white/80 dark:bg-[#030014]/80 backdrop-blur-xl",
      "border-b border-gray-100 dark:border-white/5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className={cn(
              "w-10 h-10 rounded-xl",
              "bg-gradient-primary dark:bg-gradient-primary",
              "flex items-center justify-center",
              "shadow-glow dark:shadow-glow-cyan",
              "transition-transform group-hover:scale-105"
            )}>
              <Car className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className={cn(
                "text-xl font-bold",
                "bg-gradient-primary dark:bg-gradient-primary",
                "bg-clip-text text-transparent"
              )}>
                GoDrive
              </h1>
              <span className="text-[10px] text-primary-600 dark:text-accent-cyan opacity-80 uppercase tracking-wider">
                Premium Mobility
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/search"
              className="text-gray-700 dark:text-white/70 hover:text-primary-600 dark:hover:text-accent-cyan transition-colors font-medium"
            >
              Find a Car
            </Link>
            <Link
              href="/host"
              className="text-gray-700 dark:text-white/70 hover:text-primary-600 dark:hover:text-accent-cyan transition-colors font-medium"
            >
              Become a Host
            </Link>
            <Link
              href="/how-it-works"
              className="text-gray-700 dark:text-white/70 hover:text-primary-600 dark:hover:text-accent-cyan transition-colors font-medium"
            >
              How It Works
            </Link>
            
            <ThemeToggle />
            
            <button className={cn(
              "w-10 h-10 rounded-xl",
              "border border-gray-200 dark:border-white/10",
              "bg-white/50 dark:bg-white/5",
              "flex items-center justify-center",
              "relative",
              "hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
            )}>
              <Bell className="w-5 h-5 text-gray-600 dark:text-white/70" />
              <span className={cn(
                "absolute top-2 right-2 w-2 h-2 rounded-full",
                "bg-primary-600 dark:bg-accent-cyan",
                "ring-2 ring-white dark:ring-[#030014]"
              )} />
            </button>

            <Link href="/login">
              <Button variant="primary" size="sm">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 rounded-xl",
                "text-gray-700 dark:text-white/70",
                "hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              )}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={cn(
            "md:hidden py-4 border-t",
            "border-gray-200 dark:border-white/10"
          )}>
            <nav className="flex flex-col gap-4">
              <Link
                href="/search"
                className="text-gray-700 dark:text-white/70 hover:text-primary-600 dark:hover:text-accent-cyan transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find a Car
              </Link>
              <Link
                href="/host"
                className="text-gray-700 dark:text-white/70 hover:text-primary-600 dark:hover:text-accent-cyan transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Become a Host
              </Link>
              <Link
                href="/how-it-works"
                className="text-gray-700 dark:text-white/70 hover:text-primary-600 dark:hover:text-accent-cyan transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}

