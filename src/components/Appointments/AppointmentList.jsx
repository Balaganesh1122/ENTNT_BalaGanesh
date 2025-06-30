import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Calendar,
  Clock,
  User,
  DollarSign,
  FileText
} from 'lucide-react';
import { format, isPast, isFuture } from 'date-fns';
import AppointmentForm from './AppointmentForm';

export default function AppointmentList() {
  const { incidents, patients, deleteIncident } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const filteredAppointments = incidents.filter(appointment => {
    const patient = patients.find(p => p.id === appointment.patientId);
    const patientName = patient?.name || '';
    
    const matchesSearch = 
      appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedAppointments = filteredAppointments.sort((a, b) => 
    new Date(b.appointmentDate) - new Date(a.appointmentDate)
  );

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setShowForm(true);
  };

  const handleDelete = (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      deleteIncident(appointmentId);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingAppointment(null);
  };

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
        <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Schedule Appointment
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search appointments by title, patient, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="all">All Status</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {sortedAppointments.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {sortedAppointments.map((appointment) => {
              const patient = patients.find(p => p.id === appointment.patientId);
              const appointmentDate = new Date(appointment.appointmentDate);
              const isUpcoming = isFuture(appointmentDate);

              return (
                <div key={appointment.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-6 w-6 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                {appointment.title}
                              </h3>
                              <p className="text-primary-600 font-medium">
                                {patient?.name || 'Unknown Patient'}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {appointment.description}
                              </p>
                              {appointment.comments && (
                                <p className="text-sm text-gray-500 mt-2 italic">
                                  "{appointment.comments}"
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                {appointment.status}
                              </span>
                              {isUpcoming && (
                                <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                  Upcoming
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{format(appointmentDate, 'MMM dd, yyyy')}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{format(appointmentDate, 'HH:mm')}</span>
                            </div>
                            {appointment.cost && (
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                <span>${appointment.cost}</span>
                              </div>
                            )}
                            {appointment.files && appointment.files.length > 0 && (
                              <div className="flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                <span>{appointment.files.length} files</span>
                              </div>
                            )}
                          </div>

                          {appointment.treatment && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm">
                                <span className="font-medium">Treatment:</span> {appointment.treatment}
                              </p>
                              {appointment.nextDate && (
                                <p className="text-sm mt-1">
                                  <span className="font-medium">Next Visit:</span> {format(new Date(appointment.nextDate), 'MMM dd, yyyy')}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(appointment)}
                        className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'No appointments found matching your criteria.' 
                : 'No appointments scheduled yet.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Appointment Form Modal */}
      {showForm && (
        <AppointmentForm
          appointment={editingAppointment}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}


