
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, User, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import TimetableGrid from './TimetableGrid';
import MobileTimetable from './MobileTimetable';
import { useIsMobile } from '@/hooks/use-mobile';

export interface ClassSession {
  id: string;
  subject: string;
  instructor: string;
  room: string;
  time: string;
  duration: number;
  color: string;
  type: 'lecture' | 'lab' | 'tutorial' | 'seminar';
}

const Timetable = () => {
  const isMobile = useIsMobile();
  const [currentWeek, setCurrentWeek] = useState(0);

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const timetableData: Record<string, ClassSession[]> = {
    Monday: [
      {
        id: '1',
        subject: 'Data Structures',
        instructor: 'Dr. Smith',
        room: 'CS-101',
        time: '09:00',
        duration: 2,
        color: 'bg-gradient-to-r from-blue-500 to-blue-600',
        type: 'lecture'
      },
      {
        id: '2',
        subject: 'Database Management',
        instructor: 'Prof. Johnson',
        room: 'Lab-204',
        time: '14:00',
        duration: 3,
        color: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
        type: 'lab'
      }
    ],
    Tuesday: [
      {
        id: '3',
        subject: 'Web Development',
        instructor: 'Ms. Davis',
        room: 'CS-205',
        time: '10:00',
        duration: 2,
        color: 'bg-gradient-to-r from-purple-500 to-purple-600',
        type: 'lecture'
      },
      {
        id: '4',
        subject: 'Software Engineering',
        instructor: 'Dr. Wilson',
        room: 'CS-102',
        time: '15:00',
        duration: 2,
        color: 'bg-gradient-to-r from-orange-500 to-orange-600',
        type: 'seminar'
      }
    ],
    Wednesday: [
      {
        id: '5',
        subject: 'Machine Learning',
        instructor: 'Prof. Chen',
        room: 'AI-301',
        time: '09:00',
        duration: 3,
        color: 'bg-gradient-to-r from-red-500 to-red-600',
        type: 'lecture'
      },
      {
        id: '6',
        subject: 'Data Structures Lab',
        instructor: 'Dr. Smith',
        room: 'Lab-101',
        time: '14:00',
        duration: 2,
        color: 'bg-gradient-to-r from-cyan-500 to-cyan-600',
        type: 'lab'
      }
    ],
    Thursday: [
      {
        id: '7',
        subject: 'Computer Networks',
        instructor: 'Dr. Brown',
        room: 'CS-103',
        time: '11:00',
        duration: 2,
        color: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
        type: 'lecture'
      },
      {
        id: '8',
        subject: 'Algorithm Design',
        instructor: 'Prof. Miller',
        room: 'CS-201',
        time: '16:00',
        duration: 2,
        color: 'bg-gradient-to-r from-pink-500 to-pink-600',
        type: 'tutorial'
      }
    ],
    Friday: [
      {
        id: '9',
        subject: 'Project Work',
        instructor: 'Multiple',
        room: 'Lab-305',
        time: '10:00',
        duration: 4,
        color: 'bg-gradient-to-r from-teal-500 to-teal-600',
        type: 'lab'
      }
    ]
  };

  const weekDates = React.useMemo(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1 + (currentWeek * 7));
    
    return days.map((_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return date;
    });
  }, [currentWeek]);

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek(prev => prev + (direction === 'next' ? 1 : -1));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header with Navigation */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
              <Calendar className="h-6 w-6 text-blue-600" />
              Weekly Schedule
            </CardTitle>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateWeek('prev')}
                className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <span className="text-sm font-medium text-gray-600 px-3">
                {weekDates[0]?.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })} - {weekDates[4]?.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateWeek('next')}
                className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Legend */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <span className="text-sm text-gray-600">Lecture</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
              <span className="text-sm text-gray-600">Lab</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-orange-500 to-orange-600"></div>
              <span className="text-sm text-gray-600">Seminar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-pink-500 to-pink-600"></div>
              <span className="text-sm text-gray-600">Tutorial</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timetable */}
      {isMobile ? (
        <MobileTimetable 
          days={days}
          timetableData={timetableData}
          weekDates={weekDates}
        />
      ) : (
        <TimetableGrid
          days={days}
          timeSlots={timeSlots}
          timetableData={timetableData}
          weekDates={weekDates}
        />
      )}
    </div>
  );
};

export default Timetable;
