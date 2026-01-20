import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input, Checkbox } from '@/components';
import { CarFormData } from '@/schemas';
import { formatCurrency } from '@/utils';

interface Step4PricingProps {
  form: UseFormReturn<CarFormData>;
}

export default function Step4Pricing({ form }: Step4PricingProps): JSX.Element {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const dailyRate = watch('daily_rate') || 0;
  const unlimitedKm = watch('unlimited_km');

  return (
    <div className="space-y-6">
      <div>
        <Input
          label="Daily Rate (₹/day) *"
          type="number"
          placeholder="1500"
          {...register('daily_rate', {
            valueAsNumber: true,
            onChange: (e) => {
              const value = parseInt(e.target.value) || 0;
              setValue('daily_rate', value * 100, { shouldValidate: true }); // Convert to paise
            },
          })}
          error={errors.daily_rate?.message}
          helperText={`Minimum ₹500/day. Current: ${formatCurrency(dailyRate)}`}
        />
      </div>

      <div>
        <Input
          label="Hourly Rate (₹/hour) - Optional"
          type="number"
          placeholder="200"
          {...register('hourly_rate', {
            valueAsNumber: true,
            onChange: (e) => {
              const value = parseInt(e.target.value) || 0;
              setValue('hourly_rate', value * 100, { shouldValidate: true });
            },
          })}
          error={errors.hourly_rate?.message}
        />
      </div>

      <div>
        <Input
          label="Weekly Rate (₹/week) - Optional"
          type="number"
          placeholder="9000"
          {...register('weekly_rate', {
            valueAsNumber: true,
            onChange: (e) => {
              const value = parseInt(e.target.value) || 0;
              setValue('weekly_rate', value * 100, { shouldValidate: true });
            },
          })}
          error={errors.weekly_rate?.message}
        />
      </div>

      <div>
        <Input
          label="Security Deposit (₹) *"
          type="number"
          placeholder="3000"
          {...register('security_deposit', {
            valueAsNumber: true,
            onChange: (e) => {
              const value = parseInt(e.target.value) || 0;
              setValue('security_deposit', value * 100, { shouldValidate: true });
            },
          })}
          error={errors.security_deposit?.message}
          helperText="Amount held as security deposit (₹3,000 - ₹5,000 recommended)"
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Kilometer Policy</h3>

        <div className="mb-4">
          <Checkbox
            label="Unlimited Kilometers"
            checked={unlimitedKm}
            onCheckedChange={(checked) => {
              setValue('unlimited_km', checked === true, { shouldValidate: true });
              if (checked) {
                setValue('km_limit_per_day', undefined);
              }
            }}
          />
        </div>

        {!unlimitedKm && (
          <>
            <div className="mb-4">
              <Input
                label="KM Limit per Day"
                type="number"
                placeholder="300"
                {...register('km_limit_per_day', {
                  valueAsNumber: true,
                })}
                error={errors.km_limit_per_day?.message}
              />
            </div>

            <div>
              <Input
                label="Extra KM Charge (₹/km)"
                type="number"
                placeholder="10"
                {...register('extra_km_charge', {
                  valueAsNumber: true,
                  onChange: (e) => {
                    const value = parseInt(e.target.value) || 0;
                    setValue('extra_km_charge', value * 100, { shouldValidate: true });
                  },
                })}
                error={errors.extra_km_charge?.message}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
