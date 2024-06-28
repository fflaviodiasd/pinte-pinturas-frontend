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
        { accessorKey: 'value_total', header: 'Valor Total' },
        { accessorKey: 'value_production', header: 'Valor Produção' },
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
    <Grid item xs={12} lg={12} sx={{padding: 1}}>
      <MaterialReactTable {...table} />
    </Grid>
  );
};

export default ReportChecklist;
