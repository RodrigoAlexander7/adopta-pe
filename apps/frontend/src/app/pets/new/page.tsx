'use client';

import { PetForm } from '@/components/pets/pet-form';
import { useRequireAuth } from '@/hooks/use-auth';
import { PawPrint, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewPetPage() {
  useRequireAuth(); // Redirect if not authenticated

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <Link 
          href="/dashboard"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver al Panel
        </Link>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Title Section */}
          <div className="bg-gradient-to-r from-orange-500 to-purple-600 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <PawPrint size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Publicar Mascota en Adopción</h1>
                <p className="text-white/90 mt-1">
                  Ayuda a encontrar un hogar amoroso para una mascota
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <PetForm />
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Nota:</strong> Todas las publicaciones de mascotas son revisadas antes de ser publicadas. 
            Asegúrate de proporcionar información precisa y fotos claras para ayudar a los posibles adoptantes.
          </p>
        </div>
      </div>
    </div>
  );
}
