/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { Launch } from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { ModalMaterialGroups } from "../../../components/Modal/ModalMaterialGroups/ModalGroups";
import { ModalRegisterMaterial } from "../../../components/Modal/ModalRegisterMaterial";
import { TablePagination } from "../../../components/Table/Pagination";
import { useMaterials } from "../../../hooks/useMaterials";
// import { Button } from "../../../components/Button";

import { useStyles } from "./styles";

export const ListMaterials = () => {
  const { classes } = useStyles();
  // const navigate = useNavigate();
  const {
    listMaterials,
    getAllMaterials,
    disableMaterial,
    pagination,
    handleChangePagination,
  } = useMaterials();

  const [selectedMaterialId, setselectedMaterialId] = useState<number>(0);
  const [modalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "register">("register");

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleDisable = () => {
    disableMaterial(selectedMaterialId);
    setIsModalOpen(false);
  };

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
      sx: () => ({
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: "#FAFAFA",
          },
      }),
    },
    mrtTheme: (theme) => ({
      draggingBorderColor: theme.palette.secondary.main,
    }),
    enablePagination: false,
    enableBottomToolbar: false,
  });

  return (
    <Grid container>
      <Grid item sm={12} md={12} lg={12} className={classes.titleContainer}>
        <Typography className={classes.title}>Materiais</Typography>

        <div style={{ display: "flex", marginRight: 12 }}>
          <ModalMaterialGroups />

          <Button
            onClick={() => {
              setIsModalOpen(true);
              setModalMode("register");
            }}
            className={classes.registerButton}
            variant="contained"
          >
            Cadastrar
          </Button>
        </div>
      </Grid>

      <Grid item xs={12} lg={12} className={classes.tableContainer}>
        <MaterialReactTable table={table} />
        {Boolean(listMaterials.length) && (
          <TablePagination
            count={pagination.pageQuantity}
            page={pagination.currentPage}
            onChange={handleChangePagination}
          />
        )}
      </Grid>

      <ModalRegisterMaterial
        modalOpen={modalOpen}
        handleClose={handleClose}
        mode={modalMode}
        selectedMaterialId={selectedMaterialId}
        handleDisable={handleDisable}
      />
    </Grid>
  );
};
