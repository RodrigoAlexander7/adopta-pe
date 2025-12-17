'use client';

import { useEffect, useState } from 'react';
import { Story } from '@/types';
import { storiesApi } from '@/lib/api-client';
import { StoryCard } from '@/components/stories/story-card';
import { FileText, Loader2 } from 'lucide-react';

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await storiesApi.getAll();
        setStories(response.data);
      } catch (error) {
        console.error('Failed to fetch stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
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
              <FileText size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
            Historias de adopción exitosas
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Lee historias conmovedoras de familias que encontraron a sus compañeros perfectos
          </p>
        </div>

        {/* Stories Grid */}
        {stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aún no hay historias
            </h3>
            <p className="text-gray-500">
              ¡Sé el primero en compartir tu experiencia de adopción!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
