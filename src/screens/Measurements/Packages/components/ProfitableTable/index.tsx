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

  const hasMoreProfitableData = moreProfitable.length > 0;
  const hasLessProfitableData = lessProfitable.length > 0;

  return (
    <Grid item md={4} lg={4} className={classes.profitableContainer}>
      <div className={classes.content}>
        <div className={classes.titleTable}>
          <TrendingUpIcon className={classes.moreProfitableIcon} />
          <Typography className={classes.moreProfitableTitle}>
            Mais rentáveis
          </Typography>
        </div>

        {hasMoreProfitableData ? (
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
                    <td className={classes.colunm}>
                      {item.namePackage}
                      <br />
                      {item.avgDays}m²
                    </td>
                    <td className={classes.colunm}>{item.priceDays}</td>
                    <td className={classes.colunm}>
                      {item.priceWorkmanshipDays}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        ) : (
          <div className={classes.emptyDataContainer}>
            <Typography className={classes.emptyDataText}>
              Não há dados para serem mostrados
            </Typography>
          </div>
        )}
      </div>

      <div className={classes.content}>
        <div className={classes.titleTable}>
          <TrendingDownIcon className={classes.lessProfitableIcon} />
          <Typography className={classes.lessProfitableTitle}>
            Menos rentáveis
          </Typography>
        </div>

        {hasLessProfitableData ? (
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
                    <td className={classes.colunm}>
                      {item.namePackage}
                      <br />
                      {item.avgDays}m²
                    </td>
                    <td className={classes.colunm}>{item.priceDays}</td>
                    <td className={classes.colunm}>
                      {item.priceWorkmanshipDays}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        ) : (
          <div className={classes.emptyDataContainer}>
            <Typography className={classes.emptyDataText}>
              Não há dados para serem mostrados
            </Typography>
          </div>
        )}
      </div>
    </Grid>
  );
};

const profitableTableColumns = [
  "Serviços/QTD. por Dia",
  "Diária",
  "Mão de Obra",
];
