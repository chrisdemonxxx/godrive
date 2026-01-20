import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components';
import { CarFormData } from '@/schemas';
import { formatCurrency } from '@/utils';

interface Step7ReviewProps {
  form: UseFormReturn<CarFormData>;
  onSubmit: () => void;
}

export default function Step7Review({ form, onSubmit }: Step7ReviewProps): JSX.Element {
  const data = form.watch();

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          Please review all the information below. You can go back to edit any section before submitting.
        </p>
      </div>

      {/* Basic Details */}
      <Card variant="outlined">
        <CardHeader>
          <CardTitle className="text-lg">Basic Details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Make & Model</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {data.make} {data.model} {data.year}
              </dd>
            </div>
            {data.variant && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Variant</dt>
                <dd className="mt-1 text-sm text-gray-900">{data.variant}</dd>
              </div>
            )}
            <div>
              <dt className="text-sm font-medium text-gray-500">Registration</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.registration_number}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Vehicle Specs */}
      <Card variant="outlined">
        <CardHeader>
          <CardTitle className="text-lg">Vehicle Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Transmission</dt>
              <dd className="mt-1 text-sm text-gray-900 capitalize">{data.transmission}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Fuel Type</dt>
              <dd className="mt-1 text-sm text-gray-900 capitalize">{data.fuel_type}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Seats</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.seats}</dd>
            </div>
            {data.color && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Color</dt>
                <dd className="mt-1 text-sm text-gray-900">{data.color}</dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>

      {/* Location */}
      <Card variant="outlined">
        <CardHeader>
          <CardTitle className="text-lg">Location</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.location_address}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Area</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.location_area}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">City</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.location_city}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card variant="outlined">
        <CardHeader>
          <CardTitle className="text-lg">Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Daily Rate</dt>
              <dd className="text-sm font-semibold text-gray-900">{formatCurrency(data.daily_rate)}/day</dd>
            </div>
            {data.hourly_rate && (
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Hourly Rate</dt>
                <dd className="text-sm text-gray-900">{formatCurrency(data.hourly_rate)}/hour</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Security Deposit</dt>
              <dd className="text-sm text-gray-900">{formatCurrency(data.security_deposit)}</dd>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <dt className="text-sm font-medium text-gray-500">KM Policy</dt>
              <dd className="text-sm text-gray-900">
                {data.unlimited_km ? 'Unlimited' : `${data.km_limit_per_day} km/day`}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Features */}
      {data.features && data.features.length > 0 && (
        <Card variant="outlined">
          <CardHeader>
            <CardTitle className="text-lg">Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {data.features.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                >
                  {feature}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Your car listing will be submitted for admin approval. You'll be notified once it's approved and goes live.
        </p>
      </div>
    </div>
  );
}
