import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Add as AddIcon } from "@mui/icons-material";

import { TableActions } from "../../../components/Table/TableActions";
import { successMessage } from "../../../components/Messages";
import { TitleScreen } from "../../../components/TitleScreen";
import { mockedListConstructions } from "../../../database/constructions";

import { useStyles } from "./styles";

export const ListConstructions = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "id", headerName: "ID", flex: 0.1, disableColumnMenu: true },
      {
        field: "name",
        headerName: "Nome",
        flex: 1,
        disableColumnMenu: true,
      },
      {
        field: "responsible",
        headerName: "Responsável",
        flex: 1,
        disableColumnMenu: true,
      },
      {
        field: "percentageCompleted",
        headerName: "Porcentagem concluída",
        flex: 0.4,
        disableColumnMenu: true,
      },
      {
        field: "status",
        headerName: "Status",
        flex: 0.3,
        // width: 200,
        disableColumnMenu: true,
        hideSortIcons: true,
        renderCell: (params: GridRenderCellParams) => (
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              // justifyContent: "center",
              // alignItems: "center",

              width: "100%",
              padding: "4px 0px",
              borderRadius: "4px",

              fontSize: 12,
              color: "#252525",
              opacity: "0.8",
              // backgroundColor: params.value ? "#6FED8B" : "#FF3C40",
            }}
          >
            {params.value}
          </Typography>
        ),
      },
      {
        field: "actions",
        headerName: "Ações",
        flex: 0.23,
        disableColumnMenu: true,
        hideSortIcons: true,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => (
          <TableActions
            params={params}
            viewFunction={() => navigate(`/obras/${params.row.id}`)}
            editFunction={() => navigate(`/obras/${params.row.id}/editar`)}
            deleteFunction={() => successMessage("Dado excluído com sucesso!")}
          />
        ),
      },
    ],
    []
  );

  return (
    <Grid container spacing={2}>
      <TitleScreen title="Obras" />

      <Grid item xs={12} lg={12}>
        <Paper className={classes.paper}>
          <div className={classes.searchBarContainer}>
            <div className={classes.searchBarActionButtonsContainer}>
              <Button
                startIcon={<AddIcon />}
                className={classes.buttonRegister}
                onClick={() => navigate("/obras/cadastrar")}
              >
                Cadastrar
              </Button>
            </div>
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12} lg={12}>
        <div style={{ height: 630, width: "100%" }}>
          <DataGrid
            rows={mockedListConstructions}
            columns={columns}
            disableRowSelectionOnClick
            hideFooterSelectedRowCount
            hideFooterPagination
          />
        </div>
      </Grid>
    </Grid>
  );
};
