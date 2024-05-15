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

  const hasDataTable = dataTable.length > 0;

  return (
    <div className={classes.dataTableContainer}>
      {hasDataTable ? (
        <>
          {" "}
          <TableContainer style={{ scrollbarWidth: "thin" }}>
            <table>
              <thead>
                <tr>
                  <th className={classes.columnTitleMedium}>Disciplina</th>
                  <th className={classes.columnTitleMedium}>Pacote</th>
                  <th className={classes.columnTitleSmall}>Diárias Totais</th>
                  <th className={classes.columnTitleSmall}>
                    Rentabilidade/Diária
                  </th>
                  <th className={classes.columnTitleSmall}>
                    Rentabilidade/Mão de Obra
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataTable.map((item) => (
                  <tr key={item.discipline}>
                    <td className={classes.cell}>{item.discipline}</td>
                    <td className={classes.cell}>{item.namePackage}</td>
                    <td className={classes.cell}>{item.avgDays}</td>
                    <td className={classes.cell}>{item.priceDays}</td>
                    <td className={classes.cell}>
                      {item.priceWorkmanshipDays}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
          <Typography className={classes.totalResultsText}>
            Mostrando 10 de 234 linhas.
          </Typography>
        </>
      ) : (
        <div className={classes.emptyDataContainer}>
          <Typography className={classes.emptyDataText}>
            Não há dados para serem mostrados
          </Typography>
        </div>
      )}
    </div>
  );
};
