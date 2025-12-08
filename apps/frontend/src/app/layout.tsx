import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { AuthProvider } from "@/providers/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adopta.pe | Encuentra a tu compañero ideal",
  description: "Plataforma de adopción de mascotas en Perú",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
