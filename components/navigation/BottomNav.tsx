'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map as MapIcon, User, BarChart2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/home', icon: Home },
    { name: 'Map', href: '/map', icon: MapIcon },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 glass px-6 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex justify-between items-center mb-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300",
                isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
