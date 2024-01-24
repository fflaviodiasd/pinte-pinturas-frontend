/* eslint-disable @typescript-eslint/no-explicit-any */
export type User = {
  company: number;
  id: number;
  profileName: string;
  isFirstAccessUser: boolean;
  isFirstLogin: boolean;
  type: number;
};

export type Collaborator = {
  id: number;
  name: string;
  type: number;
  status: boolean;
  role: string;
  profile: string;
  phone: string;
  cpf: string;
  dateOfBirth: string;
  registration: string;
  email: string;
  admissionDate: string;
  dismissalDate: string;
};

export type Client = {
  id: number;
  name: string;
  cnpj: string;
  status: boolean;
  responsible: string;
  tradingName: string;
  phone: string;
  email: string;
  corporateName: string;
  municipalRegistration: string;
  stateRegistration: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  publicPlace: string;
  complement: string;
  number: string;
};

export type Area = {
  id: number;
  name: string;
  type: string;
  level: number;
  childAreas: Area[];
};

export type Construction = {
  id: number;
  name: string;
  responsible: string;
  percentageCompleted: number;
  status: string;
  type: string;
  areas: Area[];
};
