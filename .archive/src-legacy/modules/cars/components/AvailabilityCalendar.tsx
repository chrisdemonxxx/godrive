import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { cn } from '@/utils';
import { format } from 'date-fns';
import { getCarAvailability } from '@/lib/api/cars';
import { Skeleton } from '@/components';
import type { CarAvailability } from '@/types';

export interface AvailabilityCalendarProps {
  carId: string;
  selected?: { from?: Date; to?: Date };
  onSelect?: (range: { from?: Date; to?: Date }) => void;
  minBookingHours?: number;
  disabled?: boolean;
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  carId,
  selected,
  onSelect,
  minBookingHours = 4,
  disabled,
}) => {
  const [availability, setAvailability] = useState<CarAvailability[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true);
      const result = await getCarAvailability(carId);
      if (result.data) {
        setAvailability(result.data);
      }
      setLoading(false);
    };

    if (carId) {
      fetchAvailability();
    }
  }, [carId]);

  if (loading) {
    return <Skeleton className="h-96 w-full" />;
  }

  const unavailableDates = availability
    .filter((a) => !a.is_available)
    .map((a) => new Date(a.date));

  const modifiers = {
    unavailable: unavailableDates,
    available: availability
      .filter((a) => a.is_available)
      .map((a) => new Date(a.date)),
  };

  const modifiersClassNames = {
    unavailable: 'bg-red-100 text-red-600 line-through',
    available: 'bg-green-100 text-green-600',
  };

  return (
    <div className="w-full">
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={(range) => onSelect?.(range || {})}
        disabled={disabled || unavailableDates}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        className="rounded-xl border bg-white p-4"
        fromDate={new Date()}
      />
      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded" />
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded" />
          <span className="text-gray-600">Unavailable</span>
        </div>
      </div>
    </div>
  );
};
