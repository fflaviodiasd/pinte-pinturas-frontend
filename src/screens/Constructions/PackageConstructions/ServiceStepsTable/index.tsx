/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_TableOptions,
} from "material-react-table";
import { useConstructions } from "../../../../hooks/useConstructions";

import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";

interface Step {
  id: number;
  order: number;
  name: string;
  price_service: string;
  price_workmanship: string;
  compensation: number;
  cost: number;
}

interface PackageStep {
  total_price: string;
  total_workmanship: string;
  price_unit: string;
  compensation_service: number;
  workmanship_price: string;
  compensation_workmanship: number;
}

export const ServiceStepTable = ({ order }: any) => {
  // const [packageSteps, setPackageSteps] = useState([]);
  const [packageSteps, setPackageSteps] = useState<PackageStep[]>([]);
  // const [serviceOptions, setServiceOptions] = useState([]);
  // const [stepOptions, setStepOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [editStepEnabled, setEditStepEnabled] = useState(false);
  const [stepOptions, setStepOptions] = useState<
    { label: string; value: number }[]
  >([]);
  const [serviceOptions, setServiceOptions] = useState<
    { label: string; value: number }[]
  >([]);

  const {
    getAllPackageStepsById,
    addPackageStep,
    deletePackageStep,
    getAllUnits,
    getAllConstructionServices,
    listConstructionServices,
    getServiceById,
    getAllServiceStepsById,
  } = useConstructions();

  useEffect(() => {
    setEditStepEnabled(stepOptions.length > 0 || !!selectedValue);
  }, [stepOptions, selectedValue]);

  useEffect(() => {
    const updateStepOptions = async () => {
      if (selectedValue) {
        try {
          const steps = await getAllServiceStepsById(selectedValue);
          const options = steps.map((step: Step) => ({
            label: step.name,
            value: step.id,
          }));
          setStepOptions(options);
        } catch (error) {
          console.error("Erro ao buscar etapas para o serviço:", error);
        }
      } else {
        setStepOptions([]);
      }
    };

    updateStepOptions();
  }, [selectedValue]);

  useEffect(() => {
    if (order) {
      getAllConstructionServices();
    }
  }, [order]);

  useEffect(() => {
    setEditStepEnabled(stepOptions.length > 0 || !!selectedValue);
  }, [stepOptions, selectedValue]);

  useEffect(() => {
    if (listConstructionServices) {
      const options = listConstructionServices.map((service) => ({
        label: service.name,
        value: service.id,
      }));
      setServiceOptions(options);
    }
  }, [listConstructionServices]);

  const fetchPackageSteps = async () => {
    try {
      const steps = await getAllPackageStepsById(order);
      setPackageSteps(steps);
    } catch (error) {
      console.error("Erro ao buscar etapas do pacote:", error);
    }
  };

  useEffect(() => {
    if (order) {
      fetchPackageSteps();
    }
  }, []);

  const handleAddNewStep: MRT_TableOptions<any>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    try {
      console.log("values:", values);
      await addPackageStep(order, values);
      // setPackageSteps((prevSteps) => [...prevSteps, values]);
      // table.exitCreatingMode(); // Sai do modo de criação
    } catch (error) {
      console.error("Erro ao adicionar nova etapa:", error);
    }
    fetchPackageSteps();
  };

  const handleDeleteStep = async (stepId: number) => {
    if (window.confirm("Tem certeza que deseja remover esta etapa?")) {
      try {
        await deletePackageStep(stepId);
        fetchPackageSteps();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const parseCurrency = (value: any) => {
    return parseFloat(
      value.replace("R$", "").replace(/\./g, "").replace(",", ".")
    );
  };
  const priceStrings = packageSteps.map((step) => step.total_price);
  const workmanshipStrings = packageSteps.map((step) => step.total_workmanship);
  const pricesUnit = packageSteps.map((step) => step.price_unit);
  const compensation = packageSteps.map((step) => step.compensation_service);
  const workmanshipUnit = packageSteps.map((step) => step.workmanship_price);
  const compensationWorkmanship = packageSteps.map(
    (step) => step.compensation_workmanship
  );

  const prices = priceStrings.map(parseCurrency);
  const workmanships = workmanshipStrings.map(parseCurrency);
  const pricesUnits = pricesUnit.map(parseCurrency);
  const workmanshipsUnit = workmanshipUnit.map(parseCurrency);

  const formatCurrency = (value: any) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  const totalServicePrice = formatCurrency(
    prices.reduce((sum, value) => sum + value, 0)
  );
  const totalPriceUnit = formatCurrency(
    pricesUnits.reduce((sum, value) => sum + value, 0)
  );
  const totalWorkmanship = formatCurrency(
    workmanships.reduce((sum, value) => sum + value, 0)
  );
  const totalCompensation = compensation.reduce((sum, value) => sum + value, 0);
  const totalWorkmanshipUnit = formatCurrency(
    workmanshipsUnit.reduce((sum, value) => sum + value, 0)
  );
  const totalCompensationWorkmanship = compensationWorkmanship.reduce(
    (sum, value) => sum + value,
    0
  );

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorFn: (row) => row.service.name,
        id: "service",
        header: "Serviço",
        editVariant: "select",
        editSelectOptions: serviceOptions,
        muiEditTextFieldProps: {
          onChange: (e) => {
            const serviceId = e.target.value;
            console.log("service:", serviceId);
            setSelectedValue(serviceId);
          },
        },
      },

      {
        accessorFn: (row) => row.step_service.name,
        id: "step_service",
        header: "Etapa",
        editVariant: "select",
        editSelectOptions: stepOptions,
        enableEditing: editStepEnabled,
      },
      {
        accessorKey: "amount",
        header: "QTD",
        onChange: (e: any) => {
          const serviceId = e.target.value;
          console.log("service:", serviceId);
        },
      },
      {
        accessorKey: "unit",
        header: "Unidade",
        editVariant: "select",
        // editSelectOptions: unitOptions,
        enableEditing: false,
      },
      {
        accessorKey: "price_unit",
        header: "Preço/Uni",
        enableEditing: false,
        footer: totalPriceUnit,
      },
      {
        accessorKey: "total_price",
        header: "Total Etapa/Uni",
        enableEditing: false,
        footer: totalServicePrice,
      },
      {
        accessorKey: "compensation_service",
        header: "Comp. %",
        enableEditing: false,
        footer: totalCompensation,
      },
      {
        accessorKey: "workmanship_price",
        header: "Mão-de-Obra/uni",
        enableEditing: false,
        footer: totalWorkmanshipUnit,
      },

      {
        accessorKey: "total_workmanship",
        header: "Total Etapa/Uni",
        enableEditing: false,
        footer: totalWorkmanship,
      },
      {
        accessorKey: "compensation_workmanship",
        header: "Custo %",
        enableEditing: false,
        footer: totalCompensationWorkmanship,
      },
    ],
    [serviceOptions, stepOptions, totalServicePrice, totalWorkmanship]
  );

  const tableInstance = useMaterialReactTable({
    columns,
    data: packageSteps,
    onCreatingRowSave: handleAddNewStep,
    enableRowActions: true,
    enableEditing: true,
    createDisplayMode: "row",

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        {/* Botão para editar */}
        {/* <Tooltip title="Editar">
        <IconButton onClick={() => handleEdit(row.original)} sx={{ color: "#C5C7C8" }}>
          <Edit />
        </IconButton>
      </Tooltip> */}
        {/* Botão para excluir */}
        <Tooltip title="Excluir">
          <IconButton
            onClick={() => handleDeleteStep(row.original.id)}
            color="error"
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbar: ({ table }) => (
      <Box
        sx={{ display: "flex", alignItems: "center", gap: "1rem", padding: 2 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Typography component="div" fontWeight={500}>
            Etapas do serviço
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              height: "1px",
              backgroundColor: "#a2a2a2",
              marginX: "1rem",
            }}
          />
        </Box>
        <Tooltip title="Adicionar Etapa">
          <IconButton
            onClick={() => table.setCreatingRow(true)}
            sx={{
              color: "#0076be",
              border: "1px solid #0076be",
              borderRadius: "4px",
              padding: "5px",
              fontSize: "0.875rem",
              "&:hover": {
                backgroundColor: "rgba(0, 118, 190, 0.04)",
              },
            }}
          >
            <Add fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  return <MaterialReactTable table={tableInstance} />;
};
