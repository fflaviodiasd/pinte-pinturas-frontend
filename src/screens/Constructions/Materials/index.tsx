/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { Add as AddIcon, Launch } from "@mui/icons-material";
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

import { useStyles } from "./styles";
import { SectionTitle } from "../../../components/SectionTitle";

export const ListConstructionsMaterials = () => {
  const { classes } = useStyles();

  const {
    listConstructionsMaterials,
    getAllConstructionsMaterials,
    disableConstructionMaterial,
  } = useConstructions();

  const [selectedConstructionMaterialId, setselectedConstructionMaterialId] =
    useState<number>(0);
  const [modalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "register">("register");

  const handleDisable = () => {
    disableConstructionMaterial(selectedConstructionMaterialId);
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllConstructionsMaterials();
  }, []);

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
                setselectedConstructionMaterialId(cell.row.original.id!);
                setIsModalOpen(true);
                setModalMode("edit");
              }}
            />
          </div>
        ),
      },
      {
        accessorKey: "material",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Material",
      },
      {
        accessorKey: "group",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Grupo",
      },
      {
        accessorKey: "productionBatch",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Lote",
      },
      {
        accessorKey: "price",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Preço",
      },
      {
        accessorKey: "expirationDate",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Data Validade",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: listConstructionsMaterials,
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
        <SectionTitle title="Materiais" />

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
          <Tooltip title="Adicionar Material">
            <IconButton
              onClick={() => {
                setIsModalOpen(true);
                setModalMode("register");
              }}
              className={classes.toolbarButton}
            >
              <AddIcon />
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
      <MaterialReactTable table={table} />

      <ModalRegisterConstructionMaterial
        modalOpen={modalOpen}
        handleClose={handleClose}
        mode={modalMode}
        selectedConstructionMaterialId={selectedConstructionMaterialId}
        handleDisable={handleDisable}
      />
    </Grid>
  );
};
