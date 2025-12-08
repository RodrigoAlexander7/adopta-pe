'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PetSpecies, PetSize, Gender, AgeUnit, CreatePetDto } from '@/types';
import { petsApi } from '@/lib/api-client';
import { ImageUpload } from '@/components/ui/image-upload';
import { Button } from '@/components/ui/button';
import { PET_SPECIES_LABELS, PET_SIZE_LABELS, GENDER_LABELS, AGE_UNIT_LABELS } from '@/lib/constants';
import { Loader2 } from 'lucide-react';

export function PetForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreatePetDto>({
    name: '',
    species: PetSpecies.DOG,
    breed: '',
    age: undefined,
    ageUnit: AgeUnit.YEARS,
    gender: Gender.MALE,
    size: PetSize.MEDIUM,
    color: '',
    description: '',
    healthInfo: '',
    images: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.images.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    setLoading(true);
    try {
      await petsApi.create(formData);
      alert('Pet published successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Failed to create pet:', error);
      alert(error.response?.data?.message || 'Failed to publish pet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof CreatePetDto, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pet Images *
        </label>
        <ImageUpload
          images={formData.images}
          onChange={(images) => updateField('images', images)}
          maxImages={5}
        />
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter pet's name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Species *
          </label>
          <select
            required
            value={formData.species}
            onChange={(e) => updateField('species', e.target.value as PetSpecies)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {Object.entries(PET_SPECIES_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Breed
          </label>
          <input
            type="text"
            value={formData.breed}
            onChange={(e) => updateField('breed', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., Labrador, Persian"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color
          </label>
          <input
            type="text"
            value={formData.color}
            onChange={(e) => updateField('color', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., Brown, White"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <select
            required
            value={formData.gender}
            onChange={(e) => updateField('gender', e.target.value as Gender)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {Object.entries(GENDER_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Size *
          </label>
          <select
            required
            value={formData.size}
            onChange={(e) => updateField('size', e.target.value as PetSize)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {Object.entries(PET_SIZE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>
          <input
            type="number"
            min="0"
            value={formData.age || ''}
            onChange={(e) => updateField('age', e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter age"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age Unit
          </label>
          <select
            value={formData.ageUnit}
            onChange={(e) => updateField('ageUnit', e.target.value as AgeUnit)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {Object.entries(AGE_UNIT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Tell us about this pet's personality, habits, and what makes them special..."
        />
      </div>

      {/* Health Info */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Health Information
        </label>
        <textarea
          rows={3}
          value={formData.healthInfo}
          onChange={(e) => updateField('healthInfo', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Vaccination status, medical conditions, special needs..."
        />
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Publishing...
            </>
          ) : (
            'Publish Pet'
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
