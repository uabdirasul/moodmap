'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getMockRecommendations } from '@/data/mockData';
import { Goal, RecommendationResult } from '@/types';
import { ArrowLeft, MapPin, Sparkles } from 'lucide-react';

const MOODS = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😌', label: 'Calm' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😡', label: 'Irritated' },
  { emoji: '😰', label: 'Stressed' }
];

const GOALS: Goal[] = ['Relax', 'Focus', 'Inspiration', 'Walk', 'Energy', 'Quiet Place'];

const LOADING_MESSAGES = [
  "Analyzing your mood...",
  "Finding emotionally compatible places...",
  "Comparing environmental patterns...",
  "Generating personalized recommendations..."
];

export default function FlowPage() {
  const router = useRouter();
  const [step, setStep] = useState<'mood' | 'goal' | 'loading' | 'results'>('mood');
  const [mood, setMood] = useState('');
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [results, setResults] = useState<RecommendationResult[]>([]);

  // Simulate AI Loading
  useEffect(() => {
    if (step === 'loading') {
      const interval = setInterval(() => {
        setLoadingMsgIdx(prev => (prev + 1) % LOADING_MESSAGES.length);
      }, 800);

      const timeout = setTimeout(() => {
        setResults(getMockRecommendations(mood, goals));
        setStep('results');
      }, 3500); // 3.5s loading simulation

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [step, mood, goals]);

  const toggleGoal = (goal: Goal) => {
    setGoals((current) =>
      current.includes(goal)
        ? current.filter((item) => item !== goal)
        : [...current, goal]
    );
  };

  const renderMood = () => (
    <motion.div
      key="mood"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full justify-center"
    >
      <h2 className="text-3xl font-bold text-center mb-10">How are you feeling?</h2>
      <div className="grid grid-cols-2 gap-4">
        {MOODS.map(m => (
          <Card 
            key={m.label} 
            hoverable 
            onClick={() => setMood(m.label)}
            className={`flex flex-col items-center justify-center py-8 cursor-pointer transition-all ${
              mood === m.label ? 'border-primary bg-primary/5 scale-[1.02]' : ''
            }`}
          >
            <span className="text-5xl mb-2">{m.emoji}</span>
            <span className="font-medium">{m.label}</span>
          </Card>
        ))}
      </div>
      <div className="mt-12">
        <Button fullWidth size="lg" disabled={!mood} onClick={() => setStep('goal')}>
          Continue
        </Button>
      </div>
    </motion.div>
  );

  const renderGoal = () => (
    <motion.div
      key="goal"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full justify-center"
    >
      <h2 className="text-3xl font-bold text-center mb-3">What do you want to do?</h2>
      <p className="text-center text-muted-foreground mb-10">Select all that apply</p>
      <div className="grid grid-cols-2 gap-4">
        {GOALS.map((g) => {
          const isSelected = goals.includes(g);

          return (
          <Card 
            key={g} 
            hoverable 
            onClick={() => toggleGoal(g)}
            className={`flex items-center justify-center py-6 cursor-pointer transition-all ${
              isSelected ? 'border-primary bg-primary/5 scale-[1.02]' : ''
            }`}
          >
            <span className="font-medium">{g}</span>
          </Card>
        )})}
      </div>
      <div className="mt-12 flex gap-4">
        <Button variant="outline" onClick={() => setStep('mood')}>Back</Button>
        <Button fullWidth disabled={goals.length === 0} onClick={() => setStep('loading')}>
          Find Places{goals.length > 0 ? ` (${goals.length})` : ''}
        </Button>
      </div>
    </motion.div>
  );

  const renderLoading = () => (
    <motion.div
      key="loading"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="flex flex-col h-full items-center justify-center text-center px-6"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="w-24 h-24 mb-8 rounded-full border-4 border-primary/20 border-t-primary"
      />
      <Sparkles className="text-primary mb-4 w-8 h-8" />
      <AnimatePresence mode="wait">
        <motion.p
          key={loadingMsgIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xl font-medium text-foreground"
        >
          {LOADING_MESSAGES[loadingMsgIdx]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );

  const renderResults = () => (
    <motion.div
      key="results"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col min-h-screen pb-24"
    >
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.push('/home')} className="p-2 rounded-full hover:bg-muted">
          <ArrowLeft />
        </button>
        <h2 className="text-2xl font-bold">Recommended for You</h2>
      </div>

      <div className="flex flex-col gap-6">
        {results.map((res) => (
          <Card key={res.place.id} className="p-0 overflow-hidden flex flex-col">
            <div className="h-48 relative">
              <img src={res.place.image} alt={res.place.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-sm font-bold text-primary">
                {res.compatibilityScore}% Match
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{res.place.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin size={14} className="mr-1" /> {res.place.distance}
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {res.matchReason}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {res.place.moodTags.map(tag => (
                  <span key={tag} className="bg-muted px-2 py-1 rounded-md text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <Button fullWidth onClick={() => router.push(`/place/${res.place.id}`)}>
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen p-6 bg-background">
      {step !== 'loading' && step !== 'results' && (
        <div className="absolute top-6 left-6 z-10">
          <button onClick={() => router.push('/home')} className="p-2 rounded-full hover:bg-muted">
            <ArrowLeft />
          </button>
        </div>
      )}

      <div className="h-full pt-12">
        <AnimatePresence mode="wait">
          {step === 'mood' && renderMood()}
          {step === 'goal' && renderGoal()}
          {step === 'loading' && renderLoading()}
          {step === 'results' && renderResults()}
        </AnimatePresence>
      </div>
    </div>
  );
}
