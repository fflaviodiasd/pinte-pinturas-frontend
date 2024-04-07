import React, { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    MRT_ToggleDensePaddingButton,
    MRT_ToggleFullScreenButton,
    MRT_ToggleFiltersButton,
    MRT_ShowHideColumnsButton,
    MRT_Localization,
  } from "material-react-table";

  import { Box, IconButton,Tooltip, Typography} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
  
const mockDetailsData = {
    '01': {
        idService: '01',
        results: [
          { order: '01', name: 'Etapa 1', price_service: 'R$ 999,99', price_workmanship: 'R$ 50,00' },
          { order: '02', name: 'Etapa 2', price_service: 'R$ 899,99', price_workmanship: 'R$ 40,00' },
          { order: '03', name: 'Etapa 3', price_service: 'R$ 799,99', price_workmanship: 'R$ 30,00' },
        ],
      },
      '02': {
        idService: '02',
        results: [
          { order: '01', name: 'Preparação', price_service: 'R$ 500,00', price_workmanship: 'R$ 25,00' },
          { order: '02', name: 'Pintura', price_service: 'R$ 600,00', price_workmanship: 'R$ 35,00' },
          { order: '03', name: 'Acabamento', price_service: 'R$ 700,00', price_workmanship: 'R$ 45,00' },
        ],
      },
      '03': {
        idService: '03',
        results: [
          { order: '01', name: 'Demarcação', price_service: 'R$ 200,00', price_workmanship: 'R$ 20,00' },
          { order: '02', name: 'Escavação', price_service: 'R$ 300,00', price_workmanship: 'R$ 30,00' },
          { order: '03', name: 'Fundações', price_service: 'R$ 400,00', price_workmanship: 'R$ 40,00' },
        ],
      },
};

const ServiceStepTable = ({ order }:any) => {
const data = mockDetailsData[order as keyof typeof mockDetailsData]?.results || [];

const calculateTotalServicePrice = (data:any) =>
data.reduce((sum:any, current:any) => sum + parseFloat(current.price_service.replace('R$', '').replace(',', '.')), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const totalServicePrice = calculateTotalServicePrice(data);

const calculateTotalWorkmanship = (data:any) =>
data.reduce((sum:any, current:any) => sum + parseFloat(current.price_workmanship.replace('R$', '').replace(',', '.')), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const totalWorkamanship = calculateTotalWorkmanship(data);
const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
        {
            id: 'actions',
            header: '',
            columnDefType: 'display',
            Cell: ({ row }) => (
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                  <Tooltip title="Excluir">
                  <IconButton aria-label="Excluir" onClick={() => handleDelete(row.original)}               sx={{ color: "#C5C7C8" }} 
>
                    <Delete />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Editar">
                  <IconButton aria-label="Editar" onClick={() => handleEdit(row.original)}               sx={{ color: "#C5C7C8" }} 
>
                    <Edit />
                  </IconButton>
                </Tooltip>
              
              </Box>
            ),
          },


        {
        accessorKey: 'order',
        header: 'Ordem da Etapa',
      },
      {
        accessorKey: 'name',
        header: 'Nome da Etapa',
      },
      {
        accessorKey: 'price_service',
        header: 'Preço/Serviço',
        footer: totalServicePrice.toString(),
      },
      {
        accessorKey: 'price_workmanship',
        header: 'Mão-de-Obra',
        footer: totalWorkamanship.toString(),
      }
    ],
    [],
  );

  const tableInstance = useMaterialReactTable({
    columns,
    data,
    autoResetExpanded: false,
    autoResetPageIndex: false,
    muiTableFooterProps: {
        sx: {
          backgroundColor: 'red', // Substitua pela cor que você deseja
        }
      },
    renderTopToolbar: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography component="div" fontWeight={500}>
              Etapas do serviço
            </Typography>
            <Box sx={{ flexGrow: 1, height: '1px', backgroundColor: '#a2a2a2', marginX: '1rem' }} />
          </Box>
          <Tooltip title="Adicionar Etapa">
            <IconButton
              onClick={() => console.log('Adicionar Etapa')}
              sx={{
                color: '#0076be',
                border: '1px solid #0076be',
                borderRadius: '4px',
                padding: '5px',
                fontSize: '0.875rem',
                '&:hover': {
                  backgroundColor: 'rgba(0, 118, 190, 0.04)',
                },
              }}
            >
              <Add fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    
  });

  const handleEdit = (rowData:any) => {
    console.log('Editar', rowData);
  };

  const handleDelete = (rowData:any) => {
    console.log('Excluir', rowData);
  };

  return <MaterialReactTable table={tableInstance} />;
};

export default ServiceStepTable;