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
      alert('Story content must be at least 50 characters long');
      return;
    }

    setLoading(true);
    try {
      await storiesApi.create(formData);
      alert('Story published successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Failed to create story:', error);
      alert(error.response?.data?.message || 'Failed to publish story. Please try again.');
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
          Story Title *
        </label>
        <input
          type="text"
          required
          minLength={5}
          maxLength={100}
          value={formData.title}
          onChange={(e) => updateField('title', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Give your story a compelling title..."
        />
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cover Image (Optional)
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
          Your Story *
        </label>
        <textarea
          required
          rows={12}
          minLength={50}
          value={formData.content}
          onChange={(e) => updateField('content', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Share your adoption journey, the joy your pet brings, challenges you overcame, and advice for future adopters..."
        />
        <p className="text-sm text-gray-500 mt-1">
          {formData.content.length} characters (minimum 50)
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
              Publishing...
            </>
          ) : (
            'Publish Story'
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
