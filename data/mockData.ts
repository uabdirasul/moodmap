import {
  Event,
  Friend,
  FriendLocation,
  FriendVisit,
  Goal,
  MoodLogEntry,
  Place,
  RecommendationResult,
  UserProfile
} from "../types";

export const mockPlaces: Place[] = [
  {
    id: "p1",
    name: "Savitsky Nukus Museum of Art",
    category: "Museum",
    moodTags: ["Inspired", "Curious", "Reflective"],
    idealFor: ["Inspiration", "History", "Culture", "Quiet Place"],
    energyScore: 3,
    calmScore: 7,
    focusScore: 8,
    inspirationScore: 10,
    stressScore: 2,
    image: "/images/places/savitsky-museum.jpg",
    description:
      "A legendary desert museum hiding the world's second largest collection of Russian avant-garde art — works secretly rescued from Soviet censorship. Known as the 'Louvre of the Sands', its 100,000+ items span forbidden masterpieces, Karakalpak folk art, and ancient archaeological finds.",
    distance: "0.2 miles",
    bestTimes: "Tuesday to Friday, morning hours",
    environmentalCharacteristics: [
      "Indoor",
      "Low noise",
      "Culturally rich",
      "Climate controlled"
    ],
    coordinates: { lat: 42.46516710986553, lng: 59.61374527083403 }
  },
  {
    id: "p2",
    name: "Cake Bumer",
    category: "Cafe",
    moodTags: ["Happy", "Relaxed"],
    idealFor: ["Relax", "Quiet Place"],
    energyScore: 4,
    calmScore: 7,
    focusScore: 3,
    inspirationScore: 5,
    stressScore: 2,
    image: "/images/places/cake-bumer.png",
    description:
      "A cozy and colorful bakery-café opposite the Savitsky Museum, popular with locals for its generous portions, cakes, and love-themed décor. Features an indoor café, a pastry shop, and a summer terrace. Great for a sweet break or a casual meal.",
    distance: "0.3 miles",
    bestTimes: "Morning or afternoon",
    environmentalCharacteristics: ["Indoor", "Cozy", "Low noise", "Urban"],
    coordinates: { lat: 42.46447897879004, lng: 59.61179273947377 }
  },
  {
    id: "p3",
    name: "Flagpole with Flags of Uzbekistan and Karakalpakstan",
    category: "Landmark",
    moodTags: ["Calm", "Reflective"],
    idealFor: ["Walk", "Quiet Place", "History"],
    energyScore: 3,
    calmScore: 6,
    focusScore: 4,
    inspirationScore: 6,
    stressScore: 2,
    image: "/images/places/nukus-flagpole.png",
    description:
      "A civic landmark in the heart of Nukus displaying the national flags of Uzbekistan and the autonomous Republic of Karakalpakstan side by side. A symbol of regional identity and political unity, it's a quiet open-air spot popular with locals and visitors exploring the city center.",
    distance: "0.1 miles",
    bestTimes: "Morning or golden hour",
    environmentalCharacteristics: [
      "Outdoor",
      "Open space",
      "Low noise",
      "Urban"
    ],
    coordinates: { lat: 42.465164380903865, lng: 59.615096658915796 }
  },
  {
    id: "p4",
    name: "Cinnamon Coffee & Pastry",
    category: "Cafe",
    moodTags: ["Happy", "Calm", "Relaxed"],
    idealFor: ["Relax", "Focus", "Quiet Place"],
    energyScore: 3,
    calmScore: 8,
    focusScore: 6,
    inspirationScore: 5,
    stressScore: 1,
    image: "/images/places/cinnamon-cafe.png",
    description:
      "Ranked #1 restaurant in Nukus, this plant-filled café sits right opposite the Savitsky Museum. Known for real espresso, fresh pastries, salads, and an English menu. Light, natural décor and a relaxed atmosphere make it a favourite among travellers and locals alike.",
    distance: "0.2 miles",
    bestTimes: "Morning to early afternoon",
    environmentalCharacteristics: [
      "Indoor",
      "Cozy",
      "Low noise",
      "Culturally rich"
    ],
    coordinates: { lat: 42.46447, lng: 59.61198 }
  },
  {
    id: "p5",
    name: "Berdakh National Museum",
    category: "Museum",
    moodTags: ["Curious", "Reflective", "Calm"],
    idealFor: ["History", "Culture", "Quiet Place"],
    energyScore: 2,
    calmScore: 8,
    focusScore: 7,
    inspirationScore: 7,
    stressScore: 1,
    image: "/images/places/berdakh-museum.png",
    description:
      "A beautifully domed museum dedicated to Berdakh, the revered Karakalpak poet and first historian of his people. Houses archaeological finds, ancient manuscripts in Arabic, Persian and Turkic, and rich ethnographic collections spanning millennia of Karakalpak culture.",
    distance: "0.5 miles",
    bestTimes: "Weekday mornings",
    environmentalCharacteristics: [
      "Indoor",
      "Low noise",
      "Culturally rich",
      "Climate controlled"
    ],
    coordinates: { lat: 42.4625, lng: 59.6185 }
  },
  {
    id: "p6",
    name: "Doslıq dem alıw orayı",
    category: "Park",
    moodTags: ["Calm", "Relaxed", "Happy"],
    idealFor: ["Relax", "Walk", "Quiet Place"],
    energyScore: 3,
    calmScore: 9,
    focusScore: 4,
    inspirationScore: 6,
    stressScore: 1,
    image: "/images/places/nukus-city-park.png",
    description:
      "A shaded urban park near the museum district, with tree-lined paths, benches, and a calm atmosphere away from the dusty main roads. A favourite spot for morning walkers, families, and anyone needing a quiet pause in the middle of the city.",
    distance: "0.3 miles",
    bestTimes: "Early morning or late afternoon",
    environmentalCharacteristics: [
      "Outdoor",
      "Open space",
      "Low noise",
      "High nature"
    ],
    coordinates: { lat: 42.4658, lng: 59.6128 }
  },
  {
    id: "p7",
    name: "Karakalpakstan State Museum of History",
    category: "Museum",
    moodTags: ["Curious", "Reflective", "Inspired"],
    idealFor: ["History", "Culture", "Focus"],
    energyScore: 2,
    calmScore: 7,
    focusScore: 8,
    inspirationScore: 8,
    stressScore: 1,
    image: "/images/places/history-museum-nukus.png",
    description:
      "The main history museum of Karakalpakstan, covering the region from ancient Khorezm civilizations through Soviet times to independence. Exhibits include pottery, weapons, coins, costumes, and scale models of legendary desert fortresses. A must for context before exploring the wider region.",
    distance: "0.6 miles",
    bestTimes: "Tuesday to Saturday, morning",
    environmentalCharacteristics: [
      "Indoor",
      "Low noise",
      "Culturally rich",
      "Climate controlled"
    ],
    coordinates: { lat: 42.4638, lng: 59.6092 }
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
    isCloseFriend: true
  },
  {
    id: "f2",
    name: "Sarah",
    avatar: "/images/avatars/sarah.svg",
    isCloseFriend: true
  },
  {
    id: "f3",
    name: "Maya",
    avatar: "/images/avatars/maya.svg",
    isCloseFriend: false
  },
  {
    id: "f4",
    name: "Daniel",
    avatar: "/images/avatars/daniel.svg",
    isCloseFriend: true
  }
];

