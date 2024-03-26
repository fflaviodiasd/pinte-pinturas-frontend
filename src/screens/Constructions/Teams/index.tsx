import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import {
  Box,
  FormControlLabel,
  Grid,
  Switch,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useConstructions } from "../../../hooks/useConstructions";
import { ListTeamMembers } from "./ListTeamMembers";
import { Add, Delete } from "@mui/icons-material";
import { Button } from "../../../components/Button";
import { FormCreateTeam } from "./FormCreateTeam";
import { useStyles } from "./styles";
import { ModalDisable } from "../../../components/Table/ModalDisable";

export const ConstructionsTeams = () => {
  const {
    listConstructionsTeams,
    getAllConstructionsTeams,
    disableConstructionTeam,
  } = useConstructions();
  const [showCreateTeamRow, setShowCreateTeamRow] = useState(false);

  const [selectedTeamId, setselectedTeamId] = useState<number>(0);
  const [selectedTeamName, setselectedTeamName] = useState<string>("");

  const [modalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleDisable = () => {
    disableConstructionTeam(selectedTeamId);
    setIsModalOpen(false);
  };

  const { classes } = useStyles();

  useEffect(() => {
    getAllConstructionsTeams();
  }, []);

  const handleCreateTeamClick = () => {
    setShowCreateTeamRow(true);
  };

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        id: "edit",
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
                setselectedTeamId(cell.row.original.id!);
                setselectedTeamName(cell.row.original.teams);

                setIsModalOpen(true);
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
    muiTablePaperProps: {
      elevation: 0,
    },
    muiTableBodyProps: {
      sx: (theme) => ({
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: "#FAFAFA",
          },
      }),
    },

    renderDetailPanel: ({ row }) =>
      row.original.teams ? <ListTeamMembers teamId={row.original.id} /> : null,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        {showCreateTeamRow && (
          <div style={{ padding: "1.5rem" }}>
            <FormCreateTeam />
          </div>
        )}

        <Typography className={classes.teamsTitle}>
          <span className={classes.teamsBorder}>Equip</span>
          es
        </Typography>

        <Box
          sx={{ display: "flex", justifyContent: "right", marginRight: "1rem" }}
        >
          <Button
            label={
              <Tooltip title="Adicionar Equipe">
                <Add />
              </Tooltip>
            }
            color="secondary"
            onClick={handleCreateTeamClick}
          />
        </Box>

        <MaterialReactTable table={table} />
        <ModalDisable
          modalOpen={modalOpen}
          handleClose={handleClose}
          handleDisable={handleDisable}
          selectedDisableName={selectedTeamName}
        />
      </Grid>
    </Grid>
  );
};
