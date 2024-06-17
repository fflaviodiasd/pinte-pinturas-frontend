/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { DashboardContext } from "../../../../../contexts/DashboardContext";
import { SectionTitle } from "../../../../../components/SectionTitle";

import { LabelColor, useStyles } from "./styles";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieGraph() {
  const { classes } = useStyles();
  const { dashboardChecklist } = useContext(DashboardContext);

  const options = {
    responsive: true,
    label: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    labels: ["Entregue", "Não Liberado", "Finalizado", "Liberado", "Iniciado"],
    datasets: [
      {
        data: [
          dashboardChecklist.entregue,
          dashboardChecklist.nao_liberado,
          dashboardChecklist.finalizado,
          dashboardChecklist.liberado,
          dashboardChecklist.iniciado,
        ],
        backgroundColor: [
          "rgb(103,58,183)",
          "rgb(244,67,54)",
          "rgb(33,150,243)",
          "rgb(255,152,0)",
          "rgb(76,175,80)",
        ],
        borderColor: "#FFF",
        borderWidth: 2,
      },
    ],
  };

  const labelsList = [
    {
      name: "Não Liberado",
      color: "rgb(244,67,54)",
      quantity: dashboardChecklist.nao_liberado,
      percentage: dashboardChecklist.nao_liberado_porcentagem,
    },
    {
      name: "Liberado",
      color: "rgb(255,152,0)",
      quantity: dashboardChecklist.liberado,
      percentage: dashboardChecklist.liberado_porcentagem,
    },
    {
      name: "Iniciado",
      color: "rgb(76,175,80)",
      quantity: dashboardChecklist.iniciado,
      percentage: dashboardChecklist.iniciado_porcentagem,
    },
    {
      name: "Finalizado",
      color: "rgb(33,150,243)",
      quantity: dashboardChecklist.finalizado,
      percentage: dashboardChecklist.finalizado_porcentagem,
    },
    {
      name: "Entregue",
      color: "rgb(103,58,183)",
      quantity: dashboardChecklist.entregue,
      percentage: dashboardChecklist.entregue_porcentagem,
    },
  ];

  return (
    <Grid lg={5} className={classes.container}>
      <div className={classes.content}>
        <div className={classes.graphTitle}>
          <SectionTitle title="Checklist" />
        </div>
        <div style={{ width: "100%", display: "flex" }}>
          <div className={classes.doughnutContainer}>
            <Doughnut data={data} options={options} />
            <div className={classes.doughnutTextContainer}>
              <Typography className={classes.doughnutText}>Total</Typography>
              <Typography className={classes.doughnutQuantity}>
                {dashboardChecklist.total}
              </Typography>
            </div>
          </div>
          <div className={classes.labelContainer}>
            {labelsList.map((label) => (
              <div style={{ marginBottom: 8 }}>
                <div className={classes.label}>
                  <LabelColor color={label.color} />
                  <Typography className={classes.labelText}>
                    {label.name}
                  </Typography>
                </div>
                <Typography className={classes.labelQuantity}>
                  {label.quantity}
                </Typography>
                <Typography className={classes.labelPercentage}>
                  {label.percentage}%
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Grid>
  );
}
