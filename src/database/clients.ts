import { Client } from "../types";

export const mockedListClients: Client[] = [
  { id: 1, name: "João", cnpj: "99.999.999/9999-99", status: true },
  { id: 2, name: "Joaquim", cnpj: "99.999.999/9999-99", status: true },
  { id: 3, name: "Lucas", cnpj: "99.999.999/9999-99", status: true },
  { id: 4, name: "Alberto", cnpj: "99.999.999/9999-99", status: true },
  { id: 5, name: "Renato", cnpj: "99.999.999/9999-99", status: true },
  { id: 6, name: "Marcos", cnpj: "99.999.999/9999-99", status: true },
  { id: 7, name: "Bruno", cnpj: "99.999.999/9999-99", status: true },
  { id: 8, name: "Rodrigo", cnpj: "99.999.999/9999-99", status: true },
  { id: 9, name: "André", cnpj: "99.999.999/9999-99", status: true },
];

// Mocked List Clients Employees

export type Person = {
  id: number;
  name: string;
  phone: number;
  role: string;
  profile: string;
};

export const data: Person[] = [
  {
    id: 1,
    name: "Hugh",
    phone: 999999999,
    role: "Mungus",
    profile: "Administrador",
  },
  {
    id: 2,
    name: "Leroy",
    phone: 999999999,
    role: "Mungus",
    profile: "Administrador",
  },
  {
    id: 3,
    name: "Candice",
    phone: 999999999,
    role: "Mungus",
    profile: "Administrador",
  },
  {
    id: 4,
    name: "Micah",
    phone: 999999999,
    role: "Mungus",
    profile: "Administrador",
  },
  {
    id: 1,
    name: "Hugh",
    phone: 999999999,
    role: "Mungus",
    profile: "Administrador",
  },
  {
    id: 2,
    name: "Leroy",
    phone: 999999999,
    role: "Mungus",
    profile: "Administrador",
  },
  {
    id: 3,
    name: "Candice",
    phone: 999999999,
    role: "Mungus",
    profile: "Administrador",
  },
  {
    id: 4,
    name: "Micah",
    phone: 999999999,
    role: "Mungus",
    profile: "Administrador",
  },
];
