'use client';
import { useEffect, useState } from 'react';
import { ShelterCard } from '@/components/shelters/shelter-card';
import { Button } from '@/components/ui/button';
import { Building2 } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

export default function SheltersPage() {
  const [shelters, setShelters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/shelters`)
      .then(res => setShelters(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
         <div>
            <h1 className="text-3xl font-bold">Partner Shelters</h1>
            <p className="text-[hsl(var(--muted-foreground))]">Verified organizations dedicated to animal welfare</p>
         </div>
         <Link href="/dashboard/shelter-register">
            <Button variant="outline" className="gap-2">
               <Building2 size={18} />
               Register Your Shelter
            </Button>
         </Link>
      </div>

      {loading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="h-48 rounded-xl bg-gray-100 animate-pulse" />)}
         </div>
      ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shelters.map(shelter => (
               <ShelterCard key={shelter.id} shelter={shelter} />
            ))}
            {shelters.length === 0 && (
               <div className="col-span-full text-center py-20 text-[hsl(var(--muted-foreground))]">
                  No participating shelters found yet.
               </div>
            )}
         </div>
      )}
    </div>
  );
}
