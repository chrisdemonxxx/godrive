import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input, Select, RadioGroup, RadioItem } from '@/components';
import { CarFormData } from '@/schemas';

interface Step2VehicleSpecsProps {
  form: UseFormReturn<CarFormData>;
}

export default function Step2VehicleSpecs({ form }: Step2VehicleSpecsProps): JSX.Element {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  return (
    <div className="space-y-6">
      <div>
        <RadioGroup
          label="Transmission *"
          value={watch('transmission') || ''}
          onValueChange={(value) => setValue('transmission', value as 'manual' | 'automatic', { shouldValidate: true })}
          error={errors.transmission?.message}
        >
          <RadioItem value="manual" label="Manual" />
          <RadioItem value="automatic" label="Automatic" />
        </RadioGroup>
      </div>

      <div>
        <RadioGroup
          label="Fuel Type *"
          value={watch('fuel_type') || ''}
          onValueChange={(value) =>
            setValue('fuel_type', value as CarFormData['fuel_type'], { shouldValidate: true })
          }
          error={errors.fuel_type?.message}
        >
          <RadioItem value="petrol" label="Petrol" />
          <RadioItem value="diesel" label="Diesel" />
          <RadioItem value="cng" label="CNG" />
          <RadioItem value="electric" label="Electric" />
          <RadioItem value="hybrid" label="Hybrid" />
        </RadioGroup>
      </div>

      <div>
        <Select
          label="Number of Seats *"
          placeholder="Select seats"
          value={watch('seats')?.toString() || ''}
          onValueChange={(value) => setValue('seats', parseInt(value), { shouldValidate: true })}
          error={errors.seats?.message}
        >
          {[2, 4, 5, 6, 7, 8].map((seats) => (
            <Select.SelectItem key={seats} value={seats.toString()}>
              {seats} Seats
            </Select.SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Input
          label="Color (Optional)"
          placeholder="e.g., White, Black, Red"
          {...register('color')}
          error={errors.color?.message}
        />
      </div>

      <div>
        <Input
          label="Registration Number *"
          placeholder="KA01AB1234"
          {...register('registration_number', {
            onChange: (e) => {
              const value = e.target.value.toUpperCase().replace(/\s/g, '');
              setValue('registration_number', value, { shouldValidate: true });
            },
          })}
          error={errors.registration_number?.message}
          helperText="Format: KA01AB1234 (State code + 2 digits + 2 letters + 4 digits)"
          maxLength={10}
        />
      </div>
    </div>
  );
}
