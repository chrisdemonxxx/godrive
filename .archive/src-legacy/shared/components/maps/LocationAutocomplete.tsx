import { useRef, useEffect, useState, useCallback } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '@/shared/lib/maps/config';
import { Input } from '../ui/Input';
import { MapPin, Loader2, Search } from 'lucide-react';
import debounce from 'lodash/debounce';

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (place: {
    address: string;
    lat: number;
    lng: number;
    area?: string;
    city?: string;
  }) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

// Nominatim API for OpenStreetMap geocoding (FREE)
async function searchNominatim(query: string): Promise<Array<{
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    suburb?: string;
    city?: string;
    town?: string;
  };
}>> {
  if (!query || query.length < 3) return [];
  
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=in&limit=5&addressdetails=1`,
    {
      headers: {
        'User-Agent': 'GoDrive/1.0 (support@go-drive.in)',
      },
    }
  );
  
  if (!response.ok) return [];
  return response.json();
}

export function LocationAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = "Enter location",
  className,
  error,
}: LocationAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [useGooglePlaces, setUseGooglePlaces] = useState(true);
  const [suggestions, setSuggestions] = useState<Array<{ display_name: string; lat: string; lon: string; address?: any }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  // Fallback to Nominatim if Google fails
  useEffect(() => {
    if (loadError || !GOOGLE_MAPS_API_KEY) {
      console.log('Using Nominatim geocoding fallback');
      setUseGooglePlaces(false);
    }
  }, [loadError]);

  // Google Places Autocomplete
  useEffect(() => {
    if (!isLoaded || !inputRef.current || !useGooglePlaces) return;

    try {
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'in' },
        fields: ['formatted_address', 'geometry', 'address_components', 'name'],
        types: ['geocode', 'establishment'],
      });

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        
        if (place?.geometry?.location) {
          let area = '';
          let city = 'Bangalore';
          
          place.address_components?.forEach((component) => {
            if (component.types.includes('sublocality_level_1') || component.types.includes('sublocality')) {
              area = component.long_name;
            }
            if (component.types.includes('locality')) {
              city = component.long_name;
            }
          });

          const address = place.formatted_address || place.name || '';
          onChange(address);
          
          onSelect({
            address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            area,
            city,
          });
        }
      });
    } catch (err) {
      console.error('Google Places init failed:', err);
      setUseGooglePlaces(false);
    }

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isLoaded, useGooglePlaces, onChange, onSelect]);

  // Nominatim search (debounced)
  const searchNominatimDebounced = useCallback(
    debounce(async (query: string) => {
      if (useGooglePlaces) return;
      
      setIsSearching(true);
      try {
        const results = await searchNominatim(query);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } catch (err) {
        console.error('Nominatim search failed:', err);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    [useGooglePlaces]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (!useGooglePlaces) {
      searchNominatimDebounced(newValue);
    }
  };

  const handleSuggestionClick = (suggestion: typeof suggestions[0]) => {
    const address = suggestion.display_name;
    const area = suggestion.address?.suburb || '';
    const city = suggestion.address?.city || suggestion.address?.town || 'Bangalore';
    
    onChange(address);
    onSelect({
      address,
      lat: parseFloat(suggestion.lat),
      lng: parseFloat(suggestion.lon),
      area,
      city,
    });
    
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={isLoaded || !useGooglePlaces ? placeholder : "Loading..."}
          className="pl-10 pr-10"
        />
        {((!isLoaded && useGooglePlaces) || isSearching) && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 animate-spin" />
        )}
        {!useGooglePlaces && !isSearching && (
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
      </div>
      
      {/* Nominatim Suggestions Dropdown */}
      {!useGooglePlaces && showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-700 line-clamp-2">{suggestion.display_name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
      
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      
      {!useGooglePlaces && (
        <p className="text-xs text-gray-400 mt-1">Powered by OpenStreetMap</p>
      )}
    </div>
  );
}
