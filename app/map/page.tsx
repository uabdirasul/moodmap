'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { PageTransition } from '@/components/animations/PageTransition';
import { BottomNav } from '@/components/navigation/BottomNav';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { MapFriend } from '@/components/map/MoodMap';
import {
  getCloseFriendsNow,
  getEventsForPlace,
  getFriendById,
  getPlaceById,
  getVisitsForPlace,
  mockEvents,
  mockPlaces,
} from '@/data/mockData';
import {
  getPlaceMoodColor,
  getPlaceMoodType,
  MOOD_MAP_COLORS,
} from '@/lib/placeMood';
import { Event, Place } from '@/types';
import {
  CalendarDays,
  Clock,
  MapPin,
  Sparkles,
  Ticket,
  Users,
  X,
} from 'lucide-react';

const MoodMap = dynamic(
  () => import('@/components/map/MoodMap').then((mod) => ({ default: mod.MoodMap })),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 bg-muted/40 animate-pulse flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading map…</p>
      </div>
    ),
  }
);

const SOURCE_LABELS: Record<Event['source'], string> = {
  afisha: 'Afisha',
  iticket: 'iTicket',
  venue: 'Venue',
};

export default function MapPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <p className="text-sm text-muted-foreground">Loading map…</p>
        </div>
      }
    >
      <MapPageContent />
    </Suspense>
  );
}

