'use client';

import React, { useState, useCallback } from 'react';
import {
  Users,
  Plus,
  Search,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Phone,
  Mail,
  MapPin,
  FileText,
} from 'lucide-react';
import { ClientService } from '@/modules/clients/services/client.service';
import { ClientModel } from '@/modules/clients/models/client.model';
import { ClientModal } from '@/modules/clients/components/ClientModal';

type ModalState =
  | { type: 'closed' }
  | { type: 'create' }
  | { type: 'edit'; client: ClientModel }
  | { type: 'delete'; client: ClientModel };

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientModel[]>(ClientService.getAll());
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<ModalState>({ type: 'closed' });
  const [isSaving, setIsSaving] = useState(false);

  const filtered = search.trim()
    ? ClientService.search(search)
    : clients;

  const refresh = useCallback(() => {
    setClients(ClientService.getAll());
  }, []);

  const handleSave = (data: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    nit: string;
    isActive: boolean;
  }) => {
    setIsSaving(true);
    setTimeout(() => {
      if (modal.type === 'create') {
        ClientService.create(data);
      } else if (modal.type === 'edit') {
        ClientService.update(modal.client.id, data);
      }
      refresh();
      setModal({ type: 'closed' });
      setIsSaving(false);
    }, 400);
  };

  const handleDelete = (client: ClientModel) => {
    ClientService.delete(client.id);
    refresh();
    setModal({ type: 'closed' });
  };

  const handleToggleActive = (client: ClientModel) => {
    ClientService.toggleActive(client.id);
    refresh();
  };

  return (
    <div className="space-y-6">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">Clientes</h1>
            <p className="text-xs text-slate-500">{clients.length} clientes registrados</p>
          </div>
        </div>

        <button
          onClick={() => setModal({ type: 'create' })}
          className="flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Cliente</span>
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre, NIT, email o teléfono..."
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Cliente</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Contacto</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">NIT</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                <th className="text-right px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-slate-400 text-sm">
                    No se encontraron clientes.
                  </td>
                </tr>
              ) : (
                filtered.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{client.fullName}</p>
                        <p className="text-xs text-slate-400 flex items-center space-x-1 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate max-w-[180px]">{client.address}</span>
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <div className="space-y-0.5">
                        <p className="text-xs text-slate-600 flex items-center space-x-1.5">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{client.email}</span>
                        </p>
                        <p className="text-xs text-slate-600 flex items-center space-x-1.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{client.phone}</span>
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="flex items-center space-x-1.5 text-xs text-slate-600">
                        <FileText className="w-3 h-3 text-slate-400" />
                        <span>{client.nit}</span>
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                          client.isActive
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {client.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end space-x-1">
                        {/* Activar/Desactivar */}
                        <button
                          onClick={() => handleToggleActive(client)}
                          title={client.isActive ? 'Desactivar' : 'Activar'}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          {client.isActive ? (
                            <ToggleRight className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <ToggleLeft className="w-4 h-4" />
                          )}
                        </button>

                        {/* Editar */}
                        <button
                          onClick={() => setModal({ type: 'edit', client })}
                          title="Editar cliente"
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        {/* Eliminar */}
                        <button
                          onClick={() => setModal({ type: 'delete', client })}
                          title="Eliminar cliente"
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Crear/Editar */}
      {(modal.type === 'create' || modal.type === 'edit') && (
        <ClientModal
          mode={modal.type}
          client={modal.type === 'edit' ? modal.client : undefined}
          onClose={() => setModal({ type: 'closed' })}
          onSave={handleSave}
          isSaving={isSaving}
        />
      )}

      {/* Modal Confirmación Eliminar */}
      {modal.type === 'delete' && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
          onClick={() => setModal({ type: 'closed' })}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '22rem',
              backgroundColor: '#ffffff',
              borderRadius: '1rem',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)',
              border: '1px solid #f1f5f9',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-red-50 text-red-600 rounded-xl">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Eliminar Cliente</h3>
                  <p className="text-xs text-slate-500">Esta acción no se puede deshacer.</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                ¿Estás seguro que deseas eliminar a{' '}
                <span className="font-semibold text-slate-900">{modal.client.fullName}</span>?
              </p>
              <div className="flex items-center justify-end space-x-2 pt-1">
                <button
                  onClick={() => setModal({ type: 'closed' })}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDelete(modal.client)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors"
                >
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
