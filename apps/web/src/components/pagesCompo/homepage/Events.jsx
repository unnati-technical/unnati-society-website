import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { eventsApi } from "../../../api/events.api";
import { queryKeys } from "../../../constants/queryKeys";

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

// Fallback static events when the API is empty
const STATIC_EVENTS = [
  {
    id: 's1',
    title: 'UNNATI PRASASTHI SAMAROH',
    description: 'Celebrating the achievements and outstanding contributions of our volunteers and community leaders in the outreach program.',
    date: '2026-08-05T00:00:00Z',
    location: 'Main Auditorium, IIIT Bhagalpur',
    photos: []
  },
  {
    id: 's2',
    title: "CHILDREN'S DAY CELEBRATION",
    description: 'A special day filled with fun activities, educational games, and distributing gifts to children in our adopted local schools.',
    date: '2026-11-14T00:00:00Z',
    location: 'Primary School, Sabour',
    photos: []
  },
  {
    id: 's3',
    title: 'TECH EDUCATION WORKSHOP',
    description: 'Introduction to technology and basic digital literacy for underprivileged students to equip them for the modern world.',
    date: '2026-12-10T00:00:00Z',
    location: 'Unnati Center, Bhagalpur',
    photos: []
  }
];

const Events = () => {
  const { data: fetchedEvents } = useQuery({
    queryKey: queryKeys.events,
    queryFn: eventsApi.getUpcoming,
  });

  const events = fetchedEvents?.length > 0 ? fetchedEvents : STATIC_EVENTS;
  const [startIndex, setStartIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (events.length <= 3 || isHovered) return;
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [events.length, isHovered]);

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % events.length);
  };

  const getVisibleEvents = () => {
    if (events.length <= 3) return events;
    return [
      events[startIndex],
      events[(startIndex + 1) % events.length],
      events[(startIndex + 2) % events.length],
    ];
  };

  const visibleEvents = getVisibleEvents();

  return (
    <section className="flex justify-center items-center py-20 w-full bg-slate-50/50 overflow-hidden border-t border-b border-gray-100">
      <div className="flex flex-col gap-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Header with Slider Controls */}
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="oswald-font-3 text-2xl font-black text-gray-900 tracking-tight uppercase">
              OUR UPCOMING EVENTS
            </h1>
          </div>
          {events.length > 3 && (
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full p-2 transition cursor-pointer shadow-sm"
                aria-label="Previous event"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full p-2 transition cursor-pointer shadow-sm"
                aria-label="Next event"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {events.length === 0 ? (
          <p className="text-gray-400 text-sm">No upcoming events at this time. Check back soon!</p>
        ) : (
          <div 
            className="flex flex-col md:flex-row gap-8 justify-center items-stretch"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {visibleEvents.map((ev, idx) => {
              const d = new Date(ev.date);
              const day = d.getDate();
              const month = MONTHS[d.getMonth()];
              const year = d.getFullYear();
              const photo = ev.photos && ev.photos.length > 0 ? ev.photos[0] : null;

              return (
                <div
                  key={ev.id || idx}
                  className="w-full md:w-1/3 flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-1 h-[370px]"
                >
                  {/* Event Image */}
                  <div className="relative h-40 w-full bg-slate-100 overflow-hidden shrink-0">
                    {photo ? (
                      <img
                        src={photo}
                        alt={ev.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                        <Calendar className="w-10 h-10 text-blue-400" />
                      </div>
                    )}
                  </div>

                  {/* Event Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between overflow-hidden">
                    <div className="space-y-2">
                      <span className="text-[#3B82F6] text-[10px] font-black tracking-widest uppercase block">
                        Tentative: {day} {month} {year}
                      </span>
                      <h3 className="oswald-font-3 text-lg font-black text-gray-900 leading-snug line-clamp-2 uppercase">
                        {ev.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                        {ev.description || "No description provided."}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-gray-600 font-bold pt-4 border-t border-gray-50 shrink-0">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{ev.location || "TBA"}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;