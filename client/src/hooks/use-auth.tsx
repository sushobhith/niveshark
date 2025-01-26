import { createContext, useContext, useState, ReactNode } from 'react';
import { useLocation } from 'wouter';

interface UserDetails {
  id: string;
  username: string;
  isNewUser: boolean;
}

interface FinancialDetails {
  riskTolerance: string;
  investmentGoals: string[];
  monthlyInvestment: number;
  investmentHorizon: string;
}

interface AuthContextType {
  user: UserDetails | null;
  financialDetails: FinancialDetails | null;
  signIn: (username: string, password: string) => void;
  signUp: (username: string, password: string) => void;
  signOut: () => void;
  setFinancialDetails: (details: FinancialDetails) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [financialDetails, setFinancialDetails] = useState<FinancialDetails | null>(null);
  const [, setLocation] = useLocation();

  const signIn = (username: string, _password: string) => {
    // Simulate existing user authentication with some financial details
    setUser({
      id: '1',
      username,
      isNewUser: false
    });
    setFinancialDetails({
      riskTolerance: "Moderate",
      investmentGoals: ["Retirement", "Growth"],
      monthlyInvestment: 1000,
      investmentHorizon: "5-10 years"
    });
    setLocation('/dashboard');
  };

  const signUp = (username: string, _password: string) => {
    // Simulate new user registration with no financial details
    setUser({
      id: '1',
      username,
      isNewUser: true
    });
    setFinancialDetails(null);
    setLocation('/dashboard');
  };

  const signOut = () => {
    setUser(null);
    setFinancialDetails(null);
    setLocation('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      financialDetails, 
      signIn, 
      signUp, 
      signOut,
      setFinancialDetails 
    }}>
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