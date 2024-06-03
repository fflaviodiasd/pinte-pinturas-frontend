/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Tooltip, IconButton } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import {
  type MRT_ColumnDef,
  type MRT_TableOptions,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleFullScreenButton,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import { useConstructions } from "../../../hooks/useConstructions";

import { errorMessage, successMessage } from "../../../components/Messages";
import { EmptyTableText } from "../../../components/Table/EmptyTableText";
import { SectionTitle } from "../../../components/SectionTitle";

import { ServiceStepTable } from "./ServiceStepsTable";

import { useStyles } from "./styles";

interface DropdownOption {
  id: any;
  name: any;
  label: string;
  value: any;
}

export const ServicesConstructions = () => {
  const { classes } = useStyles();
  // const navigate = useNavigate();
  const {
    listConstructionServices,
    getAllConstructionServices,
    disableConstructionService,
    addConstructionService,
    getAllUnits,
  } = useConstructions();

  // const [selectedPackageConstructionId, setSelectedPackageConstructionId] =
  //   useState<number>(0);
  // const [disciplineOptions, setDisciplineOptions] = useState<DropdownOption[]>(
  //   []
  // );
  const [unitOptions, setUnitOptions] = useState<DropdownOption[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // const [dynamicColumns, setDynamicColumns] = useState<MRT_ColumnDef<any>[]>(
  //   []
  // );
  const { id } = useParams();
  // console.log('construction id pac: ', selectedPackageConstructionId)

  useEffect(() => {
    if (id) {
      getAllConstructionServices();
    }
  }, [id]);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const data = await getAllUnits();
        if (data && Array.isArray(data.results)) {
          const options: DropdownOption[] = data.results.map(
            (d: { name: any }) => ({
              label: d.name,
              value: d.name,
            })
          );
          setUnitOptions(options);
        } else {
          console.error("Formato inesperado da resposta:", data);
          setUnitOptions([]);
        }
      } catch (error) {
        errorMessage("Não foi possível carregar medidas!");
        setUnitOptions([]);
      }
    };
    fetchUnits();
  }, []);

  const handleDisable = async (packageId: number) => {
    try {
      await disableConstructionService(packageId);
      successMessage("Serviço apagado com sucesso!");
      getAllConstructionServices();
    } catch (error) {
      errorMessage("Não foi possível apagar serviço!");
    }
  };

  // const handleEditPackages: MRT_TableOptions<any>["onEditingRowSave"] = async ({
  //   exitEditingMode, // Função para sair do modo de edição
  //   row, // A linha sendo editada
  //   values, // Os valores editados
  // }) => {
  //   console.log('Salvando edição', values);
  //   // Supondo uma função de atualização async genérica 'updateConstructionPackage'
  //   // await updateConstructionPackage(row.original.id, values);
  //   getAllConstructionPackages();
  //   exitEditingMode(); // Sai do modo de edição após a atualização
  // };

  const handleEditPackages: MRT_TableOptions<any>["onEditingRowSave"] = async ({
    exitEditingMode,
    row,
    values,
  }) => {
    if (!row?.original?.id) {
      errorMessage("Não foi possível identificar o pacote para atualização.");
      return;
    }

    try {
      console.log("Salvando edições para o pacote:", values);

      // const updatedPackage = await updateConstructionPackage(row.original.id, values);

      // setListConstructionPackages(prevPackages =>
      //   prevPackages.map(pkg => (pkg.id === row.original.id ? { ...pkg, ...updatedPackage } : pkg))
      // );

      successMessage("Pacote atualizado com sucesso.");
      exitEditingMode();
    } catch (error) {
      errorMessage("Erro ao atualizar o pacote.");
      console.error("Erro ao salvar as edições:", error);
    }
  };

  const handleCreatePackages: MRT_TableOptions<any>["onCreatingRowSave"] =
    async ({ values }) => {
      const { "unit.name": unitName, ...restOfValues } = values;

      const adjustedValues = {
        ...restOfValues,
        unit: unitName,
      };

      console.log("Adjusted values for API:", adjustedValues);

      await addConstructionService(adjustedValues);
      getAllConstructionServices();
    };

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
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
          type: "number",
        },
      },
      {
        accessorKey: "name",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Nome do Serviço",
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "scope",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Escopo",
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
        },
      },
      // {
      //   accessorKey: "unit.name",
      //   enableColumnFilterModes: false,
      //   filterFn: "startsWith",
      //   header: "Medida",
      //   enableEditing: true,
      //   muiEditTextFieldProps: {
      //     required: true,
      //   },
      // },

      {
        accessorKey: "unit.name",
        header: "Unidade",
        enableEditing: true,
        editVariant: "select",
        editSelectOptions: unitOptions,
        muiEditSelectFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "step_services_amount",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Etapas",
        enableEditing: false,
      },

      {
        accessorKey: "amount",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Quantidade",
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "unit_price",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Preço Unitário",
        enableEditing: false,
      },
      {
        accessorKey: "total_price",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Preço Total",
        enableEditing: false,
      },
      {
        accessorKey: "price_workmanship",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Preço M.O",
        enableEditing: false,
      },
      {
        accessorKey: "total_workmanship",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Preço Total M.O",
        enableEditing: false,
      },
    ],
    [unitOptions]
  );

  const table = useMaterialReactTable({
    columns,
    data: listConstructionServices,
    editDisplayMode: "row",
    createDisplayMode: "row",
    enableEditing: true,
    enablePagination: false,
    enableBottomToolbar: false,
    onCreatingRowSave: handleCreatePackages,
    onEditingRowSave: handleEditPackages,
    initialState: { showColumnFilters: true },
    renderEmptyRowsFallback: () => <EmptyTableText />,
    muiFilterTextFieldProps: (props) => {
      return {
        placeholder: `Filtrar por ${props.column.columnDef.header}`,
      };
    },
    renderRowActions: ({ row }) => (
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <IconButton
          aria-label="Excluir"
          onClick={() => handleDisable(row.original.id)}
          sx={{ color: "#C5C7C8" }}
        >
          <DeleteIcon />
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
    renderDetailPanel: ({ row }) => (
      <Box sx={{ padding: "1rem" }}>
        <ServiceStepTable order={row.original.id} />
      </Box>
    ),
    renderTopToolbar: ({ table }) => (
      <Grid item lg={12} className={classes.headerTableContainer}>
        <SectionTitle title="Serviços Cadastrados" />

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <MRT_ToggleFiltersButton
            table={table}
            className={classes.toolbarButton}
          />
          <MRT_ShowHideColumnsButton
            table={table}
            className={classes.toolbarButton}
          />
          <MRT_ToggleDensePaddingButton
            table={table}
            className={classes.toolbarButton}
          />
          <MRT_ToggleFullScreenButton
            table={table}
            className={classes.toolbarButton}
          />
          <Tooltip title="Adicionar Serviço">
            <IconButton
              onClick={() => {
                table.setCreatingRow(true);
                // console.log("options:", unitOptions);
              }}
              className={classes.toolbarButton}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Grid>
    ),
    muiTablePaperProps: {
      elevation: 0,
    },
    muiTableProps: {
      style: {
        paddingLeft: 16,
        paddingRight: 16,
      },
    },
    muiTableContainerProps: {
      style: {
        scrollbarWidth: "thin",
      },
    },
    filterFns: {
      customFilterFn: (row, id, filterValue) => {
        return row.getValue(id) === filterValue;
      },
    },
    localization: {
      filterCustomFilterFn: "Custom Filter Fn",
    } as any,
    muiTableBodyProps: {
      sx: {
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: "#FAFAFA",
          },
      },
    },
    mrtTheme: (theme) => ({
      draggingBorderColor: theme.palette.secondary.main,
    }),
  });

  return (
    <Grid item lg={12} className={classes.container}>
      <MaterialReactTable table={table} />
    </Grid>
  );
};
