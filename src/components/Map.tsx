import React, { useEffect, useRef } from 'react';
import { loadGoogleMapsScript } from '@/lib/googleMaps';
import { getEnvConfig } from '@/config/env';
import { Skeleton } from './ui/Skeleton';

export interface MapProps {
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    lat: number;
    lng: number;
    title?: string;
    onClick?: () => void;
  }>;
  className?: string;
}

export const Map: React.FC<MapProps> = ({ center, zoom = 13, markers = [], className }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      const config = getEnvConfig();
      if (!config.googleMaps?.apiKey) {
        console.warn('Google Maps API key not configured');
        return;
      }

      try {
        await loadGoogleMapsScript(config.googleMaps.apiKey);

        if (window.google && mapRef.current) {
          const map = new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
            mapTypeControl: false,
            fullscreenControl: true,
            streetViewControl: false,
          });

          mapInstanceRef.current = map;

          // Clear existing markers
          markersRef.current.forEach((marker) => marker.setMap(null));
          markersRef.current = [];

          // Add markers
          markers.forEach((markerData) => {
            const marker = new window.google.maps.Marker({
              position: { lat: markerData.lat, lng: markerData.lng },
              map,
              title: markerData.title,
            });

            if (markerData.onClick) {
              marker.addListener('click', markerData.onClick);
            }

            markersRef.current.push(marker);
          });
        }
      } catch (error) {
        console.error('Failed to initialize Google Maps:', error);
      }
    };

    initMap();
  }, [center, zoom, markers]);

  return (
    <div className={className}>
      <div ref={mapRef} className="w-full h-full min-h-[400px] rounded-lg" />
    </div>
  );
};
