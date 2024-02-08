import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";
import { MRT_ColumnDef } from "material-react-table";
import { useDebounce } from "use-debounce";

import { Table } from "../../../components/Table";

import { Grid, Paper } from "@mui/material";
import { Material } from "../../../types";
import { TitleScreen } from "../../../components/TitleScreen";
import { useStyles } from "./styles";
import { TablePagination } from "../../../components/Table/Pagination";
import { Launch } from "@mui/icons-material";
import { useMaterials } from "../../../hooks/useMaterials";

type MaterialsTableItem = Partial<Material>;

export const ListMaterials = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const {
    getAllMaterials,
    listMaterials,
    disableMaterial,
    getMaterialBySearch,
    pagination,
    handleChangePagination,
  } = useMaterials();

  const [selectedMaterialId, setselectedMaterialId] = useState<number>(0);
  const [modalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleDisable = () => {
    disableMaterial(selectedMaterialId);
    setIsModalOpen(false);
  };

  const [text, setText] = useState("");
  const [value] = useDebounce(text, 1000);

  useEffect(() => {
    if (value) {
      getMaterialBySearch(value);
    } else {
      getAllMaterials();
    }
  }, [value]);

  const columns = useMemo<MRT_ColumnDef<MaterialsTableItem>[]>(
    () => [
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

        Cell: ({ cell }) => <Launch />,
      },
      {
        accessorKey: "name",
        header: "Nome",
      },
      {
        accessorKey: "group",
        header: "Grupo",
      },
      {
        accessorKey: "unit",
        header: "Unidade",
      },
      {
        accessorKey: "expectedConsumption",
        header: "Consumo Esperado",
      },
      {
        accessorKey: "consumptionRealized",
        header: "Consumo Realizado",
      },
    ],
    []
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <Paper className={classes.paper}>
          <div className={classes.searchBarContainer}>
            <TitleScreen title="Materiais" />
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12} lg={12}>
        <Table columns={columns} data={listMaterials} />
        {Boolean(listMaterials.length) && (
          <TablePagination
            count={pagination.pageQuantity}
            page={pagination.currentPage}
            onChange={handleChangePagination}
          />
        )}
      </Grid>
    </Grid>
  );
};
