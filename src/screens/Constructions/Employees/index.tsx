/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { Add as AddIcon, Download, Launch } from "@mui/icons-material";
import {
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleFullScreenButton,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { useConstructions } from "../../../hooks/useConstructions";

import { ModalRegisterConstructionMaterial } from "../../../components/Modal/ModalRegisterConstructionMaterial";
import { EmptyTableText } from "../../../components/Table/EmptyTableText";
import { Indicators } from "../Indicators";
import { useStyles } from "./styles";
import { SectionTitle } from "../../../components/SectionTitle";

export const ListConstructionsEmployees = () => {
  const { classes } = useStyles();

  const {
    listEmployeesMaterials,
    getAllEmployeesMaterials,
    disableConstructionMaterial,
  } = useConstructions();

  const [selectedConstructionMaterialId, setSelectedConstructionMaterialId] =
    useState<number>(0);
  const [modalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "register">("register");
  const [showIndicators, setShowIndicators] = useState(false); // Estado para controlar a exibição do componente Indicators
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null); // Estado para armazenar o id do colaborador selecionado

  const handleDisable = () => {
    disableConstructionMaterial(selectedConstructionMaterialId);
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleDownloadCsv = () => {}

  useEffect(() => {
    getAllEmployeesMaterials();
  }, []);

  const filteredEmployees = useMemo(() => {
    const employees = listEmployeesMaterials.map(({ id, name }) => ({ id, name }));
    console.log("Filtered Employees:", employees); // Adicionado para verificar os dados
    return employees;
  }, [listEmployeesMaterials]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        id: "edit",
        header: "",
        columnDefType: "display",
        Cell: ({ cell }) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
           <Launch
              sx={{ cursor: "pointer", color: "#C5C7C8" }}
              onClick={() => {
                setSelectedConstructionMaterialId(cell.row.original.id!);
                setSelectedEmployeeId(cell.row.original.id!); // Armazena o id do colaborador selecionado
                setShowIndicators(true); // Alterar estado para mostrar o componente Indicators
              }}
            />

          </div>
        ),
      },
      {
        accessorKey: "material",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Nome",
      },
      {
        accessorKey: "group",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Valor Total",
      },
      {
        accessorKey: "productionBatch",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Valor Produção",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: listEmployeesMaterials,
    enableColumnFilterModes: true,
    enablePagination: false,
    enableBottomToolbar: false,
    initialState: { showColumnFilters: true },
    renderEmptyRowsFallback: () => <EmptyTableText />,
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
    muiTablePaperProps: {
      elevation: 0,
    },
    muiTableBodyProps: {
      sx: {
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: "#FAFAFA",
          },
      },
    },
    renderTopToolbar: ({ table }) => (
      <Grid item lg={12} className={classes.headerTableContainer}>
        <SectionTitle title="Funcionários da Obra" />

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <MRT_ToggleFiltersButton
            table={table}
            className={classes.toolbarButton}
          />
          <MRT_ShowHideColumnsButton
            table={table}
            className={classes.toolbarButton}
          />
          <MRT_ToggleDensePaddingButton
            table={table}
            className={classes.toolbarButton}
          />
          <MRT_ToggleFullScreenButton
            table={table}
            className={classes.toolbarButton}
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
        </div>
      </Grid>
    ),
    mrtTheme: (theme) => ({
      draggingBorderColor: theme.palette.secondary.main,
    }),
  });

  return (
    <Grid item lg={12} className={classes.container}>
      {showIndicators ? (
        <Indicators collaborators={filteredEmployees} selectedEmployeeId={selectedEmployeeId} /> // Passar dados filtrados e id do colaborador selecionado para Indicators
      ) : (
        <MaterialReactTable table={table} />
      )}
      {/* <ModalRegisterConstructionMaterial
        modalOpen={modalOpen}
        handleClose={handleClose}
        mode={modalMode}
        selectedConstructionMaterialId={selectedConstructionMaterialId}
        handleDisable={handleDisable}
      /> */}
    </Grid>
  );
};
