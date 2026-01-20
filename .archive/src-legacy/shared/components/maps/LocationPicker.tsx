import { useState } from 'react';
import { Map } from './Map';
import { LocationAutocomplete } from './LocationAutocomplete';
import { Button } from '../ui/Button';
import { MapPin, Navigation, Loader2 } from 'lucide-react';

interface LocationPickerProps {
  value: {
    address: string;
    lat: number;
    lng: number;
    area?: string;
  };
  onChange: (location: {
    address: string;
    lat: number;
    lng: number;
    area?: string;
    city?: string;
  }) => void;
  error?: string;
  showMap?: boolean;
}

export function LocationPicker({ value, onChange, error, showMap = true }: LocationPickerProps) {
  const [mapVisible, setMapVisible] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handlePlaceSelect = (place: {
    address: string;
    lat: number;
    lng: number;
    area?: string;
    city?: string;
  }) => {
    onChange(place);
    setMapVisible(true);
  };

  const handleMapClick = async (lat: number, lng: number) => {
    // Reverse geocode using Nominatim (free)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'GoDrive/1.0 (support@go-drive.in)',
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        const area = data.address?.suburb || data.address?.neighbourhood || '';
        const city = data.address?.city || data.address?.town || 'Bangalore';
        
        onChange({
          address: data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
          lat,
          lng,
          area,
          city,
        });
      }
    } catch (err) {
      console.error('Reverse geocoding failed:', err);
      onChange({
        address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
        lat,
        lng,
      });
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        await handleMapClick(lat, lng);
        setMapVisible(true);
        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please enter address manually.');
        setIsGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <LocationAutocomplete
            value={value.address}
            onChange={(address) => onChange({ ...value, address })}
            onSelect={handlePlaceSelect}
            placeholder="Enter pickup location in Bangalore"
            error={error}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={getCurrentLocation}
          disabled={isGettingLocation}
          className="shrink-0 h-10 w-10 p-0"
          title="Use current location"
        >
          {isGettingLocation ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Navigation className="w-4 h-4" />
          )}
        </Button>
      </div>

      {value.area && (
        <p className="text-sm text-gray-600 flex items-center gap-1">
          <MapPin className="w-4 h-4 text-primary-500" />
          Area: <span className="font-medium">{value.area}</span>
        </p>
      )}

      {showMap && (mapVisible || (value.lat && value.lng)) && (
        <Map
          center={{ lat: value.lat || 12.9716, lng: value.lng || 77.5946 }}
          zoom={15}
          selectedPosition={value.lat && value.lng ? { lat: value.lat, lng: value.lng } : null}
          onMapClick={handleMapClick}
          className="h-[300px] rounded-xl border border-gray-200"
        />
      )}

      {showMap && !mapVisible && !value.lat && (
        <button
          type="button"
          onClick={() => setMapVisible(true)}
          className="w-full py-8 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-primary-500 hover:text-primary-600 transition flex flex-col items-center gap-2"
        >
          <MapPin className="w-6 h-6" />
          <span>Click to show map and pick location</span>
        </button>
      )}
    </div>
  );
}
