'use client';

import React from 'react';
import { useAuth } from '@/modules/auth/context/AuthContext';
import { Shield, User, Users, Truck, Package, ShoppingCart, AlertTriangle, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-8">
      
      {/* Encabezado Principal de Bienvenida */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-indigo-300 text-xs font-semibold">
            {user.role === 'ADMIN' ? <Shield className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
            <span>{user.role === 'ADMIN' ? 'Administrador General' : 'Usuario Consulta'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Panel de Control - Ferretería Express
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            {user.role === 'ADMIN'
              ? 'Gestión integral de catálogo de inventario, lista de clientes, proveedores y operaciones de venta.'
              : 'Consulta del catálogo de inventario y estado general de clientes.'}
          </p>
        </div>
      </div>

      {/* Tarjetas de Métricas Principales (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clientes</span>
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900">24</span>
            <span className="text-xs text-slate-400 block mt-1">Clientes registrados</span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Proveedores</span>
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900">
              {user.role === 'ADMIN' ? '12' : 'Restringido'}
            </span>
            <span className="text-xs text-slate-400 block mt-1">
              {user.role === 'ADMIN' ? 'Distribuidoras activas' : 'Solo Administradores'}
            </span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inventario</span>
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900">6</span>
            <span className="text-xs text-amber-600 font-semibold block mt-1 flex items-center space-x-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>1 producto con stock bajo</span>
            </span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ventas de Hoy</span>
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900">$348.50</span>
            <span className="text-xs text-slate-400 block mt-1">5 transacciones completadas</span>
          </div>
        </div>

      </div>

      {/* Acceso Rápido al Catálogo */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-bold text-slate-900 text-sm">Catálogo & Stock en Tiempo Real</h3>
          <p className="text-xs text-slate-500">
            Revisa los precios de venta, precios de costo y alerta de stock mínimo de todos los productos.
          </p>
        </div>
        <Link
          href="/productos"
          className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-all shrink-0"
        >
          <span>Ver Productos</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
