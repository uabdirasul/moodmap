'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { getPlaceById, getUpcomingEvents } from '@/data/mockData';
import { Event } from '@/types';
import { CalendarDays, Clock, MapPin, Ticket } from 'lucide-react';

const SOURCE_LABELS: Record<Event['source'], string> = {
  afisha: 'Afisha',
  iticket: 'iTicket',
  venue: 'Venue',
};

function EventCard({ event }: { event: Event }) {
  const router = useRouter();
  const place = getPlaceById(event.placeId);

  const dayLabel =
    event.daysUntil === 0
      ? 'Today'
      : event.daysUntil === 1
        ? 'Tomorrow'
        : `In ${event.daysUntil} days`;

  return (
    <Card
      hoverable
      className="min-w-[260px] p-0 overflow-hidden shrink-0"
      onClick={() => router.push(`/map?place=${event.placeId}`)}
    >
      <div className="relative h-32">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-primary text-primary-foreground">
          {dayLabel}
        </span>
        <span className="absolute top-2 right-2 text-[10px] font-medium px-2 py-1 rounded-full glass">
          {SOURCE_LABELS[event.source]}
        </span>
        <div className="absolute bottom-2 left-3 right-3">
          <p className="text-white font-semibold text-sm line-clamp-2 leading-tight">
            {event.title}
          </p>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
          <span className="flex items-center gap-1">
            <CalendarDays size={12} />
            {event.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {event.time}
          </span>
        </div>

        {place && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <MapPin size={12} className="shrink-0 text-primary" />
            <span className="truncate">{place.name}</span>
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
            {event.category}
          </span>
          {event.priceFrom && (
            <span className="flex items-center gap-1 text-xs font-semibold text-primary">
              <Ticket size={12} />
              {event.priceFrom}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}

export function EventsSection() {
  const events = getUpcomingEvents();

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarDays size={18} className="text-primary" />
          <h3 className="font-semibold text-lg">Upcoming events</h3>
        </div>
        <span className="text-xs text-muted-foreground">Afisha · iTicket</span>
      </div>

      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-1 -mx-1 px-1">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
