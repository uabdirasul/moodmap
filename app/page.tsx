'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { MapPin } from 'lucide-react';

export default function SplashPage() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-indigo-950 overflow-hidden">
      
      {/* Decorative background blobs */}
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <div className="z-10 flex flex-col items-center flex-grow justify-center w-full max-w-sm text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 p-4 rounded-3xl glass-card text-primary shadow-xl"
        >
          <MapPin size={48} strokeWidth={1.5} />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl font-bold tracking-tight text-foreground mb-4"
        >
          MoodMap
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg text-muted-foreground mb-12"
        >
          Discover places based on how you want to feel.
        </motion.p>
      </div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="w-full z-10 pb-8"
      >
        <Button 
          fullWidth 
          size="lg" 
          onClick={() => router.push('/onboarding')}
          className="text-lg font-semibold rounded-2xl py-6"
        >
          Get Started
        </Button>
      </motion.div>
    </div>
  );
}
