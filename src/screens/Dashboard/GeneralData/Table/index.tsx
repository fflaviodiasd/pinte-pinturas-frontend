/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useMemo } from "react";
import {
  Box,
  FormControlLabel,
  IconButton,
  Switch,
  Tooltip,
} from "@mui/material";
import {
  DownloadRounded as DownloadIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import {
  MRT_ShowHideColumnsButton,
  MRT_TableOptions,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleFullScreenButton,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { TeamsContext, Team } from "../../../../contexts/TeamsContext";

import { SectionTitle } from "../../../../components/SectionTitle";
import { useStyles } from "./styles";

export const Table = () => {
  const { classes } = useStyles();
  //   const { addTeam, updateTeamRow } = useContext(TeamsContext);

  const handleCreateTeam: MRT_TableOptions<any>["onCreatingRowSave"] = ({
    values,
    exitCreatingMode,
  }) => {
    const { name } = values;
    // addTeam(name);
    exitCreatingMode();
  };

  const handleEditTeam: MRT_TableOptions<any>["onEditingRowSave"] = ({
    exitEditingMode,
    row,
    values,
  }) => {
    // updateTeamRow(values.name, row.original.id);
    exitEditingMode();
  };

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "construction_name",
        header: "Obra",
        size: 200,
      },
      { accessorKey: "id", header: "ID", size: 200 },
      { accessorKey: "level_4", header: "Nível 4", size: 200 },
      { accessorKey: "level_3", header: "Nível 3", size: 200 },
      { accessorKey: "level_2", header: "Nível 2", size: 200 },
      { accessorKey: "level_1", header: "Nível 1", size: 200 },
      { accessorKey: "checklist", header: "Checklist", size: 200 },
      { accessorKey: "package", header: "Pacote", size: 200 },
      { accessorKey: "measurement", header: "Medição", size: 200 },
      { accessorKey: "team", header: "Equipe", size: 200 },
      {
        accessorKey: "released_digitized",
        header: "Liberado Digitado",
        size: 250,
      },
      { accessorKey: "released_system", header: "Liberado Sistema", size: 250 },
      { accessorKey: "released_user", header: "Liberado Usuário", size: 250 },
      { accessorKey: "started", header: "Iniciado", size: 250 },
      {
        accessorKey: "started_digitized",
        header: "Iniciado Digitado",
        size: 250,
      },
      {
        accessorKey: "finished_digitized",
        header: "Finalizado Digitado",
        size: 250,
      },
      {
        accessorKey: "delivered_digitized",
        header: "Entregue Digitado",
        size: 250,
      },
      { accessorKey: "link", header: "LINK", size: 250 },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: data,
    enablePagination: false,
    enableBottomToolbar: false,
    initialState: { showColumnFilters: true },
    muiFilterTextFieldProps: (props) => {
      return {
        placeholder: `Filtrar por ${props.column.columnDef.header}`,
      };
    },
    // muiExpandButtonProps: ({ row, table }) => ({
    //   onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
    //   sx: {
    //     transform: row.getIsExpanded() ? "rotate(180deg)" : "rotate(-90deg)",
    //     transition: "transform 0.2s",
    //   },
    // }),
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
    muiTableProps: {
      style: {
        display: "flex",
        flexDirection: "column",
      },
    },
    renderTopToolbar: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "1rem",
          backgroundColor: "#FFF",
          padding: 1,
        }}
      >
        <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <MRT_ToggleFiltersButton
            table={table}
            className={classes.toolbarButton}
          />
          <MRT_ShowHideColumnsButton
            table={table}
            className={classes.toolbarButton}
          />
          <MRT_ToggleDensePaddingButton
            table={table}
            className={classes.toolbarButton}
          />
          <MRT_ToggleFullScreenButton
            table={table}
            className={classes.toolbarButton}
          />
          <Tooltip title="Adicionar Pacote">
            <IconButton
              onClick={() => {
                table.setCreatingRow(true);
              }}
              className={classes.toolbarButton}
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

