/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { Team } from "../../../../hooks/useTeams";

import { ListTeamMembers } from "../ListTeamMembers";

type TableTeamsProps = {
  listTeams: Team[];
  handleOpenModal: (selectedTeam: SelectedTeam) => void;
};

type SelectedTeam = {
  id: number;
  name: string;
};

export const TableTeams = ({ listTeams, handleOpenModal }: TableTeamsProps) => {
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        header: "",
        columnDefType: "display",
        Cell: ({ cell }) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Delete
              sx={{ cursor: "pointer", color: "#C5C7C8" }}
              onClick={() => {
                const selectedTeam = {
                  id: cell.row.original.id,
                  name: cell.row.original.name,
                };

                handleOpenModal(selectedTeam);
              }}
            />
          </div>
        ),
      },
      {
        header: "Ativa",
        accessorFn: (originalRow) => (originalRow.active ? "true" : "false"),
        id: "active",
        filterVariant: "checkbox",
        Cell: ({ cell }) => {
          const isActive = cell.getValue() === "true";
          const status = isActive ? "Ativa" : "Inativa";
          return (
            <FormControlLabel
              control={<Switch checked={isActive} />}
              label={status}
            />
          );
        },
      },
      {
        accessorKey: "name",
        header: "Equipes",
      },
      {
        accessorKey: "member_count",
        header: "QTD. Colaboradores",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: listTeams,
    enableExpandAll: true,
    autoResetAll: true,
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
      sx: {
        transform: row.getIsExpanded() ? "rotate(180deg)" : "rotate(-90deg)",
        transition: "transform 0.2s",
      },
    }),
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

    renderDetailPanel: ({ row }) => (
      <ListTeamMembers teamId={Number(row.original.id)} />
    ),
  });

  return <MaterialReactTable table={table} />;
};
