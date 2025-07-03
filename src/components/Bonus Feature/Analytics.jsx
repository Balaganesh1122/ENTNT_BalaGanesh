import { useData } from '../../contexts/DataContext';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign,
  BarChart3,
  PieChart,
  Activity,
  Award,
  Clock,
  Target
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

export default function Analytics() {
  const { patients, incidents } = useData();

  // Advanced analytics data
  const monthlyRevenue = [
    { month: 'Aug', revenue: 2100, appointments: 7, newPatients: 3 },
    { month: 'Sep', revenue: 2800, appointments: 9, newPatients: 5 },
    { month: 'Oct', revenue: 2400, appointments: 8, newPatients: 2 },
    { month: 'Nov', revenue: 3200, appointments: 12, newPatients: 7 },
    { month: 'Dec', revenue: 2800, appointments: 10, newPatients: 4 },
    { month: 'Jan', revenue: 3800, appointments: 15, newPatients: 8 },
  ];

  const treatmentTypes = [
    { name: 'Cleaning & Checkup', value: 35, revenue: 5250, color: '#3b82f6' },
    { name: 'Fillings', value: 25, revenue: 3750, color: '#10b981' },
    { name: 'Root Canal', value: 20, revenue: 8000, color: '#f59e0b' },
    { name: 'Extractions', value: 12, revenue: 1800, color: '#ef4444' },
    { name: 'Whitening', value: 8, revenue: 1600, color: '#8b5cf6' },
  ];

  const patientSatisfaction = [
    { rating: '5 Stars', count: 45, percentage: 75 },
    { rating: '4 Stars', count: 12, percentage: 20 },
    { rating: '3 Stars', count: 2, percentage: 3 },
    { rating: '2 Stars', count: 1, percentage: 2 },
    { rating: '1 Star', count: 0, percentage: 0 },
  ];

  const appointmentTrends = [
    { time: '8:00', appointments: 2 },
    { time: '9:00', appointments: 4 },
    { time: '10:00', appointments: 6 },
    { time: '11:00', appointments: 5 },
    { time: '12:00', appointments: 2 },
    { time: '13:00', appointments: 1 },
    { time: '14:00', appointments: 5 },
    { time: '15:00', appointments: 7 },
    { time: '16:00', appointments: 6 },
    { time: '17:00', appointments: 3 },
  ];

  const kpiData = [
    {
      title: 'Total Revenue',
      value: '$18,400',
      change: '+15.3%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Patient Growth',
      value: '29',
      subtitle: 'New Patients',
      change: '+23.1%',
      changeType: 'increase',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Appointment Rate',
      value: '94%',
      subtitle: 'Show-up Rate',
      change: '+2.4%',
      changeType: 'increase',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Avg Treatment Value',
      value: '$245',
      change: '+8.7%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Practice Analytics
          </h1>
          <p className="text-gray-600 mt-2">Comprehensive insights into your dental practice performance</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>Last 6 Months</option>
            <option>Last Year</option>
            <option>All Time</option>
          </select>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center shadow-lg`}>
                <kpi.icon className="h-6 w-6 text-white" />
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${kpi.bgColor} ${kpi.color.replace('from-', 'text-').replace('-500', '-600').split(' ')[0]}`}>
                {kpi.change}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
              <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
              {kpi.subtitle && (
                <p className="text-xs text-gray-500 mt-1">{kpi.subtitle}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Revenue Trend</h3>
              <p className="text-gray-600 text-sm">Monthly revenue and appointment volume</p>
            </div>
            <BarChart3 className="h-6 w-6 text-purple-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
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
                stroke="#8b5cf6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Treatment Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Treatment Distribution</h3>
              <p className="text-gray-600 text-sm">Revenue by treatment type</p>
            </div>
            <PieChart className="h-6 w-6 text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPieChart>
              <Pie
                data={treatmentTypes}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {treatmentTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {treatmentTypes.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-900">${item.revenue}</span>
                  <span className="text-xs text-gray-500 ml-2">({item.value}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appointment Patterns */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Daily Appointment Patterns</h3>
              <p className="text-gray-600 text-sm">Peak hours analysis</p>
            </div>
            <Clock className="h-6 w-6 text-orange-600" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={appointmentTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px'
                }} 
              />
              <Bar dataKey="appointments" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Patient Satisfaction */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Patient Satisfaction</h3>
              <p className="text-gray-600 text-sm">Rating distribution</p>
            </div>
            <Award className="h-6 w-6 text-green-600" />
          </div>
          <div className="space-y-4">
            {patientSatisfaction.map((rating, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-sm text-gray-600">{rating.rating}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${rating.percentage}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm font-medium text-gray-900">{rating.count}</div>
                <div className="w-12 text-sm text-gray-600">{rating.percentage}%</div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-green-50 rounded-xl">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">Average Rating: 4.7/5</span>
            </div>
            <p className="text-green-700 text-sm mt-1">Excellent patient satisfaction score!</p>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Target className="h-6 w-6 text-purple-600" />
          <h3 className="text-xl font-bold text-gray-900">Performance Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-blue-800">Growth Opportunity</h4>
            </div>
            <p className="text-blue-700 text-sm">Peak appointment times are 10-11 AM and 3-4 PM. Consider adding more slots during these hours.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-green-600" />
              <h4 className="font-semibold text-green-800">Strength</h4>
            </div>
            <p className="text-green-700 text-sm">Excellent patient satisfaction with 95% rating 4+ stars. Keep up the great patient care!</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-orange-600" />
              <h4 className="font-semibold text-orange-800">Recommendation</h4>
            </div>
            <p className="text-orange-700 text-sm">Root canal treatments generate highest revenue per appointment. Consider specialized marketing.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

