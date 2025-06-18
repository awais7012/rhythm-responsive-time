
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, User } from 'lucide-react';
import { ClassSession } from './Timetable';

interface TimetableGridProps {
  days: string[];
  timeSlots: string[];
  timetableData: Record<string, ClassSession[]>;
  weekDates: Date[];
}

const TimetableGrid: React.FC<TimetableGridProps> = ({
  days,
  timeSlots,
  timetableData,
  weekDates
}) => {
  const getClassForTimeSlot = (day: string, timeSlot: string): ClassSession | null => {
    const classes = timetableData[day] || [];
    return classes.find(cls => cls.time === timeSlot) || null;
  };

  const getClassHeight = (duration: number): string => {
    return `${duration * 4}rem`;
  };

  const isCurrentTime = (timeSlot: string): boolean => {
    const now = new Date();
    const currentHour = now.getHours();
    const slotHour = parseInt(timeSlot.split(':')[0]);
    return currentHour === slotHour;
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header Row */}
            <div className="grid grid-cols-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <div className="p-4 font-semibold text-gray-600 border-r border-gray-200">
                Time
              </div>
              {days.map((day, index) => (
                <div
                  key={day}
                  className={`p-4 text-center border-r border-gray-200 last:border-r-0 transition-colors ${
                    isToday(weekDates[index])
                      ? 'bg-blue-100 font-bold text-blue-800'
                      : 'font-semibold text-gray-700'
                  }`}
                >
                  <div className="text-sm font-medium">{day}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {weekDates[index]?.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Time Slots */}
            <div className="relative">
              {timeSlots.map((timeSlot, timeIndex) => (
                <div
                  key={timeSlot}
                  className={`grid grid-cols-6 border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                    isCurrentTime(timeSlot) ? 'bg-blue-50 ring-2 ring-blue-200' : ''
                  }`}
                >
                  {/* Time Column */}
                  <div className="p-4 bg-gray-50/50 border-r border-gray-200 flex items-center">
                    <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {timeSlot}
                    </div>
                  </div>

                  {/* Day Columns */}
                  {days.map((day, dayIndex) => {
                    const classSession = getClassForTimeSlot(day, timeSlot);
                    const isOccupiedByPreviousClass = !classSession && 
                      timetableData[day]?.some(cls => {
                        const classStartHour = parseInt(cls.time.split(':')[0]);
                        const classEndHour = classStartHour + cls.duration;
                        const currentHour = parseInt(timeSlot.split(':')[0]);
                        return currentHour > classStartHour && currentHour < classEndHour;
                      });

                    return (
                      <div
                        key={`${day}-${timeSlot}`}
                        className="relative p-2 border-r border-gray-200 last:border-r-0 min-h-[4rem]"
                      >
                        {classSession && (
                          <div
                            className={`${classSession.color} rounded-lg p-3 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group`}
                            style={{ 
                              height: getClassHeight(classSession.duration),
                              zIndex: 10
                            }}
                          >
                            <div className="space-y-2">
                              <div className="flex items-start justify-between">
                                <h4 className="font-semibold text-sm leading-tight">
                                  {classSession.subject}
                                </h4>
                                <Badge 
                                  variant="secondary" 
                                  className="text-xs bg-white/20 text-white border-white/30 hover:bg-white/30"
                                >
                                  {classSession.type}
                                </Badge>
                              </div>
                              
                              <div className="space-y-1 text-xs opacity-90">
                                <div className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  <span>{classSession.instructor}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{classSession.room}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{classSession.duration}h</span>
                                </div>
                              </div>
                            </div>

                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        )}
                        
                        {isOccupiedByPreviousClass && (
                          <div className="absolute inset-0 bg-gray-100/50 border-l-4 border-gray-300"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimetableGrid;
