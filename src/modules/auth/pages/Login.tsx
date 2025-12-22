import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { auth } from '@/shared/lib/supabase';
import { loginSchema, type LoginFormData } from '@/schemas';
import { Input, Button } from '@/components';
import toast from 'react-hot-toast';
import { ArrowLeft, Phone } from 'lucide-react';
import { logError } from '@/utils/errors';

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const formattedPhone = `+91${data.phone}`;
      const { error } = await auth.signInWithPhone(formattedPhone);

      if (error) {
        throw error;
      }

      toast.success('OTP sent to your phone!');
      navigate('/verify-otp', { state: { phone: formattedPhone } });
    } catch (error: unknown) {
      logError('Login error', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to send OTP. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to home
        </button>

        <div className="card">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <Phone className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to GoDrive</h1>
            <p className="text-gray-600">Enter your phone number to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <span className="text-gray-500">+91</span>
                </div>
                <input
                  id="phone"
                  type="tel"
                  placeholder="9876543210"
                  maxLength={10}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 pl-16 border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all ${
                    errors.phone
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-primary-600 focus:ring-primary-600'
                  }`}
                  {...register('phone', {
                    onChange: (e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      e.target.value = value.slice(0, 10);
                    },
                  })}
                />
              </div>
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {errors.phone.message}
                </p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                We'll send you a verification code via SMS
              </p>
            </div>

            <Button type="submit" variant="primary" loading={isSubmitting} className="w-full">
              Send OTP
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              By continuing, you agree to GoDrive's{' '}
              <a href="#" className="text-primary-600 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
