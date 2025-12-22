import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Checkbox, Textarea } from '@/components';
import { CarFormData } from '@/schemas';

interface Step6FeaturesProps {
  form: UseFormReturn<CarFormData>;
}

const AVAILABLE_FEATURES = [
  'AC',
  'Bluetooth',
  'GPS Navigation',
  'Sunroof',
  'Reverse Camera',
  'Parking Sensors',
  'USB Charging',
  'Keyless Entry',
  'Push Start',
  'Leather Seats',
  'Alloy Wheels',
  'Fog Lights',
];

export default function Step6Features({ form }: Step6FeaturesProps): JSX.Element {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const selectedFeatures = watch('features') || [];

  const toggleFeature = (feature: string) => {
    const newFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter((f) => f !== feature)
      : [...selectedFeatures, feature];
    setValue('features', newFeatures, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Car Features *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {AVAILABLE_FEATURES.map((feature) => (
            <Checkbox
              key={feature}
              label={feature}
              checked={selectedFeatures.includes(feature)}
              onCheckedChange={() => toggleFeature(feature)}
            />
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-500">Select all features available in your car</p>
      </div>

      <div>
        <Textarea
          label="Guidelines for Guests (Optional)"
          placeholder="e.g., No smoking, Return with same fuel level, Handle with care..."
          rows={4}
          {...register('guidelines')}
          error={errors.guidelines?.message}
          helperText="Any specific instructions or rules for guests"
        />
      </div>

      <div>
        <Textarea
          label="Pickup Instructions (Optional)"
          placeholder="e.g., Car is parked in basement parking, slot B-12, keys in lockbox..."
          rows={4}
          {...register('pickup_instructions')}
          error={errors.pickup_instructions?.message}
          helperText="Instructions for guests on how to access and pick up the car"
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="mb-4">
          <Checkbox
            label="Enable Instant Booking"
            checked={watch('instant_booking')}
            onCheckedChange={(checked) =>
              setValue('instant_booking', checked === true, { shouldValidate: true })
            }
          />
          <p className="mt-2 text-sm text-gray-500">
            When enabled, guests can book immediately without waiting for your approval
          </p>
        </div>
      </div>
    </div>
  );
}
