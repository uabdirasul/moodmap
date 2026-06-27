'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { PageTransition } from '@/components/animations/PageTransition';
import { BottomNav } from '@/components/navigation/BottomNav';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { mockPlaces } from '@/data/mockData';
import {
  getPlaceMoodColor,
  getPlaceMoodType,
  MOOD_MAP_COLORS,
} from '@/lib/placeMood';
import { Place } from '@/types';
import { Clock, MapPin, X } from 'lucide-react';

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

export default function MapPage() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  return (
    <PageTransition className="min-h-screen pb-24 bg-background flex flex-col relative">
      <div className="p-6 pb-2 z-[1000] glass rounded-b-3xl absolute top-0 w-full left-0 pointer-events-none">
        <h1 className="text-2xl font-bold mb-2 pt-6 pointer-events-auto">Emotional Map</h1>
        <p className="text-sm text-muted-foreground mb-4 pointer-events-auto">
          Tap a marker to explore a place.
        </p>

        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 pointer-events-auto">
          {Object.values(MOOD_MAP_COLORS).map((mood) => (
            <LegendItem key={mood.label} color={mood.tailwind} label={mood.label} />
          ))}
        </div>
      </div>

      <div className="flex-1 relative min-h-[calc(100vh-6rem)]">
        <MoodMap
          places={mockPlaces}
          selectedPlaceId={selectedPlace?.id ?? null}
          onPlaceSelect={setSelectedPlace}
        />
      </div>

      <div className="absolute bottom-[90px] left-4 right-4 z-[1000]">
        <AnimatePresence mode="wait">
          {selectedPlace ? (
            <PlacePreviewCard
              key={selectedPlace.id}
              place={selectedPlace}
              onClose={() => setSelectedPlace(null)}
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
                    {mockPlaces.length} mood-matched places nearby
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
    >
      <Card glass className="p-0 overflow-hidden">
        <div className="relative h-28">
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
          <p className="text-xs text-muted-foreground mb-2">
            {place.category} · {place.distance}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {place.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {place.moodTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
            <Clock size={14} />
            <span>Best time: {place.bestTimes}</span>
          </div>

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

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap bg-background/50 px-3 py-1.5 rounded-full border border-border/50">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}
