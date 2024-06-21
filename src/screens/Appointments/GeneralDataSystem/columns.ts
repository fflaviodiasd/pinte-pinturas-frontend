/* eslint-disable @typescript-eslint/no-explicit-any */
import { type MRT_ColumnDef } from "material-react-table";
export const columns: MRT_ColumnDef<any>[] = [
  {
    accessorKey: "idLocal",
    header: "ID Local",
  },
  {
    accessorKey: "checklist",
    header: "Checklist",
  },
  {
    accessorKey: "liberated",
    header: "Liberado Digitado",
  },
  {
    accessorKey: "liberatedSystem",
    header: "Liberado Sistema",
  },
  {
    accessorKey: "initiated",
    header: "Iniciado Sistema",
  },
  {
    accessorKey: "initiatedUser",
    header: "Iniciado Usuário",
  },
  {
    accessorKey: "finished",
    header: "Finalizado Digitado",
  },
  {
    accessorKey: "finishedSystem",
    header: "Finalizado Sistema",
  },
  {
    accessorKey: "finishedUser",
    header: "Finalizado Usuário",
  },
  {
    accessorKey: "delivered",
    header: "Entregue Digitado",
  },
  {
    accessorKey: "deliveredSystem",
    header: "Entregue Sistema",
  },
  {
    accessorKey: "deliveredUser",
    header: "Entregue Usuário",
  },
  {
    accessorKey: "name",
    header: "Medição",
  },
  {
    accessorKey: "register",
    header: "Registro de Medição",
  },
  {
    accessorKey: "team",
    header: "Equipe",
  },
  {
    accessorKey: "teamRegister",
    header: "Registro de Equipe",
  },
  {
    accessorKey: "employee",
    header: "Funcionário",
  },
  {
    accessorKey: "discipline",
    header: "Disciplina",
  },
  {
    accessorKey: "package",
    header: "Pacote",
  },
  {
    accessorKey: "scope",
    header: "Escopo",
  },
  {
    accessorKey: "packageService",
    header: "Serviço do Pacote",
  },
  {
    accessorKey: "stepService",
    header: "Etapa do Pacote",
  },
  {
    accessorKey: "qntStepService",
    header: "QTD Etapa/Serviço",
    aggregationFn: "max",
    AggregatedCell: ({ cell }) => `Maior: ${cell.getValue<number>()}`,
  },
  {
    accessorKey: "priceToReceive",
    header: "Preço a Receber da Etapa",
    aggregationFn: "sum",
    AggregatedCell: ({ cell }) => `Somatória: R$ ${cell.getValue<number>()}`,
  },
  {
    accessorKey: "totalUnitStep",
    header: "Total Etapa/Uni da Etapa",
    aggregationFn: "sum",
    AggregatedCell: ({ cell }) => `Somatória: R$ ${cell.getValue<number>()}`,
  },
  {
    accessorKey: "priceToPayStep",
    header: "Preço a Pagar da Etapa",
    aggregationFn: "sum",
    AggregatedCell: ({ cell }) => `Somatória: R$ ${cell.getValue<number>()}`,
  },
  {
    accessorKey: "priceToPayService",
    header: "Total a Pagar pela QTD. Etapa do Serviço",
    aggregationFn: "sum",
    AggregatedCell: ({ cell }) => `Somatória: R$ ${cell.getValue<number>()}`,
  },
];