function MapPageContent() {
  const searchParams = useSearchParams();
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<MapFriend | null>(null);

  const friendsNow = useMemo(() => getCloseFriendsNow(), []);
  const eventPlaceIds = useMemo(
    () => [...new Set(mockEvents.map((event) => event.placeId))],
    []
  );

  useEffect(() => {
    const placeId = searchParams.get('place');
    if (placeId) {
      const place = getPlaceById(placeId);
      if (place) {
        setSelectedPlace(place);
        setSelectedFriend(null);
      }
    }
  }, [searchParams]);

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setSelectedFriend(null);
  };

  const handleFriendSelect = (friend: MapFriend) => {
    setSelectedFriend(friend);
    setSelectedPlace(friend.place);
  };

  const clearSelection = () => {
    setSelectedPlace(null);
    setSelectedFriend(null);
  };

  return (
    <PageTransition className="min-h-screen pb-24 bg-background flex flex-col relative">
      <div className="p-6 pb-2 z-[1000] glass rounded-b-3xl absolute top-0 w-full left-0 pointer-events-none">
        <h1 className="text-2xl font-bold mb-2 pt-6 pointer-events-auto">Emotional Map</h1>
        <p className="text-sm text-muted-foreground mb-4 pointer-events-auto">
          Places, friends, and upcoming events nearby.
        </p>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 pointer-events-auto">
          {Object.values(MOOD_MAP_COLORS).map((mood) => (
            <LegendItem key={mood.label} color={mood.tailwind} label={mood.label} />
          ))}
          <LegendItem color="bg-emerald-500" label="Friends" icon={<Users size={10} />} />
          <LegendItem
            color="bg-amber-500"
            label="Events"
            icon={<CalendarDays size={10} />}
          />
        </div>
      </div>

      <div className="flex-1 relative min-h-[calc(100vh-6rem)]">
        <MoodMap
          places={mockPlaces}
          friends={friendsNow}
          eventPlaceIds={eventPlaceIds}
          selectedPlaceId={selectedPlace?.id ?? null}
          selectedFriendId={selectedFriend?.friend.id ?? null}
          onPlaceSelect={handlePlaceSelect}
          onFriendSelect={handleFriendSelect}
        />
      </div>

      <div className="absolute bottom-[90px] left-4 right-4 z-[1000]">
        <AnimatePresence mode="wait">
          {selectedFriend ? (
            <FriendPreviewCard
              key={`friend-${selectedFriend.friend.id}`}
              item={selectedFriend}
              onClose={clearSelection}
            />
          ) : selectedPlace ? (
            <PlacePreviewCard
              key={selectedPlace.id}
              place={selectedPlace}
              onClose={clearSelection}
            />
          ) : (
            <motion.div
              key="location-active"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
            >
              <Card glass className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm">Location Active</h3>
                  <p className="text-xs text-muted-foreground">
                    {friendsNow.length} friends nearby · {mockEvents.length} events this week
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin size={20} />
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </PageTransition>
  );
}

function PlacePreviewCard({
  place,
  onClose,
}: {
  place: Place;
  onClose: () => void;
}) {
  const mood = getPlaceMoodType(place);
  const moodColor = getPlaceMoodColor(place);
  const events = getEventsForPlace(place.id);
  const visits = getVisitsForPlace(place.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
    >
      <Card glass className="p-0 overflow-hidden max-h-[55vh] overflow-y-auto">
        <div className="relative h-28 shrink-0">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white backdrop-blur-sm"
            aria-label="Close place details"
          >
            <X size={16} />
          </button>
          <span
            className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full backdrop-blur-sm"
            style={{ color: moodColor, background: `${moodColor}33` }}
          >
            {MOOD_MAP_COLORS[mood].label}
          </span>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-base mb-0.5">{place.name}</h3>
          <p className="text-xs text-muted-foreground mb-3">
            {place.category} · {place.distance}
          </p>

          {events.length > 0 && (
            <div className="mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1">
                <CalendarDays size={12} />
                Events here soon
              </p>
              <div className="space-y-2">
                {events.map((event) => (
                  <EventChip key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {visits.length > 0 && (
            <div className="mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-primary mb-2 flex items-center gap-1">
                <Sparkles size={12} />
                Friend feedback
              </p>
              <div className="space-y-2">
                {visits.map((visit) => {
                  const friend = getFriendById(visit.friendId);
                  if (!friend) return null;
                  return (
                    <div
                      key={visit.id}
                      className="flex gap-2 p-2 rounded-xl bg-muted/50 border border-border/50"
                    >
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold">
                          {friend.name}{' '}
                          <span className="font-normal text-muted-foreground">
                            · {visit.visitedAt}
                          </span>
                        </p>
                        <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">
                          &ldquo;{visit.feedback}&rdquo;
                        </p>
                        {visit.enjoyed && (
                          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                            Enjoyed it — would you like to go?
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <Link href={`/place/${place.id}`}>
            <Button fullWidth size="sm">
              View full details
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}

function FriendPreviewCard({
  item,
  onClose,
}: {
  item: MapFriend;
  onClose: () => void;
}) {
  const { friend, location, place } = item;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
    >
      <Card glass className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/50"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-background" />
            </div>
            <div>
              <p className="font-bold text-sm">{friend.name}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                Live now · {location.updatedAt}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-muted text-muted-foreground"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex gap-3 p-3 rounded-xl bg-muted/50 mb-3">
          <img
            src={place.image}
            alt={place.name}
            className="w-14 h-14 rounded-lg object-cover shrink-0"
          />
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Currently at</p>
            <p className="font-semibold text-sm">{place.name}</p>
            <p className="text-xs text-muted-foreground">{place.category}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/place/${place.id}`} className="flex-1">
            <Button fullWidth size="sm" variant="outline">
              View place
            </Button>
          </Link>
          <Button fullWidth size="sm">
            Join {friend.name.split(' ')[0]}?
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

function EventChip({ event }: { event: Event }) {
  const dayLabel =
    event.daysUntil === 0
      ? 'Today'
      : event.daysUntil === 1
        ? 'Tomorrow'
        : event.date;

  return (
    <div className="flex gap-2 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
      <img
        src={event.image}
        alt={event.title}
        className="w-12 h-12 rounded-lg object-cover shrink-0"
      />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold line-clamp-1">{event.title}</p>
        <p className="text-[10px] text-muted-foreground flex items-center gap-2 mt-0.5">
          <span className="flex items-center gap-0.5">
            <Clock size={10} />
            {dayLabel} · {event.time}
          </span>
        </p>
        <p className="text-[10px] text-amber-700 dark:text-amber-300 mt-0.5 flex items-center gap-2">
          <span>{SOURCE_LABELS[event.source]}</span>
          {event.priceFrom && (
            <span className="flex items-center gap-0.5">
              <Ticket size={10} />
              {event.priceFrom}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

function LegendItem({
  color,
  label,
  icon,
}: {
  color: string;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap bg-background/50 px-3 py-1.5 rounded-full border border-border/50">
      {icon ?? <div className={`w-3 h-3 rounded-full ${color}`} />}
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}
