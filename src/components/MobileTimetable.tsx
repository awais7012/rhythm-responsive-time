
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, User, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ClassSession } from './Timetable';

interface MobileTimetableProps {
  days: string[];
  timetableData: Record<string, ClassSession[]>;
  weekDates: Date[];
}

const MobileTimetable: React.FC<MobileTimetableProps> = ({
  days,
  timetableData,
  weekDates
}) => {
  const [openDays, setOpenDays] = useState<Record<string, boolean>>({
    [days[0]]: true // Open first day by default
  });

  const toggleDay = (day: string) => {
    setOpenDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lecture': return '📚';
      case 'lab': return '🔬';
      case 'tutorial': return '💡';
      case 'seminar': return '🎯';
      default: return '📖';
    }
  };

  return (
    <div className="space-y-4">
      {days.map((day, index) => {
        const dayClasses = timetableData[day] || [];
        const isOpen = openDays[day];
        const todayClass = isToday(weekDates[index]);

        return (
          <Card 
            key={day} 
            className={`shadow-lg border-0 transition-all duration-300 ${
              todayClass 
                ? 'bg-gradient-to-r from-blue-50 to-indigo-50 ring-2 ring-blue-200' 
                : 'bg-white/90 backdrop-blur-sm'
            }`}
          >
            <Collapsible open={isOpen} onOpenChange={() => toggleDay(day)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className={`text-lg font-bold ${
                        todayClass ? 'text-blue-800' : 'text-gray-800'
                      }`}>
                        {day}
                      </CardTitle>
                      <div className="text-sm text-gray-500">
                        {weekDates[index]?.toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      {todayClass && (
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          Today
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {dayClasses.length} {dayClasses.length === 1 ? 'class' : 'classes'}
                      </Badge>
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-0">
                  {dayClasses.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-2">🌟</div>
                      <p className="text-sm">No classes scheduled</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {dayClasses
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map((classSession) => (
                          <div
                            key={classSession.id}
                            className="group cursor-pointer"
                          >
                            <div className={`${classSession.color} rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]`}>
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-lg leading-tight mb-1">
                                    {classSession.subject}
                                  </h4>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xl">
                                      {getTypeIcon(classSession.type)}
                                    </span>
                                    <Badge 
                                      variant="secondary" 
                                      className="text-xs bg-white/20 text-white border-white/30"
                                    >
                                      {classSession.type}
                                    </Badge>
                                  </div>
                                </div>
                                
                                <div className="text-right">
                                  <div className="flex items-center gap-1 text-sm font-medium">
                                    <Clock className="h-4 w-4" />
                                    {classSession.time}
                                  </div>
                                  <div className="text-xs opacity-90 mt-1">
                                    {classSession.duration}h duration
                                  </div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
                                  <User className="h-4 w-4" />
                                  <span className="truncate">{classSession.instructor}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
                                  <MapPin className="h-4 w-4" />
                                  <span className="truncate">{classSession.room}</span>
                                </div>
                              </div>

                              {/* Hover Effect */}
                              <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        );
      })}
    </div>
  );
};

export default MobileTimetable;
