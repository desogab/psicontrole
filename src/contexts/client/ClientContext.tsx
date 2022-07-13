import {
  createContext, ReactNode, useContext, useEffect, useState,
} from 'react';
import { ClientInfo } from '../../types';

interface ClientContextData {
  clients: ClientInfo[];
  getClientById: (id: string) => Promise<ClientInfo>;
  createClient: (data: ClientInfo) => Promise<void | ClientInfo>;
}

const ClientContext = createContext({} as ClientContextData);

interface ClientProviderProps {
  children: ReactNode;
}

export function ClientProvider({ children }: ClientProviderProps) {
  const [clients, setClients] = useState<ClientInfo[]>([]);

  useEffect(() => {
    (async () => {
      const clientList = await fetch('http://localhost:3001/clients', { method: 'GET' })
        .then((response) => response.json());

      setClients(clientList);
    })();
  }, []);

  async function getClientById(id: string) {
    const clientById = await fetch(`http://localhost:3001/clients/${id}`, { method: 'GET' })
      .then((response) => response.json());
    return clientById;
  }

  async function createClient(data: ClientInfo) {
    await fetch('http://localhost:3001/clients', {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      method: 'POST',
      body: JSON.stringify({
        ...data,
      }),
    })
      .then(() => console.log('created'))
      .catch(() => console.log('fail'));
  }

  return (
    <ClientContext.Provider value={{ clients, getClientById, createClient }}>
      {children}
    </ClientContext.Provider>
  );
}

export const useClient = () => useContext(ClientContext);
