import type { Metadata } from 'next';
import { AuthProvider } from '@/modules/auth/context/AuthContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ferretería Express - Herramientas & Materiales',
  description: 'Aplicación web para gestión integral de ferretería',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
