
import Timetable from '@/components/Timetable';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Academic Timetable
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay organized with your class schedule. View your weekly classes, track timing, and never miss a session.
          </p>
        </div>
        <Timetable />
      </div>
    </div>
  );
};

export default Index;
