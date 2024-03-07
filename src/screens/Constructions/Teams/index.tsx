import { useEffect, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { FormControlLabel, Grid, Switch } from "@mui/material";
import { useConstructions } from "../../../hooks/useConstructions";
import { ListTeamMembers } from "./ListTeamMembers";
import { Navbar } from "../../../components/Navbar";
import { TitleScreen } from "../../../components/TitleScreen";
import Breadcrumb from "../../../components/Breadcrumb";

export const ConstructionsTeams = () => {
  const { listConstructionsTeams, getAllConstructionsTeams } =
    useConstructions();

  useEffect(() => {
    getAllConstructionsTeams();
  }, []);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        header: "Status",
        accessorFn: (originalRow) => (originalRow.active ? "true" : "false"),
        id: "active",
        filterVariant: "checkbox",
        Cell: ({ cell }) => {
          const isActive = cell.getValue() === "true";
          const status = isActive ? "Ativo" : "Inativo";
          return (
            <FormControlLabel
              control={<Switch checked={isActive} />}
              label={status}
            />
          );
        },
      },
      {
        accessorKey: "teams",
        header: "Equipes",
      },

      {
        accessorKey: "collaborators",
        header: "QTD. Colaboradores",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: listConstructionsTeams,
    enableExpandAll: false,
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
      sx: {
        transform: row.getIsExpanded() ? "rotate(180deg)" : "rotate(-90deg)",
        transition: "transform 0.2s",
      },
    }),
    renderDetailPanel: ({ row }) =>
      row.original.teams ? <ListTeamMembers teamId={row.original.id} /> : null,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <MaterialReactTable table={table} />
      </Grid>
    </Grid>
  );
};
