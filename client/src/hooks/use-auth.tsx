import { createContext, useContext, useState, ReactNode } from 'react';
import { useLocation } from 'wouter';

// Interface for user details stored in auth context
interface UserDetails {
  id: string;
  username: string;
  isNewUser: boolean;
}

// Interface for financial profile data
interface FinancialDetails {
  riskTolerance: string;         // User's risk tolerance level
  investmentGoals: string[];     // Array of investment goals
  monthlyInvestment: number;     // Monthly investment amount
  investmentHorizon: string;     // Investment time horizon
}

// Type definition for the auth context
interface AuthContextType {
  user: UserDetails | null;                              // Current user info
  financialDetails: FinancialDetails | null;            // User's financial profile
  signIn: (username: string, password: string) => void;  // Sign in function
  signUp: (username: string, password: string) => void;  // Sign up function
  signOut: () => void;                                  // Sign out function
  setFinancialDetails: (details: FinancialDetails) => void; // Update financial details
}

// Create the auth context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth provider component that wraps the app
export function AuthProvider({ children }: { children: ReactNode }) {
  // State for user and financial details
  const [user, setUser] = useState<UserDetails | null>(null);
  const [financialDetails, setFinancialDetails] = useState<FinancialDetails | null>(null);
  const [, setLocation] = useLocation();

  // Sign in handler - currently mocked, replace with actual API call
  const signIn = (username: string, _password: string) => {
    // TODO: Implement actual authentication
    setUser({
      id: '1',
      username,
      isNewUser: false
    });
    // Mock financial details for existing users
    setFinancialDetails({
      riskTolerance: "Moderate",
      investmentGoals: ["Retirement", "Growth"],
      monthlyInvestment: 1000,
      investmentHorizon: "5-10 years"
    });
    setLocation('/dashboard');
  };

  // Sign up handler - currently mocked, replace with actual API call
  const signUp = (username: string, _password: string) => {
    // TODO: Implement actual registration
    setUser({
      id: '1',
      username,
      isNewUser: true
    });
    // New users start with no financial details
    setFinancialDetails(null);
    setLocation('/dashboard');
  };

  // Sign out handler
  const signOut = () => {
    // Clear all user data
    setUser(null);
    setFinancialDetails(null);
    setLocation('/');
  };

  // Provide auth context to children components
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

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}