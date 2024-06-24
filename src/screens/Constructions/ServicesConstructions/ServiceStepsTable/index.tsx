/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_TableOptions,
} from "material-react-table";
import { useConstructions } from "../../../../hooks/useConstructions";

import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";

interface ServiceInfo {
  order?: number;
}

interface ServiceStep {
  price_service: number;
  price_workmanship: number;
  compensation: number;
  cost: number;
  id: number;
  name: string;
}

export const ServiceStepTable = ({ order }: any) => {
  // const [serviceSteps, setServiceSteps] = useState([]);
  // const [serviceInfo, setServiceInfo] = useState({});
  const [serviceSteps, setServiceSteps] = useState<ServiceStep[]>([]);

  const [serviceInfo, setServiceInfo] = useState<ServiceInfo>({});

  const [unitOptions, setUnitOptions] = useState([]);
  console.log("order:", order);

  const {
    getAllServiceStepsById,
    addServiceStep,
    getServiceById,
    deleteServiceStep,
    getAllUnits,
  } = useConstructions();

  const fetchUnits = async () => {
    const units = await getAllUnits();
    const options = units.results.map((unit: { name: any; id: any }) => ({
      label: unit.name,
      value: unit.id,
    }));
    setUnitOptions(options);
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchPackageSteps = async () => {
    try {
      const steps = await getAllServiceStepsById(order);
      const info = await getServiceById(order);
      console.log("info:", info);
      setServiceSteps(steps);
      setServiceInfo(info);
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
    exitCreatingMode
  }) => {
    try {
      const updatedValues = {
        ...values,
        order: serviceInfo.order,
      };
      console.log("updated values:", updatedValues);
      await addServiceStep(order, updatedValues);
      // setPackageSteps((prevSteps) => [...prevSteps, values]);
      // table.exitCreatingMode(); // Sai do modo de criação
    } catch (error) {
      console.error("Erro ao adicionar nova etapa:", error);
    }
    fetchPackageSteps();
    exitCreatingMode();
  };

  const handleDeleteStep = async (stepId: number) => {
    if (window.confirm("Tem certeza que deseja remover esta etapa?")) {
      try {
        await deleteServiceStep(stepId);
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
  const priceStrings = serviceSteps.map((step) => step.price_service);
  const workmanshipStrings = serviceSteps.map((step) => step.price_workmanship);

  const prices = priceStrings.map(parseCurrency);
  const workmanships = workmanshipStrings.map(parseCurrency);
  const compensation = serviceSteps.map((step) => step.compensation);
  const cost = serviceSteps.map((step) => step.cost);

  const formatCurrency = (value: any) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  const totalServicePrice = formatCurrency(
    prices.reduce((sum, value) => sum + value, 0)
  );
  const totalWorkmanship = formatCurrency(
    workmanships.reduce((sum, value) => sum + value, 0)
  );
  const totalCompensation = compensation.reduce((sum, value) => sum + value, 0);
  const totalCost = cost.reduce((sum, value) => sum + value, 0);

  // console.log('Total Preço Total/Serviço:', formatCurrency(totalServicePrice));
  // console.log('Total Mão-de-Obra:', formatCurrency(totalWorkmanship));
  // console.log('Total Compensação:', (totalCompensation));
  // console.log('Total Custo:', (totalCost));

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      // {
      //   accessorFn: (row) => row.service.name,
      //   id: 'service',
      //   header: 'Serviço',
      //   editVariant: 'select',
      //   editSelectOptions: serviceOptions,
      // },
      {
        accessorKey: "name",
        enableColumnFilterModes: true,
        filterFn: "startsWith",
        header: "Nome da Etapa",
        enableEditing: true,
      },
      // {
      //   accessorKey: "order",
      //   enableColumnFilterModes: true,
      //   filterFn: "startsWith",
      //   header: "Ordem",
      //   enableEditing: false,
      // },

      {
        accessorKey: "price_service",
        enableColumnFilterModes: true,
        filterFn: "startsWith",
        header: "Preço/m²",
        enableEditing: true,
        footer: totalServicePrice,
      },
      {
        accessorKey: "compensation",
        enableColumnFilterModes: true,
        filterFn: "startsWith",
        header: "Comp. %",
        enableEditing: false,
        footer: `${totalCompensation}%`,
      },
      {
        accessorKey: "price_workmanship",
        enableColumnFilterModes: true,
        filterFn: "startsWith",
        header: "Mão-de-Obra/m²",
        enableEditing: true,
        footer: totalWorkmanship,
      },
      {
        accessorKey: "cost",
        enableColumnFilterModes: true,
        filterFn: "startsWith",
        header: "Custo %",
        enableEditing: false,
        footer: `${totalCost}%`,
      },
      // {
      //   accessorKey: "id",
      //   id: 'step_service',
      //   header: 'Etapa',
      //   editVariant: 'select',
      //   editSelectOptions: stepOptions,
      // },
      // {
      //   accessorKey: 'amount',
      //   header: 'QTD',
      // },
      // {
      //   accessorKey: 'unit',
      //   header: 'Unidade',
      //   editVariant: 'select',
      //   editSelectOptions: unitOptions,
      // },
      // {
      //   accessorKey: 'total_price',
      //   header: 'Preço Total/Serviço',
      //   Footer: () => <span>{totalServicePrice}</span>,
      // },
      // {
      //   accessorKey: 'total_workmanship',
      //   header: 'Total Mão-de-Obra',
      //   footer: totalWorkmanship,
      // },
    ],
    [unitOptions, serviceSteps]
  );

  const tableInstance = useMaterialReactTable({
    columns,
    data: serviceSteps,
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
        sx={{ display: "flex", alignItems: "center", gap: "1rem", padding: 2, flexDirection: "row-reverse" }}
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

  // const handleEdit = (rowData:any) => {
  //   console.log('Editar', rowData);
  // };

  return <MaterialReactTable table={tableInstance} />;
};
