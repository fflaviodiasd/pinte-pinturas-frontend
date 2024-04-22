import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Button, Chip, Grid, Paper, useTheme } from "@mui/material";
import { TitleScreen } from "../../../components/TitleScreen";
import { useStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { EditIcon } from "../../../components/EditIcon";
import { TablePagination } from "../../../components/Table/Pagination";
import { BackgroundAvatar } from "../../../components/Avatar";
import { useConstructions } from "../../../hooks/useConstructions";
import { Navbar } from "../../../components/Navbar";
import Breadcrumb from "../../../components/Breadcrumb";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

interface responsible {
  name: string | null;
}
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#455a64' : '#455a64',
  },
}));


export const ListConstructions = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { listConstructions, getAllConstructions } = useConstructions();
  const theme = useTheme();

  const [selectedConstructionId, setselectedConstructionId] =
    useState<number>(0);

  const baseBackgroundColor =
    theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF";

  useEffect(() => {
    getAllConstructions();
    console.log(listConstructions, 'listConstructions')
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
            <EditIcon
              onClick={() => navigate(`/obras/${cell.row.original.id}`)}
              label="Editar"
            />
          </div>
        ),
      },
      {
        header: "Status",
        accessorFn: (originalRow) => (originalRow.active ? "true" : "false"),
        id: "active",
        filterVariant: "checkbox",
        Cell: ({ cell }) => {
          const status = cell.getValue() === "true" ? "Ativo" : "Inativo";
          const chipColor = status === "Ativo" ? "success" : "error";
          return <Chip label={status} color={chipColor} />;
        },
        size: 170,
      },

      {
        accessorKey: "name",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Nome da Obra",
        Cell: ({ cell }) => (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",

              alignItems: "center",
            }}
          >
            {cell.row.original.name && (
              <BackgroundAvatar avatarName={cell.row.original.name} />
            )}
            {cell.row.original.name}
          </div>
        ),
      },
      {
        accessorKey: "customer.name",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Cliente",
      },
      {
        accessorKey: "responsible.name",
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
        accessorKey: "percentageCompleted",
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flexGrow: 1, marginRight: '8px' }}>
              <BorderLinearProgress variant="determinate" value={cell.row.original.percentageCompleted} />
            </div>
            <span style={{ whiteSpace: 'nowrap' }}>{cell.row.original.percentageCompleted.toFixed(2)}%</span>
          </div>
        ),
      }
      
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: listConstructions,
    enableColumnFilterModes: true,
  
    initialState: { showColumnFilters: true, density: 'compact'},
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
      <Navbar
        title={<TitleScreen title="Obras" />}
        showBreadcrumb={true}
        breadcrumb={
          <Breadcrumb breadcrumbPath1={"Obras"} breadcrumbPath2={"Listagem"} />
        }
      />
      <Grid item xs={12} lg={12}>
        <MaterialReactTable table={table} />
      </Grid>
    </Grid>
  );
};
