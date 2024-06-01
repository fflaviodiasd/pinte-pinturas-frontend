import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_TableOptions,

} from "material-react-table";

import { Box, Grid, Tooltip, useTheme, Typography, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useConstructions } from "../../../hooks/useConstructions";
import { Download } from "@mui/icons-material";

import { IconButton } from "@mui/material";
import Papa from "papaparse";
import { useConference } from "../../../hooks/useConference"; // Importe seu hook

interface DropdownOption {
  id: any;
  name: any;
  label: string;
  value: any;
}

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
    addConstructionMeasurements
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
    console.log(`${selectedMeasurement},${selectedService}`);
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

  const baseBackgroundColor =
    theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF";

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

  const serviceColumns: MRT_ColumnDef<any>[] = useMemo(() => [
    { accessorKey: 'service_name', header: 'Nome do Serviço' },
    { accessorKey: 'step_service_name', header: 'Etapa do Serviço' },
    { accessorKey: 'unit_service', header: 'Unidade' },
    { accessorKey: 'registered_quantity', header: 'Qtd. Cadastrada' },
    { accessorKey: 'contract.amount', header: 'Qtd. Contrato', muiTableBodyCellProps: { sx: { backgroundColor: '#FFFACD' } } },
    { accessorKey: 'contract.price_unit', header: 'Preço Unit.', muiTableBodyCellProps: { sx: { backgroundColor: '#FFFACD' } } },
    { accessorKey: 'contract.total', header: 'Total', muiTableBodyCellProps: { sx: { backgroundColor: '#FFFACD' } } },
    { accessorKey: 'previous_ac_qty', header: 'Qtd. Ac. Anterior' },
    { accessorKey: 'current_quantity', header: 'Qtd. Atual' },
    { accessorKey: 'accumulated', header: 'Qtd. Acumulada' },
    { accessorKey: 'balance_measured', header: 'Saldo a Medir' },
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
      { accessorKey: 'finish_dt', header: 'Data Final' },
      { accessorKey: 'valor_total_package', header: 'Valor Total' },
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
            }
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
    muiTableContainerProps: {
      sx: {
        overflowX: 'auto',  
      },
    },
    mrtTheme: (theme) => ({
      baseBackgroundColor: baseBackgroundColor,
      draggingBorderColor: theme.palette.secondary.main,
    }),
    enablePagination: false,
    enableBottomToolbar: false,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <Box sx={{ overflowX: 'auto' }}>  
          <MaterialReactTable table={table} />
        </Box>
      </Grid>
    </Grid>
  );
};
