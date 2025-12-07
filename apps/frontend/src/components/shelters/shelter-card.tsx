import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface ShelterProps {
  id: string;
  name: string;
  city: string;
  description?: string;
  logo?: string;
  isVerified: boolean;
  website?: string;
}

export function ShelterCard({ shelter }: { shelter: ShelterProps }) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-all border-0 bg-[hsl(var(--card))]">
      <CardHeader className="p-6 pb-2 flex-row gap-4 items-start">
         <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-primary">
            {shelter.logo ? (
              <img src={shelter.logo} alt={shelter.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              shelter.name.charAt(0)
            )}
         </div>
         <div className="flex-grow">
            <div className="flex items-center gap-2">
               <h3 className="text-xl font-bold">{shelter.name}</h3>
               {shelter.isVerified && <ShieldCheck className="text-blue-500 w-5 h-5" />}
            </div>
            <div className="flex items-center gap-1 text-sm text-[hsl(var(--muted-foreground))] mt-1">
               <MapPin size={14} />
               <span>{shelter.city}</span>
            </div>
         </div>
      </CardHeader>
      
      <CardContent className="p-6 pt-2 flex-grow flex flex-col justify-between space-y-4">
        <p className="text-[hsl(var(--muted-foreground))] text-sm line-clamp-3">
           {shelter.description || 'Dedicated to saving lives.'}
        </p>
        
        <div className="flex gap-2">
           <Link href={`/pets?shelterId=${shelter.id}`} className="flex-1">
              <Button variant="outline" className="w-full">View Pets</Button>
           </Link>
           {shelter.website && (
              <a href={shelter.website} target="_blank" rel="noopener noreferrer">
                 <Button variant="ghost" size="sm" className="px-2">
                    <ExternalLink size={18} />
                 </Button>
              </a>
           )}
        </div>
      </CardContent>
    </Card>
  );
}
