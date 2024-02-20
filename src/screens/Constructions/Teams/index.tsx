import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

export type Person = {
  active: string;
  teams: string;
  collaborators: string;
  subRows?: Person[];
};

export const data = [
  {
    active: "Dylan",
    teams: "Murray",
    collaborators: "261 Erdman Ford",
    subRows: [
      {
        active: "Ervin",
        teams: "Reinger",
        collaborators: "566 Brakus Inlet",
      },
    ],
  },
  {
    active: "Raquel",
    teams: "Kohler",
    collaborators: "769 Dominic Grove",
    subRows: [
      {
        active: "Branson",
        teams: "Frami",
        collaborators: "32188 Larkin Turnpike",
      },
    ],
  },
];

export const ConstructionsTeams = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "active",
        header: "Ativa",
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
    data,
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
