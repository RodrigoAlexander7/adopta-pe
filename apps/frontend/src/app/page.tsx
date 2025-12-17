import { Button } from '@/components/ui/button';
import { PawPrint, Heart, Home } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-[hsl(var(--primary))/10]">
         <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-transparent to-transparent"></div>
         
         <div className="container px-4 z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--background))] border border-[hsl(var(--border))] shadow-sm mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
               <span className="text-sm font-medium">Más de 500 mascotas esperando un hogar</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] to-purple-600 animate-in fade-in zoom-in duration-700">
               Encuentra a tu nuevo <br className="hidden md:block" /> mejor amigo
            </h1>
            
            <p className="text-xl md:text-2xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
               Abre tu corazón y tu hogar a una mascota rescatada. El amor lo cambia todo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
               <Link href="/pets">
                     <Button size="lg" className="rounded-full text-lg h-14 px-8 shadow-xl shadow-primary/20">
                     Adoptar ahora
                  </Button>
               </Link>
               <Link href="/shelters">
                     <Button variant="outline" size="lg" className="rounded-full text-lg h-14 px-8 bg-transparent backdrop-blur-sm border-2">
                     Más información
                  </Button>
               </Link>
            </div>
         </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[hsl(var(--background))]">
         <div className="container px-4 mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
               <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-sm hover:shadow-lg transition-all text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                     <PawPrint size={24} />
                  </div>
                  <h3 className="text-xl font-bold">Compañeros variados</h3>
                  <p className="text-[hsl(var(--muted-foreground))]">Desde cachorros juguetones hasta adultos tranquilos, encuentra la mascota ideal para tu estilo de vida.</p>
               </div>
               
               <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-sm hover:shadow-lg transition-all text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                     <Heart size={24} />
                  </div>
                  <h3 className="text-xl font-bold">Vidas salvadas</h3>
                  <p className="text-[hsl(var(--muted-foreground))]">Cada adopción salva dos vidas: la mascota que adoptas y la que ocupa su lugar.</p>
               </div>

               <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-sm hover:shadow-lg transition-all text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                     <Home size={24} />
                  </div>
                  <h3 className="text-xl font-bold">Proceso seguro</h3>
                  <p className="text-[hsl(var(--muted-foreground))]">Refugios verificados y un proceso de adopción seguro para garantizar hogares felices.</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
