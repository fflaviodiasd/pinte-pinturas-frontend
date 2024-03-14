import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Box, Chip, Grid, TextField, useTheme } from "@mui/material";
import { useStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { BackgroundAvatar } from "../../../../components/Avatar";
import { useConstructions } from "../../../../hooks/useConstructions";
import { FormTeamMembers } from "../FormTeamMembers";

export const ListTeamMembers = ({ teamId }: any) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { listConstructionsTeamMembers, getAllConstructionsTeamMembers } =
    useConstructions();
  const theme = useTheme();

  const [selectedTeamMembersId, setselectedTeamMembersId] = useState<number>(0);

  const [modalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const baseBackgroundColor =
    theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF";

  useEffect(() => {
    if (teamId) {
      getAllConstructionsTeamMembers(teamId);
    }
  }, [teamId]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
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
        header: "Nome",
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
        accessorKey: "role",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Cargo",
      },
      {
        accessorKey: "profile",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Perfil",
      },
      {
        accessorKey: "cellPhone",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Celular",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: listConstructionsTeamMembers,
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
        <Box style={{ padding: "1rem" }}>
          <FormTeamMembers teamId={teamId} />
        </Box>
        <MaterialReactTable table={table} />
      </Grid>
    </Grid>
  );
};
