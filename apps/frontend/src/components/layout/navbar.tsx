'use client';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/button';
import { PawPrint, User, Menu, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-[hsl(var(--border))] bg-[hsl(var(--background))/80] backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-[hsl(var(--primary))] rounded-lg text-white transition-transform group-hover:scale-110">
            <PawPrint size={24} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] to-purple-600">
            Adopta.pe
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/pets" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">
            Adopta
          </Link>
          <Link href="/stories" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">
            Historias
          </Link>
          <Link href="/shelters" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">
            Albergues
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                 <Button variant="ghost" size="sm" className="gap-2">
                    <LayoutDashboard size={16} /> Dashboard
                 </Button>
              </Link>
              
              <div className="flex items-center gap-3 pl-4 border-l">
                 <div className="w-8 h-8 rounded-full bg-primary/10 overflow-hidden border border-primary/20">
                    {user?.image ? (
                        <img src={user.image} alt="User" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[hsl(var(--primary))] font-bold text-xs">
                          {user?.name?.slice(0,2).toUpperCase()}
                        </div>
                    )}
                 </div>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={logout}>Sign Out</Button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">Log In</Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] p-4 flex flex-col gap-4">
           <Link href="/pets" className="text-sm font-medium p-2 hover:bg-[hsl(var(--accent))] rounded-md">
            Adopta
          </Link>
           <Link href="/stories" className="text-sm font-medium p-2 hover:bg-[hsl(var(--accent))] rounded-md">
            Historias
          </Link>
           <Link href="/shelters" className="text-sm font-medium p-2 hover:bg-[hsl(var(--accent))] rounded-md">
            Albergues
          </Link>
          {isAuthenticated ? (
             <Link href="/dashboard">
                <Button className="w-full" variant="outline">Dashboard</Button>
             </Link>
          ) : (
             <Link href="/auth/login">
               <Button className="w-full">Log In</Button>
             </Link>
          )}
        </div>
      )}
    </nav>
  );
}
