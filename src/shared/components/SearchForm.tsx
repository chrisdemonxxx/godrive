import { useState } from 'react';
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

export function SearchForm() {
  const navigate = useNavigate();
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  const { register, handleSubmit } = useForm<SearchFormData>();

  const onSubmit = (data: SearchFormData) => {
    const params = new URLSearchParams();
    if (data.location) params.set('location', data.location);
    if (pickupDate) params.set('pickup_date', format(pickupDate, 'yyyy-MM-dd'));
    if (returnDate) params.set('return_date', format(returnDate, 'yyyy-MM-dd'));
    
    navigate(`/search/results?${params.toString()}`);
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          placeholder="Where do you want to go?"
          leftIcon={MapPin}
          {...register('location')}
          className="h-14 text-lg"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <DatePicker
          selected={pickupDate}
          onSelect={setPickupDate}
          minDate={minDate}
          placeholder="Pickup date"
        />
        <DatePicker
          selected={returnDate}
          onSelect={setReturnDate}
          minDate={pickupDate || minDate}
          placeholder="Return date"
        />
      </div>
      
      <Button 
        type="submit" 
        variant="primary" 
        size="lg" 
        className="w-full h-14 text-lg font-semibold"
        leftIcon={<SearchIcon className="w-5 h-5" />}
      >
        Search Cars
      </Button>
    </form>
  );
}
