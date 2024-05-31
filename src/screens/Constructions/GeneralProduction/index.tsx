import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleFiltersButton,
  MRT_ShowHideColumnsButton,
} from "material-react-table";

import { Box, Grid, Tooltip, Typography, IconButton, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { Download } from "@mui/icons-material";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { data, type ProjectData, medicaoOptions, funcionarioOptions, equipeOptions } from './makeData';
import { columns } from "./columns";

export const GeneralProduction = () => {
  const theme = useTheme();
  const [isSaving, setIsSaving] = useState(false);
  const { id } = useParams();

  const [selectedMedicao, setSelectedMedicao] = useState('');
  const [selectedFuncionario, setSelectedFuncionario] = useState('');
  const [selectedEquipe, setSelectedEquipe] = useState('');

  const baseBackgroundColor = theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF";

  const handleExportRows = (rows: MRT_Row<any>[]) => {
    const doc = new jsPDF({ orientation: 'landscape' });
    const data = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: data,
      styles: { fontSize: 2 },
      margin: { top: 20 },
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save('dados-gerais-sistema.pdf');
  };

  const handleMedicaoChange = (event: any) => {
    setSelectedMedicao(event.target.value);
    setSelectedFuncionario('');
    setSelectedEquipe('');
  };

  const handleFuncionarioChange = (event: any) => {
    setSelectedFuncionario(event.target.value);
    setSelectedEquipe('');
  };

  const handleEquipeChange = (event: any) => {
    setSelectedEquipe(event.target.value);
  };

  const table = useMaterialReactTable({
    columns,
    data: data.length > 0 ? data : data,
    enableColumnFilterModes: true,
    enableEditing: false,
    enableExpanding: false,
    createDisplayMode: 'row',
    state: { isSaving },
    enableGrouping: false,
    renderTopToolbar: ({ table }) => (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <Box
            sx={{
              position: 'relative',
              '&::after': {
                content: '""',
                display: 'block',
                width: '30%',
                height: '3px',
                backgroundColor: '#1976d2',
                position: 'absolute',
                bottom: 0,
              }
            }}
          >
            <Typography variant="h5" component="div" gutterBottom>
              Produção
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <FormControl variant="outlined" sx={{ minWidth: 160 }}>
              <InputLabel id="medicao-label">Medição</InputLabel>
              <Select
                labelId="medicao-label"
                id="medicao"
                label="Medição"
                value={selectedMedicao}
                onChange={handleMedicaoChange}
              >
                {medicaoOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ minWidth: 160 }}>
              <InputLabel id="funcionario-label">Funcionário</InputLabel>
              <Select
                labelId="funcionario-label"
                id="funcionario"
                label="Funcionário"
                value={selectedFuncionario}
                onChange={handleFuncionarioChange}
                disabled={!selectedMedicao}
              >
                {funcionarioOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ minWidth: 160 }}>
              <InputLabel id="equipe-label">Equipe</InputLabel>
              <Select
                labelId="equipe-label"
                id="equipe"
                label="Equipe"
                value={selectedEquipe}
                onChange={handleEquipeChange}
                disabled={!selectedFuncionario}
              >
                {equipeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <MRT_ToggleFiltersButton table={table} sx={{ color: '#0076be', border: '1px solid #0076be', borderRadius: '4px' }} />
            <MRT_ShowHideColumnsButton table={table} sx={{ color: '#0076be', border: '1px solid #0076be', borderRadius: '4px' }} />
            <MRT_ToggleDensePaddingButton table={table} sx={{ color: '#0076be', border: '1px solid #0076be', borderRadius: '4px' }} />
            <MRT_ToggleFullScreenButton table={table} sx={{ color: '#0076be', border: '1px solid #0076be', borderRadius: '4px' }} />
            <Tooltip title="Download da Tabela">
              <IconButton
                onClick={() => handleExportRows(table.getRowModel().rows)}
                sx={{
                  color: '#0076be',
                  border: '1px solid #0076be',
                  borderRadius: '4px',
                  "&:hover": { backgroundColor: 'rgba(0, 118, 190, 0.04)' },
                }}
              >
                <Download />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    ),
    filterFns: {
      customFilterFn: (row, id, filterValue) => {
        return row.getValue(id) === filterValue;
      },
    },
    localization: {
      filterCustomFilterFn: "Custom Filter Fn",
    } as any,
    muiTablePaperProps: { elevation: 0 },
    muiTableBodyProps: {
      sx: (theme) => ({
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td': {
          backgroundColor: "#FAFAFA",
        },
      }),
    },
    mrtTheme: (theme) => ({
      baseBackgroundColor: baseBackgroundColor,
      draggingBorderColor: theme.palette.secondary.main,
    }),
    enablePagination: false,
    enableBottomToolbar: false,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12} paddingRight={10}>
        <MaterialReactTable table={table} />
      </Grid>
    </Grid>
  );
};
