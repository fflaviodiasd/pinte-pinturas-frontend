import React, { useMemo, useEffect, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_TableOptions,
} from "material-react-table";
import { useConstructions } from "../../../../hooks/useConstructions";

import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';

const ServiceStepTable = ({ order }: any) => {
  const [packageSteps, setPackageSteps] = useState([]); 
  const [unitOptions, setUnitOptions] = useState([]);

  const { getAllPackageStepsById, addPackageStep, deletePackageStep, getAllUnits  } = useConstructions(); 
  const serviceOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
  ];
  
  const stepOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
  ];
  
  const fetchUnits = async () => {
    const units = await getAllUnits();
    const options = units.results.map(unit => ({ label: unit.name, value: unit.id }));
    setUnitOptions(options);
  };

  useEffect(() => {

    fetchUnits();
  }, []);
  const fetchPackageSteps = async () => {
    try {
      const steps = await getAllPackageStepsById(order);
      setPackageSteps(steps); 
    } catch (error) {
      console.error('Erro ao buscar etapas do pacote:', error);
    }
  };

  useEffect(() => {

    if (order) {
      fetchPackageSteps();
    }
  }, []);

  const handleAddNewStep: MRT_TableOptions<any>['onCreatingRowSave'] = async ({
    values,
    table,
  }) => {
    try {
      await addPackageStep(order, values); 
      // setPackageSteps((prevSteps) => [...prevSteps, values]); 
      // table.exitCreatingMode(); // Sai do modo de criação
    } catch (error) {
      console.error('Erro ao adicionar nova etapa:', error);
    }
    fetchPackageSteps(); 

  };

  const handleDeleteStep = async (stepId:number)=> {
    if (window.confirm('Tem certeza que deseja remover esta etapa?')) {
      try {
        await deletePackageStep(stepId);
        fetchPackageSteps();
      } catch (error) {
      }
    }
  };


  const parseCurrency = (value:any) => {
    return parseFloat(value.replace('R$', '').replace(/\./g, '').replace(',', '.'));
  };
  const priceStrings = packageSteps.map(step => step.total_price);
  const workmanshipStrings = packageSteps.map(step => step.total_workmanship);
  
  const prices = priceStrings.map(parseCurrency);
  const workmanships = workmanshipStrings.map(parseCurrency);
  

  
  
  const formatCurrency = (value:any) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
    const totalServicePrice = formatCurrency(prices.reduce((sum, value) => sum + value, 0));
    const totalWorkmanship = formatCurrency(workmanships.reduce((sum, value) => sum + value, 0));
  
  console.log('Total Preço Total/Serviço:', formatCurrency(totalServicePrice));
  console.log('Total Mão-de-Obra:', formatCurrency(totalWorkmanship));

const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
  {
    accessorFn: (row) => row.service.name,
    id: 'service',
    header: 'Serviço',
    editVariant: 'select', 
    editSelectOptions: serviceOptions, 
  },
  {
    accessorFn: (row) => row.step_service.name,
    id: 'step_service',
    header: 'Etapa',
    editVariant: 'select', 
    editSelectOptions: stepOptions, 
  },
  {
    accessorKey: 'amount',
    header: 'QTD',
  },
  {
    accessorKey: 'unit',
    header: 'Unidade',
    editVariant: 'select',
    editSelectOptions: unitOptions, 
  },
  {
    accessorKey: 'total_price',
    header: 'Preço Total/Serviço',
    Footer: () => <span>{totalServicePrice}</span>,
  },
  {
    accessorKey: 'total_workmanship',
    header: 'Total Mão-de-Obra',
    footer: totalWorkmanship,
  },
], [unitOptions, totalServicePrice, totalWorkmanship, packageSteps]);


const tableInstance = useMaterialReactTable({
  columns,
  data: packageSteps,
  onCreatingRowSave: handleAddNewStep,
  enableRowActions: true, 
  enableEditing: true, 
  createDisplayMode: 'row', 
  renderRowActions: ({ row, table }) => (
    <Box sx={{ display: 'flex', gap: '1rem' }}>
      {/* Botão para editar */}
      <Tooltip title="Editar">
        <IconButton onClick={() => handleEdit(row.original)} sx={{ color: "#C5C7C8" }}>
          <Edit />
        </IconButton>
      </Tooltip>
      {/* Botão para excluir */}
      <Tooltip title="Excluir">
        <IconButton onClick={() => handleDeleteStep(row.original.id)} color="error">
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  ),
  renderTopToolbar: ({ table }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography component="div" fontWeight={500}>
              Etapas do serviço
            </Typography>
            <Box sx={{ flexGrow: 1, height: '1px', backgroundColor: '#a2a2a2', marginX: '1rem' }} />
          </Box>
          <Tooltip title="Adicionar Etapa">
            <IconButton
            onClick={() => table.setCreatingRow(true)}
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


  return <MaterialReactTable table={tableInstance} />;
};

export default ServiceStepTable;