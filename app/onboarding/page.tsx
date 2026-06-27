'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Logo } from '@/components/branding/Logo';

const STEPS = [
  {
    id: 'age',
    title: "What's your age?",
    options: ['Under 18', '18-24', '25-34', '35-44', '45+']
  },
  {
    id: 'lifestyle',
    title: "How would you describe your lifestyle?",
    options: ['Active', 'Sedentary', 'Balanced', 'Always on the go']
  },
  {
    id: 'goal',
    title: "What is your main goal with Mood Map?",
    options: ['Reduce stress', 'Find focus areas', 'Discover new spots', 'Socialize']
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const currentStepData = STEPS[currentStep];

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [currentStepData.id]: option });
    
    // Auto-advance after short delay
    setTimeout(() => {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        router.push('/home');
      }
    }, 400);
  };

  return (
    <div className="flex flex-col min-h-screen p-6 bg-background">
      <div className="mt-6 mb-8 flex justify-center">
        <Logo variant="mark" className="w-28" />
      </div>

      <div className="mb-12">
        <ProgressBar progress={progress} />
      </div>

      <div className="flex-grow flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-foreground">
              {currentStepData.title}
            </h2>

            <div className="flex flex-col gap-4">
              {currentStepData.options.map((option) => {
                const isSelected = answers[currentStepData.id] === option;
                
                return (
                  <motion.div 
                    key={option}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      hoverable
                      onClick={() => handleSelect(option)}
                      className={`cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-primary bg-primary/5 shadow-md scale-[1.02]' 
                          : 'border-border/50 hover:border-primary/50'
                      }`}
                    >
                      <span className={`text-lg font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                        {option}
                      </span>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="py-8 flex justify-between items-center">
        {currentStep > 0 ? (
          <Button variant="ghost" onClick={() => setCurrentStep(prev => prev - 1)}>
            Back
          </Button>
        ) : (
          <div /> // Placeholder for flex alignment
        )}
        
        <div className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {STEPS.length}
        </div>
      </div>
    </div>
  );
}
