'use client';
import { useEffect, useState } from 'react';
import { StoryCard } from '@/components/stories/story-card';
import { Button } from '@/components/ui/button';
import { PenTool } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

export default function StoriesPage() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stories`)
      .then(res => setStories(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-bold">Success Stories</h1>
            <p className="text-[hsl(var(--muted-foreground))]">Heartwarming tales of happy endings</p>
         </div>
         <Link href="/dashboard?tab=stories">
            <Button className="gap-2">
               <PenTool size={18} />
               Share Your Story
            </Button>
         </Link>
      </div>

      {loading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="h-64 rounded-xl bg-gray-100 animate-pulse" />)}
         </div>
      ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map(story => (
               <StoryCard key={story.id} story={story} />
            ))}
            {stories.length === 0 && (
               <div className="col-span-full text-center py-20 text-[hsl(var(--muted-foreground))]">
                  No stories yet. Be the first to share one!
               </div>
            )}
         </div>
      )}
    </div>
  );
}
