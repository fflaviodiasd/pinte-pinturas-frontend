import { useContext } from "react";
import { Grid, Tooltip, Typography } from "@mui/material";

import { DashboardContext } from "../../../../../contexts/DashboardContext";
import { SectionTitle } from "../../../../../components/SectionTitle";

import { LabelColor, TableContainer, useStyles } from "./styles";

export function FollowUpTable() {
  const { classes } = useStyles();
  const { dashboardConstructionUpdate } = useContext(DashboardContext);

  const hasDataTable = dashboardConstructionUpdate.length > 0;

  const statusColor = (status: string) => {
    switch (status) {
      case "Liberada":
        return "#FF9800";
      case "Entregue":
        return "#673AB7";
      case "Finalizada":
        return "#2196F3";
      case "Não liberada":
        return "#f44336";
      default:
        return "#4CAF50";
    }
  };

  return (
    <Grid lg={12} className={classes.container}>
      <div className={classes.content}>
        <SectionTitle title="Atualizações da Obra" />
        <div className={classes.dataTableContainer}>
          {hasDataTable ? (
            <>
              <TableContainer style={{ scrollbarWidth: "thin" }}>
                <table>
                  <thead>
                    <tr>
                      <th className={classes.columnTitleMedium}>Status</th>
                      <th className={classes.columnTitleMedium}>Local</th>
                      <th className={classes.columnTitleSmall}>Checklist</th>
                      <th className={classes.columnTitleSmall}>Equipe</th>
                      <th className={classes.columnTitleSmall}>Hora</th>
                      <th className={classes.columnTitleSmall}>Usuário</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardConstructionUpdate.map((construction) => (
                      <tr key={construction.id}>
                        <td className={classes.cell}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <LabelColor
                              color={statusColor(construction.status)}
                            />
                            {construction.status}
                          </div>
                        </td>
                        <td className={classes.cell}>
                          <Tooltip
                            title="Ir para o local."
                            arrow
                            placement="left"
                          >
                            <Typography
                              style={{
                                fontSize: 14,
                                fontFamily: "Open Sans",
                                color: "#0076BE",
                                cursor: "pointer",
                              }}
                            >
                              {construction.area}
                            </Typography>
                          </Tooltip>
                        </td>
                        <td className={classes.cell}>
                          {construction.checklist}
                        </td>
                        <td className={classes.cell}>{construction.team}</td>
                        <td className={classes.cell}>{construction.time}</td>
                        <td className={classes.cell}>
                          {construction.responsible}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableContainer>
              {/* <Typography className={classes.totalResultsText}>
            Mostrando 10 de 234 linhas.
          </Typography> */}
            </>
          ) : (
            <div className={classes.emptyDataContainer}>
              <Typography className={classes.emptyDataText}>
                Não há dados para serem mostrados
              </Typography>
            </div>
          )}
        </div>
      </div>
    </Grid>
  );
}
