import { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  SubTitle,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { DashboardContext } from "../../../../../contexts/DashboardContext";
import { SectionTitle } from "../../../../../components/SectionTitle";

import { LabelColor, useStyles } from "./styles";

export function BarGraph() {
  const { classes } = useStyles();
  const { dashboardExecution } = useContext(DashboardContext);

  console.log('111111>>>>', dashboardExecution)

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    SubTitle,
    Legend
  );

  const options = {
    responsive: true,
    label: false,
    plugins: {
      legend: {
        display: false,
      },
      subtitle: {
        display: true,
        text: "Quantidade",
        position: "left" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const labels = dashboardExecution.map((execution) => execution.measurement);
  const liberados = dashboardExecution.map(
    (execution) => execution.status.liberado
  );
  const iniciados = dashboardExecution.map(
    (execution) => execution.status.iniciado
  );
  const finalizados = dashboardExecution.map(
    (execution) => execution.status.finalizado
  );
  const entregues = dashboardExecution.map(
    (execution) => execution.status.entregue
  );
  const nao_liberados = dashboardExecution.map(
    (execution) => execution.status.nao_liberado
  );

  const data = {
    labels,
    datasets: [
      {
        data: liberados,
        backgroundColor: "rgb(255,152,0)",
      },
      {
        data: iniciados,
        backgroundColor: "rgb(76,175,80)",
      },
      {
        data: finalizados,
        backgroundColor: "rgb(33,150,243)",
      },
      {
        data: entregues,
        backgroundColor: "rgb(103,58,183)",
      },
      {
        data: nao_liberados,
        backgroundColor: "rgb(244,67,54)",
      },
    ],
  };

  return (
    <Grid lg={7} className={classes.container}>
      <div className={classes.content}>
        <div className={classes.graphTitle}>
          <SectionTitle title="Tendência Executiva" />

          <div className={classes.labelContainer}>
            {labelsList.map((label) => (
              <div className={classes.label}>
                <LabelColor color={label.color} />
                <Typography className={classes.labelText}>
                  {label.name}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.graphContainer}>
          <Bar options={options} data={data} style={{ height: "100%" }} />
        </div>
      </div>
    </Grid>
  );
}

const labelsList = [
  {
    name: "Liberado",
    color: "rgb(255,152,0)",
  },
  {
    name: "Iniciado",
    color: "rgb(76,175,80)",
  },
  {
    name: "Finalizado",
    color: "rgb(33,150,243)",
  },
  {
    name: "Entregue",
    color: "rgb(103,58,183)",
  },
  {
    name: "Não Liberado",
    color: "rgb(244,67,54)",
  },
];
