import { createContext, useContext, useState, ReactNode } from 'react';
import { useLocation } from 'wouter';

interface User {
  id: string;
  username: string;
  isNewUser: boolean;
}

interface AuthContextType {
  user: User | null;
  signIn: (username: string, password: string) => void;
  signUp: (username: string, password: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [, setLocation] = useLocation();

  const signIn = (username: string, _password: string) => {
    // Simulate authentication
    setUser({
      id: '1',
      username,
      isNewUser: false
    });
    setLocation('/dashboard');
  };

  const signUp = (username: string, _password: string) => {
    // Simulate new user registration
    setUser({
      id: '1',
      username,
      isNewUser: true
    });
    setLocation('/questionnaire');
  };

  const signOut = () => {
    setUser(null);
    setLocation('/');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}