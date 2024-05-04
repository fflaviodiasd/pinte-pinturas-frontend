import React, { useMemo } from 'react';
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
import { Box, Typography } from "@mui/material";
const HistoryTable = ({ historyData }:any) => {
  // console.log('historyData>:', historyData)
  const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Nome Completo',
      enableEditing: false,
    },
    {
      accessorKey: 'inclusion_dt',
      header: 'Data de Inclusão',
      enableEditing: false,
    },
    {
      accessorKey: 'exit_dt',
      header: 'Data de Saída',
      enableEditing: false,
    },
    {
      accessorKey: 'profile',
      header: 'Perfil',
      enableEditing: false,
    },
  ], []);

  const tableInstance = useMaterialReactTable({
    columns,
    data: historyData,
    enableEditing: false,
    createDisplayMode: 'row',
    enableColumnFilterModes: true,
    enablePagination: true,
    renderTopToolbar: ({ table }) => (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',}}>
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
    Histórico
  </Typography>
</Box>
        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <MRT_ToggleFiltersButton table={table} sx={{
    color: '#0076be',
    border: '1px solid #0076be',
    borderRadius: '4px', 
  }} />
          <MRT_ShowHideColumnsButton table={table} sx={{
    color: '#0076be',
    border: '1px solid #0076be',
    borderRadius: '4px', 
  }} />
          <MRT_ToggleDensePaddingButton table={table} sx={{
    color: '#0076be',
    border: '1px solid #0076be',
    borderRadius: '4px', 
  }}/>
          <MRT_ToggleFullScreenButton table={table} sx={{
    color: '#0076be',
    border: '1px solid #0076be',
    borderRadius: '4px',
  }} />
      

        </Box>
      </Box>
    ),
  });

  return <MaterialReactTable table={tableInstance} />;
};

export default HistoryTable;
