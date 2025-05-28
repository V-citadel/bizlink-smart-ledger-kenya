
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  user_metadata?: {
    firstName?: string;
    lastName?: string;
    businessName?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing demo session
    const demoUser = localStorage.getItem('demo-user');
    if (demoUser) {
      try {
        setUser(JSON.parse(demoUser));
      } catch (error) {
        console.error('Error parsing demo user:', error);
        localStorage.removeItem('demo-user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate demo authentication
    const demoUser: User = {
      id: 'demo-user-123',
      email: email,
      user_metadata: {
        firstName: 'Demo',
        lastName: 'User',
        businessName: 'Bizkash Demo Business'
      }
    };

    localStorage.setItem('demo-user', JSON.stringify(demoUser));
    setUser(demoUser);
    setLoading(false);
  };

  const signOut = async () => {
    localStorage.removeItem('demo-user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    signOut,
    signIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
