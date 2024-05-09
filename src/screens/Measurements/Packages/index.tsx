/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { Grid, Typography } from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from "@mui/icons-material";
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

import { useMeasurements } from "../../../hooks/useMeasurements";

import { SectionTitle } from "../../../components/SectionTitle";
import { moneyFormatter } from "../../../utils";

import {
  LabelColor,
  TableContainer,
  TableContainer2,
  useStyles,
} from "./styles";
import { useEffect } from "react";

function transparentize(value: any, opacity?: any) {
  let alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}

const CHART_COLORS = {
  orange: "rgb(255,152,0)",
  blue: "rgb(46,147,250)",
};

export function MeasurementsPackages() {
  const { classes } = useStyles();

  const {
    getDataTable,
    getExecution,
    getProfitability,
    getAllConstructions,
    listConstructions,
    lessProfitable,
    moreProfitable,
    execution,
    dataTable,
  } = useMeasurements();

  useEffect(() => {
    getDataTable();
    getExecution();
    getProfitability();
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
  };

  return (
    <Grid item lg={12} className={classes.content}>
      <Grid
        item
        lg={8}
        style={{
          backgroundColor: "#FFF",
          paddingRight: 16,
          overflow: "auto",
          height: "calc(100vh - 164px)",
          scrollbarWidth: "none",
        }}
      >
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
        <div
          style={{
            display: "flex",
            paddingTop: 12,
            paddingLeft: 12,
            paddingBottom: 12,
            flexDirection: "column",
            marginTop: 12,
          }}
        >
          <TableContainer2 style={{ scrollbarWidth: "thin" }}>
            <table>
              <thead>
                <tr>
                  <th style={{ width: 150 }} className={classes.columnTitle}>
                    Disciplina
                  </th>
                  <th style={{ width: 200 }} className={classes.columnTitle}>
                    Pacote
                  </th>
                  <th style={{ width: 110 }} className={classes.columnTitle}>
                    Diárias Totais
                  </th>
                  <th style={{ width: 150 }} className={classes.columnTitle}>
                    Rentabilidade/Diária
                  </th>
                  <th style={{ width: 200 }} className={classes.columnTitle}>
                    Rentabilidade/Mão de Obra
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataTable.map((fake) => (
                  <tr key={fake.discipline}>
                    <td className={classes.colunm2}>{fake.discipline}</td>
                    <td className={classes.colunm2}>{fake.namePackage}</td>
                    <td className={classes.colunm2}>{fake.avgDays}</td>
                    <td className={classes.colunm2}>{fake.priceDays}</td>
                    <td className={classes.colunm2}>
                      {fake.priceWorkmanshipDays}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer2>
          <Typography
            style={{ fontFamily: "Open Sans", color: "#2E3132", fontSize: 14 }}
          >
            Mostrando 10 de 234 linhas.
          </Typography>
        </div>
      </Grid>
      <Grid
        item
        lg={4}
        style={{
          backgroundColor: "#FFF",
          marginLeft: 16,
          padding: 16,
          height: "calc(100vh - 164px)",
        }}
      >
        <div style={{ height: "50%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              color: "#4caf50",
            }}
          >
            <TrendingUpIcon />
            <Typography
              style={{
                fontFamily: "Open Sans",
                fontWeight: 600,
              }}
            >
              Mais rentáveis
            </Typography>
          </div>

          <TableContainer>
            <table>
              <thead>
                <tr>
                  {profitableTableColumns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {moreProfitable.map((fake) => (
                  <tr key={fake.namePackage}>
                    <td className={classes.colunm1}>
                      {fake.namePackage}
                      <br />
                      {fake.avgDays}m²
                    </td>
                    <td className={classes.colunm2}>{fake.priceDays}</td>
                    <td className={classes.colunm2}>
                      {fake.priceWorkmanshipDays}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        </div>
        <div style={{ height: "50%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <TrendingDownIcon
              style={{ color: "#ffa51f", transform: "scaleX(-1)" }}
            />
            <Typography
              style={{
                fontFamily: "Open Sans",
                fontWeight: 600,
                color: "#ffa51f",
              }}
            >
              Menos rentáveis
            </Typography>
          </div>

          <TableContainer>
            <table>
              <thead>
                <tr>
                  {profitableTableColumns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lessProfitable.map((fake) => (
                  <tr key={fake.namePackage}>
                    <td className={classes.colunm1}>
                      {fake.namePackage}
                      <br />
                      {fake.avgDays}m²
                    </td>
                    <td className={classes.colunm2}>{fake.priceDays}</td>
                    <td className={classes.colunm2}>
                      {fake.priceWorkmanshipDays}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        </div>
      </Grid>
    </Grid>
  );
}

const profitableTableColumns = [
  "Serviços/QTD. por Dia",
  "Diária",
  "Mão de Obra",
];
