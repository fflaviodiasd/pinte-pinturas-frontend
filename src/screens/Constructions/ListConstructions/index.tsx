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
import { numberToPercentage } from "../../../utils";

export const ListConstructions = () => {
  const navigate = useNavigate();
  const { listConstructions, getAllConstructions } = useConstructions();

  useEffect(() => {
    getAllConstructions();
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
      {
        accessorKey: "execution",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Execução",
        Cell: ({ cell }) =>
          numberToPercentage(Number(cell.row.original.execution)),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: listConstructions,
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
