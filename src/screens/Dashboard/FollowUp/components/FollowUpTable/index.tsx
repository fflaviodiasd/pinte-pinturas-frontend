import { Grid, Tooltip, Typography } from "@mui/material";

import { LabelColor, TableContainer, useStyles } from "./styles";
import { SectionTitle } from "../../../../../components/SectionTitle";

export function FollowUpTable() {
  const { classes } = useStyles();

  const hasDataTable = dataTable.length > 0;

  const statusColor = (status: string) => {
    switch (status) {
      case "Liberado":
        return "#FF9800";
      case "Entregue":
        return "#673AB7";
      case "Finalizado":
        return "#2196F3";
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
                    {dataTable.map((item, index) => (
                      <tr key={`${item.user}-${index}`}>
                        <td className={classes.cell}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <LabelColor color={statusColor(item.status)} />
                            {item.status}
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
                              {item.local}
                            </Typography>
                          </Tooltip>
                        </td>
                        <td className={classes.cell}>{item.checklist}</td>
                        <td className={classes.cell}>{item.team}</td>
                        <td className={classes.cell}>{item.hour}</td>
                        <td className={classes.cell}>{item.user}</td>
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

const dataTable = [
  {
    status: "Liberado",
    local: "L0065 | T02 PAV01 C02",
    checklist: "Interna Aptos - Tetos ",
    team: "EQ001",
    hour: "24/01/24 12:30",
    user: "Olavo Gomes Bianco",
  },
  {
    status: "Entregue",
    local: "L0065 | T02 PAV01 C02",
    checklist: "Interna Aptos - Tetos ",
    team: "EQ001",
    hour: "24/01/24 12:30",
    user: "Olavo Gomes Bianco",
  },
  {
    status: "Finalizado",
    local: "L0065 | T02 PAV01 C02",
    checklist: "Interna Aptos - Tetos ",
    team: "EQ001",
    hour: "24/01/24 12:30",
    user: "Olavo Gomes Bianco",
  },
  {
    status: "Iniciado",
    local: "L0065 | T02 PAV01 C02",
    checklist: "Interna Aptos - Tetos ",
    team: "EQ001",
    hour: "24/01/24 12:30",
    user: "Olavo Gomes Bianco",
  },
  {
    status: "Iniciado",
    local: "L0065 | T02 PAV01 C02",
    checklist: "Interna Aptos - Tetos ",
    team: "EQ001",
    hour: "24/01/24 12:30",
    user: "Olavo Gomes Bianco",
  },
  {
    status: "Iniciado",
    local: "L0065 | T02 PAV01 C02",
    checklist: "Interna Aptos - Tetos ",
    team: "EQ001",
    hour: "24/01/24 12:30",
    user: "Olavo Gomes Bianco",
  },
  {
    status: "Iniciado",
    local: "L0065 | T02 PAV01 C02",
    checklist: "Interna Aptos - Tetos ",
    team: "EQ001",
    hour: "24/01/24 12:30",
    user: "Olavo Gomes Bianco",
  },
  {
    status: "Iniciado",
    local: "L0065 | T02 PAV01 C02",
    checklist: "Interna Aptos - Tetos ",
    team: "EQ001",
    hour: "24/01/24 12:30",
    user: "Olavo Gomes Bianco",
  },
  {
    status: "Iniciado",
    local: "L0065 | T02 PAV01 C02",
    checklist: "Interna Aptos - Tetos ",
    team: "EQ001",
    hour: "24/01/24 12:30",
    user: "Olavo Gomes Bianco",
  },
  {
    status: "Iniciado",
    local: "L0065 | T02 PAV01 C02",
    checklist: "Interna Aptos - Tetos ",
    team: "EQ001",
    hour: "24/01/24 12:30",
    user: "Olavo Gomes Bianco",
  },
  {
    status: "Iniciado",
    local: "L0065 | T02 PAV01 C02",
    checklist: "Interna Aptos - Tetos ",
    team: "EQ001",
    hour: "24/01/24 12:30",
    user: "Olavo Gomes Bianco",
  },
];
