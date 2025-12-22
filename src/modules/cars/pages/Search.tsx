import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input, Button, DatePicker } from '@/components';
import { MapPin, Calendar, Search as SearchIcon } from 'lucide-react';
import { format } from 'date-fns';

interface SearchFormData {
  location: string;
  pickupDate: Date | null;
  returnDate: Date | null;
}

export default function Search(): JSX.Element {
  const navigate = useNavigate();
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<SearchFormData>();

  const onSubmit = (data: SearchFormData) => {
    const params = new URLSearchParams();
    if (data.location) params.set('location', data.location);
    if (pickupDate) params.set('pickup_date', format(pickupDate, 'yyyy-MM-dd'));
    if (returnDate) params.set('return_date', format(returnDate, 'yyyy-MM-dd'));
    
    navigate(`/search/results?${params.toString()}`);
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1); // Tomorrow

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Car</h1>
          <p className="text-lg text-gray-600">Search for self-drive cars in Bangalore</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input
                label="Pickup Location"
                placeholder="e.g., MG Road, Koramangala, HSR Layout"
                leftIcon={MapPin}
                {...register('location')}
                error={errors.location?.message}
                helperText="Enter area or landmark in Bangalore"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <DatePicker
                  label="Pickup Date"
                  selected={pickupDate}
                  onSelect={setPickupDate}
                  minDate={minDate}
                  error={errors.pickupDate?.message}
                />
              </div>

              <div>
                <DatePicker
                  label="Return Date"
                  selected={returnDate}
                  onSelect={setReturnDate}
                  minDate={pickupDate || minDate}
                  error={errors.returnDate?.message}
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" icon={SearchIcon}>
              Search Cars
            </Button>
          </form>
        </div>

        {/* Quick Search Suggestions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Areas</h2>
          <div className="flex flex-wrap gap-2">
            {['MG Road', 'Koramangala', 'HSR Layout', 'Whitefield', 'Indiranagar', 'Marathahalli'].map((area) => (
              <Button
                key={area}
                variant="outline"
                size="sm"
                onClick={() => {
                  navigate(`/search/results?location=${encodeURIComponent(area)}`);
                }}
              >
                {area}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
