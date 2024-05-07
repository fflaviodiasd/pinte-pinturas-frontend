import { useContext, useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_TableOptions,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleFiltersButton,
  MRT_ShowHideColumnsButton,
} from "material-react-table";

import { Box, Grid, Tooltip, Avatar, TextField, Button, useTheme, Typography, Dialog, DialogContent, DialogActions, RadioGroup, FormControlLabel, Radio, DialogTitle} from "@mui/material";
import { useStyles } from "./styles";
import { useParams, useNavigate } from "react-router-dom";
import { useConstructions } from "../../../hooks/useConstructions";
import { Autorenew, Launch, Edit, Delete, Info } from "@mui/icons-material";
import AlertTitle from '@mui/material/AlertTitle';
import WarningIcon from '@mui/icons-material/Warning';
import Alert from '@mui/material/Alert';
import { SupervisorSecondaryTable } from "./SupervisorSecondaryTable";
import { IconButton } from "@mui/material";
import { errorMessage, successMessage } from "../../../components/Messages";
import { UserContext } from "../../../contexts/UserContext";
import HistoryTable from "../../../components/HistoryTable";
import SearchIcon from '@mui/icons-material/Search';
import  SupervisorDialog  from "../../../components/SupervisorDialog";
import { get } from "http";

interface Supervisor {
  id: number;
  name: string;
}

const getInitials = (name = '') => {
  return name.split(' ').filter((n) => n !== '').map((n) => n[0]).join('');
};

export const CustomerSupervisor = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const {
    getConstruction,
    constructInfoData,
    getCompaniesSupervisorList,
    companiesSupervisorList,
    updateResponsible,
    getHistorySupervisor,
    historySupervisor,
    updateResponsibleSecondary
  
  } = useConstructions();


  const [responsibleInfoData, setResponsibleInfoData] = useState({} as any);

  const { id } = useParams()
  const [loading, setLoading] = useState(true); 
  const [openModal, setOpenModal] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [selectedSupervisorName, setSelectedSupervisorName] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  // const [newSupervisor, setNewSupervisor] = useState(null);
  const [oldSupervisor, setOldSupervisor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedSupervisors, setSelectedSupervisors] = useState([]);
  // const [supervisorsToSelect, setSupervisorsToSelect] = useState(companiesSupervisorList);
  const [selectedSupervisors, setSelectedSupervisors] = useState<Supervisor[]>([]);
  const [supervisorsToSelect, setSupervisorsToSelect] = useState<Supervisor[]>(companiesSupervisorList);
  const [newSupervisor, setNewSupervisor] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [secondarySupervisorData, setSecondarySupervisorData] = useState<Supervisor[]>([]);

 const handleAddSupervisor = (supervisor:any) => {
    setSelectedSupervisors((prevSelected):any => [...prevSelected, supervisor]);
    setSupervisorsToSelect((prevSupervisors:any) =>
      prevSupervisors.filter((s:any) => s.id !== supervisor.id)
    );
    console.log('Added supervisor>:', supervisor);
  };

  const handleRemoveSupervisor = (supervisorId: number) => {
    const removedSupervisor = selectedSupervisors.find((supervisor) => supervisor.id === supervisorId);
    setSelectedSupervisors((prevSelected) =>
      prevSelected.filter((supervisor) => supervisor.id !== supervisorId)
    );
    if (removedSupervisor) {
      setSupervisorsToSelect((prevSupervisors) => [...prevSupervisors, removedSupervisor]);
    }
    console.log('Removed supervisor:', supervisorId);
  };

  useEffect(() => {
    if (id) {
      getHistorySupervisor(id, true);
    }
  }, [id]);

  useEffect(() => {
    setSecondarySupervisorData(constructInfoData.responsible_customer_secondary || []);
  }, [constructInfoData.responsible_customer_secondary]);
  
  useEffect(() => {
    if (id) {
      getConstruction(id).finally(() => setLoading(false));
      getCompaniesSupervisorList().then((supervisors: Supervisor[]) => {
        setSupervisorsToSelect(supervisors);
      }).catch(error => {
        console.error('Failed to fetch supervisors:', error);
      });
    }
  }, [id]);

  useEffect(() => {
    setSecondarySupervisorData(constructInfoData.responsible_customer_secondary || []);
  }, [constructInfoData.responsible_customer_secondary]);
  const handleSecondaryModal = () => {
    setIsModalOpen(true);
  }
  
  const handleSecondaryClose = () => {
    setIsModalOpen(false);
  }

  const updateSecondarySupervisor = (selectedSupervisors: Supervisor[]) => {
    const dataToSend = selectedSupervisors.map(supervisor => supervisor.id);
    console.log('Data to send:', dataToSend);
    updateResponsibleSecondary(dataToSend, true);
 if (id) {
      getConstruction(id).finally(() => setLoading(false)); 

    }

  
    handleCloseModal();
  };


  // console.log("companiesSupervisorList", companiesSupervisorList);
