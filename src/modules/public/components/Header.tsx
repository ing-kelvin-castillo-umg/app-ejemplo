'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/modules/auth/context/AuthContext';
import { Wrench, User, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, openLoginModal, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Nosotros', href: '/about' },
    { name: 'Productos', href: '/products' },
    { name: 'Contacto', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo Institucional */}
        <Link href="/" className="flex items-center space-x-2.5">
          <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-sm">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">Ferretería</span>
            <span className="text-lg font-bold text-indigo-600 tracking-tight">Express</span>
          </div>
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Acceso Discreto de Usuario */}
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200/80 p-1.5 pl-3 rounded-2xl">
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800">{user.fullName}</span>
                <span className="text-[10px] font-medium text-slate-500">
                  {user.role === 'ADMIN' ? 'Administrador' : 'Usuario'}
                </span>
              </div>

              <Link
                href="/dashboard"
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Panel</span>
              </Link>

              <button
                onClick={logout}
                title="Cerrar Sesión"
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              title="Ingreso al sistema"
              className="p-2 text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 border border-slate-200/60 rounded-xl transition-all flex items-center space-x-1.5"
            >
              <User className="w-5 h-5 text-slate-700" />
            </button>
          )}
        </div>

        {/* Menú Hamburguesa Móvil */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 text-base font-medium rounded-xl ${
                pathname === link.href
                  ? 'text-indigo-600 bg-indigo-50 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-2 border-t border-slate-100">
            {isAuthenticated && user ? (
              <div className="space-y-2">
                <div className="px-3 py-2 bg-slate-50 rounded-xl">
                  <div className="text-sm font-bold text-slate-800">{user.fullName}</div>
                  <div className="text-xs text-slate-500">Rol: {user.role}</div>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 w-full px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-xl text-center justify-center"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Ir al Panel</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl font-medium justify-center text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Salir</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLoginModal();
                }}
                className="flex items-center space-x-2 w-full px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded-xl justify-center text-sm"
              >
                <User className="w-4 h-4 text-slate-600" />
                <span>Ingreso</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
