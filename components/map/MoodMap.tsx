'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Place } from '@/types';
import { getPlaceMoodType, MOOD_MAP_COLORS } from '@/lib/placeMood';

const SF_CENTER: [number, number] = [37.7749, -122.4194];

const TILE_URLS = {
  light:
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
};

function createMoodIcon(color: string, selected = false) {
  return L.divIcon({
    className: 'mood-map-marker',
    html: `
      <div class="mood-marker-wrap${selected ? ' mood-marker-wrap--selected' : ''}">
        <div class="mood-marker-pulse" style="background:${color}"></div>
        <div class="mood-marker-dot" style="background:${color}">
          <div class="mood-marker-shine"></div>
        </div>
        <div class="mood-marker-shadow" style="background:${color}"></div>
      </div>
    `,
    iconSize: [36, 48],
    iconAnchor: [18, 42],
  });
}

function FitBounds({ places }: { places: Place[] }) {
  const map = useMap();

  useEffect(() => {
    if (places.length === 0) return;

    const bounds = L.latLngBounds(
      places.map((place) => [place.coordinates.lat, place.coordinates.lng])
    );
    map.fitBounds(bounds, { padding: [100, 32], maxZoom: 15 });
  }, [map, places]);

  return null;
}

function FocusPlace({
  place,
  places,
}: {
  place: Place | null;
  places: Place[];
}) {
  const map = useMap();
  const hadSelection = useRef(false);

  useEffect(() => {
    if (place) {
      hadSelection.current = true;
      map.flyTo([place.coordinates.lat, place.coordinates.lng], 15, {
        duration: 0.6,
      });
      return;
    }

    if (!hadSelection.current || places.length === 0) return;

    const bounds = L.latLngBounds(
      places.map((p) => [p.coordinates.lat, p.coordinates.lng])
    );
    map.flyToBounds(bounds, { padding: [100, 32], maxZoom: 15, duration: 0.6 });
  }, [map, place, places]);

  return null;
}

function ThemeTileLayer() {
  const [isDark, setIsDark] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) =>
      setIsDark(event.matches);

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  return (
    <TileLayer
      key={isDark ? 'dark' : 'light'}
      url={isDark ? TILE_URLS.dark : TILE_URLS.light}
      attribution=""
      subdomains="abcd"
      maxZoom={20}
    />
  );
}

interface MoodMapProps {
  places: Place[];
  selectedPlaceId?: string | null;
  onPlaceSelect?: (place: Place) => void;
}

export function MoodMap({
  places,
  selectedPlaceId = null,
  onPlaceSelect,
}: MoodMapProps) {
  const selectedPlace =
    places.find((place) => place.id === selectedPlaceId) ?? null;

  const getIcon = useMemo(() => {
    const cache = new Map<string, L.DivIcon>();
    return (place: Place) => {
      const mood = getPlaceMoodType(place);
      const selected = place.id === selectedPlaceId;
      const key = `${mood}-${selected}`;
      if (!cache.has(key)) {
        cache.set(key, createMoodIcon(MOOD_MAP_COLORS[mood].hex, selected));
      }
      return cache.get(key)!;
    };
  }, [selectedPlaceId]);

  return (
    <MapContainer
      center={SF_CENTER}
      zoom={14}
      className="mood-map-container h-full w-full"
      zoomControl={false}
      attributionControl={false}
    >
      <ThemeTileLayer />
      <FitBounds places={places} />
      <FocusPlace place={selectedPlace} places={places} />

      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.coordinates.lat, place.coordinates.lng]}
          icon={getIcon(place)}
          eventHandlers={{
            click: () => onPlaceSelect?.(place),
          }}
          zIndexOffset={place.id === selectedPlaceId ? 1000 : 0}
        />
      ))}
    </MapContainer>
  );
}
