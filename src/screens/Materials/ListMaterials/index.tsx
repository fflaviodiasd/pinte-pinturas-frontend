import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Button, Grid, Paper, useTheme } from "@mui/material";
import { TitleScreen } from "../../../components/TitleScreen";
import { useStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { TablePagination } from "../../../components/Table/Pagination";
import { Launch } from "@mui/icons-material";
import { useMaterials } from "../../../hooks/useMaterials";
import { ModalMaterialGroups } from "../../../components/Modal/Materials/Groups";
import { ModalRegisterMaterial } from "../../../components/Modal/ModalRegisterMaterial";

export const ListMaterials = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const {
    listMaterials,
    getAllMaterials,
    disableMaterial,
    pagination,
    handleChangePagination,
  } = useMaterials();
  const theme = useTheme();

  const [selectedMaterialId, setselectedMaterialId] = useState<number>(0);
  const [modalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "register">("register");

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const baseBackgroundColor =
    theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF";

  useEffect(() => {
    getAllMaterials();
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
                setselectedMaterialId(cell.row.original.id!);
                setIsModalOpen(true);
                setModalMode("edit");
              }}
            />
          </div>
        ),
      },
      {
        accessorKey: "name",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Nome",
      },
      {
        accessorKey: "group",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Grupo",
      },
      {
        accessorKey: "unit",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Unidade",
      },
      {
        accessorKey: "expectedConsumption",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Consumo Esperado",
      },
      {
        accessorKey: "consumptionRealized",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Consumo Realizado",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: listMaterials,
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
        <Paper className={classes.paper}>
          <div className={classes.searchBarContainer}>
            <TitleScreen title="Materiais" />
            <div style={{ display: "flex", gap: "1rem" }}>
              <ModalMaterialGroups />
              <Button
                className={classes.registerButton}
                onClick={() => {
                  setIsModalOpen(true);
                  setModalMode("register");
                }}
              >
                Cadastrar
              </Button>
            </div>
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12} lg={12}>
        <MaterialReactTable table={table} />
        {Boolean(listMaterials.length) && (
          <TablePagination
            count={pagination.pageQuantity}
            page={pagination.currentPage}
            onChange={handleChangePagination}
          />
        )}
        <ModalRegisterMaterial
          modalOpen={modalOpen}
          handleClose={handleClose}
          mode={modalMode}
        />
      </Grid>
    </Grid>
  );
};
