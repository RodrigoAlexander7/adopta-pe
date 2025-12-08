import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { User, Calendar, Heart } from 'lucide-react';
// import Image from 'next/image';

interface StoryProps {
  id: string;
  title: string;
  content: string;
  image?: string;
  user?: { name: string };
  createdAt: string;
}

export function StoryCard({ story }: { story: StoryProps }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-[hsl(var(--card))]">
      <div className="relative aspect-video overflow-hidden bg-gray-100">
         {story.image ? (
            <img src={story.image} alt={story.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
         ) : (
            <div className="w-full h-full flex items-center justify-center text-[hsl(var(--muted-foreground))]">
               <Heart size={48} className="opacity-20" />
            </div>
         )}
      </div>
      
      <CardHeader className="p-4 pb-2">
        <h3 className="text-xl font-bold line-clamp-2">{story.title}</h3>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 space-y-3">
        <p className="text-[hsl(var(--muted-foreground))] line-clamp-3 text-sm">
           {story.content}
        </p>
        
        <div className="flex items-center justify-between text-xs text-[hsl(var(--muted-foreground))] pt-2 border-t border-[hsl(var(--border))]">
           <div className="flex items-center gap-1">
              <User size={14} />
              <span>{story.user?.name || 'Anonymous'}</span>
           </div>
           <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{new Date(story.createdAt).toLocaleDateString()}</span>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
