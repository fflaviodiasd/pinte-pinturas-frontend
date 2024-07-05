/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { Warning as WarningIcon } from "@mui/icons-material";

import { useConstructions } from "../../../hooks/useConstructions";

import { errorMessage, successMessage } from "../../../components/Messages";
import SupervisorDialog from "../../../components/SupervisorDialog";

import { SupervisorSecondaryTable } from "./tables/SupervisorSecondaryTable";

import { useStyles } from "./styles";
import { SectionTitle } from "../../../components/SectionTitle";

import { HistoryTable } from "./tables/HistoryTable";
import { MainSupervisorInfo } from "./components/MainSupervisorInfo";
import { MainSupervisorActions } from "./components/MainSupervisorActions";
import { ModalAddMainSupervisor } from "./components/ModalAddMainSupervisor";
import { ModalUpdateMainSupervisor } from "./components/ModalUpdateMainSupervisor";
import { ModalRemoveMainSupervisor } from "./components/ModalRemoveMainSupervisor";
import { Loading } from "../../../components/Loading";

interface Supervisor {
  id: number;
  name: string;
}

type ResponsiblePrimary = {
  avatar: string;
  id: number;
  inclusion_date: string;
  name: string;
  profile: string;
};

export const CustomerSupervisor = () => {
  const { classes } = useStyles();
  const { id } = useParams();

  const {
    getConstruction,
    constructInfoData,
    getCompaniesSupervisorList,
    companiesSupervisorList,
    updateResponsible,
    getHistorySupervisor,
    historySupervisor,
    updateResponsibleSecondary,
    loading,
    getCustomersSupervisorList,
    customersSupervisorList
  } = useConstructions();

  const [selectedSupervisor, setSelectedSupervisor] = useState("");
  const [selectedSupervisorName, setSelectedSupervisorName] = useState("");

  const [oldSupervisor, setOldSupervisor] = useState("");
  const [newSupervisor, setNewSupervisor] = useState("");

  const [selectedSupervisors, setSelectedSupervisors] = useState<Supervisor[]>(
    []
  );
  const [supervisorsToSelect, setSupervisorsToSelect] = useState<Supervisor[]>(
    customersSupervisorList
  );
  const [secondarySupervisorData, setSecondarySupervisorData] = useState<
    Supervisor[]
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  const handleAddSupervisor = (newSupervisor: Supervisor) => {
    setSelectedSupervisors((prevSelected) => [...prevSelected, newSupervisor]);

    setSupervisorsToSelect((prevSupervisors) =>
      prevSupervisors.filter((supervisor) => supervisor.id !== newSupervisor.id)
    );
  };

  const handleRemoveSupervisor = (supervisorId: number) => {
    const removedSupervisor = selectedSupervisors.find(
      (supervisor) => supervisor.id === supervisorId
    );

    setSelectedSupervisors((prevSelected) =>
      prevSelected.filter((supervisor) => supervisor.id !== supervisorId)
    );

    if (removedSupervisor) {
      setSupervisorsToSelect((prevSupervisors) => [
        ...prevSupervisors,
        removedSupervisor,
      ]);
    }
  };

  const updateSecondarySupervisor = (selectedSupervisors: Supervisor[]) => {
    const dataToSend = selectedSupervisors.map((supervisor) => supervisor.id);

    updateResponsibleSecondary(dataToSend, false);
    if (id) {
      getConstruction(id);
    }

    handleCloseAddModal();
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleSecondaryClose = () => {
    setIsModalOpen(false);
  };

  const handleModalRemoveClose = () => {
    setOpenRemoveModal(false);
  };

  const handleModalDeleteOpen = () => {
    setOpenRemoveModal(true);
    const currentSupervisor = constructInfoData.responsible_customer_primary;

    setOldSupervisor(String(currentSupervisor.name));
  };

  const handleSelectSupervisor = (
    event: React.ChangeEvent<HTMLInputElement>,
    supervisor?: Supervisor
  ) => {
    const supervisorId = event.target.value;
    const selectedSup =
      supervisor ||
      supervisorsToSelect.find((sup) => sup.id.toString() === supervisorId);
    if (selectedSup) {
      setSelectedSupervisor(selectedSup.id.toString());
      setSelectedSupervisorName(selectedSup.name);
    }
  };

  const handleConfirmAddSupervisor = async () => {
    if (typeof id !== "string") {
      errorMessage("ID da construção não está disponível.");
      return;
    }

    const currentSupervisor = constructInfoData.responsible_customer_primary;
    if (
      currentSupervisor &&
      currentSupervisor.name &&
      selectedSupervisorName &&
      currentSupervisor.name !== selectedSupervisorName
    ) {
      setOldSupervisor(currentSupervisor.name);
      setNewSupervisor(selectedSupervisorName);
      await getConstruction(id);
      await getHistorySupervisor(id, true);

      setOpenUpdateModal(true);
    } else {
      try {
        await updateResponsible(parseInt(selectedSupervisor), true, false);
        successMessage("Responsável primário atualizado com sucesso!");
        await getHistorySupervisor(id, true);
        await getConstruction(id);
        handleCloseAddModal();
      } catch (error) {
        console.error(error);
        errorMessage("Não foi possível atualizar o responsável primário!");
      }
    }
  };

  const handleUpdateSupervisor = () => {
    const currentSupervisor = constructInfoData.responsible_customer_primary;
    if (currentSupervisor && currentSupervisor.id) {
      setOldSupervisor(currentSupervisor.name);
      handleOpenAddModal();
    }
  };

  const handleDeleteSupervisor = async () => {
    if (typeof id === "undefined") {
      errorMessage("ID da construção não está disponível.");
      return;
    }

    try {
      await updateResponsible(null, true, true);
      await getConstruction(id);
      await getHistorySupervisor(id, true);
      handleModalRemoveClose();
      successMessage("Responsável principal removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover responsável principal:", error);
      errorMessage("Não foi possível remover o responsável primário!");
    }
  };

  const handleConfirmUpdate = async () => {
    if (typeof id === "undefined") {
      errorMessage("ID da construção não está disponível.");
      return;
    }

    try {
      await updateResponsible(parseInt(selectedSupervisor), true, false);
      await getHistorySupervisor(id, true);
      await getConstruction(id);

      successMessage("Encarregado substituído com sucesso!");
    } catch (error) {
      // console.error("Erro ao atualizar o responsável:", error);
      errorMessage("Não foi possível atualizar o responsável primário!");
    }

    setOpenUpdateModal(false);
    setOpenAddModal(false);
  };

  const handleDataUpdated = () => {
    if (id) {
      getConstruction(id);
    }
  };

  const responsiblePrimary: ResponsiblePrimary =
    constructInfoData.responsible_customer_primary;

  const isResponsiblePrimaryEmpty =
    !responsiblePrimary?.id || !responsiblePrimary.name;

  useEffect(() => {
    setSecondarySupervisorData(
      constructInfoData.responsible_customer_secondary || []
    );
  }, [constructInfoData.responsible_customer_secondary]);

  useEffect(() => {
    if (id) {
      getConstruction(id);
      getHistorySupervisor(id, true);
      getCustomersSupervisorList(id)
        .then((supervisors: Supervisor[]) => {
          setSupervisorsToSelect(supervisors);
        })
        .catch((error) => {
          console.error("Failed to fetch supervisors:", error);
        });
    }
  }, [id]);

  return (
    <Grid item lg={12} className={classes.container}>
      <Grid item xs={12} lg={12}>
        <div className={classes.MainSupervisorHeader}>
          <SectionTitle title="Principal" />

          {!isResponsiblePrimaryEmpty && (
            <MainSupervisorActions
              handleChangeSupervisor={handleUpdateSupervisor}
              handleDeleteSupervisor={handleModalDeleteOpen}
            />
          )}
        </div>

        {isResponsiblePrimaryEmpty ? (
          <div className={classes.addMainSupervisorButtonContainer}>
            <Button variant="text">
              <Typography
                className={classes.addMainSupervisorButton}
                onClick={handleOpenAddModal}
              >
                Adicionar Encarregado Principal
              </Typography>
            </Button>
          </div>
        ) : (
          <MainSupervisorInfo responsiblePrimary={responsiblePrimary} />
        )}
      </Grid>

      <SupervisorSecondaryTable
        secondaryInfo={secondarySupervisorData}
        onDataUpdated={handleDataUpdated}
      />

      <HistoryTable
        key={historySupervisor.length}
        historyData={historySupervisor}
      />

      <ModalAddMainSupervisor
        open={openAddModal}
        onClose={handleCloseAddModal}
        handleConfirmAddSupervisor={handleConfirmAddSupervisor}
        handleSelectSupervisor={handleSelectSupervisor}
        companiesSupervisorList={customersSupervisorList}
        selectedSupervisor={selectedSupervisor}
      />

      <ModalUpdateMainSupervisor
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        oldSupervisor={oldSupervisor}
        newSupervisor={newSupervisor}
        handleConfirmUpdate={handleConfirmUpdate}
      />

      <ModalRemoveMainSupervisor
        open={openRemoveModal}
        onClose={handleModalRemoveClose}
        oldSupervisor={oldSupervisor}
        handleDeleteSupervisor={handleDeleteSupervisor}
      />

      <SupervisorDialog
        open={isModalOpen}
        onClose={handleSecondaryClose}
        companiesSupervisorList={customersSupervisorList}
        selectedSupervisors={selectedSupervisors}
        onAddSupervisor={handleAddSupervisor}
        onRemoveSupervisor={handleRemoveSupervisor}
        onSave={updateSecondarySupervisor}
      />

      <Loading isLoading={loading} />
    </Grid>
  );
};
