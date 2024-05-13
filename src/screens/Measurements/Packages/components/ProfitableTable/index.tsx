import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from "@mui/icons-material";

import { useMeasurements } from "../../../../../hooks/useMeasurements";

import { TableContainer, useStyles } from "./styles";

export const ProfitableTable = () => {
  const { classes } = useStyles();

  const { getProfitability, lessProfitable, moreProfitable } =
    useMeasurements();

  useEffect(() => {
    getProfitability();
  }, []);

  return (
    <Grid item lg={4} className={classes.profitableContainer}>
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
              {moreProfitable.map((item) => (
                <tr key={item.namePackage}>
                  <td className={classes.colunm1}>
                    {item.namePackage}
                    <br />
                    {item.avgDays}m²
                  </td>
                  <td className={classes.colunm2}>{item.priceDays}</td>
                  <td className={classes.colunm2}>
                    {item.priceWorkmanshipDays}
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
              {lessProfitable.map((item) => (
                <tr key={item.namePackage}>
                  <td className={classes.colunm1}>
                    {item.namePackage}
                    <br />
                    {item.avgDays}m²
                  </td>
                  <td className={classes.colunm2}>{item.priceDays}</td>
                  <td className={classes.colunm2}>
                    {item.priceWorkmanshipDays}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </div>
    </Grid>
  );
};

const profitableTableColumns = [
  "Serviços/QTD. por Dia",
  "Diária",
  "Mão de Obra",
];
