import React, { useState, useEffect } from 'react'
import icon from './../../../assets/right-arrow.png'
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
  const [events, setEvents] = useState(STATIC_EVENTS);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events/upcoming');
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) setEvents(data);
        }
      } catch {
        // Silently fall back to static events
      }
    };
    fetchEvents();
  }, []);

  return (
    <section className='flex justify-center items-center py-20 w-full overflow-hidden'>
        <div className='flex flex-col gap-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 overflow-x-hidden md:overflow-x-scroll scrollbar-hide'>
            <div>
                <h1 className='oswald-font-3 text-2xl'>OUR UPCOMING EVENTS</h1>
            </div>
            {events.length === 0 ? (
              <p className="text-gray-400 text-sm">No upcoming events at this time. Check back soon!</p>
            ) : (
              <div className='flex flex-col md:flex-row gap-10'>
                {events.map((ev, idx) => {
                  const d = new Date(ev.date);
                  const day = d.getDate();
                  const month = MONTHS[d.getMonth()];
                  const color = ev.color || CARD_COLORS[idx % CARD_COLORS.length];
                  const isLight = color === 'bg-[#FACC15]' || color === 'bg-slate-300';
                  return (
                    <div key={ev.id} className={`w-full md:min-w-1/2 lg:min-w-1/3 border rounded-2xl ${color} p-5 border-none flex justify-between items-center relative`}>
                        {ev.isHoliday && (
                          <div className="absolute top-4 right-4 bg-white/40 text-xs font-bold px-2 py-0.5 rounded text-gray-800">
                            System Holiday
                          </div>
                        )}
                        <div>
                            <h1 className={`text-4xl oswald-font-3 ${isLight ? 'text-[#111111]' : 'text-white'}`}>{day}</h1>
                            <p className={`oswald-font-2 mb-4 ${isLight ? 'text-[#111111]' : 'text-white'}`}>{month}</p>
                            <h1 className={`oswald-font-3 ${isLight ? 'text-[#111111]' : 'text-white'}`}>{ev.title}</h1>
                        </div>
                        {ev.link && (
                          <div className='bg-white border-0 rounded-full p-2 cursor-pointer'>
                              <img src={icon} alt=""
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