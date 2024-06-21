export type ProjectData = {
  checklist: string;
  package: string;
  initialDate: string;
  finalDate: string;
  totalValue: string;
};

export const data: ProjectData[] = [
  {
    checklist: "<23> - <Primeira demão de pintura>",
    package: "Banheiros",
    initialDate: "01/01/2024",
    finalDate: "15/01/2024",
    totalValue: "R$ 15.000,00",
  },
  {
    checklist: "<23> - <Primeira demão de pintura>",
    package: "Banheiros",
    initialDate: "01/02/2024",
    finalDate: "20/02/2024",
    totalValue: "R$ 25.000,00",
  },
  {
    checklist: "<23> - <Primeira demão de pintura>",
    package: "Banheiros",
    initialDate: "01/03/2024",
    finalDate: "25/03/2024",
    totalValue: "R$ 35.000,00",
  },
];

export const medicaoOptions = [
  { value: 'M1', label: 'Medição 1' },
  { value: 'M2', label: 'Medição 2' },
  { value: 'M3', label: 'Medição 3' },
];

export const funcionarioOptions = [
  { value: 'F1', label: 'João da Silva' },
  { value: 'F2', label: 'Maria Oliveira' },
  { value: 'F3', label: 'Pedro Souza' },
];

export const equipeOptions = [
  { value: 'E1', label: 'Equipe 1' },
  { value: 'E2', label: 'Equipe 2' },
  { value: 'E3', label: 'Equipe 3' },
];