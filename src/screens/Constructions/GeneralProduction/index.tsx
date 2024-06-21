import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Row,
  type MRT_ColumnDef,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleFiltersButton,
  MRT_ShowHideColumnsButton,
} from "material-react-table";

import {
  Box,
  Grid,
  Tooltip,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { Download } from "@mui/icons-material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useConference } from "../../../hooks/useConference";
import Papa from "papaparse";
import { Stack } from "@mui/material";
export const GeneralProduction = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const {
    listMeasurementsReports,
    listEmployeesReports,
    fetchMeasurements,
    fetchEmployees,
    fetchTeams,
    getProductionData,
    listTeamsReports,

    getReportsWithMeasurement,

    getReportsWithTeams,
    getReportsWithEmployee,
  } = useConference();
  const [isSaving, setIsSaving] = useState(false);

  const [selectedMedicao, setSelectedMedicao] = useState<number>();
  const [selectedFuncionario, setSelectedFuncionario] = useState("");
  const [selectedEquipe, setSelectedEquipe] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      fetchMeasurements();
      getProductionData().then((data) => setTableData(data));
    }
  }, [id]);

  const handleMedicaoChange = async (event: any) => {
    const medicao = event.target.value;
    setSelectedMedicao(medicao);
    setSelectedFuncionario("");
    if (medicao) {
      await fetchEmployees(medicao);
      const data = await getReportsWithMeasurement(medicao);
      console.log("dataMedicao:", data);
      setTableData(data);
    }
  };

  const handleFuncionarioChange = async (event: any) => {
    const funcionario = event.target.value;
    setSelectedFuncionario(funcionario);
    setSelectedEquipe(listTeamsReports);

    if (selectedMedicao && funcionario) {
      await fetchTeams(selectedMedicao, funcionario);
      console.log("selectedMedicao:", selectedMedicao);
      console.log("funcionario:", funcionario);
      const data = await getReportsWithEmployee(selectedMedicao, funcionario);
      console.log("dataFuncionario:", data);
      setTableData(data);
    }
  };

  const handleEquipeChange = async (event: any) => {
    const equipe = event.target.value;
    console.log(">>>>>>>", equipe);
    setSelectedEquipe(equipe);
    console.log("selectedEquipe:", selectedEquipe);
    console.log("selectedFuncionario:", selectedFuncionario);
    console.log("selectedMedicao:", selectedMedicao);

    if (selectedMedicao && selectedFuncionario && equipe) {
      const data = await getReportsWithTeams(
        selectedMedicao,
        selectedFuncionario,
        equipe
      );
      console.log("dataEquipe:", data);
      setTableData(data);
    }
  };

  const handleDownloadCsv = () => {
    const flattenedData = tableData.map((item) => {
      return {
        package_name: item.package_name,
        initial_dt: item.initial_dt,
        finish_dt: item.finish_dt,
        total: item.total,
        checklist: item.checklist,
        ...item.levels,
      };
    });

    const csv = Papa.unparse(flattenedData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "production_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const parseMonetaryValue = (value: string) => {
    console.log("value:", value);
    const dado = parseFloat(
      value
        .replace(/[R$\s]/g, "")
        .replace(".", "")
        .replace(",", ".")
    );
    console.log("dado:", dado);
    return dado;
  };

  const generateProductionColumns = (data: any[]) => {
    const dynamicColumns: MRT_ColumnDef<any>[] = [];
    const levels =
      data && data.length > 0 && data[0].levels
        ? Object.keys(data[0].levels)
        : [];

    levels.forEach((level) => {
      dynamicColumns.push({
        accessorKey: `levels.${level}`,
        header: level,
      });
    });

    return [
      {
        accessorKey: "package_name",
        header: "Nome do Pacote",
      },
      {
        accessorKey: "initial_dt",
        header: "Data de Início",
      },
      {
        accessorKey: "finish_dt",
        header: "Data Final",
      },
      {
        accessorKey: "total",
        header: "Valor Total",
        aggregationFn: (columnId: any, leafRows: any) =>
          leafRows
            .reduce((sum: any, row: any) => {
              const value = parseMonetaryValue(row.original.total || "0");
              return sum + value;
            }, 0)
            .toFixed(2)
            .replace(".", ","),
        AggregatedCell: ({ cell }: any) => (
          <span>
            Somatória:{" "}
            <span style={{ color: "green", fontWeight: "bold" }}>
              R$ {cell.getValue()}
            </span>
          </span>
        ),
        Footer: ({ table }: any) => {
          const total = table
            .getFilteredRowModel()
            .rows.reduce((sum: any, row: any) => {
              const value = parseMonetaryValue(row.original.total || "0");
              return sum + value;
            }, 0);
          return (
            <Stack>
              Total:
              <Box sx={{ color: "green", fontWeight: "bold" }}>
                R$ {total.toFixed(2).replace(".", ",")}
              </Box>
            </Stack>
          );
        },
      },
      {
        accessorKey: "checklist",
        header: "Checklist",
      },
      ...dynamicColumns,
    ];
  };

  const columns = useMemo(
    () => generateProductionColumns(tableData),
    [tableData]
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData,
    enableColumnFilterModes: true,
    enableEditing: false,
    enableExpanding: true,
    createDisplayMode: "row",
    state: { isSaving },
    enableGrouping: true,
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
              Produção
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <FormControl variant="outlined" sx={{ minWidth: 160 }}>
              <InputLabel id="medicao-label">Medição</InputLabel>
              <Select
                labelId="medicao-label"
                id="medicao"
                label="Medição"
                value={selectedMedicao}
                onChange={handleMedicaoChange}
              >
                {listMeasurementsReports.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ minWidth: 160 }}>
              <InputLabel id="funcionario-label">Funcionário</InputLabel>
              <Select
                labelId="funcionario-label"
                id="funcionario"
                label="Funcionário"
                value={selectedFuncionario}
                onChange={handleFuncionarioChange}
                disabled={!selectedMedicao}
              >
                {listEmployeesReports.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ minWidth: 160 }}>
              <InputLabel id="equipe-label">Equipe</InputLabel>
              <Select
                labelId="equipe-label"
                id="equipe"
                label="Equipe"
                value={selectedEquipe}
                onChange={handleEquipeChange}
                disabled={!selectedFuncionario}
              >
                {listTeamsReports.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: "#FAFAFA",
          },
      }),
    },
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.default,
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
