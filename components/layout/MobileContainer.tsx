import React from 'react';
import { cn } from '@/utils/cn';

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileContainer({ children, className }: MobileContainerProps) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 flex justify-center">
      <div 
        className={cn(
          "w-full max-w-md min-h-screen bg-background text-foreground shadow-2xl relative overflow-hidden flex flex-col",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
