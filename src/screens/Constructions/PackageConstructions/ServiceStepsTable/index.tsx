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
      {
        name: 'Serviço A',
        steps: 'Etapa A1',
        qnt: '999',
        unit: 'm²',
        price: 'R$ 100,00',
        workmanship: 'R$ 10,00',
      },
      {
        name: 'Serviço A',
        steps: 'Etapa A2',
        qnt: '500',
        unit: 'm²',
        price: 'R$ 200,00',
        workmanship: 'R$ 20,00',
      },
      {
        name: 'Serviço A',
        steps: 'Etapa A3',
        qnt: '300',
        unit: 'm²',
        price: 'R$ 150,00',
        workmanship: 'R$ 15,00',
      },
    ],
  },
  '02': {
    idService: '02',
    results: [
      {
        name: 'Serviço B',
        steps: 'Etapa B1',
        qnt: '800',
        unit: 'm²',
        price: 'R$ 120,00',
        workmanship: 'R$ 12,00',
      },
      {
        name: 'Serviço B',
        steps: 'Etapa B2',
        qnt: '600',
        unit: 'm²',
        price: 'R$ 220,00',
        workmanship: 'R$ 22,00',
      },
    ],
  },
  '03': {
    idService: '03',
    results: [
      {
        name: 'Serviço C',
        steps: 'Etapa C1',
        qnt: '400',
        unit: 'm²',
        price: 'R$ 180,00',
        workmanship: 'R$ 18,00',
      },
      {
        name: 'Serviço C',
        steps: 'Etapa C2',
        qnt: '250',
        unit: 'm²',
        price: 'R$ 300,00',
        workmanship: 'R$ 30,00',
      },
    ],
  },
  '04': {
    idService: '04',
    results: [
      {
        name: 'Serviço D',
        steps: 'Etapa D1',
        qnt: '1000',
        unit: 'm²',
        price: 'R$ 500,00',
        workmanship: 'R$ 50,00',
      },
      {
        name: 'Serviço D',
        steps: 'Etapa D2',
        qnt: '900',
        unit: 'm²',
        price: 'R$ 600,00',
        workmanship: 'R$ 60,00',
      },
    ],
  },
};


const ServiceStepTable = ({ order }:any) => {
const data = mockDetailsData[order as keyof typeof mockDetailsData]?.results || [];

const calculateTotalServicePrice = (data:any) =>
data.reduce((sum:any, current:any) => sum + parseFloat(current.price.replace('R$', '').replace(',', '.')), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const totalServicePrice = calculateTotalServicePrice(data);

const calculateTotalWorkmanship = (data:any) =>
data.reduce((sum:any, current:any) => sum + parseFloat(current.workmanship.replace('R$', '').replace(',', '.')), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
        accessorKey: 'name',
        header: 'Serviço',
      },
      {
        accessorKey: 'steps',
        header: 'Etapa',
      },
      {
        accessorKey: 'qnt',
        header: 'QTD',
      },
      {
        accessorKey: 'unit',
        header: 'Unidade',
      },
      {
        accessorKey: 'price',
        header: 'Preço/Serviço',
        footer: totalServicePrice.toString(),
      },
      {
        accessorKey: 'workmanship',
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