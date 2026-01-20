'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GuestNavbar } from '@/components/layout/GuestNavbar';
import { GuestFooter } from '@/components/layout/GuestFooter';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils/cn';
import { Phone, ArrowRight, Shield, Car } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep('otp');
    toast.success(`OTP sent to +91 ${phone}`);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.success('Login successful!');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <GuestNavbar />

      <main className="pt-24 pb-16">
        <div className="max-w-md mx-auto px-4">
          <div className={cn(
            "p-8 rounded-2xl",
            "bg-white dark:bg-white/5",
            "border border-gray-200 dark:border-white/10",
            "shadow-xl"
          )}>
            {/* Logo */}
            <div className="text-center mb-8">
              <div className={cn(
                "w-16 h-16 rounded-2xl mx-auto mb-4",
                "bg-gradient-primary",
                "flex items-center justify-center",
                "shadow-lg"
              )}>
                <Car className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {step === 'phone' ? 'Welcome to GoDrive' : 'Verify OTP'}
              </h1>
              <p className="text-gray-600 dark:text-white/70">
                {step === 'phone' 
                  ? 'Sign in with your phone number' 
                  : `Enter the 6-digit code sent to +91 ${phone}`}
              </p>
            </div>

            {step === 'phone' ? (
              <form onSubmit={handleSendOTP} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <div className={cn(
                      "flex items-center justify-center px-4 rounded-xl",
                      "bg-gray-100 dark:bg-white/10",
                      "text-gray-600 dark:text-white/70 font-medium"
                    )}>
                      +91
                    </div>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      leftIcon={<Phone className="w-5 h-5" />}
                      className="flex-1"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  className="w-full py-3"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                    Enter OTP
                  </label>
                  <Input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    className="text-center text-2xl tracking-[0.5em] font-mono"
                    maxLength={6}
                  />
                  <p className="mt-2 text-sm text-gray-500 dark:text-white/60 text-center">
                    Didn't receive OTP?{' '}
                    <button 
                      type="button"
                      onClick={() => toast.success('OTP resent!')}
                      className="text-primary-600 dark:text-accent-cyan hover:underline"
                    >
                      Resend
                    </button>
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  className="w-full py-3"
                >
                  Verify & Sign In
                </Button>

                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="w-full text-center text-sm text-gray-600 dark:text-white/70 hover:underline"
                >
                  Change phone number
                </button>
              </form>
            )}

            {/* Trust Badge */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-white/60">
                <Shield className="w-4 h-4" />
                <span>Your data is protected with enterprise-grade security</span>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-600 dark:text-white/70">
            New to GoDrive?{' '}
            <Link href="/signup" className="text-primary-600 dark:text-accent-cyan font-medium hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </main>

      <GuestFooter />
    </div>
  );
}
