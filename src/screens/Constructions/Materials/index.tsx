import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Box, Button, Grid, useTheme } from "@mui/material";
import { useStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { TablePagination } from "../../../components/Table/Pagination";
import { useConstructions } from "../../../hooks/useConstructions";
import { ModalRegisterConstructionMaterial } from "../../../components/Modal/ModalRegisterConstructionMaterial";
import { Add, Launch } from "@mui/icons-material";
import { Navbar } from "../../../components/Navbar";
import { TitleScreen } from "../../../components/TitleScreen";
import Breadcrumb from "../../../components/Breadcrumb";

export const ListConstructionsMaterials = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const {
    listConstructionsMaterials,
    getAllConstructionsMaterials,
    disableConstructionMaterial,
  } = useConstructions();
  const theme = useTheme();

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

  const baseBackgroundColor =
    theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF";

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
    initialState: { showColumnFilters: true },
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
      sx: (theme) => ({
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: "#FAFAFA",
          },
      }),
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
        <Box
          sx={{ display: "flex", justifyContent: "right", marginRight: "1rem" }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setIsModalOpen(true);
              setModalMode("register");
            }}
          >
            <Add />
          </Button>
        </Box>

        <MaterialReactTable table={table} />
        <ModalRegisterConstructionMaterial
          modalOpen={modalOpen}
          handleClose={handleClose}
          mode={modalMode}
          selectedConstructionMaterialId={selectedConstructionMaterialId}
          handleDisable={handleDisable}
        />
      </Grid>
    </Grid>
  );
};
