
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
  signUp: (email: string, password: string, metadata: any) => Promise<void>;
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
    // Check for existing session
    const storedUser = localStorage.getItem('bizkash-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('bizkash-user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate authentication delay for realism
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const demoUser: User = {
        id: 'user-' + Date.now(),
        email: email,
        user_metadata: {
          firstName: 'Business',
          lastName: 'Owner',
          businessName: email.includes('@') ? email.split('@')[0] + ' Business' : 'My Business'
        }
      };

      localStorage.setItem('bizkash-user', JSON.stringify(demoUser));
      setUser(demoUser);
    } catch (error) {
      throw new Error('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata: any) => {
    setLoading(true);
    
    try {
      // Simulate registration delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser: User = {
        id: 'user-' + Date.now(),
        email: email,
        user_metadata: {
          firstName: metadata.firstName,
          lastName: metadata.lastName,
          businessName: metadata.businessName
        }
      };

      localStorage.setItem('bizkash-user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    localStorage.removeItem('bizkash-user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    signOut,
    signIn,
    signUp,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
