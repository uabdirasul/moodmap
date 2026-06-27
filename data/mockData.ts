import {
  Event,
  Friend,
  FriendLocation,
  FriendVisit,
  MoodLogEntry,
  Place,
  RecommendationResult,
  UserProfile,
  Goal,
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
    image: "/images/places/quiet-park.jpg",
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
    image: "/images/places/riverside-cafe.jpg",
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
    image: "/images/places/art-museum.jpg",
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
    image: "/images/places/rooftop-terrace.jpg",
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
    image: "/images/places/botanical-garden.jpg",
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

export const mockFriends: Friend[] = [
  {
    id: "f1",
    name: "Benjamin",
    avatar: "/images/avatars/benjamin.svg",
    isCloseFriend: true,
  },
  {
    id: "f2",
    name: "Sarah",
    avatar: "/images/avatars/sarah.svg",
    isCloseFriend: true,
  },
  {
    id: "f3",
    name: "Maya",
    avatar: "/images/avatars/maya.svg",
    isCloseFriend: false,
  },
  {
    id: "f4",
    name: "Daniel",
    avatar: "/images/avatars/daniel.svg",
    isCloseFriend: true,
  },
];

export const mockFriendVisits: FriendVisit[] = [
  {
    id: "fv1",
    friendId: "f1",
    placeId: "p2",
    visitedAt: "Yesterday",
    feedback:
      "Perfect spot for a slow morning. The river view and acoustic playlist made it easy to unwind.",
    enjoyed: true,
    mood: "Calm",
  },
  {
    id: "fv2",
    friendId: "f1",
    placeId: "p3",
    visitedAt: "3 days ago",
    feedback:
      "The new contemporary wing is incredible — left feeling inspired and refreshed.",
    enjoyed: true,
    mood: "Inspired",
  },
  {
    id: "fv3",
    friendId: "f3",
    placeId: "p4",
    visitedAt: "Last Friday",
    feedback:
      "Great vibes and city views at sunset. Music was a bit loud but the energy was fun.",
    enjoyed: true,
    mood: "Energetic",
  },
  {
    id: "fv4",
    friendId: "f2",
    placeId: "p1",
    visitedAt: "2 days ago",
    feedback:
      "So peaceful. Found a bench by the stream and read for an hour — exactly what I needed.",
    enjoyed: true,
    mood: "Relaxed",
  },
];

export const mockFriendLocations: FriendLocation[] = [
  {
    friendId: "f1",
    placeId: "p2",
    coordinates: { lat: 37.7752, lng: -122.4178 },
    updatedAt: "2 min ago",
  },
  {
    friendId: "f2",
    placeId: "p1",
    coordinates: { lat: 37.7746, lng: -122.4198 },
    updatedAt: "5 min ago",
  },
  {
    friendId: "f4",
    placeId: "p4",
    coordinates: { lat: 37.7723, lng: -122.4153 },
    updatedAt: "12 min ago",
  },
];

export const mockEvents: Event[] = [
  {
    id: "e1",
    placeId: "p4",
    title: "Sunset Jazz on the Roof",
    description:
      "Live jazz trio, craft cocktails, and panoramic city views every Saturday evening.",
    date: "Jun 28, 2026",
    time: "7:00 PM",
    daysUntil: 1,
    category: "Concert",
    source: "afisha",
    priceFrom: "$25",
    image: "/images/events/jazz-roof.jpg",
  },
  {
    id: "e2",
    placeId: "p3",
    title: "Modern Perspectives — Opening Night",
    description:
      "Exclusive first look at the summer exhibition with curator talk and wine reception.",
    date: "Jun 29, 2026",
    time: "6:30 PM",
    daysUntil: 2,
    category: "Exhibition",
    source: "iticket",
    priceFrom: "$18",
    image: "/images/events/exhibition.jpg",
  },
  {
    id: "e3",
    placeId: "p5",
    title: "Botanical Light Walk",
    description:
      "Guided evening stroll through illuminated garden paths with live ambient music.",
    date: "Jun 30, 2026",
    time: "8:00 PM",
    daysUntil: 3,
    category: "Experience",
    source: "afisha",
    priceFrom: "$12",
    image: "/images/events/light-walk.jpg",
  },
  {
    id: "e4",
    placeId: "p2",
    title: "Acoustic Brunch Sessions",
    description:
      "Local singer-songwriters perform while you enjoy brunch by the river.",
    date: "Jun 27, 2026",
    time: "11:00 AM",
    daysUntil: 0,
    category: "Live Music",
    source: "venue",
    priceFrom: "Free",
    image: "/images/events/acoustic-brunch.jpg",
  },
  {
    id: "e5",
    placeId: "p1",
    title: "Mindful Morning in the Park",
    description:
      "Community yoga and meditation session under the trees. Mats provided.",
    date: "Jun 28, 2026",
    time: "8:00 AM",
    daysUntil: 1,
    category: "Wellness",
    source: "afisha",
    priceFrom: "Free",
    image: "/images/events/mindful-morning.jpg",
  },
];

export function getFriendById(id: string): Friend | undefined {
  return mockFriends.find((friend) => friend.id === id);
}

export function getPlaceById(id: string): Place | undefined {
  return mockPlaces.find((place) => place.id === id);
}

export function getUpcomingEvents(limit?: number): Event[] {
  const sorted = [...mockEvents].sort((a, b) => a.daysUntil - b.daysUntil);
  return limit ? sorted.slice(0, limit) : sorted;
}

export function getEventsForPlace(placeId: string): Event[] {
  return mockEvents
    .filter((event) => event.placeId === placeId)
    .sort((a, b) => a.daysUntil - b.daysUntil);
}

export function getVisitsForPlace(placeId: string): FriendVisit[] {
  return mockFriendVisits.filter((visit) => visit.placeId === placeId);
}

export function getFriendLocation(friendId: string): FriendLocation | undefined {
  return mockFriendLocations.find((loc) => loc.friendId === friendId);
}

export function getCloseFriendsNow(): Array<{
  friend: Friend;
  location: FriendLocation;
  place: Place;
}> {
  return mockFriendLocations
    .map((location) => {
      const friend = getFriendById(location.friendId);
      const place = getPlaceById(location.placeId);
      if (!friend?.isCloseFriend || !place) return null;
      return { friend, location, place };
    })
    .filter(Boolean) as Array<{
    friend: Friend;
    location: FriendLocation;
    place: Place;
  }>;
}

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

function getGoalScore(place: Place, goal: Goal): number {
  switch (goal) {
    case "Relax":
    case "Quiet Place":
      return place.calmScore;
    case "Focus":
      return place.focusScore;
    case "Energy":
      return place.energyScore;
    case "Inspiration":
      return place.inspirationScore;
    case "Walk":
      return place.idealFor.includes("Walk")
        ? 9
        : (place.calmScore + place.inspirationScore) / 2;
    default:
      return 0;
  }
}

function formatGoalsList(goals: Goal[]): string {
  if (goals.length === 1) return goals[0].toLowerCase();
  if (goals.length === 2) {
    return `${goals[0].toLowerCase()} and ${goals[1].toLowerCase()}`;
  }
  return `${goals.slice(0, -1).map((g) => g.toLowerCase()).join(", ")}, and ${goals[goals.length - 1].toLowerCase()}`;
}

// Helper to simulate AI recommendation logic based on goals/mood
export function getMockRecommendations(
  mood: string,
  goals: Goal[]
): RecommendationResult[] {
  if (goals.length === 0) return [];

  const rankedPlaces = [...mockPlaces]
    .map((place) => {
      const goalScores = goals.map((goal) => getGoalScore(place, goal));
      const averageGoalScore =
        goalScores.reduce((sum, score) => sum + score, 0) / goals.length;
      const idealForMatches = goals.filter((goal) =>
        place.idealFor.includes(goal)
      ).length;
      const compositeScore = averageGoalScore + idealForMatches * 1.5;

      return { place, compositeScore, idealForMatches };
    })
    .filter(({ compositeScore }) => compositeScore >= 4)
    .sort((a, b) => b.compositeScore - a.compositeScore);

  const goalsLabel = formatGoalsList(goals);

  return rankedPlaces.slice(0, 3).map(({ place, idealForMatches }, index) => ({
    place,
    compatibilityScore: Math.min(
      99,
      Math.round(88 + idealForMatches * 3 - index * 5 + place.calmScore * 0.5)
    ),
    matchReason:
      index === 0
        ? `Because you want to ${goalsLabel} while feeling ${mood.toLowerCase()}, this location offers the perfect balance of ${place.environmentalCharacteristics.join(" and ")}.`
        : `Strong fit for ${idealForMatches > 0 ? `${idealForMatches} of your selected goals` : "your combined goals"} — especially ${place.category.toLowerCase()}s when seeking ${goalsLabel}.`,
  }));
}
