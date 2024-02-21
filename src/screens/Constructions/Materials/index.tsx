import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Grid, useTheme } from "@mui/material";
import { useStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { TablePagination } from "../../../components/Table/Pagination";
import { useConstructions } from "../../../hooks/useConstructions";

export const ListConstructionsMaterials = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { listConstructionsMaterials, getAllConstructionsMaterials } =
    useConstructions();
  const theme = useTheme();

  const [selectedConstructionMaterialId, setselectedConstructionMaterialId] =
    useState<number>(0);
  const [modalOpen, setIsModalOpen] = useState(false);

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
        <MaterialReactTable table={table} />
      </Grid>
    </Grid>
  );
};
