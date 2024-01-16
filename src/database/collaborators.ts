import { Collaborator } from "../types";

export const mockedListCollaborators: Collaborator[] = [
  { id: 1, name: "João", type: "Engenheiro", status: true },
  { id: 2, name: "Joaquim", type: "Engenheiro", status: true },
  { id: 3, name: "Lucas", type: "Engenheiro", status: true },
  { id: 4, name: "Alberto", type: "Engenheiro", status: true },
  { id: 5, name: "Renato", type: "Engenheiro", status: true },
  { id: 6, name: "Marcos", type: "Operário", status: true },
  { id: 7, name: "Bruno", type: "Operário", status: true },
  { id: 8, name: "Rodrigo", type: "Operário", status: true },
  { id: 9, name: "André", type: "Operário", status: true },
];

// Mocked List Collaborators History and Constructions

export type Person = {
  id: number;
  name: string;
  phone: number;
  role: string;
  profile: string;
  constructionName?: string;
  responsible?: string;
  dismissalDate?: string;
  salary?: number;
};

export const data: Person[] = [
  {
    id: 1,
    name: "Hugh",
    phone: 999999999,
    role: "Mungus",
    profile: "Administrador",
    constructionName: "Obra 1234",
    responsible: "John Doe",
    dismissalDate: "01/01/2024",
    salary: 1000,
  },
  {
    id: 2,
    name: "Leroy",
    phone: 999999999,
    role: "Mungus",
    profile: "Administrador",
    constructionName: "Obra 1234",
    responsible: "John Doe",
    dismissalDate: "01/01/2024",
    salary: 1000,
  },
  {
    id: 3,
    name: "Candice",
    phone: 999999999,
    role: "Mungus",
    profile: "Administrador",
    constructionName: "Obra 1234",
    responsible: "John Doe",
    dismissalDate: "01/01/2024",
    salary: 1000,
  },
  {
    id: 4,
    name: "Micah",
    phone: 999999999,
    role: "Mungus",
    profile: "Administrador",
    constructionName: "Obra 1234",
    responsible: "John Doe",
    dismissalDate: "01/01/2024",
    salary: 1000,
  },
  {
    id: 1,
    name: "Hugh",
    phone: 999999999,
    role: "Mungus",
    profile: "Administrador",
    constructionName: "Obra 1234",
    responsible: "John Doe",
    dismissalDate: "01/01/2024",
    salary: 1000,
  },
  {
    id: 2,
    name: "Leroy",
    phone: 999999999,
    role: "Mungus",
    profile: "Administrador",
    constructionName: "Obra 1234",
    responsible: "John Doe",
    dismissalDate: "01/01/2024",
    salary: 1000,
  },
  {
    id: 3,
    name: "Candice",
    phone: 999999999,
    role: "Mungus",
    profile: "Administrador",
    constructionName: "Obra 1234",
    responsible: "John Doe",
    dismissalDate: "01/01/2024",
    salary: 1000,
  },
  {
    id: 4,
    name: "Micah",
    phone: 999999999,
    role: "Mungus",
    profile: "Administrador",
    constructionName: "Obra 1234",
    responsible: "John Doe",
    dismissalDate: "01/01/2024",
    salary: 1000,
  },
];
