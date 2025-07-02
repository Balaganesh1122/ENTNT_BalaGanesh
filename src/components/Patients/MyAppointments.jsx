import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Calendar, Clock, FileText, DollarSign } from 'lucide-react';
import { format, isPast, isFuture } from 'date-fns';

export default function MyAppointments() {
  const { user } = useAuth();
  const { getPatientIncidents } = useData();
  
  const incidents = getPatientIncidents(user.patientId);
  
  const upcomingAppointments = incidents.filter(i => 
    isFuture(new Date(i.appointmentDate)) && i.status !== 'Cancelled'
  ).sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
  
  const pastAppointments = incidents.filter(i => 
    isPast(new Date(i.appointmentDate)) || i.status === 'Completed'
  ).sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Upcoming Appointments ({upcomingAppointments.length})
        </h2>
        
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {appointment.title}
                    </h3>
                    <p className="text-gray-600 mt-1">{appointment.description}</p>
                    
                    {appointment.comments && (
                      <p className="text-sm text-gray-500 mt-2 italic">
                        Note: {appointment.comments}
                      </p>
                    )}

                    <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(appointment.appointmentDate), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{format(new Date(appointment.appointmentDate), 'HH:mm')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-500">No upcoming appointments</p>
          </div>
        )}
      </div>

      {/* Past Appointments */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Appointment History ({pastAppointments.length})
        </h2>
        
        {pastAppointments.length > 0 ? (
          <div className="space-y-4">
            {pastAppointments.map((appointment) => (
              <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {appointment.title}
                        </h3>
                        <p className="text-gray-600 mt-1">{appointment.description}</p>
                      </div>
                      <div className="ml-4 text-right">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(appointment.appointmentDate), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{format(new Date(appointment.appointmentDate), 'HH:mm')}</span>
                      </div>
                      {appointment.cost && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <span>${appointment.cost}</span>
                        </div>
                      )}
                    </div>

                    {appointment.treatment && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">Treatment Provided</h4>
                        <p className="text-sm text-gray-700">{appointment.treatment}</p>
                        
                        {appointment.nextDate && (
                          <p className="text-sm text-primary-600 mt-2">
                            Next appointment scheduled: {format(new Date(appointment.nextDate), 'MMM dd, yyyy')}
                          </p>
                        )}
                      </div>
                    )}

                    {appointment.files && appointment.files.length > 0 && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Documents & Files ({appointment.files.length})
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {appointment.files.map((file, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                              <FileText className="h-4 w-4 text-blue-600" />
                              <span className="text-sm text-gray-700 truncate">{file.name}</span>
                              {file.url && (
                                <button
                                  onClick={() => window.open(file.url, '_blank')}
                                  className="text-xs text-blue-600 hover:text-blue-800 ml-auto"
                                >
                                  View
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {appointment.comments && (
                      <div className="mt-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                        <p className="text-sm text-yellow-800">
                          <span className="font-medium">Doctor's Notes:</span> {appointment.comments}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-500">No appointment history</p>
          </div>
        )}
      </div>
    </div>
  );
}




