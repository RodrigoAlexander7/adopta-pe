'use client';
import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { PawPrint } from 'lucide-react';
import axios from 'axios';

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Fetch user data with the token
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
         headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
         setAuth(token, response.data);
         router.push('/');
      }).catch(err => {
         console.error('Login failed', err);
         router.push('/auth/login?error=auth_failed');
      });
    } else {
        router.push('/auth/login?error=no_token');
    }
  }, [searchParams, router, setAuth]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="animate-bounce mb-4 text-[hsl(var(--primary))]">
         <PawPrint size={48} />
      </div>
      <h2 className="text-2xl font-bold mb-2">Authenticating...</h2>
      <p className="text-[hsl(var(--muted-foreground))]">Please wait while we log you in.</p>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <PawPrint size={48} className="animate-bounce mb-4 text-primary" />
        <h2 className="text-2xl font-bold mb-2">Loading...</h2>
      </div>
    }>
      <GoogleCallbackContent />
    </Suspense>
  );
}
