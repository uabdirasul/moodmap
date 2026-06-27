'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { mockPlaces } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, MapPin, Clock, Info, Navigation, Share } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PlaceDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const placeId = params.id as string;
  const place = mockPlaces.find(p => p.id === placeId) || mockPlaces[0];

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      
      {/* Hero Image */}
      <div className="relative h-72 w-full">
        <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        
        <button 
          onClick={() => router.back()} 
          className="absolute top-6 left-6 p-2 rounded-full glass text-foreground"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="absolute bottom-4 left-6 right-6">
          <div className="flex gap-2 mb-2">
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">
              98% Match
            </span>
            <span className="glass px-3 py-1 rounded-full text-xs font-medium">
              {place.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-1">{place.name}</h1>
          <div className="flex items-center text-sm text-foreground/80">
            <MapPin size={14} className="mr-1" /> {place.distance} away
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button fullWidth className="gap-2">
            <Navigation size={18} /> Directions
          </Button>
          <Button variant="secondary" className="px-4">
            <Share size={18} />
          </Button>
        </div>

        {/* AI Insight */}
        <Card glass className="mb-8 border-primary/20 bg-primary/5">
          <h3 className="font-semibold flex items-center gap-2 mb-2 text-primary">
            <Info size={18} /> AI Insight
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Based on your goal to relax and current stress levels, this location's low noise level and high connection to nature make it an optimal choice for emotional recovery today.
          </p>
        </Card>

        {/* Details */}
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4">About</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {place.description}
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 flex flex-col gap-2">
              <Clock className="text-muted-foreground" size={20} />
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Best Time</span>
              <span className="font-medium text-sm">{place.bestTimes}</span>
            </Card>
            <Card className="p-4 flex flex-col gap-2">
              <MapPin className="text-muted-foreground" size={20} />
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Atmosphere</span>
              <span className="font-medium text-sm">{place.environmentalCharacteristics[0]}</span>
            </Card>
          </div>
        </section>

        {/* Mood Breakdown */}
        <section>
          <h3 className="text-lg font-bold mb-4">Emotional Profile</h3>
          <div className="flex flex-col gap-4">
            <MoodBar label="Calm" score={place.calmScore} color="bg-blue-500" />
            <MoodBar label="Focus" score={place.focusScore} color="bg-purple-500" />
            <MoodBar label="Energy" score={place.energyScore} color="bg-orange-500" />
            <MoodBar label="Inspiration" score={place.inspirationScore} color="bg-yellow-500" />
          </div>
        </section>
      </div>
    </div>
  );
}

function MoodBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{score}/10</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score * 10}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`} 
        />
      </div>
    </div>
  );
}
