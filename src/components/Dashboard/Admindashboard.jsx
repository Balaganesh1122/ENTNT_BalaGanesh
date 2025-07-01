import { useData } from '../../contexts/DataContext';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Heart,
  Activity,
  Stethoscope,
  Award,
  ArrowUp,
  ArrowDown,
  Star
} from 'lucide-react';
import { format, isToday, isTomorrow } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

export default function AdminDashboard() {
  const { patients, incidents, getUpcomingAppointments } = useData();

  const upcomingAppointments = getUpcomingAppointments();
  const completedIncidents = incidents.filter(i => i.status === 'Completed');
  const pendingIncidents = incidents.filter(i => i.status === 'Scheduled');
  
  const totalRevenue = completedIncidents.reduce((sum, i) => sum + (i.cost || 0), 0);
  const avgAppointmentCost = completedIncidents.length > 0 
    ? totalRevenue / completedIncidents.length 
    : 0;

  // Top patients by number of appointments
  const patientAppointmentCounts = {};
  incidents.forEach(incident => {
    patientAppointmentCounts[incident.patientId] = 
      (patientAppointmentCounts[incident.patientId] || 0) + 1;
  });

  const topPatients = Object.entries(patientAppointmentCounts)
    .map(([patientId, count]) => {
      const patient = patients.find(p => p.id === patientId);
      return { patient, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Enhanced chart data
  const monthlyData = [
    { month: 'Oct', revenue: 2400, appointments: 8, patients: 15 },
    { month: 'Nov', revenue: 3200, appointments: 12, patients: 22 },
    { month: 'Dec', revenue: 2800, appointments: 10, patients: 18 },
    { month: 'Jan', revenue: 3800, appointments: 15, patients: 28 },
  ];

  const treatmentData = [
    { name: 'Cleaning', value: 35, color: '#3b82f6' },
    { name: 'Fillings', value: 25, color: '#10b981' },
    { name: 'Root Canal', value: 20, color: '#f59e0b' },
    { name: 'Extraction', value: 12, color: '#ef4444' },
    { name: 'Whitening', value: 8, color: '#8b5cf6' },
  ];

  const statusData = [
    { name: 'Completed', value: completedIncidents.length, color: '#10b981' },
    { name: 'Scheduled', value: pendingIncidents.length, color: '#3b82f6' },
    { name: 'Cancelled', value: incidents.filter(i => i.status === 'Cancelled').length, color: '#ef4444' },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM dd');
  };

  const stats = [
    {
      title: 'Total Patients',
      value: patients.length,
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'This Month',
      value: incidents.length,
      subtitle: 'Total Appointments',
      change: `${pendingIncidents.length} upcoming`,
      changeType: 'neutral',
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Revenue',
      value: `$${totalRevenue}`,
      change: `Avg: $${avgAppointmentCost.toFixed(0)}`,
      changeType: 'increase',
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Success Rate',
      value: `${incidents.length > 0 ? Math.round((completedIncidents.length / incidents.length) * 100) : 0}%`,
      change: `${completedIncidents.length} completed`,
      changeType: 'increase',
      icon: Award,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2">Welcome back, Dr. Johnson. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <Activity className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-gray-700">System Healthy</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">{format(new Date(), 'EEEE')}</div>
            <div className="text-xs text-gray-500">{format(new Date(), 'MMM dd, yyyy')}</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${stat.bgColor} ${stat.textColor}`}>
                {stat.changeType === 'increase' ? (
                  <div className="flex items-center gap-1">
                    <ArrowUp className="h-3 w-3" />
                    {stat.change}
                  </div>
                ) : (
                  stat.change
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              {stat.subtitle && (
                <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Revenue Analytics</h3>
              <p className="text-gray-600 text-sm">Monthly performance overview</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Treatment Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">Treatment Types</h3>
            <p className="text-gray-600 text-sm">Distribution of procedures</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={treatmentData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {treatmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {treatmentData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Today's Schedule</h3>
              <p className="text-gray-600 text-sm">Upcoming appointments</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">{upcomingAppointments.length} pending</span>
            </div>
          </div>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {upcomingAppointments.slice(0, 5).map((appointment) => {
              const patient = patients.find(p => p.id === appointment.patientId);
              return (
                <div key={appointment.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white font-semibold text-sm">
                      {patient?.name?.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{patient?.name}</p>
                    <p className="text-sm text-gray-600">{appointment.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {format(new Date(appointment.appointmentDate), 'HH:mm')}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {formatDate(appointment.appointmentDate)}
                    </p>
                    <div className="w-2 h-2 bg-green-500 rounded-full ml-auto mt-1"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Patients */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Top Patients</h3>
              <p className="text-gray-600 text-sm">Most frequent visitors</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
              <Heart className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">Loyal patients</span>
            </div>
          </div>
          <div className="space-y-4">
            {topPatients.map((item, index) => (
              <div key={item.patient?.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-sm">#{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{item.patient?.name}</p>
                  <p className="text-sm text-gray-600">{item.patient?.contact}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{item.count} visits</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-500">VIP</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: 'Add Patient', color: 'from-blue-500 to-blue-600' },
            { icon: Calendar, label: 'Schedule Appointment', color: 'from-green-500 to-green-600' },
            { icon: Stethoscope, label: 'Treatment Plan', color: 'from-purple-500 to-purple-600' },
            { icon: Activity, label: 'View Reports', color: 'from-orange-500 to-orange-600' },
          ].map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-3 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center shadow-lg`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}





