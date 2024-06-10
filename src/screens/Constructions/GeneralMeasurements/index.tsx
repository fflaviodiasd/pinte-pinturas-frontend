import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_AggregationFn,
  type MRT_ColumnDef,
  type MRT_TableOptions,

} from "material-react-table";

import { Box, Grid, Tooltip, Typography, IconButton, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useConstructions } from "../../../hooks/useConstructions";
import { Download } from "@mui/icons-material";
import Papa from "papaparse";
import { useConference } from "../../../hooks/useConference"; // Importe seu hook

interface LocalData {
  package_name: string;
  initial_dt: string | null;
  finish_dt: string | null;
  valor_total_package: string;
  levels: Record<string, string>;
}

export const GeneralMeasurements = () => {
  const {
    listConstructionsMeasurements,
    getAllConstructionsMeasurements,
    addConstructionMeasurements,
  } = useConstructions();

  const { getConferenceData, listConferenceData } = useConference(); // Use seu hook
  const theme = useTheme();

  const [isSaving, setIsSaving] = useState(false);
  const [filteredMeasurements, setFilteredMeasurements] = useState<any[]>([]);
  const [selectedMeasurement, setSelectedMeasurement] = useState("");
  const [selectedService, setSelectedService] = useState("service");

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getAllConstructionsMeasurements();
    }
  }, [id]);

  useEffect(() => {
    if (listConstructionsMeasurements && listConstructionsMeasurements.length > 0) {
      const filteredData = listConstructionsMeasurements.filter(
        (measurement) => measurement.construction.toString() === id
      );
      setFilteredMeasurements(filteredData);
    }
  }, [listConstructionsMeasurements, id]);

  useEffect(() => {
    if (selectedMeasurement && selectedService) {
      getConferenceData(selectedMeasurement, selectedService);
    }
  }, [selectedMeasurement, selectedService]);

  const handleCreatePackages: MRT_TableOptions<any>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    await addConstructionMeasurements(values);
    getAllConstructionsMeasurements();
  };

  const handleDownloadCsv = () => {
    const flattenedData = listConferenceData.map((item) => {
      if (selectedService === "service") {
        return {
          service_name: item.service_name,
          step_service_name: item.step_service_name,
          unit_service: item.unit_service,
          registered_quantity: item.registered_quantity,
          contract_amount: item.contract.amount,
          contract_price_unit: item.contract.price_unit,
          contract_total: item.contract.total,
          previous_ac_qty: item.previous_ac_qty,
          current_quantity: item.current_quantity,
          accumulated: item.accumulated,
          balance_measured: item.balance_measured,
        };
      } else {
        return {
          package_name: item.package_name,
          initial_dt: item.initial_dt,
          finish_dt: item.finish_dt,
          valor_total_package: item.valor_total_package,
          ...item.levels,
        };
      }
    });

    const csv = Papa.unparse(flattenedData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "medicoes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Função para converter valores monetários no formato "R$ 3.600,00" para float
  const parseMonetaryValue = (value: string): number => {
    return parseFloat(value.replace("R$", "").replace(".", "").replace(",", ".").trim()) || 0;
  };


  const serviceColumns: MRT_ColumnDef<any>[] = useMemo(() => [
    { accessorKey: 'service_name', header: 'Nome do Serviço' },
    { accessorKey: 'step_service_name', header: 'Etapa do Serviço' },
    { accessorKey: 'unit_service', header: 'Unidade' },
    { accessorKey: 'registered_quantity', header: 'Qtd. Cadastrada', aggregationFn: 'sum', Footer: ({ table }) => {
        const total = table.getFilteredRowModel().rows.reduce(
          (sum, row) => sum + (row.original.registered_quantity || 0),
          0
        );
        return <Box sx={{ fontWeight: 'bold' }}>Total: {total}</Box>;
      },
    },
    { accessorKey: 'contract.amount', header: 'Qtd. Contrato', muiTableBodyCellProps: { sx: { backgroundColor: '#FFFACD' } }, aggregationFn: 'sum', Footer: ({ table }) => {
        const total = table.getFilteredRowModel().rows.reduce(
          (sum, row) => sum + (row.original.contract?.amount || 0),
          0
        );
        return <Box sx={{ fontWeight: 'bold' }}>Total: {total}</Box>;
      },
    },
    { accessorKey: 'contract.price_unit', header: 'Preço Unit.', muiTableBodyCellProps: { sx: { backgroundColor: '#FFFACD' } }, aggregationFn: 'sum', Footer: ({ table }) => {
        const total = table.getFilteredRowModel().rows.reduce(
          (sum, row) => sum + (row.original.contract?.price_unit || 0),
          0
        );
        return <Box sx={{ fontWeight: 'bold' }}>Total: {total}</Box>;
      },
    },
    { accessorKey: 'contract.total', header: 'Total', muiTableBodyCellProps: { sx: { backgroundColor: '#FFFACD' } }, aggregationFn: (columnId, leafRows) => leafRows.reduce((sum, row) => sum + parseMonetaryValue(row.original.contract?.total || "0"), 0), AggregatedCell: ({ cell }:any) => <span>Somatória: <span style={{ color: 'green', fontWeight: 'bold' }}>R$ {cell.getValue()}</span></span>, Footer: ({ table }) => {
        const total = table.getFilteredRowModel().rows.reduce(
          (sum, row) => sum + parseMonetaryValue(row.original.contract?.total || "0"),
          0
        );
        return (
          <Stack>
            Total:
            <Box sx={{ color: 'green', fontWeight: 'bold' }}>
              R$ {total.toFixed(2).replace(".", ",")}
            </Box>
          </Stack>
        );
      },
    },
    { accessorKey: 'previous_ac_qty', header: 'Qtd. Ac. Anterior', aggregationFn: 'sum', Footer: ({ table }) => {
        const total = table.getFilteredRowModel().rows.reduce(
          (sum, row) => sum + (row.original.previous_ac_qty || 0),
          0
        );
        return <Box sx={{ fontWeight: 'bold' }}>Total: {total}</Box>;
      },
    },
    { accessorKey: 'current_quantity', header: 'Qtd. Atual', aggregationFn: 'sum', Footer: ({ table }) => {
        const total = table.getFilteredRowModel().rows.reduce(
          (sum, row) => sum + (row.original.current_quantity || 0),
          0
        );
        return <Box sx={{ fontWeight: 'bold' }}>Total: {total}</Box>;
      },
    },
    { accessorKey: 'accumulated', header: 'Qtd. Acumulada', aggregationFn: 'sum', Footer: ({ table }) => {
        const total = table.getFilteredRowModel().rows.reduce(
          (sum, row) => sum + (row.original.accumulated || 0),
          0
        );
        return <Box sx={{ fontWeight: 'bold' }}>Total: {total}</Box>;
      },
    },
    { accessorKey: 'balance_measured', header: 'Saldo a Medir', aggregationFn: 'sum', Footer: ({ table }) => {
        const total = table.getFilteredRowModel().rows.reduce(
          (sum, row) => sum + (row.original.balance_measured || 0),
          0
        );
        return <Box sx={{ fontWeight: 'bold' }}>Total: {total}</Box>;
      },
    },
  ], []);
  
  const generateLocalColumns = (data: LocalData[]) => {
    const dynamicColumns: MRT_ColumnDef<any>[] = [];
    const levels = data.length > 0 && data[0].levels ? Object.keys(data[0].levels) : [];
  
    levels.forEach(level => {
      dynamicColumns.push({ accessorKey: `levels.${level}`, header: level });
    });
  
    return [
      { accessorKey: 'package_name', header: 'Nome do Pacote' },
      { accessorKey: 'initial_dt', header: 'Data de Início' },
      { accessorKey: 'finish_dt', header: 'Data Final', Footer: ({ table }:any) => {
          const maxDate = table.getFilteredRowModel().rows.reduce((max:any, row:any) => {
            const date = new Date(row.original.finish_dt || 0);
            return date > max ? date : max;
          }, new Date(0));
          return (
            <Stack>
              Última Data:
              <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
                {maxDate.getTime() !== new Date(0).getTime() ? maxDate.toLocaleDateString() : ''}
              </Box>
            </Stack>
          );
        },
      },
      { accessorKey: 'valor_total_package', header: 'Valor Total', aggregationFn: (columnId:any, leafRows:any) => leafRows.reduce((sum:any, row:any) => sum + parseMonetaryValue(row.original.valor_total_package || "0"), 0), AggregatedCell: ({ cell }:any) => <span>Somatória: <span style={{ color: 'green', fontWeight: 'bold' }}>R$ {cell.getValue()}</span></span>, Footer: ({ table }:any) => {
          const total = table.getFilteredRowModel().rows.reduce(
            (sum:any, row:any) => sum + parseMonetaryValue(row.original.valor_total_package || "0"),
            0
          );
          return (
            <Stack>
              Total:
              <Box sx={{ color: 'green', fontWeight: 'bold' }}>
                R$ {total.toFixed(2).replace(".", ",")}
              </Box>
            </Stack>
          );
        },
      },
      ...dynamicColumns
    ];
  };
  

  const columns = useMemo(() => {
    if (selectedService === "local") {
      return generateLocalColumns(listConferenceData);
    } else {
      return serviceColumns;
    }
  }, [selectedService, listConferenceData]);

  const table = useMaterialReactTable({
    columns,
    data: listConferenceData,
    enableColumnFilterModes: true,
    enableGrouping: true,
    enableEditing: false,
    enableExpanding: true,
    createDisplayMode: 'row',
    onCreatingRowSave: handleCreatePackages,
    state: {
      isSaving,
    },
    initialState: { showColumnFilters: true },
    renderTopToolbar: ({ table }) => (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: 2 }}>
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
            Medição
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
            <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>Legenda</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Box sx={{ width: 15, height: 15, backgroundColor: '#FDE9D9', borderRadius: '50%' }} />
              <Typography variant="body2">Contrato</Typography>
              <Box sx={{ width: 15, height: 15, backgroundColor: '#E5E5E5', borderRadius: '50%' }} />
              <Typography variant="body2">Medições</Typography>
            </Box>
          </Box>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="measurement-select-label">Medição</InputLabel>
            <Select
              labelId="measurement-select-label"
              id="measurement-select"
              value={selectedMeasurement}
              label="Selecione Medição"
              onChange={(e) => setSelectedMeasurement(e.target.value)}
            >
              {listConstructionsMeasurements.map((measurement) => (
                <MenuItem key={measurement.id} value={measurement.id}>
                  {measurement.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="service-local"
              name="service-local"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <FormControlLabel value="service" control={<Radio />} label="Serviço" />
              <FormControlLabel value="local" control={<Radio />} label="Local" />
            </RadioGroup>
          </FormControl>
          <Tooltip title="Download da Tabela">
            <IconButton
              onClick={handleDownloadCsv}
              sx={{
                color: '#0076be',
                border: '1px solid #0076be',
                borderRadius: '4px',
                "&:hover": {
                  backgroundColor: 'rgba(0, 118, 190, 0.04)',
                },
              }}
            >
              <Download />
            </IconButton>
          </Tooltip>
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
    muiTablePaperProps: {
      elevation: 0,
    },
    mrtTheme: (theme) => ({
      baseBackgroundColor: '#FFFFFF',
      draggingBorderColor: theme.palette.secondary.main,
    }),
    enablePagination: false,
    enableBottomToolbar: false,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <MaterialReactTable table={table} />
      </Grid>
    </Grid>
  );
};
