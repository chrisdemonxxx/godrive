import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { cn } from '@/utils';
import { format } from 'date-fns';

export interface DatePickerProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  selected,
  onSelect,
  disabled,
  minDate,
  maxDate,
  label,
  error,
  helperText,
  className,
}) => {
  const datePickerId = `datepicker-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label htmlFor={datePickerId} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={onSelect}
          disabled={disabled}
          fromDate={minDate}
          toDate={maxDate}
          className={cn(
            'rounded-xl border bg-white p-4',
            error
              ? 'border-red-300 focus-within:border-red-500'
              : 'border-gray-300 focus-within:border-primary-600'
          )}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && <p className="mt-2 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
};
