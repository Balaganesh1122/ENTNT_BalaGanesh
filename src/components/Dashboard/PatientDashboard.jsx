import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { 
  Calendar, 
  FileText, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Heart,
  Activity,
  Clock,
  Award,
  Stethoscope,
  Shield,
  TrendingUp,
  Bell
} from 'lucide-react';
import { format, isPast, isFuture } from 'date-fns';

export default function PatientDashboard() {
  const { user } = useAuth();
  const { patients, getPatientIncidents } = useData();
  
  const patient = patients.find(p => p.id === user.patientId);
  const incidents = getPatientIncidents(user.patientId);
  
  const upcomingAppointments = incidents.filter(i => 
    isFuture(new Date(i.appointmentDate)) && i.status !== 'Cancelled'
  );
  
  const pastAppointments = incidents.filter(i => 
    isPast(new Date(i.appointmentDate)) || i.status === 'Completed'
  );

  const totalCost = incidents
    .filter(i => i.status === 'Completed')
    .reduce((sum, i) => sum + (i.cost || 0), 0);

  if (!patient) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Patient information not found.</p>
      </div>
    );
  }

  const healthMetrics = [
    { label: 'Total Visits', value: incidents.length, icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Upcoming', value: upcomingAppointments.length, icon: Calendar, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Completed', value: pastAppointments.length, icon: Award, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Total Spent', value: `$${totalCost}`, icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <User className="h-12 w-12 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {patient.name}!</h1>
                <p className="text-gray-600 mb-4">Here's your health overview and upcoming appointments.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Phone className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>{patient.contact}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Mail className="h-4 w-4 text-green-600" />
                    </div>
                    <span>{patient.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-purple-600" />
                    </div>
                    <span>Born: {format(new Date(patient.dob), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-orange-600" />
                    </div>
                    <span>{patient.address}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-xl border border-green-200">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Verified Patient</span>
              </div>
            </div>
          </div>
        </div>
        
        {patient.healthInfo && (
          <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Important Health Information</h3>
                <p className="text-red-700 text-sm">{patient.healthInfo}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${metric.bg} flex items-center justify-center`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Upcoming Appointments</h3>
              <p className="text-gray-600 text-sm">Your scheduled visits</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
              <Bell className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">{upcomingAppointments.length} scheduled</span>
            </div>
          </div>
          
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <Stethoscope className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{appointment.title}</h4>
                          <p className="text-sm text-gray-600">{appointment.description}</p>
                        </div>
                      </div>
                      
                      {appointment.comments && (
                        <p className="text-sm text-gray-500 italic mb-3 pl-13">"{appointment.comments}"</p>
                      )}

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{format(new Date(appointment.appointmentDate), 'MMM dd, yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{format(new Date(appointment.appointmentDate), 'HH:mm')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No upcoming appointments</p>
              <p className="text-gray-400 text-sm">Schedule your next visit with your dentist</p>
            </div>
          )}
        </div>

        {/* Recent History */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Treatment History</h3>
              <p className="text-gray-600 text-sm">Your recent dental care</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
              <Award className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">{pastAppointments.length} completed</span>
            </div>
          </div>
          
          {pastAppointments.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {pastAppointments.slice(0, 4).map((appointment) => (
                <div key={appointment.id} className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                          <Award className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{appointment.title}</h4>
                          <p className="text-sm text-gray-600">{appointment.treatment || appointment.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{format(new Date(appointment.appointmentDate), 'MMM dd, yyyy')}</span>
                        </div>
                        {appointment.cost && (
                          <div className="flex items-center gap-1">
                            <span className="font-medium">${appointment.cost}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {appointment.status}
                        </span>
                        {appointment.files && appointment.files.length > 0 && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            <FileText className="h-3 w-3" />
                            {appointment.files.length} files
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {appointment.files && appointment.files.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-2">Treatment Documents:</p>
                      <div className="flex flex-wrap gap-2">
                        {appointment.files.map((file, index) => (
                          <div key={index} className="flex items-center gap-1 px-2 py-1 bg-white rounded border text-xs">
                            <FileText className="h-3 w-3 text-blue-600" />
                            <span className="text-gray-700">{file.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No treatment history</p>
              <p className="text-gray-400 text-sm">Your completed appointments will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Health Tips */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Dental Health Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Heart,
              title: "Daily Brushing",
              tip: "Brush your teeth twice daily with fluoride toothpaste for optimal oral health.",
              color: "from-red-500 to-pink-500"
            },
            {
              icon: Activity,
              title: "Regular Flossing",
              tip: "Floss daily to remove plaque and food particles between your teeth.",
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: Shield,
              title: "Regular Checkups",
              tip: "Visit your dentist every 6 months for professional cleaning and examination.",
              color: "from-green-500 to-emerald-500"
            }
          ].map((tip, index) => (
            <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
              <div className={`w-12 h-12 bg-gradient-to-br ${tip.color} rounded-xl flex items-center justify-center mb-4`}>
                <tip.icon className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
              <p className="text-sm text-gray-600">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}




