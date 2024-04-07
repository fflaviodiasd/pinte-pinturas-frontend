import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleFiltersButton,
  MRT_ShowHideColumnsButton,
  MRT_Localization,
} from "material-react-table";

import { Box, Grid, Tooltip, useTheme, Typography} from "@mui/material";
import { useStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { TablePagination } from "../../../components/Table/Pagination";
import { useConstructions } from "../../../hooks/useConstructions";
import { ModalRegisterConstructionMaterial } from "../../../components/Modal/ModalRegisterConstructionMaterial";
import { ModalRegisterConstructionServices } from "../../../components/Modal/ModalRegisterConstructionServices";
import { Add, Launch, Edit, Delete, Info } from "@mui/icons-material";
import { Navbar } from "../../../components/Navbar";
import { TitleScreen } from "../../../components/TitleScreen";
import Breadcrumb from "../../../components/Breadcrumb";
import { Button } from "../../../components/Button";
import { IconButton } from "@mui/material";
import ServiceStepTable from "./ServiceStepsTable";
export const ServicesConstructions = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const {
    listConstructionsMaterials,
    getAllConstructionsMaterials,
    disableConstructionMaterial,
  } = useConstructions();
  const theme = useTheme();

  const [selectedConstructionMaterialId, setselectedConstructionMaterialId] =
    useState<number>(0);
  const [selectedServiceMaterialId, setSelectedServiceMaterialId] = useState<number>(0);
  const [listServiceConstructions, setListServiceConstructions] = useState<any[]>([]);
  const [modalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "register">("register");


    console.log('listConstructionsMaterials', listConstructionsMaterials);
  // const handleDisable = () => {
  //   disableConstructionMaterial(selectedConstructionMaterialId);
  //   setIsModalOpen(false);
  // };

  const handleDisable = (id: number) => {
    disableConstructionMaterial(id);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const baseBackgroundColor =
    theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF";

    const mockedServicesData = [
      { order: '01', name: 'Tratamento Selador', scope: 'Parede', unit: 'm²', amount: 2 },
      { order: '02', name: 'Tratamento Selador e 1ª Demão Massa', scope: 'Parede de bloco de Gesso', unit: 'm²', amount: 4 },
      { order: '03', name: 'Pintura Interna Paredes Massa Corrida', scope: 'Parede', unit: 'm²', amount: 5 },
      {order: '12', name: 'Parade', scope: "Gesso", unit: "m²", amount: 2},
      {order: '04', name: 'Revestimento Cerâmico', scope: "Pisos", unit: "m²", amount: 20},
      {order: '05', name: 'Instalação de Portas', scope: "Acabamento", unit: "m²", amount: 10}
    ];

  // useEffect(() => {
  //   getAllConstructionsMaterials();
  // }, []);
  useEffect(() => {
    // getAllConstructionsMaterials(); 
    setListServiceConstructions(mockedServicesData); 
  }, []);
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        id: "actions",
        header: "",
        columnDefType: "display",
        Cell: ({ cell }) => (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        
            <IconButton
              aria-label="Excluir"
              onClick={() => handleDisable(cell.row.original.id)}
              sx={{ color: "#C5C7C8" }} 
            >
              <Delete />
            </IconButton>
            <IconButton
              aria-label="Editar"
              onClick={() => {
                setSelectedServiceMaterialId(cell.row.original.id);
                setIsModalOpen(true);
                setModalMode("edit");
              }}
              sx={{ color: "#C5C7C8" }} 
            >
              <Edit />
            </IconButton>
          </div>
        ),
      },
      {
        accessorKey: "order",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Ordem",
      },
      {
        accessorKey: "name",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Nome do Serviço",
      },
      {
        accessorKey: "scope",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Escopo",
      },
      {
        accessorKey: "unit",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Medida",
      },
      {
        accessorKey: "amount",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Etapa",
        Cell: ({ cell }) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {cell.getValue() as React.ReactNode}

            <Tooltip title="Informações adicionais sobre a data de validade">
              <IconButton size="small">
                <Info sx={{ color: '#C5C7C8' }} /> 
              </IconButton>
            </Tooltip>
          </div>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: mockedServicesData,
    enableColumnFilterModes: true,
    
    initialState: { showColumnFilters: true },
    renderDetailPanel: ({ row }) => (
      <Box sx={{ padding: '1rem' }}>
        <ServiceStepTable order={row.original.order} />
      </Box>
    ),
    renderTopToolbar: ({ table }) => (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: 2 }}>
        <Box
  sx={{
    position: 'relative',
    '&::after': {
      content: '""',
      display: 'block',
      width: '30%', 
      height: '3px',
      backgroundColor: '#1976d2', 
      position: 'absolute',
      bottom: 0,
    }
  }}
>
  <Typography variant="h5" component="div" gutterBottom>
    Serviços Cadastrados
  </Typography>
</Box>
        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <MRT_ToggleFiltersButton table={table} sx={{
    color: '#0076be',
    border: '1px solid #0076be',
    borderRadius: '4px', 
  }} />
          <MRT_ShowHideColumnsButton table={table} sx={{
    color: '#0076be',
    border: '1px solid #0076be',
    borderRadius: '4px', 
  }} />
          <MRT_ToggleDensePaddingButton table={table} sx={{
    color: '#0076be',
    border: '1px solid #0076be',
    borderRadius: '4px', 
  }}/>
          <MRT_ToggleFullScreenButton table={table} sx={{
    color: '#0076be',
    border: '1px solid #0076be',
    borderRadius: '4px',
  }} />
         <Tooltip title="Adicionar Serviço">
  <IconButton
    onClick={() => {
      setIsModalOpen(true);
      setModalMode('register');
    }}
    sx={{
      color: '#0076be',
      border: '1px solid #0076be',
      borderRadius: '4px', 
      "&:hover": { 
        backgroundColor: 'rgba(0, 118, 190, 0.04)', 
      },
    }}
  >
    <Add />
  </IconButton>
</Tooltip>

        </Box>
      </Box>
    ),
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
        {/* <Box
          sx={{ display: "flex", justifyContent: "right", marginRight: "1rem" }}
        >
          <Button
            label={
              <Tooltip title="Adicionar Material">
                <Add />
              </Tooltip>
            }
            color="secondary"
            onClick={() => {
              setIsModalOpen(true);
              setModalMode("register");
            }}
          />
        </Box> */}

        <MaterialReactTable table={table}  />
        <ModalRegisterConstructionServices
          modalOpen={modalOpen}
          handleClose={handleClose}
          mode={modalMode}
          selectedConstructionMaterialId={selectedConstructionMaterialId}
          // handleDisable={handleDisable}
        />
      </Grid>
    </Grid>
  );
};
