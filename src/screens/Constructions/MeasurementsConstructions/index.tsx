import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_TableOptions,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleFiltersButton,
  MRT_ShowHideColumnsButton,
} from "material-react-table";

import { Box, Grid, Tooltip, useTheme, Typography} from "@mui/material";
import { useStyles } from "./styles";
import { useParams, useNavigate } from "react-router-dom";
import { useConstructions } from "../../../hooks/useConstructions";
import { Add, Launch, Edit, Delete, Info } from "@mui/icons-material";

import { IconButton } from "@mui/material";
import { errorMessage, successMessage } from "../../../components/Messages";
import { UserContext } from "../../../contexts/UserContext";
interface DropdownOption {
  id: any;
  name: any;
  label: string;
  value: any; 
}


export const MeasurementsConstructions = () => {
  // const { classes } = useStyles();
  // const navigate = useNavigate();
  const {
  
    listConstructionsMeasurements,
    getAllConstructionsMeasurements,
    disableConstructionMeasurements,
    addConstructionMeasurements

  } = useConstructions();
  const theme = useTheme();

  const [disciplineOptions, setDisciplineOptions] = useState<DropdownOption[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [filteredMeasurements, setFilteredMeasurements] = useState<any[]>([]);

  const { id } = useParams();
      // console.log('construction id pac: ', selectedPackageConstructionId)
      console.log('listConstructionsMeasurements: ', listConstructionsMeasurements)


  useEffect(() => {
    if (id) {
      getAllConstructionsMeasurements();
    }
 
  }, [id]);


useEffect(() => {
  if (listConstructionsMeasurements && listConstructionsMeasurements && listConstructionsMeasurements.length > 0) {
    const filteredData = listConstructionsMeasurements.filter(
      (measurement) => measurement.construction.toString() === id
    );
    setFilteredMeasurements(filteredData);
  }
}, [listConstructionsMeasurements, id]);

  


  const handleDisable = async (measurementId: number) => {
    try {
       await disableConstructionMeasurements(measurementId);
      // successMessage("Medição apagada com sucesso!");
      getAllConstructionsMeasurements();
    } catch (error) {
      errorMessage("Não foi possível apagar medição!");
    }
  };


  
  
  const handleCreatePackages: MRT_TableOptions<any>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
  
  
    console.log('values for API:', values);
  
    await addConstructionMeasurements(values);
    getAllConstructionsMeasurements();
  };
  

  const baseBackgroundColor =
    theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF";

 
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [

      {
        accessorKey: "name",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Nome do Pacote",
        enableEditing: true, 
        muiEditTextFieldProps: {
          required: true,
        },
      },
    
    
    ], []); 

  const table = useMaterialReactTable({
    columns,
    data: filteredMeasurements,
    enableColumnFilterModes: true,
    onCreatingRowSave: handleCreatePackages,
    // onEditingRowSave: handleEditPackages,
    enableEditing: true, 
    // editDisplayMode: 'row', 
    createDisplayMode: 'row', 
    state: {
      isSaving, 
    },
    renderRowActions: 
    ({ row }) => (
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <IconButton
          aria-label="Excluir"
          onClick={() => handleDisable(row.original.id)}
          sx={{ color: "#C5C7C8" }} 
        >
          <Delete />
        </IconButton>
        {/* <IconButton
          aria-label="Editar"
          onClick={() => handleEditPackages(row.original.id)}
          sx={{ color: "#C5C7C8" }} 
        >
          <Edit />
        </IconButton> */}
      </div>
    ),

    initialState: { showColumnFilters: true },
    // renderDetailPanel: ({ row }) => (
    //   <Box sx={{ padding: '1rem' }}>
    //     <ServiceStepTable order={row.original.id} />
    //   </Box>
    // ),
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
    Medição
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
         <Tooltip title="Adicionar Pacote">
  <IconButton
   onClick={() => {
    table.setCreatingRow(true);
    console.log('options:', disciplineOptions);
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

        <MaterialReactTable table={table}/>

      </Grid>
    </Grid>
  );
};
