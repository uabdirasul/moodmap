'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Event, Friend, FriendLocation, Place } from '@/types';
import { getPlaceMoodType, MOOD_MAP_COLORS } from '@/lib/placeMood';

const SF_CENTER: [number, number] = [37.7749, -122.4194];

const TILE_URLS = {
  light:
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
};

export interface MapFriend {
  friend: Friend;
  location: FriendLocation;
  place: Place;
}

function createMoodIcon(color: string, selected = false, hasEvent = false) {
  return L.divIcon({
    className: 'mood-map-marker',
    html: `
      <div class="mood-marker-wrap${selected ? ' mood-marker-wrap--selected' : ''}">
        ${hasEvent ? '<div class="mood-marker-event-badge"><span>📅</span></div>' : ''}
        <div class="mood-marker-pulse" style="background:${color}"></div>
        <div class="mood-marker-dot" style="background:${color}">
          <div class="mood-marker-shine"></div>
        </div>
        <div class="mood-marker-shadow" style="background:${color}"></div>
      </div>
    `,
    iconSize: [36, hasEvent ? 52 : 48],
    iconAnchor: [18, hasEvent ? 46 : 42],
  });
}

function createFriendIcon(avatar: string, name: string, selected = false) {
  const initial = name.charAt(0);
  return L.divIcon({
    className: 'friend-map-marker',
    html: `
      <div class="friend-marker-wrap${selected ? ' friend-marker-wrap--selected' : ''}">
        <div class="friend-marker-pulse"></div>
        <div class="friend-marker-avatar">
          <img src="${avatar}" alt="${name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
          <span class="friend-marker-fallback">${initial}</span>
        </div>
        <div class="friend-marker-pin"></div>
      </div>
    `,
    iconSize: [44, 52],
    iconAnchor: [22, 48],
  });
}

function FitBounds({
  places,
  friends,
}: {
  places: Place[];
  friends: MapFriend[];
}) {
  const map = useMap();

  useEffect(() => {
    const points: [number, number][] = [
      ...places.map((place) => [place.coordinates.lat, place.coordinates.lng] as [number, number]),
      ...friends.map(({ location }) => [location.coordinates.lat, location.coordinates.lng] as [number, number]),
    ];
    if (points.length === 0) return;

    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [100, 32], maxZoom: 15 });
  }, [map, places, friends]);

  return null;
}

function FocusSelection({
  place,
  friend,
  places,
  friends,
}: {
  place: Place | null;
  friend: MapFriend | null;
  places: Place[];
  friends: MapFriend[];
}) {
  const map = useMap();
  const hadSelection = useRef(false);

  useEffect(() => {
    if (friend) {
      hadSelection.current = true;
      map.flyTo(
        [friend.location.coordinates.lat, friend.location.coordinates.lng],
        16,
        { duration: 0.6 }
      );
      return;
    }

    if (place) {
      hadSelection.current = true;
      map.flyTo([place.coordinates.lat, place.coordinates.lng], 15, {
        duration: 0.6,
      });
      return;
    }

    if (!hadSelection.current) return;

    const points: [number, number][] = [
      ...places.map((p) => [p.coordinates.lat, p.coordinates.lng] as [number, number]),
      ...friends.map(({ location }) => [location.coordinates.lat, location.coordinates.lng] as [number, number]),
    ];
    if (points.length === 0) return;

    const bounds = L.latLngBounds(points);
    map.flyToBounds(bounds, { padding: [100, 32], maxZoom: 15, duration: 0.6 });
  }, [map, place, friend, places, friends]);

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
  friends?: MapFriend[];
  eventPlaceIds?: string[];
  selectedPlaceId?: string | null;
  selectedFriendId?: string | null;
  onPlaceSelect?: (place: Place) => void;
  onFriendSelect?: (friend: MapFriend) => void;
}

export function MoodMap({
  places,
  friends = [],
  eventPlaceIds = [],
  selectedPlaceId = null,
  selectedFriendId = null,
  onPlaceSelect,
  onFriendSelect,
}: MoodMapProps) {
  const eventSet = useMemo(() => new Set(eventPlaceIds), [eventPlaceIds]);

  const selectedPlace =
    places.find((place) => place.id === selectedPlaceId) ?? null;
  const selectedFriend =
    friends.find(({ friend }) => friend.id === selectedFriendId) ?? null;

  const getPlaceIcon = useMemo(() => {
    const cache = new Map<string, L.DivIcon>();
    return (place: Place) => {
      const mood = getPlaceMoodType(place);
      const selected = place.id === selectedPlaceId;
      const hasEvent = eventSet.has(place.id);
      const key = `${mood}-${selected}-${hasEvent}`;
      if (!cache.has(key)) {
        cache.set(
          key,
          createMoodIcon(MOOD_MAP_COLORS[mood].hex, selected, hasEvent)
        );
      }
      return cache.get(key)!;
    };
  }, [selectedPlaceId, eventSet]);

  const getFriendIcon = useMemo(() => {
    const cache = new Map<string, L.DivIcon>();
    return (item: MapFriend) => {
      const selected = item.friend.id === selectedFriendId;
      const key = `${item.friend.id}-${selected}`;
      if (!cache.has(key)) {
        cache.set(
          key,
          createFriendIcon(item.friend.avatar, item.friend.name, selected)
        );
      }
      return cache.get(key)!;
    };
  }, [selectedFriendId]);

  return (
    <MapContainer
      center={SF_CENTER}
      zoom={14}
      className="mood-map-container h-full w-full"
      zoomControl={false}
      attributionControl={false}
    >
      <ThemeTileLayer />
      <FitBounds places={places} friends={friends} />
      <FocusSelection
        place={selectedPlace}
        friend={selectedFriend}
        places={places}
        friends={friends}
      />

      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.coordinates.lat, place.coordinates.lng]}
          icon={getPlaceIcon(place)}
          eventHandlers={{
            click: () => onPlaceSelect?.(place),
          }}
          zIndexOffset={place.id === selectedPlaceId ? 1000 : 0}
        />
      ))}

      {friends.map((item) => (
        <Marker
          key={`friend-${item.friend.id}`}
          position={[
            item.location.coordinates.lat,
            item.location.coordinates.lng,
          ]}
          icon={getFriendIcon(item)}
          eventHandlers={{
            click: () => onFriendSelect?.(item),
          }}
          zIndexOffset={item.friend.id === selectedFriendId ? 1100 : 500}
        />
      ))}
    </MapContainer>
  );
}
