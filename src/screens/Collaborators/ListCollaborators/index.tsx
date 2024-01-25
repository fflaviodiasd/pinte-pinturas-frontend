import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";
import { MRT_ColumnDef } from "material-react-table";
import { useDebounce } from "use-debounce";

import { Table } from "../../../components/Table";

import { Grid, Paper } from "@mui/material";
import { Collaborator } from "../../../types";
import { Link } from "../../../components/Link";
import { TitleScreen } from "../../../components/TitleScreen";
import { useStyles } from "./styles";
import { useCollaborators } from "../../../hooks/useCollaborators";

type CollaboratorsTableItem = Partial<Collaborator>;

export const ListCollaborators = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const {
    getAllCollaborators,
    listCollaborators,
    disableCollaborator,
    getCollaboratorBySearch,
    pagination,
    handleChangePagination,
  } = useCollaborators();

  const [selectedClientId, setselectedClientId] = useState<number>(0);
  const [modalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleDisable = () => {
    disableCollaborator(selectedClientId);
    setIsModalOpen(false);
  };

  const [text, setText] = useState("");
  const [value] = useDebounce(text, 1000);

  useEffect(() => {
    if (value) {
      getCollaboratorBySearch(value);
    } else {
      getAllCollaborators();
    }
  }, [value]);

  const columns = useMemo<MRT_ColumnDef<CollaboratorsTableItem>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Nome Completo",
      },
      {
        accessorKey: "cellPhone",
        header: "Celular",
      },
      {
        accessorKey: "role",
        header: "Cargo",
      },
      {
        accessorKey: "profile",
        header: "Perfil",
      },

      {
        id: "edit",
        header: "",
        columnDefType: "display",
        muiTableHeadCellProps: {
          align: "right",
        },
        muiTableBodyCellProps: {
          align: "right",
        },
        Cell: ({ cell }) => (
          <Link
            onClick={() =>
              navigate(`/colaboradores/${cell.row.original.id}/editar`)
            }
            label="Editar"
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
            <TitleScreen title="Funcionários" />
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12} lg={12}>
        <Table columns={columns} data={listCollaborators} />
      </Grid>
    </Grid>
  );
};
