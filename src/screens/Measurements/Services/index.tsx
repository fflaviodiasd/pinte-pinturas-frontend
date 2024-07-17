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

import { SectionTitle } from "../../../components/SectionTitle";
import { moneyFormatter } from "../../../utils";

import {
  LabelColor,
  TableContainer,
  TableContainer2,
  useStyles,
} from "./styles";

function transparentize(value: any, opacity?: any) {
  let alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}

const CHART_COLORS = {
  orange: "rgb(255,152,0)",
  blue: "rgb(46,147,250)",
};

export function MeasurementsServices() {
  const { classes } = useStyles();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    SubTitle,
    Filler
  );

  const labels = [
    "M1",
    "M2",
    "M3",
    "M4",
    "M5",
    "M6",
    "M7",
    "M8",
    "M9",
    "M10",
    "M11",
    "M12",
    "M13",
    "M14",
    "M15",
  ];
  const data = {
    labels,
    datasets: [
      {
        data: [40, 41, 20, 27, 53, 68, 76, 90, 20, 13, 17, 49, 56, 75, 34, 25],
        borderColor: CHART_COLORS.orange,
        backgroundColor: transparentize(CHART_COLORS.orange),
        fill: true,
        tension: 0.2,
      },
      {
        data: [12, 36, 35, 47, 55, 60, 71, 38, 43, 14, 26, 92, 78, 62, 55],
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
                  <th style={{ width: 130 }} className={classes.columnTitle}>
                    Escopo
                  </th>
                  <th style={{ width: 200 }} className={classes.columnTitle}>
                    Serviço
                  </th>
                  <th style={{ width: 100 }} className={classes.columnTitle}>
                    Etapa
                  </th>
                  <th style={{ width: 110 }} className={classes.columnTitle}>
                    Unidades/Dia
                  </th>
                  <th style={{ width: 110 }} className={classes.columnTitle}>
                    Valor Unitário
                  </th>
                  <th style={{ width: 150 }} className={classes.columnTitle}>
                    Rentabilidade/Diária
                  </th>
                </tr>
              </thead>
              <tbody>
                {fakeData2.map((fake) => (
                  <tr key={fake.id}>
                    <td className={classes.colunm2}>{fake.scope}</td>
                    <td className={classes.colunm2}>{fake.service}</td>
                    <td className={classes.colunm2}>{fake.step}</td>
                    <td className={classes.colunm2}>{fake.unitsByDay}</td>
                    <td className={classes.colunm2}>
                      {moneyFormatter.format(fake.unitValue)}
                    </td>
                    <td className={classes.colunm2}>
                      {moneyFormatter.format(fake.dailyProfitability)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer2>
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
                  {fakeColumns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fakeData.map((fake) => (
                  <tr key={fake.id}>
                    <td className={classes.colunm1}>
                      {fake.name}
                      <br />
                      {fake.meters}m²
                    </td>
                    <td className={classes.colunm2}>
                      {moneyFormatter.format(fake.costDaily)}
                    </td>
                    <td className={classes.colunm2}>
                      {moneyFormatter.format(fake.labor)}
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
                  {fakeColumns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fakeData.map((fake) => (
                  <tr key={fake.id}>
                    <td className={classes.colunm1}>
                      {fake.name}
                      <br />
                      {fake.meters}m²
                    </td>
                    <td className={classes.colunm2}>
                      {moneyFormatter.format(fake.costDaily)}
                    </td>
                    <td className={classes.colunm2}>
                      {moneyFormatter.format(fake.labor)}
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

const fakeColumns = ["Serviços/QTD. por Dia", "Diária", "Mão de Obra"];

const fakeData = [
  {
    id: 1,
    name: "Pintura externa",
    meters: 30,
    costDaily: 40.23,
    labor: 23.23,
  },
  {
    id: 2,
    name: "Pintura externa",
    meters: 30,
    costDaily: 40.23,
    labor: 23.23,
  },
  {
    id: 3,
    name: "Pintura externa",
    meters: 30,
    costDaily: 40.23,
    labor: 23.23,
  },
  {
    id: 4,
    name: "Pintura externa",
    meters: 30,
    costDaily: 40.23,
    labor: 23.23,
  },
  {
    id: 5,
    name: "Pintura externa",
    meters: 30,
    costDaily: 40.23,
    labor: 23.23,
  },
];

const fakeData2 = [
  {
    id: 1,
    scope: "Pintura",
    service: "Pintura interna",
    step: "Etapa A",
    unitsByDay: "20m²",
    unitValue: 23,
    dailyProfitability: 23.23,
  },
  {
    id: 2,
    scope: "Pintura",
    service: "Pintura interna",
    step: "Etapa B",
    unitsByDay: "20m²",
    unitValue: 23,
    dailyProfitability: 23.23,
  },
  {
    id: 3,
    scope: "Pintura",
    service: "Pintura interna",
    step: "Etapa A",
    unitsByDay: "20m²",
    unitValue: 23,
    dailyProfitability: 23.23,
  },
  {
    id: 4,
    scope: "Pintura",
    service: "Pintura interna",
    step: "Etapa A",
    unitsByDay: "20m²",
    unitValue: 23,
    dailyProfitability: 23.23,
  },
  {
    id: 5,
    scope: "Pintura",
    service: "Pintura externa",
    step: "Etapa A",
    unitsByDay: "23unidade",
    unitValue: 23,
    dailyProfitability: 23.23,
  },
  {
    id: 6,
    scope: "Pintura",
    service: "Pintura externa",
    step: "Etapa B",
    unitsByDay: "34L",
    unitValue: 23,
    dailyProfitability: 23.23,
  },
  {
    id: 7,
    scope: "Pintura",
    service: "Pintura externa",
    step: "Etapa B",
    unitsByDay: "34L",
    unitValue: 23,
    dailyProfitability: 23.23,
  },
  {
    id: 8,
    scope: "Pintura",
    service: "Pintura externa",
    step: "Etapa B",
    unitsByDay: "34L",
    unitValue: 23,
    dailyProfitability: 23.23,
  },
  {
    id: 9,
    scope: "Pintura",
    service: "Pintura externa",
    step: "Etapa B",
    unitsByDay: "34L",
    unitValue: 23,
    dailyProfitability: 23.23,
  },
  {
    id: 10,
    scope: "Pintura",
    service: "Pintura externa",
    step: "Etapa B",
    unitsByDay: "34L",
    unitValue: 23,
    dailyProfitability: 23.23,
  },
];
