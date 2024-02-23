import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip, useTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import { useMaterials } from "../../../../hooks/useMaterials";

const MaterialsGroups = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const { listMaterialGroups, getAllMaterialGroups, updateMaterialGroup } =
    useMaterials();

  const [selectedMaterialGroupId, setselectedMaterialGroupId] =
    useState<number>(0);

  const theme = useTheme();
  const baseBackgroundColor =
    theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF";

  useEffect(() => {
    getAllMaterialGroups();
  }, []);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "group",
        header: "Grupo",
      },
    ],
    [validationErrors]
  );

  const handleEditGroup = async () => {
    await updateMaterialGroup(selectedMaterialGroupId);
    table.setEditingRow(null);
  };

  const table = useMaterialReactTable({
    columns,
    data: listMaterialGroups,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    enablePagination: false,
    enableBottomToolbar: false,
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
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    //onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleEditGroup,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <div>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => {
                table.setEditingRow(row);
                setselectedMaterialGroupId(row.original.id!);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="outlined"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Novo Grupo
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
};

const queryClient = new QueryClient();

export const ListMaterialGroups = () => (
  <QueryClientProvider client={queryClient}>
    <MaterialsGroups />
  </QueryClientProvider>
);
