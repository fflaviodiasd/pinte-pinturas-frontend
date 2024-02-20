import { useEffect, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useConstructions } from "../../../hooks/useConstructions";
import { Chip, FormControlLabel, Switch } from "@mui/material";

export const ConstructionsTeams = () => {
  const { listConstructionsTeams, getAllConstructionsTeams } =
    useConstructions();

  useEffect(() => {
    getAllConstructionsTeams();
  }, []);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
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
    enableExpanding: true,
  });

  return (
    <div>
      <h1 style={{ margin: "1rem" }}>Equipes</h1>
      <MaterialReactTable table={table} />
    </div>
  );
};
