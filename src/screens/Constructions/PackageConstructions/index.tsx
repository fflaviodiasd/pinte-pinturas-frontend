/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Grid, Tooltip, IconButton } from "@mui/material";
import { Add as AddIcon, Delete } from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleFiltersButton,
  MRT_ShowHideColumnsButton,
  type MRT_ColumnDef,
  type MRT_TableOptions,
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

export const PackageConstructions = () => {
  const { classes } = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    listConstructionPackages,
    getAllConstructionPackages,
    disableConstructionPackage,
    addConstructionPackage,
    getAllDisciplines,
  } = useConstructions();

  const [disciplineOptions, setDisciplineOptions] = useState<DropdownOption[]>(
    []
  );

  useEffect(() => {
    if (id) {
      getAllConstructionPackages();
    }
  }, [id]);

  const fetchDisciplines = async () => {
    try {
      const data = await getAllDisciplines();
      if (data && Array.isArray(data.results)) {
        const options: DropdownOption[] = data.results.map(
          (d: { name: any }) => ({
            label: d.name,
            value: d.name,
          })
        );
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

  useEffect(() => {
    fetchDisciplines();
  }, []);

  useEffect(() => {
    console.log("disciplineOptions atualizado:", disciplineOptions);
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
    async ({ values, table }) => {
      const { "discipline.name": disciplineName, id, ...restOfValues } = values;

      const adjustedValues = {
        ...restOfValues,
        discipline: disciplineName,
      };

      console.log("Adjusted values for API:", adjustedValues);

      await addConstructionPackage(adjustedValues);
      getAllConstructionPackages();
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
        header: "Nome do Pacote",
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "discipline.name",
        header: "Disciplina",
        enableEditing: true,
        editVariant: "select",
        editSelectOptions: disciplineOptions,
        muiEditSelectFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "package_value",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Valor do Pacote",
        enableEditing: false,
      },
      {
        accessorKey: "package_workmanship",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Pacote M.O",
        enableEditing: false,
      },
      {
        accessorKey: "workmanship_total",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "M.O/Total",
        enableEditing: false,
      },
    ],
    [disciplineOptions]
  );

  const table = useMaterialReactTable({
    columns,
    data: listConstructionPackages,
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
          <Delete />
        </IconButton>
      </div>
    ),
    renderDetailPanel: ({ row }) => (
      <Box sx={{ padding: "1rem" }}>
        <ServiceStepTable order={row.original.id} />
      </Box>
    ),
    renderTopToolbar: ({ table }) => (
      <Grid item lg={12} className={classes.headerTableContainer}>
        <SectionTitle title="Pacotes Cadastrados" />

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
          <Tooltip title="Adicionar pacote">
            <IconButton
              onClick={() => {
                table.setCreatingRow(true);
                console.log("options:", disciplineOptions);
              }}
              className={classes.toolbarButton}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Grid>
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
