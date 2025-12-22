import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { carSchema, type CarFormData } from '@/schemas';
import { useCreateCar } from '@/hooks';
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/components';
import toast from 'react-hot-toast';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Step1BasicDetails from '../components/Step1BasicDetails';
import Step2VehicleSpecs from '../components/Step2VehicleSpecs';
import Step3Location from '../components/Step3Location';
import Step4Pricing from '../components/Step4Pricing';
import Step5Photos from '../components/Step5Photos';
import Step6Features from '../components/Step6Features';
import Step7Review from '../components/Step7Review';

const TOTAL_STEPS = 7;

export default function AddCar(): JSX.Element {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const createCarMutation = useCreateCar();

  const form = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
    mode: 'onChange',
    defaultValues: {
      location_city: 'Bangalore',
      unlimited_km: true,
      instant_booking: false,
      features: [],
      security_deposit: 300000,
    },
  });

  const { handleSubmit, trigger, formState } = form;

  const nextStep = async () => {
    // Validate current step before proceeding
    let fieldsToValidate: (keyof CarFormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ['make', 'model', 'year'];
        break;
      case 2:
        fieldsToValidate = ['transmission', 'fuel_type', 'seats', 'registration_number'];
        break;
      case 3:
        fieldsToValidate = ['location_address', 'location_area'];
        break;
      case 4:
        fieldsToValidate = ['daily_rate', 'security_deposit'];
        break;
      case 5:
        // Photos validation will be handled in component
        break;
      case 6:
        // Features are optional
        break;
    }

    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) {
        toast.error('Please fix the errors before continuing');
        return;
      }
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: CarFormData) => {
    try {
      const { data: car, error } = await createCarMutation.mutateAsync({
        ...data,
        status: 'pending_approval',
      } as Partial<CarFormData>);

      if (error) {
        throw error;
      }

      toast.success('Car listing submitted for approval!');
      navigate('/dashboard/my-cars');
    } catch (error) {
      toast.error('Failed to create car listing. Please try again.');
      console.error('Create car error:', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicDetails form={form} />;
      case 2:
        return <Step2VehicleSpecs form={form} />;
      case 3:
        return <Step3Location form={form} />;
      case 4:
        return <Step4Pricing form={form} />;
      case 5:
        return <Step5Photos form={form} />;
      case 6:
        return <Step6Features form={form} />;
      case 7:
        return <Step7Review form={form} onSubmit={handleSubmit(onSubmit)} />;
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    const titles = [
      'Basic Details',
      'Vehicle Specs',
      'Location',
      'Pricing',
      'Photos',
      'Features & Guidelines',
      'Review & Submit',
    ];
    return titles[currentStep - 1];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Car</h1>
          <p className="text-gray-600">Complete the form below to list your car for rent</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
              <div key={index} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    index + 1 <= currentStep
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}
                >
                  {index + 1 < currentStep ? '✓' : index + 1}
                </div>
                {index < TOTAL_STEPS - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      index + 1 < currentStep ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">Step {currentStep} of {TOTAL_STEPS}: {getStepTitle()}</p>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>{getStepTitle()}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                icon={ChevronLeft}
                iconPosition="left"
              >
                Previous
              </Button>

              {currentStep < TOTAL_STEPS ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={nextStep}
                  icon={ChevronRight}
                  iconPosition="right"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  onClick={handleSubmit(onSubmit)}
                  loading={createCarMutation.isPending}
                >
                  Submit for Approval
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
