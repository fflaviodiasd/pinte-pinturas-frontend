/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  Grid,
  DialogTitle,
  DialogContent,
  Tooltip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  TextField,
  DialogActions,
  Typography,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  Add as AddIcon,
  Delete,
  Warning as WarningIcon,
} from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleFiltersButton,
  MRT_ShowHideColumnsButton,
  type MRT_ColumnDef,
} from "material-react-table";

import { useConstructions } from "../../../../../hooks/useConstructions";

import {
  errorMessage,
  successMessage,
} from "../../../../../components/Messages";
import { EmptyTableText } from "../../../../../components/Table/EmptyTableText";
import { SectionTitle } from "../../../../../components/SectionTitle";

import { useStyles } from "../styles";

interface Supervisor {
  id: number;
  name: string;
}

const getInitials = (name = "") => {
  return name
    .split(" ")
    .filter((n) => n !== "")
    .map((n) => n[0])
    .join("");
};

export const SupervisorSecondaryTable = ({
  secondaryInfo,
  onDataUpdated,
}: any) => {
  const { classes } = useStyles();
  // const navigate = useNavigate();
  const { id } = useParams();

  const {
    getConstruction,
    getCompaniesSupervisorList,
    companiesSupervisorList,
    constructInfoData,
    updateResponsibleSecondary,
    // loading,
  } = useConstructions();

  const [secondaryInfoData, setSecondaryInfoData] =
    useState<any[]>(secondaryInfo);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupervisors, setSelectedSupervisors] =
    useState(secondaryInfoData);
  const [supervisorsToSelect, setSupervisorsToSelect] = useState(
    companiesSupervisorList
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentSupervisor, setCurrentSupervisor] = useState({
    id: null,
    name: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSupervisors = useMemo(() => {
    return supervisorsToSelect.filter((supervisor: Supervisor) =>
      supervisor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [supervisorsToSelect, searchTerm]);
  const handleOpenDeleteModal = (supervisorId: any, supervisorName: any) => {
    setCurrentSupervisor({ id: supervisorId, name: supervisorName });
    setIsDeleteModalOpen(true);
  };

  const handleModalDeleteClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // console.log("SecondaryInfo:", secondaryInfo);
  // console.log("Selected Supervisors:", selectedSupervisors);

  const updateSecondarySupervisor = (selectedSupervisors: Supervisor[]) => {
    const dataToSend = selectedSupervisors.map((supervisor) => supervisor.id);
    updateResponsibleSecondary(dataToSend, false)
      .then(() => {
        console.log("Data updated successfully");
        onDataUpdated(); // Chamada do callback aqui
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Failed to update data", error);
      });
  };

  const handleAddSupervisor = (supervisor: Supervisor) => {
    setSelectedSupervisors((prevSelected) => [...prevSelected, supervisor]);
    setSupervisorsToSelect((prevSupervisors: any) =>
      prevSupervisors.filter((s: Supervisor) => s.id !== supervisor.id)
    );
    console.log("Added supervisor:", supervisor);
  };

  const handleSelectAllSupervisors = () => {
    setSelectedSupervisors(selectedSupervisors.concat(supervisorsToSelect));
    setSupervisorsToSelect([]);
  };

  // Remove todos os supervisores da lista de selecionados
  const handleRemoveAllSupervisors = () => {
    setSupervisorsToSelect(supervisorsToSelect.concat(selectedSupervisors));
    setSelectedSupervisors([]);
  };

  const handleRemoveSupervisor = (supervisorId: number) => {
    const removedSupervisor = selectedSupervisors.find(
      (s: Supervisor) => s.id === supervisorId
    );
    setSelectedSupervisors((prevSelected) =>
      prevSelected.filter((s: Supervisor) => s.id !== supervisorId)
    );
    if (removedSupervisor) {
      setSupervisorsToSelect((prevSupervisors: any) => [
        ...prevSupervisors,
        removedSupervisor,
      ]);
    }
    console.log("Removed supervisor:", supervisorId);
  };

  const handleCancel = () => {
    // Limpa o estado das variáveis e fecha o modal
    setSelectedSupervisors(secondaryInfoData);
    setSupervisorsToSelect(companiesSupervisorList);
    handleCloseModal();
  };

  const handleDeleteSupervisor = async () => {
    const supervisorId = currentSupervisor.id;
    const updatedSupervisors = secondaryInfoData.filter(
      (supervisor) => supervisor.id !== supervisorId
    );
    const idsToUpdate = updatedSupervisors.map((supervisor) => supervisor.id);

    try {
      await updateResponsibleSecondary(idsToUpdate, false);
      successMessage("Encarregado removido com sucesso!");
      setSecondaryInfoData(updatedSupervisors);
      handleModalDeleteClose();
    } catch (error) {
      console.error("Erro ao remover o encarregado:", error);
      errorMessage("Não foi possível remover o encarregado!");
    }
  };

  useEffect(() => {
    if (id) {
      getConstruction(id);
      getCompaniesSupervisorList();
    }
  }, [id]);

  useEffect(() => {
    const initialSupervisorsToSelect = companiesSupervisorList.filter(
      (supervisor: Supervisor) =>
        !selectedSupervisors.find(
          (selected: Supervisor) => selected.id === supervisor.id
        )
    );
    setSupervisorsToSelect(initialSupervisorsToSelect);
  }, [companiesSupervisorList, selectedSupervisors]);

  useEffect(() => {
    setSecondaryInfoData(secondaryInfo);
  }, [secondaryInfo]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Nome Completo",
        enableEditing: false,
        Cell: ({ row }) => {
          const { avatar, name } = row.original;
          const initials = getInitials(name); // Reutilizando sua função para obter as iniciais

          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {avatar === null ? (
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                  }}
                >
                  {initials}
                </Avatar>
              ) : null}
              <Typography>{name}</Typography>
            </Box>
          );
        },
      },
      {
        accessorKey: "office",
        header: "Cargo",
        enableEditing: false,
      },

      {
        accessorKey: "profile",
        header: "Perfil",
        enableEditing: false,
      },
      {
        accessorKey: "inclusion_date",
        header: "Data de Inclusão",
        enableEditing: false,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: secondaryInfoData,
    enableEditing: true,
    createDisplayMode: "row",
    enablePagination: false,
    enableBottomToolbar: false,
    // state: {
    //   isLoading: loading,
    // },
    initialState: { showColumnFilters: false },
    renderEmptyRowsFallback: () => <EmptyTableText />,
    renderRowActions: ({ row }) => (
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <IconButton
          aria-label="Excluir"
          onClick={() =>
            handleOpenDeleteModal(row.original.id, row.original.name)
          }
          sx={{ color: "#C5C7C8" }}
        >
          <Delete />
        </IconButton>
      </div>
    ),
    renderTopToolbar: ({ table }) => (
      <Grid item lg={12} className={classes.headerTableContainer}>
        <SectionTitle title="Secundários" />

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <MRT_ToggleFiltersButton
            table={table}
            className={classes.toolbarButton}
          />
          <MRT_ShowHideColumnsButton
            table={table}
            className={classes.toolbarButton}
          />
          <MRT_ToggleDensePaddingButton
            table={table}
            className={classes.toolbarButton}
          />
          <MRT_ToggleFullScreenButton
            table={table}
            className={classes.toolbarButton}
          />
          <Tooltip title="Adicionar um ou mais encarregados">
            <IconButton
              onClick={handleOpenModal}
              className={classes.toolbarButton}
            >
              <PersonAddIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Grid>
    ),
    filterFns: {
      customFilterFn: (row, id, filterValue) => {
        return row.getValue(id) === filterValue;
      },
    },
    localization: {
      filterCustomFilterFn: "Custom Filter Fn",
    } as any,
    muiTablePaperProps: {
      elevation: 0,
    },
    muiTableProps: {
      style: {
        paddingLeft: 12,
        paddingRight: 12,
      },
    },
    muiTableBodyProps: {
      sx: {
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: "#FAFAFA",
          },
      },
    },
    mrtTheme: (theme) => ({
      draggingBorderColor: theme.palette.secondary.main,
    }),
    // muiSkeletonProps: {
    //   animation: "wave",
    // },
    // muiLinearProgressProps: {
    //   color: "secondary",
    // },
    // muiCircularProgressProps: {
    //   color: "secondary",
    // },
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <MaterialReactTable table={table} />

        <Dialog
          open={isModalOpen}
          onClose={handleCloseModal}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Adicionar Encarregados Secundários</DialogTitle>
          <DialogContent>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", p: 2 }}
            >
              <Box sx={{ width: "45%" }}>
                <Typography variant="h6">Selecione Encarregados</Typography>
                {filteredSupervisors.length > 0 && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Pesquisar..."
                    margin="normal"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ marginBottom: 2 }}
                  />
                )}
                <List
                  sx={{ overflow: "auto", maxHeight: 300, marginBottom: 2 }}
                >
                  {filteredSupervisors.map((supervisor: Supervisor) => (
                    <ListItem key={supervisor.id}>
                      <ListItemText primary={supervisor.name} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => handleAddSupervisor(supervisor)}
                        >
                          <AddIcon sx={{ color: "#0076be" }} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
                {filteredSupervisors.length > 0 && (
                  <Button
                    onClick={handleSelectAllSupervisors}
                    fullWidth
                    sx={{ textTransform: "none" }}
                  >
                    Selecionar Todos
                  </Button>
                )}
              </Box>
              <Box sx={{ width: "45%" }}>
                <Typography variant="h6">Encarregados Selecionados</Typography>
                <List
                  sx={{ overflow: "auto", maxHeight: 380, marginBottom: 2 }}
                >
                  {selectedSupervisors.map((supervisor: any) => (
                    <ListItem key={supervisor.id}>
                      <ListItemText primary={supervisor.name} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => handleRemoveSupervisor(supervisor.id)}
                        >
                          <Delete sx={{ color: "#D32F2F" }} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
                {selectedSupervisors.length > 0 && (
                  <Button
                    onClick={handleRemoveAllSupervisors}
                    color="error"
                    fullWidth
                    sx={{ textTransform: "none" }}
                  >
                    Remover Todos
                  </Button>
                )}
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button onClick={handleCancel} sx={{ textTransform: "none" }}>
                Cancelar
              </Button>
              <Button
                onClick={() => updateSecondarySupervisor(selectedSupervisors)}
                variant="contained"
                sx={{ textTransform: "none" }}
              >
                Adicionar
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog
          open={isDeleteModalOpen}
          onClose={handleModalDeleteClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            style: {
              width: "fit-content",
              maxWidth: "400px",
              borderRadius: 8,
            },
          }}
        >
          <DialogTitle
            sx={{ display: "flex", alignItems: "center", color: "#FF9B1B" }}
          >
            <WarningIcon sx={{ color: "#FF9B1B", marginRight: 1 }} />
            <Typography
              variant="h6"
              component="span"
              sx={{ fontWeight: "bold" }}
            >
              Atenção
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography>
              Deseja remover o encarregado
              <strong> {currentSupervisor.name}</strong>?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleModalDeleteClose}
              sx={{
                color: "primary.main",
                textTransform: "none",
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteSupervisor}
              color="primary"
              variant="contained"
              sx={{
                textTransform: "none",
              }}
            >
              Remover
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};
