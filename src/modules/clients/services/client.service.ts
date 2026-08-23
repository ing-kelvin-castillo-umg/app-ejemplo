import clientsData from '@/shared/data/clients.json';
import { ClientAdapter } from '../adapters/client.adapter';
import { ClientModel } from '../models/client.model';
import { ClientDTO } from '../dtos/client.dto';

// Simula una base de datos en memoria
let clientsStore: ClientModel[] = (clientsData as ClientDTO[]).map(
  ClientAdapter.toModel
);

export class ClientService {
  static getAll(): ClientModel[] {
    return [...clientsStore].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  static getById(id: string): ClientModel | undefined {
    return clientsStore.find((c) => c.id === id);
  }

  static search(query: string): ClientModel[] {
    const q = query.toLowerCase().trim();
    return clientsStore.filter(
      (c) =>
        c.fullName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.nit.toLowerCase().includes(q) ||
        c.phone.includes(q)
    );
  }

  static create(data: Omit<ClientModel, 'id' | 'createdAt'>): ClientModel {
    const newClient: ClientModel = {
      ...data,
      id: `c${Date.now()}`,
      createdAt: new Date(),
    };
    clientsStore = [newClient, ...clientsStore];
    return newClient;
  }

  static update(id: string, data: Partial<Omit<ClientModel, 'id' | 'createdAt'>>): ClientModel | null {
    const index = clientsStore.findIndex((c) => c.id === id);
    if (index === -1) return null;
    clientsStore[index] = { ...clientsStore[index], ...data };
    return clientsStore[index];
  }

  static delete(id: string): boolean {
    const before = clientsStore.length;
    clientsStore = clientsStore.filter((c) => c.id !== id);
    return clientsStore.length < before;
  }

  static toggleActive(id: string): ClientModel | null {
    const client = clientsStore.find((c) => c.id === id);
    if (!client) return null;
    return ClientService.update(id, { isActive: !client.isActive });
  }
}
