'use client';
import { useEffect, useState } from 'react';
import { PawPrint, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import axios from 'axios';

interface Pet {
  id: string;
  name: string;
  species: string;
  breed?: string;
  age: number;
  gender: string;
  size: string;
  description?: string;
  images?: string[];
  createdAt: string;
}

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pets`)
      .then(res => setPets(res.data))
      .catch(err => console.error('Error fetching pets:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <PawPrint className="w-12 h-12 mx-auto mb-4 animate-bounce text-primary" />
          <p className="text-muted-foreground">Loading adorable pets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          Find Your Perfect Companion
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Browse our available pets and give them the loving home they deserve
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search by name, breed..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter size={18} />
          Filters
        </Button>
      </div>

      {/* Pets Grid */}
      {pets.length === 0 ? (
        <div className="text-center py-20 bg-muted/50 rounded-2xl">
          <PawPrint className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-2xl font-bold mb-2">No Pets Available Yet</h3>
          <p className="text-muted-foreground mb-6">Check back soon for new furry friends!</p>
          <Link href="/shelters">
            <Button variant="outline">Browse Shelters</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Pet Image */}
              <div className="relative h-64 bg-muted overflow-hidden">
                {pet.images && pet.images.length > 0 ? (
                  <img
                    src={pet.images[0]}
                    alt={pet.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-purple-100">
                    <PawPrint className="w-20 h-20 text-primary/30" />
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {pet.species}
                </div>
              </div>

              {/* Pet Info */}
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{pet.name}</h3>
                  {pet.breed && (
                    <p className="text-sm text-muted-foreground">{pet.breed}</p>
                  )}
                </div>

                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">
                    {pet.age} {pet.age === 1 ? 'year' : 'years'}
                  </span>
                  <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">
                    {pet.gender}
                  </span>
                  <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">
                    {pet.size}
                  </span>
                </div>

                {pet.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {pet.description}
                  </p>
                )}

                <Link href={`/pets/${pet.id}`} className="block">
                  <Button className="w-full mt-4 group-hover:bg-primary-hover transition-colors">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
