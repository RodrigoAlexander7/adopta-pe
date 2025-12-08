'use client';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function ProtectedRoute(props: P) {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      if (!isAuthenticated) {
        router.push('/auth/login');
      }
    }, [isAuthenticated, router]);

    if (!mounted || !isAuthenticated) {
      return null; // Or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
}