const data = [
  {
    construction_name: "Edifício Central",
    id: 1,
    level_4: "Subsolo",
    level_3: "Garagem",
    level_2: "Térreo",
    level_1: "Recepção",
    checklist: "Fundação",
    package: "Estrutura",
    measurement: "1000m²",
    team: "Equipe A",
    released_digitized: "2024-01-10",
    released_system: "2024-01-12",
    released_user: "usuario1",
    started: "2024-01-15",
    started_digitized: "2024-01-16",
    finished_digitized: "2024-03-20",
    delivered_digitized: "2024-03-25",
    link: "http://example.com/edificio-central",
  },
  {
    construction_name: "Prédio Comercial",
    id: 2,
    level_4: "Cobertura",
    level_3: "Sala de Reuniões",
    level_2: "Escritórios",
    level_1: "Lobby",
    checklist: "Estrutura",
    package: "Acabamento",
    measurement: "800m²",
    team: "Equipe B",
    released_digitized: "2024-02-05",
    released_system: "2024-02-07",
    released_user: "usuario2",
    started: "2024-02-10",
    started_digitized: "2024-02-11",
    finished_digitized: "2024-04-15",
    delivered_digitized: "2024-04-20",
    link: "http://example.com/predio-comercial",
  },
  {
    construction_name: "Residencial Alfa",
    id: 3,
    level_4: "Cobertura",
    level_3: "Andar 10",
    level_2: "Andar 5",
    level_1: "Andar 1",
    checklist: "Eletricidade",
    package: "Instalações",
    measurement: "1200m²",
    team: "Equipe C",
    released_digitized: "2024-03-01",
    released_system: "2024-03-03",
    released_user: "usuario3",
    started: "2024-03-05",
    started_digitized: "2024-03-06",
    finished_digitized: "2024-05-10",
    delivered_digitized: "2024-05-15",
    link: "http://example.com/residencial-alfa",
  },
  {
    construction_name: "Hospital Vida",
    id: 4,
    level_4: "UTI",
    level_3: "Bloco Cirúrgico",
    level_2: "Enfermaria",
    level_1: "Recepção",
    checklist: "Estrutura",
    package: "Hospitalar",
    measurement: "1500m²",
    team: "Equipe D",
    released_digitized: "2024-03-15",
    released_system: "2024-03-17",
    released_user: "usuario4",
    started: "2024-03-20",
    started_digitized: "2024-03-21",
    finished_digitized: "2024-05-25",
    delivered_digitized: "2024-05-30",
    link: "http://example.com/hospital-vida",
  },
  {
    construction_name: "Shopping Nova Era",
    id: 5,
    level_4: "Praça de Alimentação",
    level_3: "Cinema",
    level_2: "Lojas",
    level_1: "Estacionamento",
    checklist: "Estrutura",
    package: "Comercial",
    measurement: "2000m²",
    team: "Equipe E",
    released_digitized: "2024-04-01",
    released_system: "2024-04-03",
    released_user: "usuario5",
    started: "2024-04-05",
    started_digitized: "2024-04-06",
    finished_digitized: "2024-06-10",
    delivered_digitized: "2024-06-15",
    link: "http://example.com/shopping-nova-era",
  },
  {
    construction_name: "Escola Futuro",
    id: 6,
    level_4: "Biblioteca",
    level_3: "Laboratórios",
    level_2: "Salas de Aula",
    level_1: "Administração",
    checklist: "Estrutura",
    package: "Educacional",
    measurement: "1800m²",
    team: "Equipe F",
    released_digitized: "2024-05-01",
    released_system: "2024-05-03",
    released_user: "usuario6",
    started: "2024-05-05",
    started_digitized: "2024-05-06",
    finished_digitized: "2024-07-10",
    delivered_digitized: "2024-07-15",
    link: "http://example.com/escola-futuro",
  },
  {
    construction_name: "Hotel Luxor",
    id: 7,
    level_4: "Suítes Presidenciais",
    level_3: "Suítes Luxo",
    level_2: "Quartos Standard",
    level_1: "Recepção",
    checklist: "Estrutura",
    package: "Hospedagem",
    measurement: "2500m²",
    team: "Equipe G",
    released_digitized: "2024-05-15",
    released_system: "2024-05-17",
    released_user: "usuario7",
    started: "2024-05-20",
    started_digitized: "2024-05-21",
    finished_digitized: "2024-08-25",
    delivered_digitized: "2024-08-30",
    link: "http://example.com/hotel-luxor",
  },
  {
    construction_name: "Centro Esportivo",
    id: 8,
    level_4: "Quadras",
    level_3: "Piscina",
    level_2: "Ginásio",
    level_1: "Vestiários",
    checklist: "Estrutura",
    package: "Esportivo",
    measurement: "2200m²",
    team: "Equipe H",
    released_digitized: "2024-06-01",
    released_system: "2024-06-03",
    released_user: "usuario8",
    started: "2024-06-05",
    started_digitized: "2024-06-06",
    finished_digitized: "2024-09-10",
    delivered_digitized: "2024-09-15",
    link: "http://example.com/centro-esportivo",
  },
  {
    construction_name: "Fábrica Tech",
    id: 9,
    level_4: "Produção",
    level_3: "Montagem",
    level_2: "Armazenamento",
    level_1: "Administração",
    checklist: "Estrutura",
    package: "Industrial",
    measurement: "3000m²",
    team: "Equipe I",
    released_digitized: "2024-06-15",
    released_system: "2024-06-17",
    released_user: "usuario9",
    started: "2024-06-20",
    started_digitized: "2024-06-21",
    finished_digitized: "2024-09-25",
    delivered_digitized: "2024-09-30",
    link: "http://example.com/fabrica-tech",
  },
  {
    construction_name: "Parque Verde",
    id: 10,
    level_4: "Área de Piquenique",
    level_3: "Playground",
    level_2: "Trilhas",
    level_1: "Estacionamento",
    checklist: "Paisagismo",
    package: "Recreativo",
    measurement: "4000m²",
    team: "Equipe J",
    released_digitized: "2024-07-01",
    released_system: "2024-07-03",
    released_user: "usuario10",
    started: "2024-07-05",
    started_digitized: "2024-07-06",
    finished_digitized: "2024-10-10",
    delivered_digitized: "2024-10-15",
    link: "http://example.com/parque-verde",
  },
];
