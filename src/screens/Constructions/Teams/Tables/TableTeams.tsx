/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useMemo } from "react";
import {
  Box,
  FormControlLabel,
  IconButton,
  Switch,
  Tooltip,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
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
import { ListTeamMembers } from "../ListTeamMembers";

import { useStyles } from "./styles";

type TableTeamsProps = {
  listTeams: Team[];
  handleOpenModal: (selectedTeam: SelectedTeam) => void;
};

type SelectedTeam = {
  id: number;
  name: string;
};

export const TableTeams = ({ listTeams, handleOpenModal }: TableTeamsProps) => {
  const { classes } = useStyles();
  const { addTeam, updateTeamRow } = useContext(TeamsContext);

  const handleCreateTeam: MRT_TableOptions<any>["onCreatingRowSave"] = ({
    values,
    exitCreatingMode,
  }) => {
    const { name } = values;
    addTeam(name);
    exitCreatingMode();
  };

  const handleEditTeam: MRT_TableOptions<any>["onEditingRowSave"] = ({
    exitEditingMode,
    row,
    values,
  }) => {
    updateTeamRow(values.name, row.original.id);
    exitEditingMode();
  };

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        header: "Ativa",
        size: 10,
        accessorFn: (originalRow) => (originalRow.active ? "true" : "false"),
        id: "active",
        filterVariant: "checkbox",
        enableEditing: false,
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
        size: 200,
      },
      {
        accessorKey: "member_count",
        header: "QTD. Colaboradores",
        size: 100,
        enableEditing: false,
      },
      {
        id: "id",
        header: "",
        size: 100,
        columnDefType: "display",
        Cell: ({ cell }) => (
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <DeleteIcon
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
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: listTeams,
    enableExpandAll: true,
    autoResetAll: true,
    enablePagination: false,
    enableColumnFilterModes: true,
    onCreatingRowSave: handleCreateTeam,
    onEditingRowSave: handleEditTeam,
    enableEditing: true,
    editDisplayMode: "row",
    createDisplayMode: "row",
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
            backgroundColor: "#FFF",
          },
        '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: "#FAFAFA",
          },
      }),
    },
    renderTopToolbar: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          padding: 2,
        }}
      >
        <SectionTitle title="Equipes" />
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
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    ),
    renderDetailPanel: ({ row }) => (
      <ListTeamMembers teamId={Number(row.original.id)} />
    ),
  });

  return <MaterialReactTable table={table} />;
};