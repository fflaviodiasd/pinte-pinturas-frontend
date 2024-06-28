import React, { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Box, Grid, Typography, FormControlLabel, RadioGroup, Radio } from '@mui/material';

interface Detail {
  service_name: string;
  stpe_service_name: string;
  amount_execution: number;
  amount_media: number;
  price_unit: string;
  total_step: string;
  production_value: string;
  total_production_value: string;
}

interface ReportDetailsProps {
  details: Detail[];
  onReportTypeChange: (value: string) => void;
  reportType: string;
}

const ReportDetails: React.FC<ReportDetailsProps> = ({ details, onReportTypeChange, reportType }) => {
  const columns = useMemo<MRT_ColumnDef<Detail>[]>(
    () => [
      {
        accessorKey: 'service_name',
        header: 'Serviço',
      },
      {
        accessorKey: 'stpe_service_name',
        header: 'Etapa do Serviço',
      },
      {
        accessorKey: 'amount_execution',
        header: 'Qtd. Executada',
      },
      {
        accessorKey: 'amount_media',
        header: 'Qtd. Média',
      },
      {
        accessorKey: 'price_unit',
        header: 'Preço Unitário',
      },
      {
        accessorKey: 'total_step',
        header: 'Total Etapa',
      },
      {
        accessorKey: 'production_value',
        header: 'Valor Produção',
      },
      {
        accessorKey: 'total_production_value',
        header: 'Valor Total Produção',
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: details,
    enableColumnFilters: true,
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
        <RadioGroup
          row
          value={reportType}
          onChange={(e) => onReportTypeChange(e.target.value)}
        >
          <FormControlLabel value="service" control={<Radio />} label="Serviços" />
          <FormControlLabel value="package" control={<Radio />} label="Pacotes" />
        </RadioGroup>
      </Box>
    ),
    renderDetailPanel: ({ row }) => (
      <Box sx={{ padding: "1rem" }}>
        <Typography variant="body2">
          Detalhes adicionais para {row.original.service_name}
        </Typography>
      </Box>
    ),
    enablePagination: false,
    enableBottomToolbar: false,
  });

  return (
    <Grid item xs={12} lg={12} sx={{padding: 1}}>
      <MaterialReactTable table={table} />
    </Grid>
  );
};

export default ReportDetails;
