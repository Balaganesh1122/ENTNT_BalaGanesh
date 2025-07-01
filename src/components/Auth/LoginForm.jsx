import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  LogIn, 
  Shield, 
  Users, 
  Award, 
  Clock,
  Heart,
  Star,
  CheckCircle,
  Stethoscope,
  Activity
} from 'lucide-react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = login(email, password);
    
    if (result.success) {
      const user = JSON.parse(localStorage.getItem('dental_user'));
      if (user.role === 'Admin') {
        navigate('/dashboard');
      } else {
        navigate('/patient-dashboard');
      }
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const stats = [
    { icon: Users, value: '600+', label: 'Happy Patients' },
    { icon: Award, value: '1000+', label: 'Successful Operations' },
    { icon: Clock, value: '24/7', label: 'Emergency Care' },
    { icon: Star, value: '4.9', label: 'Patient Rating' }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      content: "Exceptional care and modern facilities. The digital system makes everything so convenient!",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Dentist",
      content: "This management system has revolutionized how we handle patient care and appointments.",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Patient",
      content: "Professional staff, painless procedures, and easy online booking. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full Background with Blue Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 text-blue-200">
            <Stethoscope className="w-full h-full" />
          </div>
          <div className="absolute top-32 right-20 w-16 h-16 text-blue-200">
            <Heart className="w-full h-full" />
          </div>
          <div className="absolute bottom-20 left-20 w-24 h-24 text-blue-200">
            <Activity className="w-full h-full" />
          </div>
          <div className="absolute bottom-40 right-10 w-18 h-18 text-blue-200">
            <Shield className="w-full h-full" />
          </div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 text-blue-200">
            <Heart className="w-full h-full" />
          </div>
          <div className="absolute top-1/4 right-1/4 w-28 h-28 text-blue-200">
            <Stethoscope className="w-full h-full" />
          </div>
          <div className="absolute top-3/4 left-1/4 w-20 h-20 text-blue-200">
            <Activity className="w-full h-full" />
          </div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 text-blue-200">
            <Shield className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header Section */}
        <div className="text-white p-8 lg:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="h-9 w-9 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">DentalCare Pro</h1>
                <p className="text-blue-200 text-lg">Advanced Dental Management</p>
              </div>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Smile,<br />
                Our Priority
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
                Experience world-class dental care with our state-of-the-art digital management system.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Centered Login Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome Back</h2>
                <p className="text-gray-600">Sign in to access your dental care dashboard</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                    {error}
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-4 pr-12 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-3 py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all transform hover:scale-[1.02]"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <LogIn className="h-6 w-6" />
                  )}
                  {loading ? 'Signing in...' : 'Sign In Securely'}
                </button>
              </form>

              <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Demo Access Credentials
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <span className="font-medium text-blue-600">Doctor Portal:</span>
                      <div className="text-xs text-gray-600">admin@entnt.in / admin123</div>
                    </div>
                    <Stethoscope className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <span className="font-medium text-green-600">Patient Portal:</span>
                      <div className="text-xs text-gray-600">john@entnt.in / patient123</div>
                    </div>
                    <Heart className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    <span>HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>SSL Secured</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Testimonials Section */}
        <div className="text-white p-8 lg:p-12">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center">What Our Patients Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-blue-100 mb-4 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <span className="font-semibold">{testimonial.name}</span>
                    <span className="text-blue-300"> - {testimonial.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