export const mockFriendVisits: FriendVisit[] = [
  {
    id: "fv1",
    friendId: "f1",
    placeId: "p2",
    visitedAt: "Yesterday",
    feedback:
      "Stumbled in for coffee and ended up ordering two slices of cake. The décor is fun and a little over the top, but that's part of the charm. Perfect afternoon stop after the Savitsky Museum.",
    enjoyed: true,
    mood: "Happy"
  },
  {
    id: "fv2",
    friendId: "f4",
    placeId: "p1",
    visitedAt: "3 days ago",
    feedback:
      "Stood in front of the forbidden avant-garde paintings for way longer than planned. The stories behind each canvas hit differently when you know they were nearly destroyed.",
    enjoyed: true,
    mood: "Inspired"
  },
  {
    id: "fv3",
    friendId: "f3",
    placeId: "p4",
    visitedAt: "Last Friday",
    feedback:
      "Real espresso in Nukus — didn't expect that. Light space, plants everywhere, and the pastries are genuinely good. Came back the next morning too.",
    enjoyed: true,
    mood: "Relaxed"
  },
  {
    id: "fv4",
    friendId: "f2",
    placeId: "p6",
    visitedAt: "2 days ago",
    feedback:
      "Early morning walk through the park before the heat set in. Quiet, shaded, and exactly what I needed to clear my head before a long day.",
    enjoyed: true,
    mood: "Calm"
  }
];

export const mockFriendLocations: FriendLocation[] = [
  {
    friendId: "f1",
    placeId: "p2",
    coordinates: { lat: 42.46447897879004, lng: 59.61179273947377 },
    updatedAt: "2 min ago"
  },
  {
    friendId: "f2",
    placeId: "p6",
    coordinates: { lat: 42.4658, lng: 59.6128 },
    updatedAt: "5 min ago"
  },
  {
    friendId: "f4",
    placeId: "p1",
    coordinates: { lat: 42.46516710986553, lng: 59.61374527083403 },
    updatedAt: "12 min ago"
  }
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
    image: "/images/events/jazz-roof.jpg"
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
    image: "/images/events/exhibition.jpg"
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
    image: "/images/events/light-walk.jpg"
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
    image: "/images/events/acoustic-brunch.jpg"
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
    image: "/images/events/mindful-morning.jpg"
  }
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

export function getFriendLocation(
  friendId: string
): FriendLocation | undefined {
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
  { id: "4", date: "2023-10-04", mood: "Happy", note: "Movie night" },
  { id: "5", date: "2023-10-05", mood: "Focus" as any },
  { id: "6", date: "2023-10-06", mood: "Irritated" },
  { id: "7", date: "2023-10-07", mood: "Calm" },

  // Added entries
  {
    id: "8",
    date: "2023-10-08",
    mood: "Happy",
    note: "Great brunch with friends"
  },
  { id: "9", date: "2023-10-09", mood: "Sad", note: "Rainy day, stayed in" },
  { id: "10", date: "2023-10-10", mood: "Focus", note: "Deep work session" },
  { id: "11", date: "2023-10-11", mood: "Calm" },
  { id: "12", date: "2023-10-12", mood: "Stressed", note: "Deadline crunch" },
  { id: "13", date: "2023-10-13", mood: "Happy", note: "Movie night" },
  { id: "14", date: "2023-10-14", mood: "Tired", note: "Didn't sleep well" },
  {
    id: "15",
    date: "2023-10-15",
    mood: "Calm",
    note: "Meditation in the morning"
  },
  { id: "16", date: "2023-10-16", mood: "Irritated" },
  { id: "17", date: "2023-10-17", mood: "Happy", note: "Productive and sunny" }
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
  return `${goals
    .slice(0, -1)
    .map((g) => g.toLowerCase())
    .join(", ")}, and ${goals[goals.length - 1].toLowerCase()}`;
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
        : `Strong fit for ${idealForMatches > 0 ? `${idealForMatches} of your selected goals` : "your combined goals"} — especially ${place.category.toLowerCase()}s when seeking ${goalsLabel}.`
  }));
}
