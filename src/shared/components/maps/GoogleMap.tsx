import { useCallback, useState } from 'react';
import { GoogleMap as GoogleMapComponent, useJsApiLoader, Marker } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY, DEFAULT_CENTER, DEFAULT_ZOOM } from '@/shared/lib/maps/config';
import { LoadingSpinner } from '../ui/LoadingSpinner';

const libraries: ("places" | "geometry")[] = ["places"];

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
};

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    id: string;
    position: { lat: number; lng: number };
    title?: string;
    onClick?: () => void;
  }>;
  onMapClick?: (lat: number, lng: number) => void;
  onLoadError?: () => void;
  className?: string;
  selectedPosition?: { lat: number; lng: number } | null;
}

export function GoogleMap({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  markers = [],
  onMapClick,
  onLoadError,
  className = 'h-[400px] rounded-xl overflow-hidden',
  selectedPosition,
}: GoogleMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleClick = (e: google.maps.MapMouseEvent) => {
    if (onMapClick && e.latLng) {
      onMapClick(e.latLng.lat(), e.latLng.lng());
    }
  };

  // Notify parent of load error for fallback
  if (loadError) {
    onLoadError?.();
    return null;
  }

  if (!isLoaded) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <LoadingSpinner text="Loading map..." />
      </div>
    );
  }

  return (
    <div className={className}>
      <GoogleMapComponent
        mapContainerStyle={mapContainerStyle}
        center={selectedPosition || center}
        zoom={selectedPosition ? 15 : zoom}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleClick}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            title={marker.title}
            onClick={marker.onClick}
          />
        ))}
        {selectedPosition && (
          <Marker
            position={selectedPosition}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            }}
          />
        )}
      </GoogleMapComponent>
    </div>
  );
}
