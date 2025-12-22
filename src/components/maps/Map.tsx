import { useState, useEffect } from 'react';
import { GoogleMap } from './GoogleMap';
import { LeafletMap } from './LeafletMap';
import { hasGoogleMapsKey } from '@/shared/lib/maps/config';
import { AlertTriangle } from 'lucide-react';

interface MapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    id: string;
    position: { lat: number; lng: number };
    title?: string;
    onClick?: () => void;
  }>;
  onMapClick?: (lat: number, lng: number) => void;
  className?: string;
  selectedPosition?: { lat: number; lng: number } | null;
}

type MapProvider = 'google' | 'leaflet' | 'loading';

export function Map(props: MapProps) {
  const [provider, setProvider] = useState<MapProvider>('loading');
  const [showFallbackNotice, setShowFallbackNotice] = useState(false);

  useEffect(() => {
    // Check if Google Maps is available
    if (hasGoogleMapsKey()) {
      setProvider('google');
    } else {
      console.log('Google Maps API key not found, using OpenStreetMap fallback');
      setProvider('leaflet');
      setShowFallbackNotice(true);
    }
  }, []);

  const handleGoogleMapsError = () => {
    console.warn('Google Maps failed to load, falling back to OpenStreetMap');
    setProvider('leaflet');
    setShowFallbackNotice(true);
  };

  if (provider === 'loading') {
    return (
      <div className={`${props.className || 'h-[400px]'} bg-gray-100 rounded-xl flex items-center justify-center`}>
        <div className="animate-pulse text-gray-400">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="relative">
      {provider === 'google' ? (
        <GoogleMap {...props} onLoadError={handleGoogleMapsError} />
      ) : (
        <LeafletMap {...props} />
      )}
      
      {showFallbackNotice && (
        <div className="absolute bottom-2 left-2 right-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 text-xs text-yellow-800 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Using OpenStreetMap (Google Maps unavailable)</span>
        </div>
      )}
    </div>
  );
}

export { LeafletMap, GoogleMap };
