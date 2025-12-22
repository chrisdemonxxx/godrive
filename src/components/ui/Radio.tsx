import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/utils';

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, label, error, helperText, children, ...props }, ref) => {
  const radioGroupId = `radiogroup-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      )}
      <RadioGroupPrimitive.Root
        ref={ref}
        className={cn('flex flex-col gap-3', className)}
        {...props}
      >
        {children}
      </RadioGroupPrimitive.Root>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && <p className="mt-2 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
});

RadioGroup.displayName = 'RadioGroup';

export interface RadioItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label: string;
}

export const RadioItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioItemProps
>(({ className, label, id, ...props }, ref) => {
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex items-center gap-3">
      <RadioGroupPrimitive.Item
        ref={ref}
        id={radioId}
        className={cn(
          'aspect-square h-5 w-5 rounded-full border-2 border-gray-300 text-primary-600',
          'focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600',
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <div className="h-2.5 w-2.5 rounded-full bg-white" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      <label
        htmlFor={radioId}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
});

RadioItem.displayName = 'RadioItem';
