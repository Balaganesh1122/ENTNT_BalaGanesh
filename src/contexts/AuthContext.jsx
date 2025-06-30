import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const mockUsers = [
  { 
    id: "1", 
    role: "Admin", 
    email: "admin@entnt.in", 
    password: "admin123",
    name: "Dr. Sarah Johnson"
  },
  { 
    id: "2", 
    role: "Patient", 
    email: "john@entnt.in", 
    password: "patient123", 
    patientId: "p1",
    name: "John Doe"
  },
  { 
    id: "3", 
    role: "Patient", 
    email: "jane@entnt.in", 
    password: "patient123", 
    patientId: "p2",
    name: "Jane Smith"
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('dental_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const foundUser = mockUsers.find(u => 
      u.email === email && u.password === password
    );
    
    if (foundUser) {
      const userSession = { ...foundUser };
      delete userSession.password; // Don't store password in session
      setUser(userSession);
      localStorage.setItem('dental_user', JSON.stringify(userSession));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dental_user');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAdmin: user?.role === 'Admin',
    isPatient: user?.role === 'Patient'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}