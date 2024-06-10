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

import { Box, Grid, Tooltip, Typography, IconButton, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { Download } from "@mui/icons-material";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { errorMessage } from "../../../components/Messages";
import { useConference } from "../../../hooks/useConference";

export const GeneralData = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { getGeneralReports, listGeneralReports, loading } = useConference();
  const [data, setData] = useState<any[]>([]);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getGeneralReports();
    setData(listGeneralReports);
  }, [id]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "area_name",
        header: "Área",
      },
      {
        accessorKey: "checklist_name",
        header: "Checklist",
      },
      {
        accessorKey: "measurement_name",
        header: "Medição",
      },
      {
        accessorKey: "team_name",
        header: "Equipe",
      },
      {
        accessorKey: "discipline_name",
        header: "Disciplina",
      },
      {
        accessorKey: "package_name",
        header: "Pacote",
      },
      {
        accessorKey: "scope",
        header: "Escopo",
      },
      {
        accessorKey: "service_name",
        header: "Serviço",
      },
      {
        accessorKey: "step_service_name",
        header: "Passo do Serviço",
      },
      {
        accessorKey: "qnt_step_service",
        header: "Qtd. Passo do Serviço",
      },
      {
        accessorKey: "amount_to_receive_step",
        header: "Valor a Receber",
      },
      {
        accessorKey: "total_price_service",
        header: "Preço Total do Serviço",
      },
      {
        accessorKey: "amount_to_pay",
        header: "Valor a Pagar",
      },
      {
        accessorKey: "total_to_pay",
        header: "Total a Pagar",
      },
      {
        accessorKey: "employee_name",
        header: "Funcionário",
      },
      // Colunas dinâmicas para os níveis
      ...Array.from({ length: Math.max(...listGeneralReports.map(report => report.levels.length)) }).map((_, index) => ({
        accessorKey: `levels.${index}`,
        header: `Nível ${index + 1}`,
        Cell: ({ row }: { row: MRT_Row<any> }) => {
          const level = row.original.levels[index];
          const key = Object.keys(level)[0];
          return <span>{key}</span>;
        },
      })),
    ],
    [listGeneralReports]
  );

  const handleExportRows = (rows: MRT_Row<any>[]) => {
    const doc = new jsPDF({
      orientation: 'landscape', // Configura a orientação horizontal
    });

    // const data = rows.map((row) => Object.values(row.original));
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
    data: listGeneralReports,
    enableColumnFilterModes: true,
    enableEditing: false,
    enableExpanding: true,
    createDisplayMode: 'row',
    state: { isSaving },
    enableGrouping: true,
    initialState: {
      density: 'compact',
      expanded: true, // Expandir todos os grupos por padrão
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
      // baseBackgroundColor: baseBackgroundColor,
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
