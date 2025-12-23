'use client';

import Link from 'next/link';
import { Car, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export function GuestFooter() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Safety', href: '/safety' },
      { label: 'Insurance', href: '/insurance' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Report Issue', href: '/report' },
    ],
    legal: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Cancellation Policy', href: '/cancellation' },
      { label: 'Refund Policy', href: '/refund' },
    ],
    drive: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Search Cars', href: '/search' },
      { label: 'Download App', href: '/app' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer className={cn(
      "relative z-10",
      "bg-slate-900 dark:bg-[#0a0118]",
      "text-white pt-20 pb-8",
      "border-t border-white/10"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className={cn(
                "w-10 h-10 rounded-xl",
                "bg-gradient-primary",
                "flex items-center justify-center",
                "shadow-glow-cyan",
                "transition-transform group-hover:scale-105"
              )}>
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">GoDrive</span>
            </Link>
            <p className="text-white/60 mb-6 max-w-sm leading-relaxed">
              India's most trusted peer-to-peer car rental platform. Rent verified cars or list yours to earn passive income.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-10 h-10 rounded-xl",
                      "bg-white/10 hover:bg-primary-600 dark:hover:bg-accent-cyan",
                      "flex items-center justify-center",
                      "transition-all hover:scale-110"
                    )}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-semibold mb-6 text-white">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-white">Support</h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-white">Legal</h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className={cn(
          "border-t border-white/10 pt-8",
          "flex flex-col md:flex-row justify-between items-center gap-4"
        )}>
          <p className="text-white/60 text-sm">
            © {currentYear} GoDrive. All rights reserved. Made with ❤️ in Bangalore
          </p>
          <div className="flex gap-6 text-sm text-white/60">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/refund" className="hover:text-white transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

