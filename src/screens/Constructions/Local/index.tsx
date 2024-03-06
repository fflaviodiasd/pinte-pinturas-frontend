import React, { useState, useEffect } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMaterials } from "../../../hooks/useMaterials";
import { LevelComponent } from "../../../components/Level";
import { api } from "../../../services/api";
import { useParams } from "react-router-dom";

const Locations = () => {
  const [dynamicColumns, setDynamicColumns] = useState<MRT_ColumnDef<any>[]>(
    []
  );

  const { id: levelId } = useParams();

  const { listMaterialGroups } = useMaterials();

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const response = await api.get(`constructions/${levelId}/level_area/`);
        const level = response.data.results;
        const newDynamicColumns = [
          {
            accessorKey: "id",
            header: "ID",
            enableEditing: false,
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

  const table = useMaterialReactTable({
    columns: dynamicColumns,
    data: listMaterialGroups,
    createDisplayMode: "row",
    editDisplayMode: "cell",
    enableColumnPinning: true,
    enableEditing: true,
    enableRowActions: false,
    enableExpanding: true,
    enablePagination: false,
    getRowId: (row) => row.id,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    // onCreatingRowCancel: () => setValidationErrors({}),
    renderBottomToolbarCustomActions: () => (
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button color="primary" variant="contained">
          Salvar
        </Button>
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
