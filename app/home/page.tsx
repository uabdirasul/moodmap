'use client';

import React from 'react';
import { PageTransition } from '@/components/animations/PageTransition';
import { BottomNav } from '@/components/navigation/BottomNav';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/branding/Logo';
import { FriendsNearby, FriendRecommendations } from '@/components/home/FriendsSection';
import { EventsSection } from '@/components/home/EventsSection';
import { mockUserProfile, mockPlaces } from '@/data/mockData';
import { Sun, MapPin, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <PageTransition className="min-h-screen pb-24 bg-background">
      <div className="p-6 pt-12">
        
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <p className="text-muted-foreground text-sm font-medium mb-1">Good morning,</p>
            <h1 className="text-3xl font-bold text-foreground">{mockUserProfile.name}</h1>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Sun size={24} />
          </div>
        </header>

        {/* Current Mood Action */}
        <section className="mb-8">
          <Card 
            glass 
            hoverable
            onClick={() => router.push('/flow')}
            className="border-primary/20 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/40 dark:to-purple-950/40 overflow-hidden relative"
          >
            <div className="absolute right-[-10px] top-[-10px] w-32 opacity-15 pointer-events-none">
              <Logo variant="mark" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-semibold mb-2">How are you feeling?</h2>
              <p className="text-muted-foreground mb-6 max-w-[200px]">
                Let AI find the perfect environment for your current state.
              </p>
              <Button onClick={(e) => {
                e.stopPropagation();
                router.push('/flow');
              }}>
                Check In <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </Card>
        </section>

        <FriendsNearby />

        <FriendRecommendations />

        <EventsSection />

        {/* Quick Actions */}
        <section className="mb-8 grid grid-cols-2 gap-4">
          <Card hoverable className="p-4 flex flex-col items-center justify-center text-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
              <MapPin size={20} />
            </div>
            <span className="font-medium text-sm">Nearby Quiet</span>
          </Card>
          <Card hoverable className="p-4 flex flex-col items-center justify-center text-center gap-2">
            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center">
              <Sun size={20} />
            </div>
            <span className="font-medium text-sm">High Energy</span>
          </Card>
        </section>

        {/* Recent Places */}
        <section>
          <h3 className="font-semibold text-lg mb-4">Saved Places</h3>
          <div className="flex flex-col gap-4">
            {mockPlaces.slice(0, 2).map((place) => (
              <Card key={place.id} hoverable className="p-4 flex gap-4 items-center" onClick={() => router.push(`/place/${place.id}`)}>
                <img 
                  src={place.image} 
                  alt={place.name} 
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{place.name}</h4>
                  <p className="text-sm text-muted-foreground">{place.category} • {place.distance}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

      </div>

      <BottomNav />
    </PageTransition>
  );
}
