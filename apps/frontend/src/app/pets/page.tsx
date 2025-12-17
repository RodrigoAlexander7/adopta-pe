'use client';

import { useEffect, useState } from 'react';
import { Pet } from '@/types';
import { petsApi } from '@/lib/api-client';
import { PetCard } from '@/components/pets/pet-card';
import { PetFilters } from '@/components/pets/pet-filters';
import { PawPrint, Loader2 } from 'lucide-react';

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<{
    species?: string;
    size?: string;
    search?: string;
  }>({});

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await petsApi.getAll();
        setPets(response.data);
        setFilteredPets(response.data);
      } catch (error) {
        console.error('Failed to fetch pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    let result = [...pets];

    // Apply species filter
    if (filters.species) {
      result = result.filter((pet) => pet.species === filters.species);
    }

    // Apply size filter
    if (filters.size) {
      result = result.filter((pet) => pet.size === filters.size);
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (pet) =>
          pet.name.toLowerCase().includes(searchLower) ||
          pet.breed?.toLowerCase().includes(searchLower) ||
          pet.description?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredPets(result);
  }, [filters, pets]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-orange-400 to-purple-500 p-4 rounded-2xl shadow-lg">
              <PawPrint size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
            Encuentra a tu compañero ideal
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explora nuestras mascotas disponibles y dales un hogar lleno de cariño
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <PetFilters filters={filters} onFilterChange={setFilters} />
            </div>
          </div>

          {/* Pets Grid */}
          <div className="lg:col-span-3">
            {filteredPets.length > 0 ? (
              <>
                <div className="mb-4 text-sm text-gray-600">
                  Mostrando {filteredPets.length} {filteredPets.length === 1 ? 'mascota' : 'mascotas'}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPets.map((pet) => (
                    <PetCard key={pet.id} pet={pet} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                <PawPrint className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No se encontraron mascotas
                </h3>
                <p className="text-gray-500">
                  Intenta ajustar tus filtros para ver más resultados
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
