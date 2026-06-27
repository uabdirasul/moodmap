export type Mood =
  | "Happy"
  | "Calm"
  | "Tired"
  | "Sad"
  | "Irritated"
  | "Stressed"
  | "Relaxed"
  | "Inspired"
  | "Energetic";

export type Goal =
  | "Relax"
  | "Focus"
  | "Inspiration"
  | "Walk"
  | "Energy"
  | "Quiet Place";

export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface Place {
  id: string;
  name: string;
  category: string;
  moodTags: Mood[];
  idealFor: Goal[];
  energyScore: number;
  calmScore: number;
  focusScore: number;
  inspirationScore: number;
  stressScore: number;
  image: string; // URL or placeholder string
  description: string;
  distance: string; // Mocked distance, e.g. "0.8 miles"
  bestTimes: string;
  environmentalCharacteristics: string[];
  coordinates: LocationCoordinates;
}

export interface RecommendationResult {
  place: Place;
  compatibilityScore: number;
  matchReason: string;
}

export interface UserProfile {
  name: string;
  age: number | null;
  lifestyle: string;
  interests: string[];
  favoritePlaces: string[];
  goal: string;
}

export interface MoodLogEntry {
  id: string;
  date: string;
  mood: Mood;
  note?: string;
}
