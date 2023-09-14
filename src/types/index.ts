/* eslint-disable @typescript-eslint/no-explicit-any */
export type User = {
  user: any;
};

export type Collaborator = {
  id: number;
  name: string;
  type: string;
  status: boolean;
};

export type Client = {
  id: number;
  name: string;
  cnpj: string;
  status: boolean;
};

export type Area = {
  id: number;
  name: string;
  type: string;
  level: number;
  childAreas?: Area[];
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
