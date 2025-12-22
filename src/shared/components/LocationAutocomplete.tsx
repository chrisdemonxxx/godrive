import React, { useEffect, useRef } from 'react';
import { Input } from './ui/Input';
import { loadGoogleMapsScript, initAutocomplete } from '@/lib/googleMaps';
import { getEnvConfig } from '@/config/env';
import { MapPin } from 'lucide-react';

export interface LocationAutocompleteProps {
  value?: string;
  onChange?: (value: string, lat?: number, lng?: number) => void;
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  value = '',
  onChange,
  label,
  error,
  helperText,
  placeholder = 'Enter address',
  disabled,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    const setupAutocomplete = async () => {
      const config = getEnvConfig();
      if (!config.googleMaps?.apiKey) {
        console.warn('Google Maps API key not configured');
        return;
      }

      try {
        await loadGoogleMapsScript(config.googleMaps.apiKey);
        
        if (inputRef.current) {
          const autocomplete = initAutocomplete(inputRef.current, (place) => {
            if (place.geometry && onChange) {
              const lat = place.geometry.location?.lat();
              const lng = place.geometry.location?.lng();
              const address = place.formatted_address || place.name || '';
              onChange(address, lat, lng);
            }
          });
          autocompleteRef.current = autocomplete;
        }
      } catch (error) {
        console.error('Failed to initialize Google Maps Autocomplete:', error);
      }
    };

    setupAutocomplete();

    return () => {
      // Cleanup if needed
    };
  }, [onChange]);

  return (
    <Input
      ref={inputRef}
      label={label}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      error={error}
      helperText={helperText}
      placeholder={placeholder}
      disabled={disabled}
      leftIcon={MapPin}
    />
  );
};
