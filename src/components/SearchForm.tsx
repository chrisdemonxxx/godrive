import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, DatePicker } from '@/components';
import { Search, MapPin, Calendar } from 'lucide-react';

interface SearchFormProps {
  className?: string;
}

export function SearchForm({ className }: SearchFormProps) {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !pickupDate || !returnDate) {
      return;
    }

    navigate('/search/results', {
      state: {
        location,
        pickupDate: pickupDate.toISOString(),
        returnDate: returnDate.toISOString(),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Pickup location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
            required
          />
        </div>
        <div>
          <DatePicker
            date={pickupDate}
            onDateChange={setPickupDate}
            placeholder="Pickup date"
            required
          />
        </div>
        <div>
          <DatePicker
            date={returnDate}
            onDateChange={setReturnDate}
            placeholder="Return date"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          <Search className="w-4 h-4 mr-2" />
          Search Cars
        </Button>
      </div>
    </form>
  );
}
