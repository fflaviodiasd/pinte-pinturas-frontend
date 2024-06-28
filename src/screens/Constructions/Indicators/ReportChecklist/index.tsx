import React, { useMemo } from 'react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Box, Grid, Typography } from '@mui/material';

interface ChecklistItem {
  levels: Record<string, string>;
  checklist_name: string;
  inital_dt: string | null;
  finish_dt: string | null;
  value_total: string;
  value_production: string;
  package_name: string;
}

interface ReportChecklistProps {
  checklist: ChecklistItem[];
}

const parseCurrency = (value: string): number => {
  if (!value) return 0;
  const numericValue = parseFloat(value.replace(/[^0-9,-]+/g, "").replace(",", "."));
  return isNaN(numericValue) ? 0 : numericValue;
};

const ReportChecklist: React.FC<ReportChecklistProps> = ({ checklist }) => {
  const columns = useMemo<MRT_ColumnDef<ChecklistItem>[]>(
    () => {
      const dynamicColumns: MRT_ColumnDef<ChecklistItem>[] = [];

      if (checklist.length > 0 && checklist[0].levels) {
        const levels = Object.keys(checklist[0].levels);

        levels.forEach((level) => {
          dynamicColumns.push({ accessorKey: `levels.${level}`, header: level });
        });
      }

      return [
        ...dynamicColumns,
        { accessorKey: 'checklist_name', header: 'Checklist' },
        { accessorKey: 'inital_dt', header: 'Data de Início' },
        { accessorKey: 'finish_dt', header: 'Data de Final' },
        {
          accessorKey: 'value_total',
          header: 'Valor Total',
          aggregationFn: (columnId, rows) => {
            const sum = rows.reduce((acc, row) => acc + parseCurrency(row.getValue<string>('value_total')), 0);
            console.log('value_total rows:', rows.map(row => row.getValue<string>('value_total')), 'sum:', sum);
            return sum;
          },
          AggregatedCell: ({ cell }) => (
            <>
              Total: <span style={{ color: 'green' }}>{cell.getValue<number>().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </>
          ),
          Footer: ({ table }) => (
            <>
              Total: <span style={{ color: 'green' }}>{table.getFilteredRowModel().rows.reduce((sum, row) => sum + parseCurrency(row.getValue<string>('value_total')), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </>
          ),
        },
        {
          accessorKey: 'value_production',
          header: 'Valor Produção',
          aggregationFn: (columnId, rows) => {
            const sum = rows.reduce((acc, row) => acc + parseCurrency(row.getValue<string>('value_production')), 0);
            console.log('value_production rows:', rows.map(row => row.getValue<string>('value_production')), 'sum:', sum);
            return sum;
          },
          AggregatedCell: ({ cell }) => (
            <>
              Total: <span style={{ color: 'green' }}>{cell.getValue<number>().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </>
          ),
          Footer: ({ table }) => (
            <>
              Total: <span style={{ color: 'green' }}>{table.getFilteredRowModel().rows.reduce((sum, row) => sum + parseCurrency(row.getValue<string>('value_production')), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </>
          ),
        },
        { accessorKey: 'package_name', header: 'Pacote' },
      ];
    },
    [checklist]
  );

  const table = useMemo(
    () => ({
      columns,
      data: checklist,
      enableColumnFilters: true,
      initialState: { showColumnFilters: true },
      enableGrouping: true,
      renderTopToolbar: () => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            padding: 2,
          }}
        >
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
              },
            }}
          >
            <Typography variant="h5" component="div" gutterBottom>
              Detalhes do Checklist
            </Typography>
          </Box>
        </Box>
      ),
      enablePagination: false,
      enableBottomToolbar: false,
    }),
    [columns, checklist]
  );

  return (
    <Grid item xs={12} lg={12} sx={{ padding: 1 }}>
      <MaterialReactTable {...table} />
    </Grid>
  );
};

export default ReportChecklist;
