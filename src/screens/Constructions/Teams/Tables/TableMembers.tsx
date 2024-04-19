/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { Chip } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { BackgroundAvatar } from "../../../../components/Avatar";
import { TeamMember } from "../../../../hooks/useTeams";

type TableMembersProps = {
  listTeamMembers: TeamMember[];
};

export const TableMembers = ({ listTeamMembers }: TableMembersProps) => {
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        header: "Status",
        accessorFn: (originalRow) => (originalRow.active ? "true" : "false"),
        id: "active",
        filterVariant: "checkbox",
        Cell: ({ cell }) => {
          const status = cell.getValue() === "true" ? "Ativo" : "Inativo";
          const chipColor = status === "Ativo" ? "success" : "error";
          return <Chip label={status} color={chipColor} />;
        },
        size: 170,
      },

      {
        accessorKey: "name",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Nome",
        Cell: ({ cell }) => (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",

              alignItems: "center",
            }}
          >
            {cell.row.original.name && (
              <BackgroundAvatar avatarName={cell.row.original.name} />
            )}
            {cell.row.original.name}
          </div>
        ),
      },
      {
        accessorKey: "role",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Cargo",
      },
      {
        accessorKey: "profile",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Perfil",
      },
      {
        accessorKey: "cell_phone",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Celular",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: listTeamMembers,
    enableColumnFilterModes: true,
    initialState: { showColumnFilters: true },
    filterFns: {
      customFilterFn: (row, id, filterValue) => {
        return row.getValue(id) === filterValue;
      },
    },
    localization: {
      filterCustomFilterFn: "Custom Filter Fn",
    } as any,
    muiTablePaperProps: {
      elevation: 0,
    },
    muiTableBodyProps: {
      sx: () => ({
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: "#FAFAFA",
          },
      }),
    },
    mrtTheme: (theme) => ({
      baseBackgroundColor: "#FFFFFF",
      draggingBorderColor: theme.palette.secondary.main,
    }),
    enablePagination: false,
    enableBottomToolbar: false,
  });

  return <MaterialReactTable table={table} />;
};
