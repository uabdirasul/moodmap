'use client';

import React from 'react';
import { PageTransition } from '@/components/animations/PageTransition';
import { BottomNav } from '@/components/navigation/BottomNav';
import { Card } from '@/components/ui/Card';
import { mockPlaces } from '@/data/mockData';
import { MapPin } from 'lucide-react';

export default function MapPage() {
  return (
    <PageTransition className="min-h-screen pb-24 bg-background flex flex-col">
      <div className="p-6 pb-2 z-10 glass rounded-b-3xl absolute top-0 w-full left-0">
        <h1 className="text-2xl font-bold mb-2 pt-6">Emotional Map</h1>
        <p className="text-sm text-muted-foreground mb-4">Discover places around you by mood.</p>
        
        {/* Legend */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          <LegendItem color="bg-blue-500" label="Calm" />
          <LegendItem color="bg-purple-500" label="Focus" />
          <LegendItem color="bg-orange-500" label="Energy" />
          <LegendItem color="bg-yellow-500" label="Inspired" />
        </div>
      </div>

      {/* Fake Map Container */}
      <div className="flex-1 bg-[#e5e5f7] dark:bg-[#1a1a2e] relative overflow-hidden" 
        style={{
          backgroundImage: "radial-gradient(#444cf7 0.5px, transparent 0.5px), radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0,10px 10px",
          opacity: 0.8
        }}
      >
        {/* Dark mode override for the pattern background */}
        <div className="absolute inset-0 dark:bg-[#1a1a2e]/90" />

        {/* Mock Pins */}
        <div className="absolute top-[30%] left-[20%]">
          <MapMarker color="bg-blue-500" place={mockPlaces[0]} delay={0.1} />
        </div>
        <div className="absolute top-[45%] left-[60%]">
          <MapMarker color="bg-purple-500" place={mockPlaces[1]} delay={0.3} />
        </div>
        <div className="absolute top-[60%] left-[30%]">
          <MapMarker color="bg-yellow-500" place={mockPlaces[2]} delay={0.5} />
        </div>
        <div className="absolute top-[20%] left-[70%]">
          <MapMarker color="bg-orange-500" place={mockPlaces[3]} delay={0.7} />
        </div>
      </div>

      {/* Bottom overlay card */}
      <div className="absolute bottom-[90px] left-4 right-4 z-10">
        <Card glass className="p-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm">Location Active</h3>
            <p className="text-xs text-muted-foreground">Showing places near you</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <MapPin size={20} />
          </div>
        </Card>
      </div>

      <BottomNav />
    </PageTransition>
  );
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap bg-background/50 px-3 py-1.5 rounded-full border border-border/50">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}

import { motion } from 'framer-motion';

function MapMarker({ color, place, delay }: { color: string, place: any, delay: number }) {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, type: "spring" }}
      className="relative flex flex-col items-center group cursor-pointer"
    >
      <div className="absolute bottom-full mb-2 w-32 glass-card rounded-xl p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
        <p className="text-xs font-bold truncate text-center">{place.name}</p>
        <p className="text-[10px] text-muted-foreground text-center">{place.category}</p>
      </div>
      <div className={`w-8 h-8 rounded-full ${color} shadow-lg border-2 border-white dark:border-zinc-900 flex items-center justify-center z-10`}>
        <div className="w-2 h-2 rounded-full bg-white/50" />
      </div>
      <div className={`w-2 h-8 ${color} opacity-40 -mt-2 blur-sm`} />
    </motion.div>
  );
}
