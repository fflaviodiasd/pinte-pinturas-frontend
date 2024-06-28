/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_TableOptions,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleFiltersButton,
  MRT_ShowHideColumnsButton,
} from "material-react-table";
import {
  Box,
  Grid,
  Tooltip,
  useTheme,
  Typography,
  Checkbox,
  TextField,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useStyles } from "./styles";
import { useParams, useNavigate } from "react-router-dom";
import {
  Add,
  CalendarToday,
  SquareFoot,
  Groups,
  Info,
} from "@mui/icons-material";

import { IconButton } from "@mui/material";

interface DropdownOption {
  id: any;
  name: any;
  label: string;
  value: any;
}

const mockTableData = [
  {
    id: 1,
    service_step: "Serviço 1",
    total_execution: "48 m²",
    median: "13",
    price: "R$ 500,23",
    total_price: "R$ 500,23",
    subRows: [
      {
        id: 11,
        service_step: "Etapa 1",
        total_execution: "12 m²",
        median: "3 m²/dia",
        price: "R$ 100,00",
        total_price: "R$ 100,00",
      },
      {
        id: 12,
        service_step: "Etapa 2",
        total_execution: "10 m²",
        median: "3 m²/dia",
        price: "R$ 100,00",
        total_price: "R$ 100,00",
      },
      {
        id: 13,
        service_step: "Etapa 3",
        total_execution: "20 m²",
        median: "5 m²/dia",
        price: "R$ 200,00",
        total_price: "R$ 200,00",
      },
      {
        id: 14,
        service_step: "Etapa 4",
        total_execution: "6 m²",
        median: "1 m²/dia",
        price: "R$ 100,23",
        total_price: "R$ 100,23",
      },
    ],
  },
  {
    id: 2,
    service_step: "Serviço 2",
    total_execution: "238L",
    median: "33",
    price: "R$ 5250,23",
    total_price: "R$ 5250,23",
    subRows: [
      {
        id: 21,
        service_step: "Etapa 1",
        total_execution: "100L",
        median: "10L/dia",
        price: "R$ 3000,00",
        total_price: "R$ 3000,00",
      },
      {
        id: 22,
        service_step: "Etapa 2",
        total_execution: "138L",
        median: "23L/dia",
        price: "R$ 2250,23",
        total_price: "R$ 2250,23",
      },
    ],
  },
];

const mockMeasurements = [
  { id: 1, name: "M01" },
  { id: 2, name: "M02" },
  { id: 3, name: "M03" },
];

const mockTeams = [
  { id: 1, name: "Allef Rodrigo" },
  { id: 2, name: "Andre Jacome" },
  { id: 3, name: "Alice maria" },
  { id: 4, name: "Roberto Miranda" },
  { id: 5, name: "Michael Davis" },
  { id: 6, name: "Emily Garcia" },
];

