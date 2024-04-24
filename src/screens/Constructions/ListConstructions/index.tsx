import { useEffect, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Chip, Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { EditIcon } from "../../../components/EditIcon";

import { BackgroundAvatar } from "../../../components/Avatar";
import { useConstructions } from "../../../hooks/useConstructions";
import { Navbar } from "../../../components/Navbar";
import Breadcrumb from "../../../components/Breadcrumb";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { numberToPercentage } from "../../../utils";

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
  const navigate = useNavigate();
  const { listConstructions, getAllConstructions } = useConstructions();

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
              onClick={() =>
                navigate(`/obras/${cell.row.original.id}/materiais`)
              }
              label="Editar"
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
        Cell: ({ cell }) => {
          const status = cell.getValue() === "true" ? "Ativo" : "Inativo";
          const chipColor = status === "Ativo" ? "success" : "error";
          return <Chip label={status} color={chipColor} />;
        },
        size: 170,
      },
      {
        accessorKey: "corporateName",
        header: "Nome da Obra",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        Cell: ({ cell }) => (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",

              alignItems: "center",
            }}
          >
            {cell.row.original.corporateName && (
              <BackgroundAvatar avatarName={cell.row.original.corporateName} />
            )}
            {cell.row.original.corporateName}
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flexGrow: 1, marginRight: '8px' }}>
              <BorderLinearProgress variant="determinate" value={cell.row.original.execution} />
            </div>
            <span style={{ whiteSpace: 'nowrap' }}>{cell.row.original.execution.toFixed(2)}%</span>
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
      baseBackgroundColor: "#FFFFFF",
      draggingBorderColor: theme.palette.secondary.main,
    }),
    enablePagination: false,
    enableBottomToolbar: false,
  });

  return (
    <Grid container spacing={2}>
      <Navbar
        title="Obras"
        showBreadcrumb={true}
        breadcrumb={
          <Breadcrumb breadcrumbPath1="Obras" breadcrumbPath2="Listagem" />
        }
      />
      <Grid item xs={12} lg={12}>
        <MaterialReactTable table={table} />
      </Grid>
    </Grid>
  );
};
