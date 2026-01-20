import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components';
import { LocationPicker } from '@/components/maps';
import { CarFormData } from '@/schemas';

interface Step3LocationProps {
  form: UseFormReturn<CarFormData>;
}

export default function Step3Location({ form }: Step3LocationProps): JSX.Element {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Address <span className="text-red-500">*</span>
        </label>
        <LocationPicker
          value={{
            address: watch('location_address') || '',
            lat: watch('location_lat') || 0,
            lng: watch('location_lng') || 0,
            area: watch('location_area') || '',
          }}
          onChange={(location) => {
            setValue('location_address', location.address, { shouldValidate: true });
            setValue('location_lat', location.lat, { shouldValidate: true });
            setValue('location_lng', location.lng, { shouldValidate: true });
            if (location.area) {
              setValue('location_area', location.area, { shouldValidate: true });
            }
            if (location.city) {
              setValue('location_city', location.city, { shouldValidate: true });
            }
          }}
          error={errors.location_address?.message}
          showMap={true}
        />
      </div>

      <div>
        <Input
          label="Area/Neighborhood *"
          placeholder="e.g., MG Road, Koramangala, HSR Layout"
          {...register('location_area')}
          error={errors.location_area?.message}
          helperText="Auto-filled from address selection, or enter manually"
        />
      </div>

      <div>
        <Input
          label="City"
          value={watch('location_city') || 'Bangalore'}
          disabled
          helperText="Currently only Bangalore is supported"
        />
      </div>

      {watch('location_lat') && watch('location_lng') && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            ✓ Location coordinates captured: {watch('location_lat')?.toFixed(6)}, {watch('location_lng')?.toFixed(6)}
          </p>
        </div>
      )}
    </div>
  );
}
