import {
  createContext, ReactNode, useContext, useEffect, useState,
} from 'react';
import { ClientInfo } from '../../types';

interface ClientContextData {
  clients: ClientInfo[];
  getClientById: (id: string) => Promise<ClientInfo>;
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

  return (
    <ClientContext.Provider value={{ clients, getClientById }}>
      {children}
    </ClientContext.Provider>
  );
}

export const useClient = () => useContext(ClientContext);
