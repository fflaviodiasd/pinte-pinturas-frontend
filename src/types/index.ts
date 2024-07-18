/* eslint-disable @typescript-eslint/no-explicit-any */
export type User = {
  company: number;
  id: number;
  profileName: string;
  isFirstAccessUser: boolean;
  isFirstLogin: boolean;
  type: number;
  profile_type: string;
  profile_id?: number;
  companyCustomerId?: number;
};

export type Collaborator = {
  id: number;
  name: string;
  type: number;
  status: boolean;
  role: string;
  profile: string;
  cell_phone: string;
  phoneNumber: string;
  cpf: string;
  dateOfBirth: null;
  registration: string;
  email: string;
  admissionDate: null;
  dismissalDate: null;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  publicPlace: string;
  complement: string;
  number: string;
  disabled: boolean;
  active: boolean;
};

export type Client = {
  id: number;
  name: string;
  cnpj: string;
  status: boolean;
  responsible: string;
  tradingName: string;
  phoneNumber: string;
  email: string;
  corporateName: string;
  municipalRegistration: string;
  stateRegistration: string;
  registrationDate: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  publicPlace: string;
  complement: string;
  number: string;
  disabled: boolean;
};

export type Material = {
  id: number;
  name: string;
  group: string;
  expectedConsumption: string;
  applicationType: string;
  unit: string;
};

export type Construction = {
  productionBatch: string;
  price: string;
  expirationDate: string;
  material: string;
  teamName: string;
  teamMembers: any[];
  team: string;
  measurement: string;
  package: string;
};

export type Customer = {
  id: number;
  user: number;
  company: number;
  deleted: boolean;
  corporateName: string;
  cnpj: string;
  municipalRegistration: string;
  responsible: string;
  avatar: string | null;
  fantasyName: string;
  publicPlace: string | null;
  cep: string | null;
  neighborhood: string | null;
  complement: string | null;
  number: string | null;
  state: string | null;
  county: string | null;
  stateRegistration: string;
  email: string;
  phoneNumber: string;
  construction: any[];
};

export type Company = {
  customer: number | undefined;
  deleted: boolean;
  corporate_name: string;
  fantasy_name: string;
  cnpj: string;
  public_place: string;
  number: string;
  neighborhood: string;
  city: string;
  cep: string;

  complement: string;
  state: string;
  phone: string;
  cno: string;
  email: string;
  municipal_registration: string;
  state_registration: string;
  active: boolean;
};

export type ConstructionData = {
  id: number;
  fantasy_name: string;
  customer: string;
  phone: string;
  corporate_name: string;
  cnpj: string;
  cno: string;
  email: string;
  municipal_registration: string;
  state_registration: string;
  active: boolean;

  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  public_place: string;
  complement: string;
  number: string;

  name: string;
  deleted: boolean;
  responsible: string;
  status: string;
  percentageCompleted: number;
  type: string;
  areas: string[];
  teamName: string;
  team: string;
  measurement: string;
  package: string;
  checklistName: string;
};

export type ConstructionRegister = {
  id: number;
  fantasy_name: string;
  customer: string;
  phone: string;
  corporate_name: string;
  cnpj: string;
  cno: string;
  email: string;
  municipal_registration: string;
  state_registration: string;
  active: boolean;

  cep: string;
  state: string;
  county: string;
  neighborhood: string;
  public_place: string;
  complement: string;
  number: string;
};

export type FilterOption = {
  name: string;
  checked: boolean;
};
