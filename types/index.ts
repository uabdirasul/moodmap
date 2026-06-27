export type Mood =
  | "Happy"
  | "Calm"
  | "Tired"
  | "Sad"
  | "Irritated"
  | "Stressed"
  | "Relaxed"
  | "Inspired"
  | "Energetic"
  | "Focus";

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

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  isCloseFriend: boolean;
}

export interface FriendVisit {
  id: string;
  friendId: string;
  placeId: string;
  visitedAt: string;
  feedback: string;
  enjoyed: boolean;
  mood: Mood;
}

export interface FriendLocation {
  friendId: string;
  placeId: string;
  coordinates: LocationCoordinates;
  updatedAt: string;
}

export type EventSource = "afisha" | "iticket" | "venue";

export interface Event {
  id: string;
  placeId: string;
  title: string;
  description: string;
  date: string;
  time: string;
  daysUntil: number;
  category: string;
  source: EventSource;
  priceFrom?: string;
  image: string;
}
