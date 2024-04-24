/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { Chip, Typography } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { BackgroundAvatar } from "../../../../components/Avatar";
import { TeamMember } from "../../../../hooks/useTeams";
import { useStyles } from "./styles";

type TableMembersProps = {
  listTeamMembers: TeamMember[];
};

export const TableMembers = ({ listTeamMembers }: TableMembersProps) => {
  const { classes } = useStyles();

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
        accessorKey: "office",
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
    enablePagination: false,
    enableTableFooter: false,
    enableBottomToolbar: false,
    enableTopToolbar: false,
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
            backgroundColor: "#FFF",
          },
        '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: "#FAFAFA",
          },
      }),
    },

    // muiTableBodyRowProps: ({ row }) => {
    //   const isEven = Number(row.id) % 2 === 0;
    //   return {
    //     sx: {
    //       backgroundColor: isEven ? "#FFF" : "#FAFAFA",
    //     },
    //   };
    // },
  });

  return (
    <>
      <div className={classes.tableTitleContainer}>
        <Typography className={classes.tableTitle}>
          Colaboradores Selecionados
        </Typography>

        <div className={classes.line} />
      </div>

      {listTeamMembers.length ? (
        <MaterialReactTable table={table} />
      ) : (
        <Typography className={classes.noDataText}>
          Nenhum colaborador adicionado.
        </Typography>
      )}
    </>
  );
};
