/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useContext, useEffect } from "react";
import { Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  SubTitle,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import colorLib from "@kurkle/color";

import { MeasurementsContext } from "../../../../../contexts/MeasurementsContext";

import { SectionTitle } from "../../../../../components/SectionTitle";

import { LabelColor, useStyles } from "./styles";

function transparentize(value: any, opacity?: any) {
  let alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}

const CHART_COLORS = {
  orange: "rgb(255,152,0)",
  blue: "rgb(46,147,250)",
};

export const ExecutionGraph = () => {
  const { classes } = useStyles();

  const { getExecution, getAllConstructions, listConstructions, execution } =
    useContext(MeasurementsContext);

  useEffect(() => {
    getExecution();
    getAllConstructions();
    listConstructions;
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    SubTitle,
    Filler
  );

  const labels = execution.map((execution) => execution.measurement);
  const liberados = execution.map((execution) => execution.status.liberado);
  const finalizados = execution.map((execution) => execution.status.finalizado);

  const data = {
    labels,
    datasets: [
      {
        data: liberados,
        borderColor: CHART_COLORS.orange,
        backgroundColor: transparentize(CHART_COLORS.orange),
        fill: true,
        tension: 0.2,
      },
      {
        data: finalizados,
        borderColor: CHART_COLORS.blue,
        backgroundColor: transparentize(CHART_COLORS.blue),
        fill: true,
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    pointStyle: false,
    fill: true,
    label: false,
    plugins: {
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

  return (
    <>
      <div className={classes.graphTitle}>
        <SectionTitle title="Tendência Executiva" />

        <div className={classes.labelContainer}>
          <div className={classes.label}>
            <LabelColor color="rgb(255,152,0)" />
            <Typography className={classes.labelText}>Liberado</Typography>
          </div>
          <div className={classes.label}>
            <LabelColor color="rgb(46,147,250)" />
            <Typography className={classes.labelText}>Finalizado</Typography>
          </div>
        </div>
      </div>
      <Line data={data} options={options} />
    </>
  );
};
