import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  User,
  X,
  Stethoscope,
  Heart,
  Activity,
  ClipboardList,
  MessageSquare,
  BarChart3,
  Settings,
  HelpCircle
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const { isAdmin, isPatient } = useAuth();

  const adminNavItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', color: 'text-blue-600' },
    { to: '/patients', icon: Users, label: 'Patients', color: 'text-green-600' },
    { to: '/appointments', icon: Calendar, label: 'Appointments', color: 'text-purple-600' },
    { to: '/calendar', icon: ClipboardList, label: 'Calendar View', color: 'text-orange-600' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics', color: 'text-indigo-600' },
    { to: '/treatment-plans', icon: Stethoscope, label: 'Treatment Plans', color: 'text-red-600' },
  ];

  const patientNavItems = [
    { to: '/patient-dashboard', icon: User, label: 'My Profile', color: 'text-blue-600' },
    { to: '/my-appointments', icon: FileText, label: 'My Appointments', color: 'text-green-600' },
    { to: '/health-records', icon: Heart, label: 'Health Records', color: 'text-red-600' },
    { to: '/chat', icon: MessageSquare, label: 'Chat with Doctor', color: 'text-purple-600' },
  ];

  const navItems = isAdmin ? adminNavItems : patientNavItems;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full w-72 bg-white border-r border-gray-200 z-50 
        transform transition-transform duration-300 ease-in-out shadow-xl
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">DentalCare Pro</span>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-6">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-sm border-l-4 border-blue-500' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                  ${({ isActive }) => isActive ? 'bg-white shadow-sm' : 'bg-gray-100 group-hover:bg-white'}
                `}>
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-200"></div>

          {/* Additional Links */}
          <div className="space-y-2">
            <NavLink
              to="/settings"
              onClick={onClose}
              className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-white flex items-center justify-center transition-colors">
                <Settings className="h-5 w-5 text-gray-600" />
              </div>
              <span className="font-medium">Settings</span>
            </NavLink>

            <NavLink
              to="/help"
              onClick={onClose}
              className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-white flex items-center justify-center transition-colors">
                <HelpCircle className="h-5 w-5 text-gray-600" />
              </div>
              <span className="font-medium">Help & Support</span>
            </NavLink>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700">System Status</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-600">All systems operational</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}