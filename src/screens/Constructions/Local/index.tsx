import React, { useState, useEffect } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Grid } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LevelComponent } from "../../../components/Level";
import { api } from "../../../services/api";
import { useParams } from "react-router-dom";
import { useConstructions } from "../../../hooks/useConstructions";
import { Navbar } from "../../../components/Navbar";
import { TitleScreen } from "../../../components/TitleScreen";
import Breadcrumb from "../../../components/Breadcrumb";

const Locations = () => {
  const [dynamicColumns, setDynamicColumns] = useState<MRT_ColumnDef<any>[]>(
    []
  );

  const { id: levelId } = useParams();

  const { listConstructionsAreas, getAllConstructionsAreas } =
    useConstructions();

  useEffect(() => {
    getAllConstructionsAreas();
  }, []);

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const response = await api.get(`constructions/${levelId}/level_area/`);
        const level = response.data.results;
        const newDynamicColumns = [
          {
            accessorKey: "code",
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
    data: listConstructionsAreas,
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <MaterialReactTable table={table} />
      </Grid>
    </Grid>
  );
};

const queryClient = new QueryClient();

export const ListLocal = () => (
  <QueryClientProvider client={queryClient}>
    <Locations />
  </QueryClientProvider>
);
