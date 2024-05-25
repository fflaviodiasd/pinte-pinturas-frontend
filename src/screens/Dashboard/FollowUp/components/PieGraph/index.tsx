/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { LabelColor, useStyles } from "./styles";
import { SectionTitle } from "../../../../../components/SectionTitle";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieGraph() {
  const { classes } = useStyles();

  const options = {
    responsive: true,
    label: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

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
              <Typography className={classes.doughnutQuantity}>2400</Typography>
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

const data = {
  labels: ["Entregue", "Não Liberado", "Finalizado", "Liberado", "Iniciado"],
  datasets: [
    {
      data: [398, 197, 1230, 423, 152],
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
    quantity: 197,
    percentage: 20,
  },
  {
    name: "Liberado",
    color: "rgb(255,152,0)",
    quantity: 423,
    percentage: 34,
  },
  {
    name: "Iniciado",
    color: "rgb(76,175,80)",
    quantity: 152,
    percentage: 16,
  },
  {
    name: "Finalizado",
    color: "rgb(33,150,243)",
    quantity: 1230,
    percentage: 46,
  },
  {
    name: "Entregue",
    color: "rgb(103,58,183)",
    quantity: 398,
    percentage: 20,
  },
];
