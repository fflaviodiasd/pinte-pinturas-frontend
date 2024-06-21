/* eslint-disable @typescript-eslint/no-explicit-any */
import { type MRT_ColumnDef } from "material-react-table";
export const columns: MRT_ColumnDef<any>[] = [
  {
    accessorKey: "checklist",
    header: "Checklist",
  },
  {
    accessorKey: "package",
    header: "Pacote",
  },
  {
    accessorKey: "initialDate",
    header: "Data de Inicio",
  },
  {
    accessorKey: "finalDate",
    header: "Data Final",
  },
  {
    accessorKey: "totalValue",
    header: "ValorTotal",
  },
];
