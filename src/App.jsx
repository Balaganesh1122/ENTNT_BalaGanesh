import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';
import LoginForm from './components/Auth/LoginForm';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import PatientDashboard from './components/Dashboard/PatientDashboard';
import PatientList from './components/Patients/PatientList';
import AppointmentList from './components/Appointments/AppointmentList';
import CalendarView from './components/Calendar/CalendarView';
import MyAppointments from './components/Patients/MyAppointments';
import TreatmentPlanner from './components/BonusFeatures/TreatmentPlanner';
import Analytics from './components/BonusFeatures/Analytics';
import PatientChat from './components/BonusFeatures/PatientChat';
import HealthRecords from './components/BonusFeatures/HealthRecords';
import Settings from './components/Settings/Settings';
import './index.css';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading DentalCare Pro...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Admin Routes */}
          <Route 
            index
            element={
              <Navigate 
                to={user?.role === 'Admin' ? '/dashboard' : '/patient-dashboard'} 
                replace 
              />
            } 
          />
          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="patients" 
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <PatientList />
              </ProtectedRoute>
            
            } 
          />
          <Route 
            path="appointments" 
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AppointmentList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="calendar" 
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <CalendarView />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="analytics" 
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <Analytics />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="treatment-plans" 
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <TreatmentPlanner />
              </ProtectedRoute>
            } 
          />

          {/* Patient Routes */}
          <Route 
            path="patient-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['Patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="my-appointments" 
            element={
              <ProtectedRoute allowedRoles={['Patient']}>
                <MyAppointments />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="health-records" 
            element={
              <ProtectedRoute allowedRoles={['Patient']}>
                <HealthRecords />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="chat" 
            element={
              <ProtectedRoute allowedRoles={['Patient']}>
                <PatientChat />
              </ProtectedRoute>
            } 
          />

          {/* Shared Routes */}
          <Route 
            path="settings" 
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Patient']}>
                <Settings />
              </ProtectedRoute>
            } 
          />

          {/* Unauthorized */}
          <Route 
            path="unauthorized" 
            element={
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
                <p className="text-gray-600">You don't have permission to access this page.</p>
              </div>
            } 
          />

          {/* 404 */}
          <Route 
            path="*" 
            element={
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
                <p className="text-gray-600">The page you're looking for doesn't exist.</p>
              </div>
            } 
          />
        </Route>
      </Routes>
    </DataProvider>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}