import React, { useState, useEffect, useMemo } from 'react';
import { CalendarDays, X, Clock, MapPin, Video, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { apiClient } from '../../api/client';
import { 
  format, parseISO, isSameDay, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, 
  isToday, addMonths, subMonths 
} from 'date-fns';
import { toast } from 'sonner';

interface CalendarRemindersModalProps {
  isOpen: boolean;
  onClose: () => void;
  startDate: Date;
  endDate: Date;
}

export const CalendarRemindersModal: React.FC<CalendarRemindersModalProps> = ({ isOpen, onClose }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (isOpen) {
      // When opened, fetch events for the current month being viewed
      fetchEventsForMonth(currentMonth);
    }
  }, [isOpen, currentMonth]);

  const fetchEventsForMonth = async (monthDate: Date) => {
    setLoading(true);
    try {
      // Fetch from start of month to end of month, plus some padding for the grid
      const start = startOfWeek(startOfMonth(monthDate));
      const end = endOfWeek(endOfMonth(monthDate));

      const response = await apiClient.get('/api/calendar/events', {
        params: {
          start: start.toISOString(),
          end: end.toISOString(),
        }
      });
      const eventsData = Array.isArray(response) ? response : response.data || [];
      setEvents(eventsData);
    } catch (error) {
      console.error('Failed to fetch calendar events:', error);
      toast.error('Failed to fetch calendar events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  // Filter events for the selected day
  const selectedDayEvents = useMemo(() => {
    return events.filter(event => {
      if (!event.start?.dateTime && !event.start?.date) return false;
      const eventDate = parseISO(event.start.dateTime || event.start.date);
      return isSameDay(eventDate, selectedDate);
    });
  }, [events, selectedDate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white z-10 shadow-sm relative">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <CalendarDays size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-tight">Google Calendar & Reminders</h2>
              <p className="text-sm text-gray-500 font-medium">Manage your schedule</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area: Split 2 columns */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden bg-gray-50/30">
          
          {/* LEFT: Calendar Grid */}
          <div className="w-full md:w-[55%] p-6 border-r border-gray-100 flex flex-col">
            {/* Calendar Controls */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrevMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 bg-white"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 bg-white"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-semibold text-gray-500 py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 flex-1">
              {calendarDays.map((day, i) => {
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const isTodayDate = isToday(day);
                
                // Check if day has events
                const dayEvents = events.filter(e => {
                  if (!e.start?.dateTime && !e.start?.date) return false;
                  return isSameDay(parseISO(e.start.dateTime || e.start.date), day);
                });
                
                const hasEvents = dayEvents.length > 0;

                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(day)}
                    className={`
                      relative flex flex-col items-center justify-start p-1.5 min-h-[60px] rounded-xl transition-all border
                      ${!isCurrentMonth ? 'text-gray-300 bg-gray-50/50 border-transparent' : 'text-gray-700 bg-white hover:border-blue-200'}
                      ${isSelected ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50/30' : 'border-gray-100'}
                      ${isTodayDate && !isSelected ? 'border-blue-200 bg-blue-50/10 text-blue-600' : ''}
                    `}
                  >
                    <span className={`text-sm font-semibold mt-1 ${isTodayDate ? 'bg-blue-600 text-white w-7 h-7 flex items-center justify-center rounded-full' : ''}`}>
                      {format(day, 'd')}
                    </span>
                    
                    {/* Event Indicators */}
                    {hasEvents && (
                      <div className="flex gap-1 mt-auto mb-1">
                        {dayEvents.slice(0, 3).map((_, idx) => (
                          <div key={idx} className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Reminders List */}
          <div className="w-full md:w-[45%] flex flex-col bg-white">
            <div className="p-5 border-b border-gray-100 bg-white">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                Reminders for {isToday(selectedDate) ? 'Today' : format(selectedDate, 'MMM d, yyyy')}
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : selectedDayEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3 text-center px-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                    <CalendarDays size={24} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-medium">No events scheduled for this day.</p>
                  <p className="text-xs text-gray-400">Select another date on the calendar.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDayEvents.map((event, idx) => {
                    const startTime = event.start?.dateTime ? parseISO(event.start.dateTime) : null;
                    const endTime = event.end?.dateTime ? parseISO(event.end.dateTime) : null;
                    
                    return (
                      <div key={event.id || idx} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
                        
                        <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-blue-600 transition-colors">
                          {event.summary || 'Untitled Event'}
                        </h3>
                        
                        <div className="flex flex-col gap-2 mt-3">
                          {startTime && endTime && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock size={14} className="text-blue-500" />
                              <span className="font-medium">
                                {format(startTime, 'h:mm a')} - {format(endTime, 'h:mm a')}
                              </span>
                            </div>
                          )}
                          {!startTime && event.start?.date && (
                             <div className="flex items-center gap-2 text-sm text-gray-600">
                               <Clock size={14} className="text-blue-500" />
                               <span className="font-medium">All Day</span>
                             </div>
                          )}

                          {event.location && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin size={14} className="text-emerald-500" />
                              <span className="font-medium truncate">{event.location}</span>
                            </div>
                          )}

                          {event.hangoutLink && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Video size={14} className="text-purple-500" />
                              <a href={event.hangoutLink} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                                Join Video Call
                              </a>
                            </div>
                          )}

                          {event.description && (
                            <div className="flex items-start gap-2 text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded-lg">
                              <FileText size={14} className="text-amber-500 shrink-0 mt-0.5" />
                              <p className="font-medium line-clamp-3 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: event.description }} />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
