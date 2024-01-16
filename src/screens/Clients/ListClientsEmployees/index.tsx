import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { data, type Person } from "../../../database/clients";

export const ListCLientsEmployees = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nome Completo",
      },
      {
        accessorKey: "phone",
        header: "Celular",
      },
      {
        accessorKey: "role",
        header: "Cargo",
      },
      {
        accessorKey: "profile",
        header: "Perfil",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnFilterModes: false,
    initialState: { showColumnFilters: true },
    filterFns: {
      customFilterFn: (row, id, filterValue) => {
        return row.getValue(id) === filterValue;
      },
    },
    localization: {
      filterCustomFilterFn: "Custom Filter Fn",
    } as any,
  });

  return <MaterialReactTable table={table} />;
};
