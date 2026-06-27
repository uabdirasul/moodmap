import {
  MoodLogEntry,
  Place,
  RecommendationResult,
  UserProfile
} from "../types";

export const mockPlaces: Place[] = [
  {
    id: "p1",
    name: "Quiet Park",
    category: "Park",
    moodTags: ["Calm", "Relaxed"],
    idealFor: ["Relax", "Walk", "Quiet Place"],
    energyScore: 2,
    calmScore: 9,
    focusScore: 5,
    inspirationScore: 7,
    stressScore: 1,
    image:
      "https://images.unsplash.com/photo-1542273917363-3b1817f69a56?auto=format&fit=crop&q=80&w=800",
    description:
      "A secluded park with gentle streams, mature trees, and plenty of shaded benches. Perfect for reading or escaping the city noise.",
    distance: "0.8 miles",
    bestTimes: "Early morning or late afternoon",
    environmentalCharacteristics: ["Low noise", "High nature", "Open space"],
    coordinates: { lat: 37.7749, lng: -122.4194 }
  },
  {
    id: "p2",
    name: "Riverside Café",
    category: "Café",
    moodTags: ["Calm", "Happy"],
    idealFor: ["Relax", "Focus", "Inspiration"],
    energyScore: 4,
    calmScore: 7,
    focusScore: 8,
    inspirationScore: 6,
    stressScore: 2,
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
    description:
      "A bright, airy coffee shop overlooking the river. Gentle acoustic music and the smell of roasted beans create a perfect focus environment.",
    distance: "1.2 miles",
    bestTimes: "Mid-morning",
    environmentalCharacteristics: [
      "Ambient noise",
      "Good lighting",
      "Comfortable seating"
    ],
    coordinates: { lat: 37.775, lng: -122.418 }
  },
  {
    id: "p3",
    name: "Art Museum",
    category: "Museum",
    moodTags: ["Calm", "Inspired"],
    idealFor: ["Inspiration", "Walk", "Quiet Place"],
    energyScore: 3,
    calmScore: 8,
    focusScore: 6,
    inspirationScore: 10,
    stressScore: 1,
    image:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&q=80&w=800",
    description:
      "A modern art museum with spacious, minimalist galleries and thought-provoking exhibits. Ideal for shifting your perspective.",
    distance: "2.5 miles",
    bestTimes: "Weekday afternoons",
    environmentalCharacteristics: [
      "Very quiet",
      "Climate controlled",
      "Visually stimulating"
    ],
    coordinates: { lat: 37.78, lng: -122.42 }
  },
  {
    id: "p4",
    name: "Rooftop Terrace",
    category: "Lounge",
    moodTags: ["Happy", "Energetic"],
    idealFor: ["Energy", "Inspiration"],
    energyScore: 8,
    calmScore: 3,
    focusScore: 2,
    inspirationScore: 8,
    stressScore: 4,
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&q=80&w=800",
    description:
      "A lively rooftop space with panoramic city views, upbeat music, and a vibrant atmosphere to lift your spirits.",
    distance: "0.5 miles",
    bestTimes: "Evening",
    environmentalCharacteristics: ["High energy", "Outdoor", "Scenic views"],
    coordinates: { lat: 37.772, lng: -122.415 }
  },
  {
    id: "p5",
    name: "Botanical Garden",
    category: "Garden",
    moodTags: ["Calm", "Happy"],
    idealFor: ["Relax", "Walk", "Inspiration"],
    energyScore: 3,
    calmScore: 10,
    focusScore: 4,
    inspirationScore: 9,
    stressScore: 0,
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4ce88?auto=format&fit=crop&q=80&w=800",
    description:
      "Lush gardens featuring exotic plants, koi ponds, and meandering stone paths. A true sanctuary from stress.",
    distance: "3.1 miles",
    bestTimes: "Spring mornings",
    environmentalCharacteristics: ["High nature", "Fresh air", "Tranquil"],
    coordinates: { lat: 37.765, lng: -122.43 }
  }
];

export const mockUserProfile: UserProfile = {
  name: "Alex",
  age: 28,
  lifestyle: "Remote Worker",
  interests: ["Reading", "Coffee", "Nature walks", "Art"],
  favoritePlaces: ["p2", "p5"],
  goal: "Reduce stress and find better focus environments"
};

export const mockMoodHistory: MoodLogEntry[] = [
  { id: "1", date: "2023-10-01", mood: "Stressed", note: "Long day at work" },
  { id: "2", date: "2023-10-02", mood: "Tired" },
  {
    id: "3",
    date: "2023-10-03",
    mood: "Calm",
    note: "Went for a walk in the park"
  },
  { id: "4", date: "2023-10-04", mood: "Happy" },
  { id: "5", date: "2023-10-05", mood: "Focus" as any }, // Assuming some extended moods for charting
  { id: "6", date: "2023-10-06", mood: "Irritated" },
  { id: "7", date: "2023-10-07", mood: "Calm" }
];

// Helper to simulate AI recommendation logic based on goal/mood
export function getMockRecommendations(
  mood: string,
  goal: string
): RecommendationResult[] {
  let matchedPlaces = [...mockPlaces];

  if (goal === "Relax" || goal === "Quiet Place") {
    matchedPlaces = matchedPlaces.filter((p) => p.calmScore > 6);
  } else if (goal === "Energy") {
    matchedPlaces = matchedPlaces.filter((p) => p.energyScore > 6);
  } else if (goal === "Focus") {
    matchedPlaces = matchedPlaces.filter((p) => p.focusScore > 6);
  }

  // Sort by some fake AI matching logic
  return matchedPlaces.slice(0, 3).map((place, index) => ({
    place,
    compatibilityScore: 98 - index * 5 - Math.floor(Math.random() * 5),
    matchReason:
      index === 0
        ? `Because you want to ${goal.toLowerCase()} while feeling ${mood.toLowerCase()}, this location offers the perfect balance of ${place.environmentalCharacteristics.join(" and ")}.`
        : `Matches your historical preference for ${place.category.toLowerCase()}s when seeking ${goal.toLowerCase()}.`
  }));
}
