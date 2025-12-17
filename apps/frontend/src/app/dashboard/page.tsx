'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PawPrint, FileText, Settings, Plus, LayoutDashboard } from 'lucide-react';
import withAuth from '@/lib/auth-guard';
import Link from 'next/link';
import axios from 'axios';
import { StoryCard } from '@/components/stories/story-card';
import { MyAdoptionsList } from '@/components/adoptions/my-adoptions-list';

function DashboardPage() {
  const { user, token } = useAuthStore();
  const [myStories, setMyStories] = useState<any[]>([]);

  useEffect(() => {
     if (token) {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stories/me`, {
           headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setMyStories(res.data))
        .catch(err => console.error(err));
     }
  }, [token]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-[hsl(var(--primary))] text-white flex items-center justify-center text-2xl font-bold overflow-hidden border-2 border-primary">
               {user?.image ? (
                  <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                  user?.name?.[0]
               )}
            </div>
            <div>
               <h1 className="text-3xl font-bold">Hola, {user?.name}</h1>
               <p className="text-[hsl(var(--muted-foreground))]">Administra tu actividad</p>
            </div>
         </div>
         <div className="flex gap-2">
            <Link href="/pets/new">
               <Button className="gap-2">
                  <Plus size={18} /> Publicar Mascota
               </Button>
            </Link>
            <Link href="/stories/new">
               <Button variant="outline" className="gap-2">
                  <FileText size={18} /> Nueva Historia
               </Button>
            </Link>
         </div>
      </div>

      <Tabs defaultValue="adoptions" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mb-8">
            <TabsTrigger value="adoptions">Mis Solicitudes</TabsTrigger>
            <TabsTrigger value="stories">Mis Historias</TabsTrigger>
            <TabsTrigger value="pets">Mis Mascotas</TabsTrigger>
         </TabsList>

         <TabsContent value="pets">
            <div className="text-center py-10 text-[hsl(var(--muted-foreground))] bg-gray-50 rounded-lg border border-dashed">
               <PawPrint className="w-12 h-12 mx-auto mb-4 opacity-20" />
               <p className="mb-4">Aún no has publicado mascotas para adopción.</p>
               <Link href="/pets/new">
                  <Button variant="outline">Publica tu primera mascota</Button>
               </Link>
            </div>
         </TabsContent>
         
         <TabsContent value="stories">
            <div className="space-y-6">
               {myStories.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {myStories.map(story => (
                        <StoryCard key={story.id} story={story} />
                     ))}
                  </div>
               ) : (
                  <div className="text-center py-10 text-[hsl(var(--muted-foreground))] bg-gray-50 rounded-lg border border-dashed">
                     <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
                     <p className="mb-4">¡Comparte tu historia de adopción exitosa!</p>
                     <Link href="/stories/new">
                        <Button variant="outline">Escribir una historia</Button>
                     </Link>
                  </div>
               )}
            </div>
         </TabsContent>
         
         <TabsContent value="adoptions">
            <MyAdoptionsList />
         </TabsContent>
      </Tabs>
    </div>
  );
}

export default withAuth(DashboardPage);

