import React, { useRef } from 'react'
import { MdArrowOutward, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';
import { eventsApi } from "../../../api/events.api";
import { queryKeys } from "../../../constants/queryKeys";
import { useNavigate } from "react-router-dom";

const CARD_COLORS = [
  'bg-blue-400',
  'bg-[#FACC15]',
  'bg-emerald-500',
  'bg-purple-500',
  'bg-rose-500',
  'bg-indigo-500',
];

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

// Fallback static events when the API is unavailable
const STATIC_EVENTS = [
  { id: 's1', title: 'UNNATI PRASASTHI SAMAROH', date: '2026-08-05T00:00:00Z', link: '/media/PrashastiMedia' },
  { id: 's2', title: "CHILDREN'S DAY", date: '2026-11-14T00:00:00Z', link: '/media/akshar/event-2' },
];

const Events = () => {
  const navigate = useNavigate();
  const { data: fetchedEvents } = useQuery({
    queryKey: queryKeys.events,
    queryFn: eventsApi.getUpcoming,
  });

  const events = fetchedEvents?.length > 0 ? fetchedEvents : STATIC_EVENTS;

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      if (direction === 'left') {
        scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className='flex justify-center items-center py-20 w-full overflow-hidden'>
        <div className='flex flex-col gap-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20'>
            <div className="flex justify-between items-center">
                <h1 className='oswald-font-3 text-2xl uppercase'>Our Upcoming Events</h1>
                {events.length > 2 && (
                  <div className="hidden md:flex gap-2">
                    <button 
                      onClick={() => scroll('left')}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <MdChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={() => scroll('right')}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <MdChevronRight size={24} />
                    </button>
                  </div>
                )}
            </div>
            {events.length === 0 ? (
              <p className="text-gray-400 text-sm">No upcoming events at this time. Check back soon!</p>
            ) : (
              <div 
                ref={scrollRef}
                className='flex flex-col md:flex-row gap-10 overflow-x-auto scrollbar-hide snap-x snap-mandatory'
              >
                {events.map((ev, idx) => {
                  const d = new Date(ev.date);
                  const day = d.getDate();
                  const month = MONTHS[d.getMonth()];
                  const color = ev.color || CARD_COLORS[idx % CARD_COLORS.length];
                  const bgImage = ev.photos && ev.photos.length > 0 ? ev.photos[0] : null;
                  const isLight = !bgImage && (color === 'bg-[#FACC15]' || color === 'bg-slate-300');
                  
                  return (
                    <div 
                      key={ev.id} 
                      style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                      className={`w-full md:min-w-[45%] lg:min-w-[30%] shrink-0 snap-start border rounded-2xl ${bgImage ? '' : color} p-5 border-none flex justify-between items-center relative overflow-hidden group min-h-[160px]`}
                    >
                        {bgImage && <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors"></div>}
                        {ev.isHoliday && (
                          <div className="absolute top-4 right-4 bg-white/40 z-10 text-xs font-bold px-2 py-0.5 rounded text-gray-800">
                            System Holiday
                          </div>
                        )}
                        <div className="relative z-10">
                            <h1 className={`text-4xl oswald-font-3 ${isLight ? 'text-[#111111]' : 'text-white'}`}>{day}</h1>
                            <p className={`oswald-font-2 mb-4 ${isLight ? 'text-[#111111]' : 'text-white'}`}>{month}</p>
                            <h1 className={`oswald-font-3 ${isLight ? 'text-[#111111]' : 'text-white'}`}>{ev.title}</h1>
                        </div>
                        {ev.link && (
                          <div className='relative z-10 bg-white border-0 rounded-full p-2 cursor-pointer shadow-lg hover:scale-110 transition-transform'>
                              <MdArrowOutward size={24} 
                                   onClick={() => navigate(ev.link)}
                              />
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            )}
        </div>
    </section>
  )
}

export default Events