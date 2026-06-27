'use client';

import React from 'react';
import { PageTransition } from '@/components/animations/PageTransition';
import { BottomNav } from '@/components/navigation/BottomNav';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockUserProfile } from '@/data/mockData';
import { Settings, Bell, Shield, CircleHelp, LogOut, ChevronRight } from 'lucide-react';

export default function ProfilePage() {
  return (
    <PageTransition className="min-h-screen pb-24 bg-background">
      <div className="p-6 pt-12">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-purple-500 mb-4 p-1">
            <div className="w-full h-full rounded-full bg-background border-4 border-background overflow-hidden">
              <img 
                src={`https://api.dicebear.com/9.x/notionists/svg?seed=${mockUserProfile.name}`} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold">{mockUserProfile.name}</h1>
          <p className="text-muted-foreground">{mockUserProfile.lifestyle}</p>
        </div>

        {/* User Info */}
        <Card className="mb-6 p-0 overflow-hidden divide-y divide-border/50">
          <div className="p-4 flex justify-between items-center">
            <span className="text-muted-foreground font-medium">Goal</span>
            <span className="text-sm font-medium text-right max-w-[200px] truncate">{mockUserProfile.goal}</span>
          </div>
          <div className="p-4 flex justify-between items-center">
            <span className="text-muted-foreground font-medium">Age</span>
            <span className="text-sm font-medium">{mockUserProfile.age}</span>
          </div>
        </Card>

        {/* Interests */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {mockUserProfile.interests.map(interest => (
              <span key={interest} className="px-3 py-1.5 rounded-full bg-muted text-sm font-medium border border-border/50">
                {interest}
              </span>
            ))}
          </div>
        </section>

        {/* Settings Menu */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Settings</h2>
          <Card className="p-0 overflow-hidden divide-y divide-border/50">
            <MenuRow icon={<Settings size={20} />} label="Preferences" />
            <MenuRow icon={<Bell size={20} />} label="Notifications" />
            <MenuRow icon={<Shield size={20} />} label="Privacy & Data" />
            <MenuRow icon={<CircleHelp size={20} />} label="Help & Support" />
          </Card>
        </section>

        <Button variant="ghost" fullWidth className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 gap-2">
          <LogOut size={20} /> Log Out
        </Button>

      </div>
      <BottomNav />
    </PageTransition>
  );
}

function MenuRow({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3 text-foreground">
        <span className="text-muted-foreground">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
      <ChevronRight size={18} className="text-muted-foreground" />
    </div>
  );
}
