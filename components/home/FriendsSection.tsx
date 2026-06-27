'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  getCloseFriendsNow,
  getFriendById,
  getPlaceById,
  mockFriendVisits,
} from '@/data/mockData';
import { MapPin, Sparkles, Users } from 'lucide-react';

export function FriendsNearby() {
  const router = useRouter();
  const friendsNow = getCloseFriendsNow();

  if (friendsNow.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Users size={18} className="text-primary" />
        <h3 className="font-semibold text-lg">Close friends right now</h3>
      </div>

      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
        {friendsNow.map(({ friend, location, place }) => (
          <Card
            key={friend.id}
            hoverable
            glass
            className="min-w-[200px] p-4 shrink-0"
            onClick={() => router.push(`/map?place=${place.id}`)}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-primary/30"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-background" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{friend.name}</p>
                <p className="text-[10px] text-muted-foreground">{location.updatedAt}</p>
              </div>
            </div>
            <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
              <MapPin size={12} className="mt-0.5 shrink-0 text-primary" />
              <span className="line-clamp-2">
                At <span className="font-medium text-foreground">{place.name}</span>
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function FriendRecommendations() {
  const router = useRouter();
  const visits = mockFriendVisits.filter((visit) => visit.enjoyed).slice(0, 3);

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={18} className="text-primary" />
        <h3 className="font-semibold text-lg">From your friends</h3>
      </div>

      <div className="flex flex-col gap-4">
        {visits.map((visit) => {
          const friend = getFriendById(visit.friendId);
          const place = getPlaceById(visit.placeId);
          if (!friend || !place) return null;

          return (
            <Card key={visit.id} glass className="p-4 overflow-hidden">
              <div className="flex gap-3 mb-3">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug">
                    <span className="font-semibold">{friend.name}</span>
                    {friend.isCloseFriend && (
                      <span className="ml-1.5 text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                        Close friend
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Visited {place.name} · {visit.visitedAt}
                  </p>
                </div>
              </div>

              <blockquote className="text-sm text-muted-foreground border-l-2 border-primary/40 pl-3 mb-3 italic">
                &ldquo;{visit.feedback}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate">{place.name}</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                      Enjoyed it · felt {visit.mood.toLowerCase()}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="shrink-0 text-xs h-9 px-3"
                  onClick={() => router.push(`/place/${place.id}`)}
                >
                  Go too?
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
