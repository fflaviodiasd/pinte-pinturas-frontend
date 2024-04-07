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
import { ModalRegisterConstructionPackages } from "../../../components/Modal/ModalRegisterConstructionPackages";
import { Add, Launch, Edit, Delete, Info } from "@mui/icons-material";

import { IconButton } from "@mui/material";
import ServiceStepTable from "./ServiceStepsTable";
import { errorMessage, successMessage } from "../../../components/Messages";
interface DropdownOption {
  id: any;
  name: any;
  label: string;
  value: any; // ou um tipo mais específico, se você sabe o que o valor deve ser
}



export const PackageConstructions = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const {
    listConstructionPackages,
    getAllConstructionPackages,
    disableConstructionPackage,
    addConstructionPackage,
    getAllDisciplines,

  } = useConstructions();
  const theme = useTheme();

  const [selectedPackageConstructionId, setSelectedPackageConstructionId] = useState<number>(0);
  const [disciplineOptions, setDisciplineOptions] = useState<DropdownOption[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const [dynamicColumns, setDynamicColumns] = useState<MRT_ColumnDef<any>[]>(
    []
  );
  const { id } = useParams();
  // console.log('construction id pac: ', selectedPackageConstructionId)


  useEffect(() => {
    if (id) {
      getAllConstructionPackages();
    }
  }, [id]);
  useEffect(() => {

  const fetchDisciplines = async () => {
    try {
      const data = await getAllDisciplines();
      if (data && Array.isArray(data.results)) {
        const options: DropdownOption[] = data.results.map((d: { name: any; }) => ({
          label: d.name,
          value: d.name,
        }));
        setDisciplineOptions(options);
      
      } else {
        console.error("Formato inesperado da resposta:", data);
        setDisciplineOptions([]);
      }
    } catch (error) {
      errorMessage("Não foi possível carregar disciplinas!");
      setDisciplineOptions([]);
    }
  };
  fetchDisciplines();

}, []); // Array de dependências vazio para chamar apenas na montagem


  useEffect(() => {
    console.log('disciplineOptions atualizado:', disciplineOptions);
    // Esse log vai confirmar se o estado foi atualizado corretamente após a chamada da API.
  }, [disciplineOptions]);

  

  const handleDisable = async (packageId: number) => {
    try {
      await disableConstructionPackage(packageId);
      successMessage("Pacote apagado com sucesso!");
      getAllConstructionPackages(); 

    } catch (error) {
      errorMessage("Não foi possível apagar pacote!");
    }
  };

  // const handleEditPackages: MRT_TableOptions<any>["onEditingRowSave"] = async ({
  //   exitEditingMode, // Função para sair do modo de edição
  //   row, // A linha sendo editada
  //   values, // Os valores editados
  // }) => {
  //   // Aqui, você precisa ajustar para atualizar o pacote com a API ou estado local
  //   console.log('Salvando edição', values);
  //   // Supondo uma função de atualização async genérica 'updateConstructionPackage'
  //   // await updateConstructionPackage(row.original.id, values);
  //   getAllConstructionPackages();
  //   exitEditingMode(); // Sai do modo de edição após a atualização
  // };

  const handleEditPackages: MRT_TableOptions<any>['onEditingRowSave'] = async ({
    exitEditingMode,
    row,
    values,
  }) => {
    if (!row?.original?.id) {
      errorMessage('Não foi possível identificar o pacote para atualização.');
      return;
    }
  
    // Aqui você chama a API para atualizar o pacote, e então atualiza o estado da aplicação com os novos dados.
    try {
      console.log('Salvando edições para o pacote:', values);
  
      // Substitua isso pela sua chamada de API real para atualizar o pacote.
      // A função abaixo deve ser a função que você escreve para fazer a chamada de API.
      // const updatedPackage = await updateConstructionPackage(row.original.id, values);
  
      // Atualiza a lista de pacotes no estado
      // setListConstructionPackages(prevPackages =>
      //   prevPackages.map(pkg => (pkg.id === row.original.id ? { ...pkg, ...updatedPackage } : pkg))
      // );
  
      successMessage('Pacote atualizado com sucesso.');
      exitEditingMode(); // Sai do modo de edição
    } catch (error) {
      errorMessage('Erro ao atualizar o pacote.');
      console.error('Erro ao salvar as edições:', error);
    }
  };
  
  
  const handleCreatePackages: MRT_TableOptions<any>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    // Extrai 'discipline.name' e 'id', e captura o restante em 'restOfValues'
    const { 'discipline.name': disciplineName, id, ...restOfValues } = values;
  
    // Prepara o novo objeto de valores sem o 'id' e com 'discipline' ajustado
    const adjustedValues = {
      ...restOfValues,
      discipline: disciplineName, // Atribui o valor correto para 'discipline'
    };
  
    console.log('Adjusted values for API:', adjustedValues);
  
    // Faz a chamada para adicionar o pacote com os valores ajustados
    await addConstructionPackage(adjustedValues);
    getAllConstructionPackages();
  };
  

  const baseBackgroundColor =
    theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF";

 
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      // {
      //   id: "actions",
      //   header: "",
      //   columnDefType: "display",
      //   Cell: ({ cell }) => (
      //     <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        
      //       <IconButton
      //         aria-label="Excluir"
      //         onClick={() => handleDisable(cell.row.original.id)}
      //         sx={{ color: "#C5C7C8" }} 
      //       >
      //         <Delete />
      //       </IconButton>
      //       <IconButton
      //         aria-label="Editar"
      //         onClick={() => {
      //           setSelectedPackageConstructionId(cell.row.original.id);
      //         }}
      //         sx={{ color: "#C5C7C8" }} 
      //       >
      //         <Edit />
      //       </IconButton>
      //     </div>
      //   ),
      // },
      {
        accessorKey: "id",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "ID",
        enableEditing: false,

      },
      {
        accessorKey: "order",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Ordem",
        enableEditing: true, // habilita edição
        muiEditTextFieldProps: {
          required: true,
          type: "number",

        },
      },
      {
        accessorKey: "name",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Nome do Pacote",
        enableEditing: true, // habilita edição
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "discipline.name",
        header: "Disciplina",
        enableEditing: true,
        editVariant: 'select',
        editSelectOptions: disciplineOptions, // Carregado assincronamente
        muiEditSelectFieldProps: {
          required: true,
        }
      },
      {
        accessorKey: "package_value",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Valor do Pacote",
        enableEditing: true, // habilita edição
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "package_workmanship",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Pacote M.O",
        enableEditing: true, // habilita edição
        muiEditTextFieldProps: {
          required: true,
        },
      },
    
    ], [disciplineOptions]); // Atualiza quando disciplineOptions mudar

  const table = useMaterialReactTable({
    columns,
    data: listConstructionPackages,
    enableColumnFilterModes: true,
    onCreatingRowSave: handleCreatePackages,
    onEditingRowSave: handleEditPackages,
    enableEditing: true, // Habilita a edição globalmente
    editDisplayMode: 'row', // Define o modo de edição para linha
    createDisplayMode: 'row', // Define o modo de criação para linha
    state: {
      // ...outros estados
      isSaving, // Adiciona o estado de salvamento aqui
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
        <IconButton
          aria-label="Editar"
          onClick={() => handleEditPackages(row.original.id)}
          sx={{ color: "#C5C7C8" }} 
        >
          <Edit />
        </IconButton>
      </div>
    ),

    initialState: { showColumnFilters: true },
    renderDetailPanel: ({ row }) => (
      <Box sx={{ padding: '1rem' }}>
        {/* <ServiceStepTable order={row.original.id} /> */}
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
    Pacotes Cadastrados
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
