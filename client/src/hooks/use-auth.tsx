import { createContext, useContext, useState, ReactNode } from 'react';
import { useLocation } from 'wouter';
import axios from 'axios';

const BASE_HOST_URL = "http://localhost:8000"

const apiClient = axios.create({
  baseURL: BASE_HOST_URL,
  withCredentials: true, // Allows cookies to be sent
});

// Interface for user details stored in auth context
interface UserDetails {
  username: string;
  email: string;
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
  signUp: (username: string, password: string, email: string) => void;  // Sign up function
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
  const [location, setLocation] = useLocation();

  // Sign in handler - currently mocked, replace with actual API call
  const signIn = async (username: string, password: string) => {
    try {
      const response = await apiClient.post(BASE_HOST_URL+'/auth/signin', {
        username,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        setUser({
          username: data.username,
          isNewUser: false,
          email: data.email
        });
        setFinancialDetails(null); // Assuming the API returns financial details
        setTimeout(() => {
          setLocation('/dashboard');
        }, 0);
      } else {
        // Handle authentication error
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  // Sign up handler - currently mocked, replace with actual API call
  const signUp = async (username: string, password: string, email: string) => {

    try {
      const response = await apiClient.post(BASE_HOST_URL+'/auth/signup', {
        username,
        password,
        email
      });

      if (response.status === 200) {
        const data = response.data;

        setUser({
          username: data.username,
          isNewUser: true,
          email:data.email
        });
        setFinancialDetails(null); // Assuming the API returns financial details
        setTimeout(() => {
          setLocation('/dashboard');
        }, 0);
      } else {
        // Handle authentication error
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    }

  };

  // Sign out handler
  const signOut = async () => {
    // Clear all user data
    try {
      const response = await apiClient.get(BASE_HOST_URL+'/auth/signout');

      if (response.status === 200) {
        const data = response.data;
      } else {
        // Handle authentication error
        console.error(response.data.message);
        console.error("Signing out from client");
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      console.error("Signing out from client");
    }
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