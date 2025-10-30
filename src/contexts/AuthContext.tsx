import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'ngo' | 'admin';
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string, role: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on page load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, name: string, role: string) => {
    try {
      const newUser: User = {
        id: crypto.randomUUID(),
        name,
        email,
        role: role as 'farmer' | 'ngo' | 'admin',
        created_at: new Date().toISOString(),
      };

      // Simulate account creation
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('password', password); // just for mock demo (never store plain passwords in production)
      setUser(newUser);

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedPassword = localStorage.getItem('password');

      if (!storedUser || !storedPassword) {
        throw new Error('User not found');
      }

      if (password !== storedPassword) {
        throw new Error('Invalid credentials');
      }

      const userData: User = JSON.parse(storedUser);
      if (userData.email !== email) {
        throw new Error('Invalid email');
      }

      setUser(userData);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    setUser(null);
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
