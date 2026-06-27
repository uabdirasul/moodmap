import React from 'react';
import { cn } from '@/utils/cn';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hoverable?: boolean;
}

type Props = CardProps & Partial<HTMLMotionProps<"div">>;

export const Card = React.forwardRef<HTMLDivElement, Props>(
  ({ className, glass = false, hoverable = false, children, ...props }, ref) => {
    
    return (
      <motion.div
        ref={ref}
        whileHover={hoverable ? { y: -4 } : {}}
        className={cn(
          "rounded-3xl p-6 shadow-sm border border-border/50",
          glass ? "glass-card" : "bg-card text-card-foreground",
          hoverable && "transition-shadow hover:shadow-md cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
