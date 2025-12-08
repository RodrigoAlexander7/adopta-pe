'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateShelterDto } from '@/types';
import { sheltersApi } from '@/lib/api-client';
import { ImageUpload } from '@/components/ui/image-upload';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function ShelterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateShelterDto>({
    name: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    website: '',
    logo: undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await sheltersApi.create(formData);
      alert('Shelter registered successfully! Your account has been upgraded to SHELTER role.');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Failed to register shelter:', error);
      alert(error.response?.data?.message || 'Failed to register shelter. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof CreateShelterDto, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Logo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Shelter Logo (Optional)
        </label>
        <ImageUpload
          images={formData.logo ? [formData.logo] : []}
          onChange={(images) => updateField('logo', images[0])}
          maxImages={1}
        />
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shelter Name *
          </label>
          <input
            type="text"
            required
            minLength={3}
            maxLength={100}
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter shelter name"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Tell us about your shelter, mission, and the animals you help..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="contact@shelter.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="+51 999 999 999"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address *
          </label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => updateField('address', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Street address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            required
            value={formData.city}
            onChange={(e) => updateField('city', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Lima, Arequipa, etc."
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => updateField('website', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="https://www.yourshelter.com"
          />
        </div>
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
              Registering...
            </>
          ) : (
            'Register Shelter'
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
