import { useEffect } from "react";
import { Typography } from "@mui/material";

import { useMeasurements } from "../../../../../hooks/useMeasurements";

import { TableContainer, useStyles } from "./styles";

export const DataTable = () => {
  const { classes } = useStyles();

  const { getDataTable, dataTable } = useMeasurements();

  useEffect(() => {
    getDataTable();
  }, []);

  return (
    <div className={classes.dataTableContainer}>
      <TableContainer style={{ scrollbarWidth: "thin" }}>
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
            {dataTable.map((item) => (
              <tr key={item.discipline}>
                <td className={classes.colunm}>{item.discipline}</td>
                <td className={classes.colunm}>{item.namePackage}</td>
                <td className={classes.colunm}>{item.avgDays}</td>
                <td className={classes.colunm}>{item.priceDays}</td>
                <td className={classes.colunm}>{item.priceWorkmanshipDays}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
      <Typography
        style={{ fontFamily: "Open Sans", color: "#2E3132", fontSize: 14 }}
      >
        Mostrando 10 de 234 linhas.
      </Typography>
    </div>
  );
};
