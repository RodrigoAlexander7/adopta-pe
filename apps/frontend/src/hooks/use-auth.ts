import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook for authentication operations
 */
export function useAuth() {
  const { user, isAuthenticated, token, setAuth, logout: storeLogout } = useAuthStore();

  const logout = async () => {
    try {
      // Call backend logout endpoint to clear cookie
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear Zustand store
      storeLogout();
    }
  };

  return {
    user,
    isAuthenticated,
    token,
    logout,
  };
}

/**
 * Hook that redirects to login if not authenticated
 * Use in protected pages
 */
export function useRequireAuth() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  return { isAuthenticated };
}
