import Link from 'next/link';
import Image from 'next/image';
import { Pet } from '@/types';
import { Button } from '@/components/ui/button';
import { Heart, MapPin } from 'lucide-react';
import { formatPetAge, getSpeciesLabel, getSizeLabel, getGenderLabel } from '@/lib/format';

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  const primaryImage = pet.images[0] || '/placeholder-pet.jpg';

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <Image
          src={primaryImage}
          alt={pet.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {pet.isAdopted && (
          <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Adoptado
          </div>
        )}
        {!pet.isAdopted && (
          <button className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors">
            <Heart size={20} className="text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Name and Age */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{pet.name}</h3>
          <p className="text-sm text-gray-600">
            {getSpeciesLabel(pet.species)} • {formatPetAge(pet.age, pet.ageUnit)}
          </p>
        </div>

        {/* Details */}
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium border border-orange-100">
            {getGenderLabel(pet.gender)}
          </span>
          <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-100">
            {getSizeLabel(pet.size)}
          </span>
          {pet.breed && (
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">
              {pet.breed}
            </span>
          )}
        </div>

        {/* Description */}
        {pet.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {pet.description}
          </p>
        )}

        {/* Action Button */}
        <Link href={`/pets/${pet.id}`} className="block">
          <Button 
            className="w-full mt-2" 
            disabled={pet.isAdopted}
            variant={pet.isAdopted ? "outline" : "default"}
          >
            {pet.isAdopted ? 'Ver detalles' : 'Más información'}
          </Button>
        </Link>
      </div>
    </div>
  );
}
