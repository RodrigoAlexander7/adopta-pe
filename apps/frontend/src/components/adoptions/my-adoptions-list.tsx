'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, PawPrint } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';

const StatusBadge = ({ status }: { status: string }) => {
  const colors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
  };
  const labels: Record<string, string> = {
    PENDING: 'Pendiente',
    APPROVED: 'Aprobado',
    REJECTED: 'Rechazado',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-bold ${colors[status as keyof typeof colors] || 'bg-gray-100'}`}>
      {labels[status] || status}
    </span>
  );
};

export function MyAdoptionsList() {
  const { token } = useAuthStore();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/adoptions/me`, {
         headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setApplications(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
    }
  }, [token]);

  if (loading) {
    return <div className="text-center py-10">Cargando...</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-10 text-[hsl(var(--muted-foreground))] bg-gray-50 rounded-lg border border-dashed">
        <PawPrint className="w-12 h-12 mx-auto mb-4 opacity-20" />
        <p className="mb-4">Aún no has enviado solicitudes de adopción.</p>
        <Link href="/pets">
          <Button variant="outline">Ver mascotas</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {applications.map((app) => (
        <Card key={app.id} className="hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row gap-4 p-6">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <PawPrint />
              </div>
            </div>
            
            <div className="flex-grow space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">Solicitud para mascota #{app.petId.slice(0,8)}...</h3>
                <StatusBadge status={app.status} />
              </div>
              <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                <Calendar size={14} />
                <span>Solicitado el {new Date(app.createdAt).toLocaleDateString()}</span>
              </div>
              {app.message && (
                <p className="text-sm bg-[hsl(var(--accent))] p-3 rounded-md mt-2">
                  "{app.message}"
                </p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
