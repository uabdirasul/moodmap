'use client';

import React from 'react';
import { PageTransition } from '@/components/animations/PageTransition';
import { BottomNav } from '@/components/navigation/BottomNav';
import { Card } from '@/components/ui/Card';
import { mockMoodHistory } from '@/data/mockData';
import { Activity, TrendingUp, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalyticsPage() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  // Mock data for the chart bars
  const chartData = [40, 60, 30, 80, 50, 90, 70];

  return (
    <PageTransition className="min-h-screen pb-24 bg-background">
      <div className="p-6 pt-12">
        <h1 className="text-3xl font-bold mb-8">Analytics</h1>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="p-4 flex flex-col gap-2 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <Activity className="text-primary" size={24} />
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground font-medium uppercase">Places Visited</p>
            </div>
          </Card>
          <Card className="p-4 flex flex-col gap-2 bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
            <TrendingUp className="text-purple-500" size={24} />
            <div>
              <p className="text-2xl font-bold">85%</p>
              <p className="text-xs text-muted-foreground font-medium uppercase">Mood Improved</p>
            </div>
          </Card>
        </div>

        {/* Chart */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <CalendarIcon size={20} className="text-primary" /> Weekly Mood Score
          </h2>
          <Card glass className="p-6">
            <div className="flex items-end justify-between h-40 gap-2 mb-4">
              {chartData.map((val, i) => (
                <div key={i} className="flex flex-col items-center flex-1 gap-2">
                  <div className="w-full h-full flex items-end justify-center rounded-t-lg bg-muted overflow-hidden">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${val}%` }}
                      transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                      className="w-full bg-primary rounded-t-lg"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{days[i]}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* History List */}
        <section>
          <h2 className="text-lg font-bold mb-4">Recent Logs</h2>
          <div className="flex flex-col gap-3">
            {mockMoodHistory.slice(0, 4).map((log) => (
              <Card key={log.id} className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl">
                    {getEmojiForMood(log.mood)}
                  </div>
                  <div>
                    <p className="font-semibold">{log.mood}</p>
                    <p className="text-xs text-muted-foreground">{new Date(log.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                  </div>
                </div>
                {log.note && (
                  <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-md max-w-[100px] truncate">
                    {log.note}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

      </div>
      <BottomNav />
    </PageTransition>
  );
}

function getEmojiForMood(mood: string) {
  const map: Record<string, string> = {
    Happy: '😊',
    Calm: '😌',
    Tired: '😴',
    Sad: '😔',
    Irritated: '😡',
    Stressed: '😰',
    Focus: '🧐'
  };
  return map[mood] || '😐';
}
