export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

export const DEFAULT_CENTER = {
  lat: 12.9716,  // Bangalore
  lng: 77.5946,
};

export const DEFAULT_ZOOM = 12;

export const BANGALORE_BOUNDS = {
  north: 13.2,
  south: 12.7,
  east: 77.8,
  west: 77.4,
};

// Check if Google Maps API key is available
export const hasGoogleMapsKey = () => Boolean(GOOGLE_MAPS_API_KEY);
