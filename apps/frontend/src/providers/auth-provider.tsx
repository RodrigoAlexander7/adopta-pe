'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuthStore } from '@/store/auth.store';
import axios from 'axios';

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: any | null;
}

const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  isAuthenticated: false,
  user: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const { setAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    // Fetch user data if cookie exists
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
          {
            withCredentials: true, // Include cookies
          }
        );

        if (response.data) {
          // Extract token from cookie (we'll use a dummy token since it's httpOnly)
          // The actual token is in the cookie, we just need to mark as authenticated
          setAuth('authenticated', response.data);
        }
      } catch (error) {
        // No valid session, user is not authenticated
        console.log('No active session');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [setAuth]);

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