useEffect(() => {
  // console.log("History Supervisor has updated", historySupervisor);
}, [historySupervisor]); 





  useEffect(() => {
    if (id) {
      getConstruction(id).finally(() => setLoading(false));
      getCompaniesSupervisorList().then((supervisors: Supervisor[]) => {
        setSupervisorsToSelect(supervisors);
      }).catch(error => {
        console.error('Failed to fetch supervisors:', error);
      });
    }
  }, [id]); 
  

  const handleChange = (event:any) => {
    setSelectedSupervisor(event.target.value);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleModalDeleteOpen = () => {
    setIsDeleteModalOpen(true);
    const currentSupervisor = constructInfoData.responsible_customer_primary;

    setOldSupervisor(currentSupervisor.name);
  }

  const handleModalDeleteClose = () => {
    setIsDeleteModalOpen(false);
  }


const handleSelectSupervisor = (event: React.ChangeEvent<HTMLInputElement>, supervisor?: Supervisor) => {
  const supervisorId = event.target.value;
  const selectedSup = supervisor || supervisorsToSelect.find(sup => sup.id.toString() === supervisorId);
  if (selectedSup) {
    setSelectedSupervisor(selectedSup.id.toString());
    setSelectedSupervisorName(selectedSup.name);
  }
};


const handleConfirmAddSupervisor = async () => {
  if (typeof id !== 'string') {
    errorMessage("ID da construção não está disponível.");
    return;
  }

  const currentSupervisor = constructInfoData.responsible_customer_primary;
  if (currentSupervisor && currentSupervisor.name && selectedSupervisorName && currentSupervisor.name !== selectedSupervisorName) {
    setOldSupervisor(currentSupervisor.name);
    setNewSupervisor(selectedSupervisorName);
    await getConstruction(id);
    await getHistorySupervisor(id, false);

    setIsConfirmModalOpen(true);
  } else {
    try {
      await updateResponsible(parseInt(selectedSupervisor), true, false);
      successMessage("Responsável primário atualizado com sucesso!");
      await getHistorySupervisor(id, false);
      await getConstruction(id);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      errorMessage("Não foi possível atualizar o responsável primário!");
      setLoading(false);
    }
  }
};


  
  

  const handleUpdateSupervisor = () => {
    const currentSupervisor = constructInfoData.responsible_customer_primary;
    if (currentSupervisor && currentSupervisor.id) {
      setOldSupervisor(currentSupervisor.name);
      handleOpenModal(); 
      // handleOpenModal(); 
    }
    
  };


  const handleDeleteSupervisor = async () => {
    if (typeof id === 'undefined') {
      errorMessage("ID da construção não está disponível.");
      return;
    }
  
    try {
      await updateResponsible(null, true, true);
      await getConstruction(id);
      await getHistorySupervisor(id, false);
      handleModalDeleteClose();
      successMessage("Responsável primário removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover responsável primário:", error);
      errorMessage("Não foi possível remover o responsável primário!");
    }
  }
  
  const handleConfirmUpdate = async () => {
    if (typeof id === 'undefined') {
      errorMessage("ID da construção não está disponível.");
      return; 
    }
  
    try {
      await updateResponsible(parseInt(selectedSupervisor), true, false);
      await getHistorySupervisor(id, false); 
      await getConstruction(id);
  
      successMessage("Encarregado substituído com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o responsável:", error);
      errorMessage("Não foi possível atualizar o responsável primário!");
    }
  
    setIsConfirmModalOpen(false);
    setOpenModal(false);
  };
  



  const handleCancelAddSupervisor = () => {
    console.log('Adição de supervisor cancelada');
    handleCloseModal();
  };

 
  const handleDataUpdated = () => {
    if (id) {
      getConstruction(id).finally(() => setLoading(false));
    }
  };
  

  const responsiblePrimary = constructInfoData.responsible_customer_primary || {};
  const responsibleSecondary = constructInfoData.responsible_customer_secondary || [];


  const isResponsiblePrimaryEmpty = !responsiblePrimary.id || !responsiblePrimary.name;
  const isResponsibleSecondaryEmpty = responsibleSecondary.length === 0;

  const initials = responsiblePrimary.name ? getInitials(responsiblePrimary.name) : '';


  return (
    <Grid container spacing={2} style={{ padding: 18 }}>
            {isResponsiblePrimaryEmpty ? (
                  <Grid item xs={12} lg={12}>
                  <Grid item xs={12} container justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" component="div" gutterBottom>
                      Principal
                    </Typography>
                
                   
                  </Grid>
                    <Button
                    variant="outlined"
                    sx={{
                      borderColor: '#0076be',
                      color: '#0076be',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#0076be',
                        color: 'white',
                      },
                    }}
                    onClick={handleOpenModal}
                  >
                    Adicionar Encarregado
                  </Button>
                  </Grid>
            ) : (

      <Grid item xs={12} lg={12}>
      <Grid item xs={12} container justifyContent="space-between" alignItems="center">
        <Typography variant="h5" component="div" gutterBottom>
          Principal
        </Typography>
        <Box>
        <Tooltip title="Alterar encarregado">

        <IconButton
            color="primary"
            sx={{
              border: '1px solid',
              borderColor: '#0076be', //
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(0, 118, 190, 0.04)',
              },
              marginRight: '8px',
            }}
            onClick={() => handleUpdateSupervisor()}

            
          >
            <Autorenew />
          </IconButton>
        </Tooltip>
        <Tooltip title="Remover encarregado">

          <IconButton
          onClick={() => handleModalDeleteOpen()}
            sx={{
              border: '1px solid #D32F2F',
              borderRadius: '8px',
              color: '#D32F2F',
              '&:hover': {
                backgroundColor: 'rgba(211, 47, 47, 0.1)',
              },
              '& .MuiSvgIcon-root': { 
                color: '#D32F2F', 
              },
            }}
          >
            <Delete />
          </IconButton>
        </Tooltip>
        </Box>
      </Grid>
        <Grid container item xs={12} alignItems="center" spacing={2} direction="row">
        <Grid item>
        <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>{initials}</Avatar>
        </Grid>
        <Grid item xs>
          <TextField
            label="ID"
            value={responsiblePrimary.id || ''}
            variant="outlined"
            disabled
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs>
          <TextField
            label="Nome"
            value={responsiblePrimary.name || ''}
            variant="outlined"
            disabled
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs>
          <TextField
            label="Perfil"
            value={responsiblePrimary.profile || ''}
            variant="outlined"
            disabled
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs>
          <TextField
            label="Data de Inclusão"
            value={responsiblePrimary.inclusion_date || ''}
            variant="outlined"
            disabled
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>

    </Grid>
            )}

            {isResponsibleSecondaryEmpty ? (
    <Grid item xs={12} lg={12}>
      
      <Grid item xs={12} container justifyContent="space-between" alignItems="center">
        <Typography variant="h5" component="div" gutterBottom>
          Secundários
        </Typography>
    
       
      </Grid>


        <Button
        variant="outlined"
        sx={{
          borderColor: '#0076be',
          color: '#0076be',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#0076be',
            color: 'white',
          },
        }}
        onClick={handleSecondaryModal}
      >
        Adicionar Encarregado
      </Button>
    </Grid>) : (

      <Grid item xs={12} lg={12}>
 
    <SupervisorSecondaryTable secondaryInfo={secondarySupervisorData} onDataUpdated={handleDataUpdated}/>


    </Grid>
  
  )}

      <Grid item xs={12} lg={12}>
    
        <HistoryTable key={historySupervisor.length} historyData={historySupervisor} />
       </Grid> 
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>Adicionar Encarregado</DialogTitle>
        <DialogContent dividers={true}>
     
        {/* <RadioGroup value={selectedSupervisor} onChange={(event) => handleSelectSupervisor(event, companiesSupervisorList.find(sup => sup.id.toString() === event.target.value))}>
  {companiesSupervisorList.map((supervisor: any) => (
    <FormControlLabel
      key={supervisor.id}
      value={supervisor.id.toString()}
      control={<Radio />}
      label={supervisor.name}
    />
  ))}
</RadioGroup> */}

