import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Search } from 'lucide-react';
import { format, addDays } from 'date-fns';

export function SearchForm({ variant = 'hero' }: { variant?: 'hero' | 'compact' }) {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnDate, setReturnDate] = useState(format(addDays(new Date(), 2), 'yyyy-MM-dd'));
  const [returnTime, setReturnTime] = useState('10:00');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      location,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
    });
    navigate(`/search?${params.toString()}`);
  };

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return [`${hour}:00`, `${hour}:30`];
  }).flat();

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white rounded-full p-2 shadow-lg border">
        <div className="flex items-center gap-2 px-4">
          <MapPin className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Where in Bangalore?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-40 outline-none text-sm"
          />
        </div>
        <div className="h-8 w-px bg-gray-200" />
        <div className="flex items-center gap-2 px-4">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-sm">{format(new Date(pickupDate), 'MMM d')} - {format(new Date(returnDate), 'MMM d')}</span>
        </div>
        <button type="submit" className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition">
          <Search className="w-5 h-5" />
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-100">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Location */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Bangalore areas..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Pickup Date & Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pickup</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={format(new Date(), 'yyyy-MM-dd')}
                className="w-full pl-10 pr-2 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
            <select
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-24 px-2 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 text-sm"
            >
              {timeOptions.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Return Date & Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Return</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={pickupDate}
                className="w-full pl-10 pr-2 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
            <select
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              className="w-24 px-2 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 text-sm"
            >
              {timeOptions.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300"
      >
        <Search className="w-5 h-5" />
        Search Available Cars
      </button>
    </form>
  );
}
