'use client';

import { PawPrint } from 'lucide-react';
import GoogleSessionPill from '@/components/login/GoogleSessionPill';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8 border border-gray-100">
          {/* Logo & Branding */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-orange-400 to-purple-500 p-4 rounded-2xl shadow-lg">
                <PawPrint size={48} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                Adopta.pe
              </h1>
              <p className="text-gray-600 mt-2">
                Encuentra a tu compañero perfecto
              </p>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              ¡Bienvenido!
            </h2>
            <p className="text-gray-600 text-sm">
              Inicia sesión para comenzar tu viaje de adopción
            </p>
          </div>

          {/* Google Login Button */}
          <div className="flex justify-center">
            <GoogleSessionPill />
          </div>

          {/* Footer Info */}
          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>Al continuar, aceptas nuestros términos y condiciones</p>
            <p className="text-gray-400">
              Ayudando a conectar mascotas con familias amorosas
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Eres un refugio?{' '}
            <a href="/shelters" className="text-purple-600 hover:text-purple-700 font-medium">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
