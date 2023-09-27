import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Add as AddIcon } from "@mui/icons-material";

import { TableActions } from "../../../components/Table/TableActions";
import { successMessage } from "../../../components/Messages";

import { useStyles } from "./styles";
import { useAreas } from "../../../hooks/useAreas";

export const ListAreas = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();

  const { areaId } = useParams();

  const { areaData, getArea } = useAreas();

  useEffect(() => {
    if (areaId) {
      getArea(areaId);
    }
  }, [areaId]);

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
        field: "type",
        headerName: "Tipo",
        flex: 0.4,
        disableColumnMenu: true,
      },
      {
        field: "actions",
        headerName: "Ações",
        flex: 0.1,
        disableColumnMenu: true,
        hideSortIcons: true,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => (
          <TableActions
            params={params}
            viewFunction={() => navigate(`/areas/${params.row.id}`)}
            editFunction={() => navigate(`/areas/${params.row.id}/editar`)}
            deleteFunction={() => successMessage("Área excluída com sucesso!")}
          />
        ),
      },
    ],
    []
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <Paper className={classes.paper}>
          <div className={classes.searchBarContainer}>
            <div className={classes.searchBarActionButtonsContainer}>
              <Button
                startIcon={<AddIcon />}
                className={classes.buttonRegister}
                onClick={() => navigate("cadastrar")}
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
            rows={areaData.childAreas}
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
