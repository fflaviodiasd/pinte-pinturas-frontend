import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import { useConstructions } from "../../../hooks/useConstructions";
import { useParams } from "react-router-dom";
import { api } from "../../../services/api";
import { LevelComponent } from "../../../components/Level";
import { ListTeamMembers } from "../Teams/ListTeamMembers";

const Locations = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const [dynamicColumns, setDynamicColumns] = useState<MRT_ColumnDef<any>[]>(
    []
  );
  const { id } = useParams();

  const {
    listConstructionsLocations,
    getAllConstructionsLocations,
    addConstructionLocal,
  } = useConstructions();

  const [selectedLocalId, setselectedLocalId] = useState<number>(0);

  useEffect(() => {
    getAllConstructionsLocations();
  }, []);

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const response = await api.get(`constructions/${id}/level_area/`);
        const level = response.data.results;
        const newDynamicColumns = [
          {
            accessorKey: "id",
            header: "ID",
            enableEditing: false,
            size: 80,
          },
          {
            accessorKey: "code",
            header: "ID",
            enableEditing: true,
            size: 80,
          },
          {
            accessorKey: "micro",
            header: "Micro",
          },
          {
            accessorKey: "checklist",
            header: "Checklist",
          },
        ];

        level.forEach((level: any, index: any) => {
          newDynamicColumns.push({
            accessorKey: `nivel_${index}`,
            header: level.name,
          });
        });
        setDynamicColumns(newDynamicColumns);
      } catch (error) {
        console.error("Erro ao buscar os níveis:", error);
      }
    };

    fetchLevel();
  }, []);

  //CREATE action
  const handleCreateLocal: MRT_TableOptions<any>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    await addConstructionLocal(values, dynamicColumns);
  };

  //UPDATE action
  const handleEditLocal: MRT_TableOptions<any>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    //update request
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<any>) => {
    if (window.confirm("Tem certeza que deseja deletar essa área?")) {
      //disable request
    }
  };

  const table = useMaterialReactTable({
    columns: dynamicColumns,
    data: listConstructionsLocations,
    createDisplayMode: "row",
    editDisplayMode: "cell",
    enableClickToCopy: false,
    enableColumnPinning: true,
    enableEditing: true,
    enableRowActions: true,

    enableExpandAll: false,
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
      sx: {
        transform: row.getIsExpanded() ? "rotate(180deg)" : "rotate(-90deg)",
        transition: "transform 0.2s",
      },
    }),
    renderDetailPanel: ({ row }) => "checklist",
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateLocal,
    onEditingRowSave: handleEditLocal,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderBottomToolbarCustomActions: () => (
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button>Salvar</Button>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <div>
        <LevelComponent />
        <Button
          variant="contained"
          onClick={() => {
            table.setCreatingRow(true);
          }}
        >
          Adicionar Linha
        </Button>
      </div>
    ),
  });

  return <MaterialReactTable table={table} />;
};

const queryClient = new QueryClient();

export const ListLocal = () => (
  <QueryClientProvider client={queryClient}>
    <Locations />
  </QueryClientProvider>
);
