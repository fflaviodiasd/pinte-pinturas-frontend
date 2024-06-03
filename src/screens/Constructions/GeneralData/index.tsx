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

import { Box, Grid, Tooltip, Typography, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { Download } from "@mui/icons-material";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { IconButton } from "@mui/material";
import { errorMessage } from "../../../components/Messages";
import { data, type GeneralDataInfo } from './makeData';
import { columns } from "./columns";


export const GeneralData = () => {

  const theme = useTheme();

  const [isSaving, setIsSaving] = useState(false);
  const { id } = useParams();


  const baseBackgroundColor = theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF";


    const handleExportRows = (rows: MRT_Row<any>[]) => {
      const doc = new jsPDF({
        orientation: 'landscape' // Configura a orientação horizontal
      });
      
      const data = rows.map((row) => Object.values(row.original));
      const tableHeaders = columns.map((c) => c.header);
    
      autoTable(doc, {
        head: [tableHeaders],
        body: data,
        styles: { fontSize: 2 }, // Ajusta o tamanho da fonte para caber mais dados
        margin: { top: 20 },
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] }, // Cor de fundo do cabeçalho
      });
    
      doc.save('dados-gerais-sistema.pdf');
    };
    
    

    const table = useMaterialReactTable({
      columns,
      data: data.length > 0 ? data : data,
      enableColumnFilterModes: true,
      enableEditing: false,
      enableExpanding: true,
      createDisplayMode: 'row',
      state: { isSaving },
      enableGrouping: true,

      initialState: {
        density: 'compact',
        expanded: true, //expand all groups by default
        pagination: { pageIndex: 0, pageSize: 20 },
      },
  
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
              Dados Gerais do Sistema
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
        {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Typography variant="body1">Agrupado por: </Typography>
          {table.getState().grouping.map((groupedColumn, index) => (
            <Chip
              key={groupedColumn}
              label={table.getColumn(groupedColumn).columnDef.header}
              onDelete={() => table.getColumn(groupedColumn).toggleGrouping()}
            />
          ))}
        </Box> */}
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
