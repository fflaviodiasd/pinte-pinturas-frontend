import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import {
  Checkbox,
  Grid,
  Paper,
  darken,
  lighten,
  useTheme,
} from "@mui/material";
import { TitleScreen } from "../../../components/TitleScreen";
import { useStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { EditIcon } from "../../../components/EditIcon";
import { TablePagination } from "../../../components/Table/Pagination";
import { ModalDisable } from "../../../components/Table/ModalDisable";
import { Delete, Launch } from "@mui/icons-material";
import { useMaterials } from "../../../hooks/useMaterials";
import { ModalRegisterMaterial } from "../../../components/Modal/Materials/Register";

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
            <Launch sx={{ color: "gray" }} />
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
            <ModalRegisterMaterial />
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
      </Grid>
    </Grid>
  );
};
