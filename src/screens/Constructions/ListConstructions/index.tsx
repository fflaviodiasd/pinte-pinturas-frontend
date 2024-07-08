/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chip, Grid, Typography } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { EmptyTableText } from "../../../components/Table/EmptyTableText";
import { BackgroundAvatar } from "../../../components/BackgroundAvatar";
import { useConstructions } from "../../../hooks/useConstructions";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { EditIcon } from "../../../components/EditIcon";

import { styled } from "@mui/material/styles";

import { useStyles } from "./styles";
import { Delete } from "@mui/icons-material";
import { ModalDisable } from "../../../components/Table/ModalDisable";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#455a64" : "#455a64",
  },
}));

export const ListConstructions = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { listConstructions, getAllConstructions, disableConstruction } = useConstructions();

  const [selectedObraId, setselectedObraId] =
    useState<number>(0);
  const [selectedObraName, setselectedObraName] =
    useState<string>("");

  console.log("OBRA>>>>>>", selectedObraId)

  const [modalOpen, setIsModalOpen] = useState(false);
  
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleDisable = () => {
    disableConstruction(selectedObraId);
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllConstructions();
  }, []);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        id: "edit",
        header: "",
        columnDefType: "display",
        size: 50,
        Cell: ({ cell }) => (
          <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <EditIcon
            onClick={() => navigate(`/obras/${cell.row.original.id}/locais`)}
            label="Editar"
          />
          <Delete
            sx={{ cursor: "pointer", color: "#C5C7C8" }}
            onClick={() => {
              setselectedObraId(cell.row.original.id!);
              setselectedObraName(cell.row.original.name);

              setIsModalOpen(true);
            }}
          />
          </div>
        ),
      },
      {
        header: "Status",
        accessorFn: (originalRow) => (originalRow.active ? "true" : "false"),
        id: "active",
        accessorKey: "active",
        filterVariant: "checkbox",
        size: 100,
        Cell: ({ cell }) => {
          const status = cell.getValue() === "true" ? "Ativo" : "Inativo";
          const chipColor = status === "Ativo" ? "success" : "error";
          return <Chip label={status} color={chipColor} />;
        },
      },
      {
        accessorKey: "corporate_name",
        header: "Nome da Obra",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        Cell: ({ cell }) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {cell.row.original.corporate_name && (
              <BackgroundAvatar avatarName={cell.row.original.corporate_name} />
            )}
            <Typography style={{ marginLeft: 8 }}>
              {cell.row.original.corporate_name}
            </Typography>
          </div>
        ),
      },
      {
        accessorKey: "customer",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Cliente",
      },
      {
        accessorKey: "supervisor",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Encarregado",
      },
      // {
      //   accessorKey: "responsible",
      //   header: "Encarregado",
      //   Cell: ({ cell }) => {
      //     const responsible = cell.row.original.responsible;
      //     if (responsible && typeof responsible === 'object' && responsible.name) {
      //       return responsible.name;
      //     }
      //     return 'Não definido';
      //   },
      // },
      {
        accessorKey: "execution",
        enableColumnFilterModes: false,
        filterFn: "betweenInclusive",
        muiFilterSliderProps: {
          marks: true,
          max: 100,
          min: 0,
          step: 1,
          valueLabelDisplay: "auto",
        },
        filterVariant: "range-slider",
        header: "Execução",
        Cell: ({ cell }) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flexGrow: 1, marginRight: "8px" }}>
              <BorderLinearProgress
                variant="determinate"
                value={cell.row.original.execution}
              />
            </div>
            <span style={{ whiteSpace: "nowrap" }}>
              {cell.row.original.execution.toFixed(2)}%
            </span>
          </div>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: listConstructions,
    enableColumnFilterModes: true,
    enablePagination: false,
    enableBottomToolbar: false,
    initialState: { showColumnFilters: true, density: "compact" },
    muiFilterTextFieldProps: (props) => {
      return {
        placeholder: `Filtrar por ${props.column.columnDef.header}`,
      };
    },
    muiFilterCheckboxProps: (props) => {
      return {
        title: `Filtrar por ${props.column.columnDef.header}`,
      };
    },
    renderEmptyRowsFallback: () => <EmptyTableText />,
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
    mrtTheme: (theme) => ({
      draggingBorderColor: theme.palette.secondary.main,
    }),
  });

  return (
    <Grid container>
      <Grid item sm={12} md={12} lg={12} className={classes.headerContainer}>
        <Breadcrumb breadcrumbPath1="Obras" breadcrumbPath2="Listagem" />

        <Typography className={classes.title}>Obras</Typography>
      </Grid>

      <Grid item xs={12} lg={12} className={classes.tableContainer}>
        <MaterialReactTable table={table} />
      </Grid>

      <ModalDisable
        modalOpen={modalOpen}
        handleCloseModal={handleClose}
        handleDisable={handleDisable}
        selectedName={selectedObraName}
      />
    </Grid>
  );
};
