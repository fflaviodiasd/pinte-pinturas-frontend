// src/components/makeData.ts

export type GeneralDataInfo = {
  idLocal: string;
  torre: string;
  pavimento: string;
  micro: string;
  checklist: string;
  liberated: string;
  liberatedSystem: string;
  initiated: string;
  initiatedUser: string;
  finished: string;
  finishedSystem: string;
  finishedUser: string;
  delivered: string;
  deliveredSystem: string;
  deliveredUser: string;
  name: string;
  register: string;
  team: string;
  teamRegister: string;
  employee: string;
  discipline: string;
  package: string;
  scope: string;
  packageService: string;
  stepService: string;
  qntStepService: number;
  priceToReceive: string;
  totalUnitStep: string;
  priceToPayStep: string;
  priceToPayService: string;
  subRows?: GeneralDataInfo[];
};

export const data: GeneralDataInfo[] = [
  {
    idLocal: "L065",
    torre: "",
    pavimento: "",
    micro: "",
    checklist: "",
    liberated: "",
    liberatedSystem: "",
    initiated: "",
    initiatedUser: "",
    finished: "",
    finishedSystem: "",
    finishedUser: "",
    delivered: "",
    deliveredSystem: "",
    deliveredUser: "",
    name: "",
    register: "",
    team: "",
    teamRegister: "",
    employee: "",
    discipline: "",
    package: "",
    scope: "",
    packageService: "",
    stepService: "",
    qntStepService: 12,
    priceToReceive: "R$ 300,34",
    totalUnitStep: "R$ 3.600,00",
    priceToPayStep: "R$ 100,00",
    priceToPayService: "R$ 2.300,34",
    subRows: [
      {
        idLocal: "",
        torre: "T02",
        pavimento: "PAV01",
        micro: "C01",
        checklist: "<23> - <Primeira demão de pintura>",
        liberated: "20/04/2024",
        liberatedSystem: "20/04/2024",
        initiated: "20/04/2024",
        initiatedUser: "João da Silva",
        finished: "20/04/2024",
        finishedSystem: "20/04/2024",
        finishedUser: "20/04/2024",
        delivered: "20/04/2024",
        deliveredSystem: "20/04/2024",
        deliveredUser: "20/04/2024",
        name: "M2",
        register: "Carlos da Silva",
        team: "EQ03",
        teamRegister: "Carlos da Silva",
        employee: "Emanuel do Campos",
        discipline: "Impermeabilização",
        package: "Banheiros",
        scope: "Parede",
        packageService: "32 - Nome de Serviço",
        stepService: "Nome da Etapa",
        qntStepService: 12,
        priceToReceive: "R$ 300,34",
        totalUnitStep: "R$ 3.600,00",
        priceToPayStep: "R$ 100,00",
        priceToPayService: "R$ 2.300,34",
      },
      {
        idLocal: "",
        torre: "T02",
        pavimento: "PAV01",
        micro: "C01",
        checklist: "<23> - <Primeira demão de pintura>",
        liberated: "20/04/2024",
        liberatedSystem: "20/04/2024",
        initiated: "20/04/2024",
        initiatedUser: "João da Silva",
        finished: "20/04/2024",
        finishedSystem: "20/04/2024",
        finishedUser: "20/04/2024",
        delivered: "20/04/2024",
        deliveredSystem: "20/04/2024",
        deliveredUser: "20/04/2024",
        name: "M2",
        register: "Carlos da Silva",
        team: "EQ03",
        teamRegister: "Carlos da Silva",
        employee: "Emanuel do Campos",
        discipline: "Impermeabilização",
        package: "Banheiros",
        scope: "Parede",
        packageService: "32 - Nome de Serviço",
        stepService: "Nome da Etapa",
        qntStepService: 12,
        priceToReceive: "R$ 300,34",
        totalUnitStep: "R$ 3.600,00",
        priceToPayStep: "R$ 100,00",
        priceToPayService: "R$ 2.300,34",
      },
    ]
  }
];