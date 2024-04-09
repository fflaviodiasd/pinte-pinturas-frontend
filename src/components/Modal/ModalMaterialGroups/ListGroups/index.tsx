import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
  MRT_TableOptions,
  MRT_Row,
} from "material-react-table";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import { useMaterials } from "../../../../hooks/useMaterials";
import { Button } from "../../../Button";
import { Delete } from "@mui/icons-material";

const MaterialsGroups = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const {
    listMaterialGroups,
    getAllMaterialGroups,
    updateMaterialGroup,
    addMaterialGroups,
    disableMaterialGroup,
  } = useMaterials();

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

  //CREATE action
  const handleCreateGroup: MRT_TableOptions<any>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    await addMaterialGroups(values);
  };

  //UPDATE action
  const handleEditGroup: MRT_TableOptions<any>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    await updateMaterialGroup(selectedMaterialGroupId, values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<any>) => {
    if (
      window.confirm("Tem certeza que deseja deletar esse grupo de material?")
    ) {
      disableMaterialGroup(row.original.id!);
    }
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
    onCreatingRowSave: handleCreateGroup,
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
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => openDeleteConfirmModal(row)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </div>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        label="Novo Grupo"
        color="secondary"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      />
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
