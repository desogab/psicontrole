export interface ClientSponsor {
  id: string;
  name: string;
  cpf: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface ClientEmergency {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface ClientAddress {
  id: string;
  street: string;
  district: string;
  number: number;
  city: string;
  complement: string;
  state: string;
  zipcode: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface ClientInfo {
  id: string;
  active: boolean;
  sponsor: boolean;
  name: string;
  birthdate?: string | '';
  cpf: string;
  email: string | '';
  phone: string;
  consultationPrice: number;
  clientAddress: ClientAddress;
  clientEmergency: ClientEmergency;
  clientSponsor: ClientSponsor;
  createdAt: string;
  updatedAt: string | null;
}
