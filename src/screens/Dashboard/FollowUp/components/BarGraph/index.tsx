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

import { LabelColor, useStyles } from "./styles";
import { SectionTitle } from "../../../../../components/SectionTitle";

export function BarGraph() {
  const { classes } = useStyles();

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

  function generateRandomNumbers() {
    return Array.from({ length: 15 }, () => Math.floor(Math.random() * 101));
  }

  const data = {
    labels,
    datasets: [
      {
        data: generateRandomNumbers(),
        backgroundColor: "rgb(255,152,0)",
      },
      {
        data: generateRandomNumbers(),
        backgroundColor: "rgb(76,175,80)",
      },
      {
        data: generateRandomNumbers(),
        backgroundColor: "rgb(33,150,243)",
      },
      {
        data: generateRandomNumbers(),
        backgroundColor: "rgb(103,58,183)",
      },
      {
        data: generateRandomNumbers(),
        backgroundColor: "rgb(96,125,139)",
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
        <Bar options={options} data={data} />
      </div>
    </Grid>
  );
}

const labels = [
  "M01",
  "M02",
  "M03",
  "M04",
  "M05",
  "M06",
  "M07",
  "M08",
  "M09",
  "M10",
  "M11",
  "M12",
  "M13",
  "M14",
  "M15",
];

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
    color: "rgb(96,125,139)",
  },
];
