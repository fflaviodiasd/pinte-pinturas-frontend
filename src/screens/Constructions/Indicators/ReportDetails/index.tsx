import React, { useMemo } from 'react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Box, Grid, Typography, FormControlLabel, RadioGroup, Radio } from '@mui/material';

interface ServiceDetail {
  service_name: string;
  stpe_service_name: string;
  amount_execution: number;
  amount_media: number;
  price_unit: string;
  total_step: string;
  production_value: string;
  total_production_value: string;
}

interface PackageDetail {
  package_name: string;
  amount_executed: number;
  average_time: number;
  package_price: string;
  total_package: string;
  package_price_workmanship: string;
  total_package_workmanship: string;
}

type Detail = ServiceDetail | PackageDetail;

interface ReportDetailsProps {
  details: Detail[];
  onReportTypeChange: (value: string) => void;
  reportType: string;
}

const parseCurrency = (value: string): number => {
  if (!value) return 0;
  const numericValue = parseFloat(value.replace(/[^0-9,-]+/g, "").replace(",", "."));
  return isNaN(numericValue) ? 0 : numericValue;
};

const ReportDetails: React.FC<ReportDetailsProps> = ({ details, onReportTypeChange, reportType }) => {
  const serviceColumns = useMemo<MRT_ColumnDef<ServiceDetail>[]>(
    () => [
      { accessorKey: 'service_name', header: 'Serviço' },
      { accessorKey: 'stpe_service_name', header: 'Etapa do Serviço' },
      {
        accessorKey: 'amount_execution',
        header: 'Qtd. Executada',
        aggregationFn: (columnId, rows) => {
          const sum = rows.reduce((acc, row) => acc + (row.getValue<number>('amount_execution') || 0), 0);
          console.log('amount_execution rows:', rows.map(row => row.getValue<number>('amount_execution')), 'sum:', sum);
          return sum;
        },
        AggregatedCell: ({ cell }) => (
          <>
            Total: <span style={{ color: 'green' }}>{cell.getValue<number>()}</span>
          </>
        ),
        Footer: ({ table }) => (
          <>
            Total: <span style={{ color: 'green' }}>{table.getFilteredRowModel().rows.reduce((sum, row) => sum + (row.getValue<number>('amount_execution') || 0), 0)}</span>
          </>
        ),
      },
      {
        accessorKey: 'amount_media',
        header: 'Qtd. Média',
        aggregationFn: (columnId, rows) => {
          const sum = rows.reduce((acc, row) => acc + (row.getValue<number>('amount_media') || 0), 0);
          console.log('amount_media rows:', rows.map(row => row.getValue<number>('amount_media')), 'sum:', sum);
          return sum;
        },
        Cell: ({ cell }) => cell.getValue<number>().toFixed(2),
        AggregatedCell: ({ cell }) => (
          <>
            Total: <span style={{ color: 'green' }}>{cell.getValue<number>().toFixed(2)}</span>
          </>
        ),
        Footer: ({ table }) => (
          <>
            Total: <span style={{ color: 'green' }}>{table.getFilteredRowModel().rows.reduce((sum, row) => sum + (row.getValue<number>('amount_media') || 0), 0).toFixed(2)}</span>
          </>
        ),
      },
      { accessorKey: 'price_unit', header: 'Preço Unitário' },
      {
        accessorKey: 'total_step',
        header: 'Total Etapa',
        aggregationFn: (columnId, rows) => {
          const sum = rows.reduce((acc, row) => acc + parseCurrency(row.getValue<string>('total_step')), 0);
          console.log('total_step rows:', rows.map(row => row.getValue<string>('total_step')), 'sum:', sum);
          return sum;
        },
        AggregatedCell: ({ cell }) => (
          <>
            Total: <span style={{ color: 'green' }}>{cell.getValue<number>().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </>
        ),
        Footer: ({ table }) => (
          <>
            Total: <span style={{ color: 'green' }}>{table.getFilteredRowModel().rows.reduce((sum, row) => sum + parseCurrency(row.getValue<string>('total_step')), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </>
        ),
      },
      {
        accessorKey: 'production_value',
        header: 'Valor Produção',
        aggregationFn: (columnId, rows) => {
          const sum = rows.reduce((acc, row) => acc + parseCurrency(row.getValue<string>('production_value')), 0);
          console.log('production_value rows:', rows.map(row => row.getValue<string>('production_value')), 'sum:', sum);
          return sum;
        },
        AggregatedCell: ({ cell }) => (
          <>
            Total: <span style={{ color: 'green' }}>{cell.getValue<number>().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </>
        ),
        Footer: ({ table }) => (
          <>
            Total: <span style={{ color: 'green' }}>{table.getFilteredRowModel().rows.reduce((sum, row) => sum + parseCurrency(row.getValue<string>('production_value')), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </>
        ),
      },
      {
        accessorKey: 'total_production_value',
        header: 'Valor Total Produção',
        aggregationFn: (columnId, rows) => {
          const sum = rows.reduce((acc, row) => acc + parseCurrency(row.getValue<string>('total_production_value')), 0);
          console.log('total_production_value rows:', rows.map(row => row.getValue<string>('total_production_value')), 'sum:', sum);
          return sum;
        },
        AggregatedCell: ({ cell }) => (
          <>
            Total: <span style={{ color: 'green' }}>{cell.getValue<number>().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </>
        ),
        Footer: ({ table }) => (
          <>
            Total: <span style={{ color: 'green' }}>{table.getFilteredRowModel().rows.reduce((sum, row) => sum + parseCurrency(row.getValue<string>('total_production_value')), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </>
        ),
      },
    ],
    []
  );

  const packageColumns = useMemo<MRT_ColumnDef<PackageDetail>[]>(
    () => [
      { accessorKey: 'package_name', header: 'Pacote' },
      {
        accessorKey: 'amount_executed',
        header: 'Qtd. Executada',
        aggregationFn: (columnId, rows) => {
          const sum = rows.reduce((acc, row) => acc + (row.getValue<number>('amount_executed') || 0), 0);
          console.log('amount_executed rows:', rows.map(row => row.getValue<number>('amount_executed')), 'sum:', sum);
          return sum;
        },
        AggregatedCell: ({ cell }) => (
          <>
            Total: <span style={{ color: 'green' }}>{cell.getValue<number>()}</span>
          </>
        ),
        Footer: ({ table }) => (
          <>
            Total: <span style={{ color: 'green' }}>{table.getFilteredRowModel().rows.reduce((sum, row) => sum + (row.getValue<number>('amount_executed') || 0), 0)}</span>
          </>
        ),
      },
      { accessorKey: 'average_time', header: 'Tempo Médio/Dia' },
      { accessorKey: 'package_price', header: 'Preço Unitário' },
      {
        accessorKey: 'total_package',
        header: 'Total Pacote',
        aggregationFn: (columnId, rows) => {
          const sum = rows.reduce((acc, row) => acc + parseCurrency(row.getValue<string>('total_package')), 0);
          console.log('total_package rows:', rows.map(row => row.getValue<string>('total_package')), 'sum:', sum);
          return sum;
        },
        AggregatedCell: ({ cell }) => (
          <>
            Total: <span style={{ color: 'green' }}>{cell.getValue<number>().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </>
        ),
        Footer: ({ table }) => (
          <>
            Total: <span style={{ color: 'green' }}>{table.getFilteredRowModel().rows.reduce((sum, row) => sum + parseCurrency(row.getValue<string>('total_package')), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </>
        ),
      },
      { accessorKey: 'package_price_workmanship', header: 'Preço Mão-de-Obra' },
      {
        accessorKey: 'total_package_workmanship',
        header: 'Total Mão-de-Obra',
        aggregationFn: (columnId, rows) => {
          const sum = rows.reduce((acc, row) => acc + parseCurrency(row.getValue<string>('total_package_workmanship')), 0);
          console.log('total_package_workmanship rows:', rows.map(row => row.getValue<string>('total_package_workmanship')), 'sum:', sum);
          return sum;
        },
        AggregatedCell: ({ cell }) => (
          <>
            Total: <span style={{ color: 'green' }}>{cell.getValue<number>().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </>
        ),
        Footer: ({ table }) => (
          <>
            Total: <span style={{ color: 'green' }}>{table.getFilteredRowModel().rows.reduce((sum, row) => sum + parseCurrency(row.getValue<string>('total_package_workmanship')), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </>
        ),
      },
    ],
    []
  );

  const columns = reportType === 'service' ? serviceColumns : packageColumns;

  return (
    <Grid item xs={12} lg={12} sx={{ padding: 1 }}>
      <MaterialReactTable
        columns={columns as MRT_ColumnDef<Detail>[]}
        data={details}
        enableColumnFilters
        enableGrouping
        initialState={{ showColumnFilters: true }}
        renderTopToolbar={({ table }) => (
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
        )}
        enablePagination={false}
        enableBottomToolbar={false}
      />
    </Grid>
  );
};

export default ReportDetails;