export const Details = () => {
  const theme = useTheme();
  const { classes } = useStyles();
  const [disciplineOptions, setDisciplineOptions] = useState<DropdownOption[]>(
    []
  );
  const [isSaving, setIsSaving] = useState(false);
  const [filteredMeasurements, setFilteredMeasurements] =
    useState<any[]>(mockTableData);
  const [measurementAnchorEl, setMeasurementAnchorEl] =
    useState<null | HTMLElement>(null);
  const [selectedMeasurements, setSelectedMeasurements] = useState<any[]>([]);
  const [teamAnchorEl, setTeamAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTeams, setSelectedTeams] = useState<any[]>([]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "service_step",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Serviço, Etapa",
      },
      {
        accessorKey: "total_execution",
        header: "Qtd. Executada",
      },
      {
        accessorKey: "median",
        header: "Qtd. Média",
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "price",
        header: "Valor Produção",
      },
      {
        accessorKey: "total_price",
        header: "Valor Total",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: filteredMeasurements,
    enableColumnFilterModes: true,
    createDisplayMode: "row",
    state: {
      isSaving,
    },
    initialState: { showColumnFilters: true },
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
        <Box
          sx={{
            position: "relative",
            "&::after": {
              content: '""',
              display: "block",
              width: "30%",
              height: "3px",
              backgroundColor: "#1976d2",
              position: "absolute",
              bottom: 0,
            },
          }}
        >
          <Typography variant="h5" component="div" gutterBottom>
            Detalhes
          </Typography>
        </Box>
        {/* <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Tooltip title="Periodo">
            <IconButton
              onClick={() => {
                table.setCreatingRow(true);
                console.log("options:", disciplineOptions);
              }}
              sx={{
                color: "#0076be",
                border: "1px solid #0076be",
                borderRadius: "40px",
                "&:hover": {
                  backgroundColor: "rgba(0, 118, 190, 0.04)",
                },
              }}
            >
              <CalendarToday />
              <Typography
                variant="body2"
                component="div"
                sx={{ marginLeft: 1 }}
              >
                Periodo
              </Typography>
            </IconButton>
          </Tooltip>
          <Tooltip title="Medição">
            <IconButton
              onClick={(event) => setMeasurementAnchorEl(event.currentTarget)}
              sx={{
                color: "#0076be",
                border: "1px solid #0076be",
                borderRadius: "40px",
                "&:hover": {
                  backgroundColor: "rgba(0, 118, 190, 0.04)",
                },
              }}
            >
              <SquareFoot />
              <Typography
                variant="body2"
                component="div"
                sx={{ marginLeft: 1 }}
              >
                Medição
              </Typography>
            </IconButton>
          </Tooltip>
          <Tooltip title="Equipe">
            <IconButton
              onClick={(event) => setTeamAnchorEl(event.currentTarget)}
              sx={{
                color: "#0076be",
                border: "1px solid #0076be",
                borderRadius: "40px",
                "&:hover": {
                  backgroundColor: "rgba(0, 118, 190, 0.04)",
                },
              }}
            >
              <Groups />
              <Typography
                variant="body2"
                component="div"
                sx={{ marginLeft: 1 }}
              >
                Equipe
              </Typography>
            </IconButton>
          </Tooltip>
          <MRT_ToggleFiltersButton
            table={table}
            sx={{
              color: "#0076be",
              border: "1px solid #0076be",
              borderRadius: "4px",
            }}
          />
        </Box> */}
      </Box>
    ),
    renderDetailPanel: ({ row }) => (
      <Box sx={{ padding: "1rem" }}>
        <Typography variant="body2">
          Detalhes adicionais para {row.original.service_step}
        </Typography>
      </Box>
    ),
    enablePagination: false,
    enableBottomToolbar: false,
  });

  const handleSelectMeasurement = (measurementId: number) => {
    setSelectedMeasurements((prev) =>
      prev.includes(measurementId)
        ? prev.filter((id) => id !== measurementId)
        : [...prev, measurementId]
    );
  };

  const handleSelectAllMeasurements = () => {
    setSelectedMeasurements(
      selectedMeasurements.length === mockMeasurements.length
        ? []
        : mockMeasurements.map((m) => m.id)
    );
  };

  const handleSelectTeam = (teamId: number) => {
    setSelectedTeams((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId]
    );
  };

  const handleSelectAllTeams = () => {
    setSelectedTeams(
      selectedTeams.length === mockTeams.length
        ? []
        : mockTeams.map((t) => t.id)
    );
  };

  return (
    <Grid item xs={12} lg={12} className={classes.container}>
      <MaterialReactTable table={table} />

      <Menu
        anchorEl={measurementAnchorEl}
        open={Boolean(measurementAnchorEl)}
        onClose={() => setMeasurementAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MenuItem>
              <Checkbox
                checked={
                  selectedMeasurements.length === mockMeasurements.length
                }
                onChange={handleSelectAllMeasurements}
                inputProps={{ "aria-label": "select all measurements" }}
              />
              <Typography variant="h6">Medições</Typography>
            </MenuItem>
          </Box>
          <TextField
            variant="outlined"
            placeholder="Pesquisar"
            size="small"
            sx={{ marginLeft: 2, marginBottom: 2 }}
          />
          {mockMeasurements.map((measurement) => (
            <MenuItem key={measurement.id}>
              <Checkbox
                checked={selectedMeasurements.includes(measurement.id)}
                onChange={() => handleSelectMeasurement(measurement.id)}
                inputProps={{
                  "aria-labelledby": `checkbox-list-label-${measurement.id}`,
                }}
              />
              <ListItemText
                id={`checkbox-list-label-${measurement.id}`}
                primary={measurement.name}
              />
            </MenuItem>
          ))}
        </Box>
      </Menu>

      <Menu
        anchorEl={teamAnchorEl}
        open={Boolean(teamAnchorEl)}
        onClose={() => setTeamAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={selectedTeams.length === mockTeams.length}
              onChange={handleSelectAllTeams}
              inputProps={{ "aria-label": "select all teams" }}
            />
            <Typography variant="h6">Equipe</Typography>
            <MenuItem></MenuItem>
          </Box>
          <TextField
            variant="outlined"
            placeholder="Pesquisar"
            size="small"
            sx={{ marginLeft: 2, marginBottom: 2 }}
          />
          {mockTeams.map((team) => (
            <MenuItem key={team.id}>
              <Checkbox
                checked={selectedTeams.includes(team.id)}
                onChange={() => handleSelectTeam(team.id)}
                inputProps={{
                  "aria-labelledby": `checkbox-list-label-${team.id}`,
                }}
              />
              <ListItemText
                id={`checkbox-list-label-${team.id}`}
                primary={team.name}
              />
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Grid>
  );
};
