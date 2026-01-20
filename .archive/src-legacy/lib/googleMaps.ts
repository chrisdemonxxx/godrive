/**
 * Google Maps utilities
 * Note: Google Maps script must be loaded before using these functions
 */

declare global {
  interface Window {
    google: typeof google;
  }
}

/**
 * Check if Google Maps is loaded
 */
export function isGoogleMapsLoaded(): boolean {
  return typeof window !== 'undefined' && typeof window.google !== 'undefined';
}

/**
 * Load Google Maps script
 */
export function loadGoogleMapsScript(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isGoogleMapsLoaded()) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Maps'));
    document.head.appendChild(script);
  });
}

/**
 * Initialize Google Maps Autocomplete
 */
export function initAutocomplete(
  input: HTMLInputElement,
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void
): google.maps.places.Autocomplete | null {
  if (!isGoogleMapsLoaded()) {
    console.warn('Google Maps not loaded');
    return null;
  }

  const autocomplete = new window.google.maps.places.Autocomplete(input, {
    types: ['address'],
    componentRestrictions: { country: 'in' },
  });

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      onPlaceSelect(place);
    }
  });

  return autocomplete;
}

/**
 * Geocode an address
 */
export async function geocodeAddress(address: string): Promise<{
  lat: number;
  lng: number;
  formatted_address: string;
} | null> {
  if (!isGoogleMapsLoaded()) {
    return null;
  }

  return new Promise((resolve) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address, componentRestrictions: { country: 'in' } }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;
        resolve({
          lat: location.lat(),
          lng: location.lng(),
          formatted_address: results[0].formatted_address,
        });
      } else {
        resolve(null);
      }
    });
  });
}
