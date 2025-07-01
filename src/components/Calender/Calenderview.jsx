import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, User } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday } from 'date-fns';
import AppointmentForm from '../Appointments/AppointmentForm';

export default function CalendarView() {
  const { incidents, patients } = useData();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Add padding days for complete weeks
  const startDate = new Date(monthStart);
  startDate.setDate(startDate.getDate() - monthStart.getDay());
  
  const endDate = new Date(monthEnd);
  endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()));
  
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const getAppointmentsForDate = (date) => {
    return incidents.filter(incident => 
      isSameDay(new Date(incident.appointmentDate), date)
    );
  };

  const getSelectedDateAppointments = () => {
    if (!selectedDate) return [];
    return getAppointmentsForDate(selectedDate);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      setCurrentDate(subMonths(currentDate, 1));
    } else {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Calendar View</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Schedule Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
              >
                Today
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const appointments = getAppointmentsForDate(day);
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isTodayDate = isToday(day);
              const isSelected = selectedDate && isSameDay(day, selectedDate);

              return (
                <div
                  key={index}
                  onClick={() => handleDateClick(day)}
                  className={`
                    min-h-[80px] p-1 border border-gray-100 cursor-pointer transition-colors
                    ${isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 text-gray-400'}
                    ${isTodayDate ? 'ring-2 ring-primary-500' : ''}
                    ${isSelected ? 'bg-primary-50 border-primary-200' : ''}
                  `}
                >
                  <div className={`
                    text-sm font-medium mb-1
                    ${isTodayDate ? 'text-primary-600' : ''}
                  `}>
                    {format(day, 'd')}
                  </div>
                  <div className="space-y-1">
                    {appointments.slice(0, 2).map((appointment, idx) => {
                      const patient = patients.find(p => p.id === appointment.patientId);
                      return (
                        <div
                          key={idx}
                          className={`
                            text-xs p-1 rounded truncate
                            ${appointment.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : appointment.status === 'Cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                            }
                          `}
                          title={`${appointment.title} - ${patient?.name}`}
                        >
                          {format(new Date(appointment.appointmentDate), 'HH:mm')} {appointment.title}
                        </div>
                      );
                    })}
                    {appointments.length > 2 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{appointments.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : 'Select a date'}
          </h3>
          
          {selectedDate ? (
            <div className="space-y-4">
              {getSelectedDateAppointments().length > 0 ? (
                getSelectedDateAppointments().map((appointment) => {
                  const patient = patients.find(p => p.id === appointment.patientId);
                  return (
                    <div key={appointment.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-primary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {appointment.title}
                          </h4>
                          <p className="text-sm text-primary-600">{patient?.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-600">
                              {format(new Date(appointment.appointmentDate), 'HH:mm')}
                            </span>
                          </div>
                          <span className={`
                            inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium
                            ${appointment.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : appointment.status === 'Cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                            }
                          `}>
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-sm">No appointments scheduled for this date.</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Click on a date to view appointments.</p>
          )}
        </div>
      </div>

      {/* Appointment Form Modal */}
      {showForm && (
        <AppointmentForm
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}





