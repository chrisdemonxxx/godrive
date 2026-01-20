import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input, Select, SelectItem } from '@/components';
import { CarFormData } from '@/schemas';

interface Step1BasicDetailsProps {
  form: UseFormReturn<CarFormData>;
}

// Common car makes in India
const CAR_MAKES = [
  'Maruti Suzuki',
  'Hyundai',
  'Tata',
  'Mahindra',
  'Honda',
  'Toyota',
  'Ford',
  'Volkswagen',
  'Nissan',
  'Renault',
  'Skoda',
  'MG',
  'Kia',
  'Other',
];

// Models by make (simplified - in production, use an API)
const CAR_MODELS: Record<string, string[]> = {
  'Maruti Suzuki': ['Swift', 'Dzire', 'Baleno', 'Vitara Brezza', 'Ertiga', 'Celerio', 'Wagon R'],
  Hyundai: ['i20', 'i10', 'Verna', 'Creta', 'Venue', 'Aura', 'Grand i10'],
  Tata: ['Nexon', 'Tiago', 'Altroz', 'Harrier', 'Safari', 'Punch'],
  Mahindra: ['XUV700', 'Scorpio', 'Thar', 'Bolero', 'XUV300', 'Marazzo'],
  Honda: ['City', 'Amaze', 'WR-V', 'Jazz'],
  Toyota: ['Innova', 'Fortuner', 'Glanza', 'Urban Cruiser'],
  Ford: ['EcoSport', 'Endeavour', 'Figo'],
  Volkswagen: ['Polo', 'Vento', 'Virtus', 'Taigun'],
  Nissan: ['Magnite', 'Kicks'],
  Renault: ['Kwid', 'Triber', 'Duster'],
  Skoda: ['Rapid', 'Kushaq', 'Slavia'],
  MG: ['Hector', 'Astor', 'Gloster'],
  Kia: ['Seltos', 'Sonet', 'Carnival'],
  Other: [],
};

export default function Step1BasicDetails({ form }: Step1BasicDetailsProps): JSX.Element {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const selectedMake = watch('make');
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2009 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      <div>
        <Select
          label="Car Make *"
          placeholder="Select make"
          value={selectedMake || ''}
          onValueChange={(value) => setValue('make', value, { shouldValidate: true })}
          error={errors.make?.message}
        >
          {CAR_MAKES.map((make) => (
            <SelectItem key={make} value={make}>
              {make}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Select
          label="Car Model *"
          placeholder="Select model"
          disabled={!selectedMake}
          value={watch('model') || ''}
          onValueChange={(value) => setValue('model', value, { shouldValidate: true })}
          error={errors.model?.message}
          helperText={!selectedMake ? 'Please select a make first' : undefined}
        >
          {selectedMake && CAR_MODELS[selectedMake] ? (
            CAR_MODELS[selectedMake].map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))
          ) : selectedMake === 'Other' ? (
            <div className="p-2">
              <Input
                placeholder="Enter model name"
                {...register('model')}
                error={errors.model?.message}
              />
            </div>
          ) : null}
        </Select>
      </div>

      <div>
        <Select
          label="Year *"
          placeholder="Select year"
          value={watch('year')?.toString() || ''}
          onValueChange={(value) => setValue('year', parseInt(value), { shouldValidate: true })}
          error={errors.year?.message}
        >
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Input
          label="Variant (Optional)"
          placeholder="e.g., VDI, ZDI, Sportz"
          {...register('variant')}
          error={errors.variant?.message}
          helperText="Trim level or variant name"
        />
      </div>
    </div>
  );
}
