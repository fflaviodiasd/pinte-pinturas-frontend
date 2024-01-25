import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Add as AddIcon } from "@mui/icons-material";

import { TableActions } from "../../../components/Table/TableActions";
import { successMessage } from "../../../components/Messages";
import { TitleScreen } from "../../../components/TitleScreen";
import { mockedListClients } from "../../../database/clients";

import { useStyles } from "./styles";

export const ListClients = () => {
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
        field: "cnpj",
        headerName: "CNPJ",
        flex: 1,
        disableColumnMenu: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 200,
        disableColumnMenu: true,
        hideSortIcons: true,
        renderCell: (params: GridRenderCellParams) => (
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",

              width: "100%",
              padding: "4px 0px",
              borderRadius: "4px",

              fontSize: 12,
              color: "#252525",
              opacity: "0.8",
              backgroundColor: params.value ? "#6FED8B" : "#FF3C40",
            }}
          >
            {params.value ? "Ativo" : "Desativado"}
          </Typography>
        ),
      },
      {
        field: "actions",
        headerName: "Ações",
        flex: 0.17,
        disableColumnMenu: true,
        hideSortIcons: true,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => (
          <TableActions
            params={params}
            viewFunction={() => navigate(`/clientes/${params.row.id}`)}
            editFunction={() => navigate(`/clientes/${params.row.id}/editar`)}
          />
        ),
      },
    ],
    []
  );

  return (
    <Grid container spacing={2}>
      <TitleScreen title="Clientes" />

      <Grid item xs={12} lg={12}>
        <Paper className={classes.paper}>
          <div className={classes.searchBarContainer}>
            <div className={classes.searchBarActionButtonsContainer}>
              <Button
                startIcon={<AddIcon />}
                className={classes.buttonRegister}
                onClick={() => navigate("/clientes/cadastrar")}
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
            rows={mockedListClients}
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
