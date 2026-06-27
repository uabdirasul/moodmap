import { Place } from '@/types';

export type MoodMapType = 'calm' | 'focus' | 'energy' | 'inspired';

export const MOOD_MAP_COLORS: Record<
  MoodMapType,
  { hex: string; label: string; tailwind: string }
> = {
  calm: { hex: '#3b82f6', label: 'Calm', tailwind: 'bg-blue-500' },
  focus: { hex: '#a855f7', label: 'Focus', tailwind: 'bg-purple-500' },
  energy: { hex: '#f97316', label: 'Energy', tailwind: 'bg-orange-500' },
  inspired: { hex: '#eab308', label: 'Inspired', tailwind: 'bg-yellow-500' },
};

export function getPlaceMoodType(place: Place): MoodMapType {
  const scores: Record<MoodMapType, number> = {
    calm: place.calmScore,
    focus: place.focusScore,
    energy: place.energyScore,
    inspired: place.inspirationScore,
  };

  return (Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0] ??
    'calm') as MoodMapType;
}

export function getPlaceMoodColor(place: Place): string {
  return MOOD_MAP_COLORS[getPlaceMoodType(place)].hex;
}
