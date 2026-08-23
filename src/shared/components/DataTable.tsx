'use client';

import React from 'react';

export interface TableColumn<T> {
  key: string;
  header: string;
  /** Función de renderizado de celda */
  render: (item: T) => React.ReactNode;
  /** Ocultar columna en pantallas menores a este breakpoint */
  hideBelow?: 'md' | 'lg';
  /** Clases CSS adicionales para la celda */
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  keyExtractor: (item: T) => string;
  /** Slot de acciones por fila (botones editar, eliminar, etc.) */
  renderActions?: (item: T) => React.ReactNode;
  emptyMessage?: string;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  renderActions,
  emptyMessage = 'No se encontraron registros.',
}: DataTableProps<T>) {
  const colSpan = columns.length + (renderActions ? 1 : 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider ${
                    col.hideBelow === 'md'
                      ? 'hidden md:table-cell'
                      : col.hideBelow === 'lg'
                      ? 'hidden lg:table-cell'
                      : ''
                  } ${col.className ?? ''}`}
                >
                  {col.header}
                </th>
              ))}
              {renderActions && (
                <th className="text-right px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Acciones
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={colSpan}
                  className="text-center py-12 text-slate-400 text-sm"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-5 py-4 ${
                        col.hideBelow === 'md'
                          ? 'hidden md:table-cell'
                          : col.hideBelow === 'lg'
                          ? 'hidden lg:table-cell'
                          : ''
                      } ${col.className ?? ''}`}
                    >
                      {col.render(item)}
                    </td>
                  ))}
                  {renderActions && (
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end space-x-1">
                        {renderActions(item)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
