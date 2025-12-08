'use client';

import { useEffect, useState } from 'react';
import { Shelter } from '@/types';
import { sheltersApi } from '@/lib/api-client';
import { ShelterCard } from '@/components/shelters/shelter-card';
import { Building2, Loader2 } from 'lucide-react';

export default function SheltersPage() {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const response = await sheltersApi.getAll();
        setShelters(response.data);
      } catch (error) {
        console.error('Failed to fetch shelters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShelters();
  }, []);

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
              <Building2 size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
            Our Partner Shelters
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Meet the amazing organizations dedicated to animal welfare
          </p>
        </div>

        {/* Shelters Grid */}
        {shelters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {shelters.map((shelter) => (
              <ShelterCard key={shelter.id} shelter={shelter} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No shelters registered yet
            </h3>
            <p className="text-gray-500">
              Check back soon for partner shelters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