<RadioGroup 
  value={selectedSupervisor} 
  onChange={(event) => handleSelectSupervisor(event, companiesSupervisorList.find((sup: Supervisor) => sup.id.toString() === event.target.value))}
>
  {companiesSupervisorList.map((supervisor: Supervisor) => (
    <FormControlLabel
      key={supervisor.id}
      value={supervisor.id.toString()}
      control={<Radio />}
      label={supervisor.name}
    />
  ))}
</RadioGroup>








        </DialogContent>
        <DialogActions >
  <Button
    onClick={handleCancelAddSupervisor}
    sx={{
      color: 'primary.main', 
      textTransform: 'none',

    }}
  >
    Cancelar
  </Button>
  <Button
    onClick={handleConfirmAddSupervisor}
    variant="contained" 
    color="primary" 
    sx={{
      textTransform: 'none',

    }}
  >
    Adicionar
  </Button>
</DialogActions>

      </Dialog>
      <Dialog
  open={isConfirmModalOpen}
  onClose={() => setIsConfirmModalOpen(false)}
  maxWidth="sm"
  fullWidth
  PaperProps={{
    style: { 
      width: 'fit-content',
      maxWidth: '400px', 
      borderRadius: 8 
    },
  }}
>
  <DialogTitle sx={{ display: 'flex', alignItems: 'center', color: '#FF9B1B' }}>
    <WarningIcon sx={{ color: '#FF9B1B', marginRight: 1 }} />
    <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
      Atenção
    </Typography>
  </DialogTitle>
  <DialogContent>
    <Typography>
      Já existe um encarregado principal selecionado, deseja substituir 
      <strong> {oldSupervisor} </strong> por 
      <strong> {newSupervisor}</strong>?
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setIsConfirmModalOpen(false)} sx={{
      color: 'primary.main', 
      textTransform: 'none',
    }}>
      Cancelar
    </Button>
    <Button onClick={handleConfirmUpdate} color="primary" variant="contained"  sx={{
      textTransform: 'none',
    }}>
      Substituir
    </Button>
  </DialogActions>
      </Dialog>

      <Dialog
  open={isDeleteModalOpen}
  onClose={() => setIsDeleteModalOpen(false)}
  maxWidth="sm"
  fullWidth
  PaperProps={{
    style: { 
      width: 'fit-content',
      maxWidth: '400px', 
      borderRadius: 8 
    },
  }}
>
  <DialogTitle sx={{ display: 'flex', alignItems: 'center', color: '#FF9B1B' }}>
    <WarningIcon sx={{ color: '#FF9B1B', marginRight: 1 }} />
    <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
      Atenção
    </Typography>
  </DialogTitle>
  <DialogContent>
    <Typography>
      Deseja remover o encarregado principal
      <strong> {oldSupervisor}</strong>?
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => handleModalDeleteClose()} sx={{
      color: 'primary.main', 
      textTransform: 'none',
    }}>
      Cancelar
    </Button>
    <Button onClick={handleDeleteSupervisor} color="primary" variant="contained"  sx={{
      textTransform: 'none',
    }}>
      Remover
    </Button>
  </DialogActions>
      </Dialog>

<SupervisorDialog
        open={isModalOpen}
        onClose={handleSecondaryClose}
        companiesSupervisorList={companiesSupervisorList}
        selectedSupervisors={selectedSupervisors}
        onAddSupervisor={handleAddSupervisor}
        onRemoveSupervisor={handleRemoveSupervisor}
        onSave={updateSecondarySupervisor}
      />
    </Grid>

  );
};