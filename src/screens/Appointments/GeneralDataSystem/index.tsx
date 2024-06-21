/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useMemo, useState } from "react";
import { Box, Grid, Tooltip, Typography, IconButton } from "@mui/material";
import { Download } from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleFiltersButton,
  MRT_ShowHideColumnsButton,
} from "material-react-table";
import Papa from "papaparse";

import { AppointmentsContext } from "../../../contexts/AppointmentsContext";

import { EmptyTableText } from "../../../components/Table/EmptyTableText";

import { useStyles } from "./styles";

export const GeneralDataSystem = () => {
  const { classes } = useStyles();
  const { selectedConstruction, listGeneralReports, getGeneralReports } =
    useContext(AppointmentsContext);

  const [data, setData] = useState<any[]>([]);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (selectedConstruction.id) {
      getGeneralReports().then((data) => {
        setData(data);
      });
    }
  }, [selectedConstruction.id]);

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
        AggregatedCell: ({ cell }: any) => <span>{cell.getValue()}</span>,
        aggregationFn: "sum",
        Footer: ({ table }) => {
          const total = table
            .getPreFilteredRowModel()
            .rows.reduce(
              (sum, row) =>
                sum + parseFloat(row.original.qnt_step_service || 0),
              0
            );
          return (
            <Box display="flex" flexDirection="column" alignItems="left">
              <Typography fontWeight={400} fontSize={10}>
                Total
              </Typography>
              <span>{total}</span>
            </Box>
          );
        },
      },
      {
        accessorKey: "amount_to_receive_step",
        header: "Valor a Receber",
        AggregatedCell: ({ cell }: any) => (
          <span>
            Somatória:{" "}
            <Box component="span" sx={{ color: "green", fontWeight: "bold" }}>
              R$ {cell.getValue()}
            </Box>
          </span>
        ),
        aggregationFn: (columnId, leafRows) =>
          leafRows.reduce(
            (sum, row) =>
              sum +
              parseFloat(
                (
                  row.original.amount_to_receive_step?.toString() || "0"
                ).replace(",", "")
              ),
            0
          ),
        Footer: ({ table }) => {
          const total = table
            .getPreFilteredRowModel()
            .rows.reduce(
              (sum, row) =>
                sum +
                parseFloat(
                  (
                    row.original.amount_to_receive_step?.toString() || "0"
                  ).replace(",", "")
                ),
              0
            );
          return (
            <Box display="flex" flexDirection="column" alignItems="left">
              <Typography fontWeight={400} fontSize={10}>
                Total
              </Typography>
              <Box component="span" sx={{ color: "green" }}>
                R$ {total.toFixed(2)}
              </Box>
            </Box>
          );
        },
      },
      {
        accessorKey: "total_price_service",
        header: "Preço Total do Serviço",
        AggregatedCell: ({ cell }: any) => (
          <span>
            Somatória:{" "}
            <Box component="span" sx={{ color: "green", fontWeight: "bold" }}>
              R$ {cell.getValue()}
            </Box>
          </span>
        ),
        aggregationFn: (columnId, leafRows) =>
          leafRows.reduce(
            (sum, row) =>
              sum +
              parseFloat(
                (row.original.total_price_service?.toString() || "0").replace(
                  ",",
                  ""
                )
              ),
            0
          ),
        Footer: ({ table }) => {
          const total = table
            .getPreFilteredRowModel()
            .rows.reduce(
              (sum, row) =>
                sum +
                parseFloat(
                  (row.original.total_price_service?.toString() || "0").replace(
                    ",",
                    ""
                  )
                ),
              0
            );
          return (
            <Box display="flex" flexDirection="column" alignItems="left">
              <Typography fontWeight={400} fontSize={10}>
                Total
              </Typography>
              <Box component="span" sx={{ color: "green" }}>
                R$ {total.toFixed(2)}
              </Box>
            </Box>
          );
        },
      },
      {
        accessorKey: "amount_to_pay",
        header: "Valor a Pagar",
        AggregatedCell: ({ cell }: any) => (
          <span>
            Somatória:{" "}
            <Box component="span" sx={{ color: "green", fontWeight: "bold" }}>
              R$ {cell.getValue()}
            </Box>
          </span>
        ),
        aggregationFn: (columnId, leafRows) =>
          leafRows.reduce(
            (sum, row) =>
              sum +
              parseFloat(
                (row.original.amount_to_pay?.toString() || "0").replace(",", "")
              ),
            0
          ),
        Footer: ({ table }) => {
          const total = table
            .getPreFilteredRowModel()
            .rows.reduce(
              (sum, row) =>
                sum +
                parseFloat(
                  (row.original.amount_to_pay?.toString() || "0").replace(
                    ",",
                    ""
                  )
                ),
              0
            );
          return (
            <Box display="flex" flexDirection="column" alignItems="left">
              <Typography fontWeight={400} fontSize={10}>
                Total
              </Typography>
              <Box component="span" sx={{ color: "green" }}>
                R$ {total.toFixed(2)}
              </Box>
            </Box>
          );
        },
      },
      {
        accessorKey: "total_to_pay",
        header: "Total a Pagar",
        AggregatedCell: ({ cell }: any) => (
          <span>
            Somatória:{" "}
            <Box component="span" sx={{ color: "green", fontWeight: "bold" }}>
              R$ {cell.getValue()}
            </Box>
          </span>
        ),
        aggregationFn: (columnId, leafRows) =>
          leafRows.reduce(
            (sum, row) =>
              sum +
              parseFloat(
                (row.original.total_to_pay?.toString() || "0").replace(",", "")
              ),
            0
          ),
        Footer: ({ table }) => {
          const total = table
            .getPreFilteredRowModel()
            .rows.reduce(
              (sum, row) =>
                sum +
                parseFloat(
                  (row.original.total_to_pay?.toString() || "0").replace(
                    ",",
                    ""
                  )
                ),
              0
            );
          return (
            <Box display="flex" flexDirection="column" alignItems="left">
              <Typography fontWeight={400} fontSize={10}>
                Total
              </Typography>
              <Box component="span" sx={{ color: "green" }}>
                R$ {total.toFixed(2)}
              </Box>
            </Box>
          );
        },
      },
      {
        accessorKey: "employee_name",
        header: "Funcionário",
      },
      {
        accessorKey: "released_typed",
        header: "Liberado Digitado",
      },
      {
        accessorKey: "released_system",
        header: "Liberado Sistema",
      },
      {
        accessorKey: "released_user",
        header: "Liberado Usuário",
      },
      {
        accessorKey: "started_typed",
        header: "Iniciado Digitado",
      },
      {
        accessorKey: "started_system",
        header: "Iniciado Sistema",
      },
      {
        accessorKey: "started_user",
        header: "Iniciado Usuário",
      },
      {
        accessorKey: "finished_typed",
        header: "Finalizado Digitado",
      },
      {
        accessorKey: "finished_system",
        header: "Finalizado Sistema",
      },
      {
        accessorKey: "finished_user",
        header: "Finalizado Usuário",
      },
      {
        accessorKey: "delivered_typed",
        header: "Entregue Digitado",
      },
      {
        accessorKey: "delivered_system",
        header: "Entregue Sistema",
      },
      {
        accessorKey: "delivered_user",
        header: "Entregue Usuário",
      },
      // Colunas dinâmicas para os níveis
      ...Array.from({
        length: Math.max(
          ...listGeneralReports.map((report) => report.levels.length)
        ),
      }).map((_, index) => ({
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

  const handleDownloadCsv = () => {
    const flattenedData = data.map((item) => ({
      area_name: item.area_name,
      checklist_name: item.checklist_name,
      measurement_name: item.measurement_name,
      team_name: item.team_name,
      discipline_name: item.discipline_name,
      package_name: item.package_name,
      scope: item.scope,
      service_name: item.service_name,
      step_service_name: item.step_service_name,
      qnt_step_service: item.qnt_step_service,
      amount_to_receive_step: item.amount_to_receive_step,
      total_price_service: item.total_price_service,
      amount_to_pay: item.amount_to_pay,
      total_to_pay: item.total_to_pay,
      employee_name: item.employee_name,
      released_typed: item.released_typed,
      released_system: item.released_system,
      released_user: item.released_user,
      started_typed: item.started_typed,
      started_system: item.started_system,
      started_user: item.started_user,
      finished_typed: item.finished_typed,
      finished_system: item.finished_system,
      finished_user: item.finished_user,
      delivered_typed: item.delivered_typed,
      delivered_system: item.delivered_system,
      delivered_user: item.delivered_user,
      ...item.levels.reduce((acc: any, level: any, index: any) => {
        acc[`Nível ${index + 1}`] = Object.keys(level)[0];
        return acc;
      }, {}),
    }));

    const csv = Papa.unparse(flattenedData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "dados-gerais-sistema.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableGrouping: true,
    enableEditing: false,
    enableExpanding: true,
    enablePagination: false,
    enableBottomToolbar: false,
    enableColumnFilterModes: false,
    createDisplayMode: "row",
    state: { isSaving },
    initialState: {
      density: "compact",
      expanded: true, // Expandir todos os grupos por padrão
      pagination: { pageIndex: 0, pageSize: 20 },
    },
    muiFilterTextFieldProps: (props) => {
      return {
        placeholder: `Filtrar por ${props.column.columnDef.header}`,
      };
    },
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
      sx: {
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: "#FAFAFA",
          },
      },
    },
    renderEmptyRowsFallback: () => <EmptyTableText />,
    renderTopToolbar: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
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
              Dados Gerais do Sistema
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <MRT_ToggleFiltersButton
              table={table}
              sx={{
                color: "#0076be",
                border: "1px solid #0076be",
                borderRadius: "4px",
              }}
            />
            <MRT_ShowHideColumnsButton
              table={table}
              sx={{
                color: "#0076be",
                border: "1px solid #0076be",
                borderRadius: "4px",
              }}
            />
            <MRT_ToggleDensePaddingButton
              table={table}
              sx={{
                color: "#0076be",
                border: "1px solid #0076be",
                borderRadius: "4px",
              }}
            />
            <MRT_ToggleFullScreenButton
              table={table}
              sx={{
                color: "#0076be",
                border: "1px solid #0076be",
                borderRadius: "4px",
              }}
            />
            <Tooltip title="Download da Tabela">
              <IconButton
                onClick={handleDownloadCsv}
                sx={{
                  color: "#0076be",
                  border: "1px solid #0076be",
                  borderRadius: "4px",
                  "&:hover": { backgroundColor: "rgba(0, 118, 190, 0.04)" },
                }}
              >
                <Download />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    ),
    mrtTheme: (theme) => ({
      draggingBorderColor: theme.palette.secondary.main,
    }),
  });

  return (
    <Grid item lg={12} className={classes.container}>
      <MaterialReactTable table={table} />
    </Grid>
  );
};
