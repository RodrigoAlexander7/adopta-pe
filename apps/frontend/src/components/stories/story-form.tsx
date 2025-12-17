'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateStoryDto } from '@/types';
import { storiesApi } from '@/lib/api-client';
import { ImageUpload } from '@/components/ui/image-upload';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function StoryForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateStoryDto>({
    title: '',
    content: '',
    image: undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.content.length < 50) {
      alert('El contenido de la historia debe tener al menos 50 caracteres');
      return;
    }

    setLoading(true);
    try {
      await storiesApi.create(formData);
      alert('¡Historia publicada con éxito!');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Failed to create story:', error);
      alert(error.response?.data?.message || 'Error al publicar la historia. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof CreateStoryDto, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Título de la historia *
        </label>
        <input
          type="text"
          required
          minLength={5}
          maxLength={100}
          value={formData.title}
          onChange={(e) => updateField('title', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Dale un título llamativo a tu historia..."
        />
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imagen de portada (opcional)
        </label>
        <ImageUpload
          images={formData.image ? [formData.image] : []}
          onChange={(images) => updateField('image', images[0])}
          maxImages={1}
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tu historia *
        </label>
        <textarea
          required
          rows={12}
          minLength={50}
          value={formData.content}
          onChange={(e) => updateField('content', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Comparte tu experiencia de adopción, la alegría que te brinda tu mascota, los desafíos que superaste y consejos para futuros adoptantes..."
        />
        <p className="text-sm text-gray-500 mt-1">
          {formData.content.length} caracteres (mínimo 50)
        </p>
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
              Publicando...
            </>
          ) : (
            'Publicar historia'
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
