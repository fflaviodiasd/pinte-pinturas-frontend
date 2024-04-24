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

import { IconButton } from "@mui/material";
import { errorMessage, successMessage } from "../../../components/Messages";
import { UserContext } from "../../../contexts/UserContext";

import SearchIcon from '@mui/icons-material/Search';
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
    
 

  } = useConstructions();


  const [responsibleInfoData, setResponsibleInfoData] = useState({} as any);

  const { id } = useParams()
  const [loading, setLoading] = useState(true); 
  const [openModal, setOpenModal] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [selectedSupervisorName, setSelectedSupervisorName] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [newSupervisor, setNewSupervisor] = useState(null);
  const [oldSupervisor, setOldSupervisor] = useState(null);

  useEffect(() => {
    if (id) {
      getConstruction(id).finally(() => setLoading(false)); 
      getCompaniesSupervisorList();
    }
  }, [id]);

  console.log('constructInfoData:', constructInfoData); 

  const handleChange = (event:any) => {
    setSelectedSupervisor(event.target.value);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

const handleSelectSupervisor = (event: React.ChangeEvent<HTMLInputElement>, supervisor?: any) => {
  const supervisorId = event.target.value;
  const selectedSup = supervisor || companiesSupervisorList.find((sup) => sup.id.toString() === supervisorId);
  setSelectedSupervisor(supervisorId);
  setSelectedSupervisorName(selectedSup?.name);
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
      setIsConfirmModalOpen(true);
    } else {
      try {
        await updateResponsible(parseInt(selectedSupervisor), true, false);
        successMessage("Responsável primário atualizado com sucesso!");
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
      handleOpenModal(); 
    }
  };

  

  const handleConfirmUpdate = async () => {
    await updateCustomerPrimaryResponsible(parseInt(selectedSupervisor));
    setIsConfirmModalOpen(false);
    setOpenModal(false);
    await getConstruction(id);
    successMessage("Encarregado substituído com sucesso!");
  };



  const handleCancelAddSupervisor = () => {
    console.log('Adição de supervisor cancelada');
    handleCloseModal();
  };

 
  const handleAddSupervisor = () => {
    console.log('Adicionar Encarregado');
    console.log('companiesSupervisorList:', companiesSupervisorList);
  };


  const responsibleCustomerPrimary = constructInfoData.responsible_customer_primary || {};
  const isResponsiblePrimaryEmpty = !responsibleCustomerPrimary.id || !responsibleCustomerPrimary.name;

  const initials = responsibleCustomerPrimary.name ? getInitials(responsibleCustomerPrimary.name) : '';


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
              onClick={() => updateResponsible(null, true, true)}
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
            value={responsibleCustomerPrimary.id || ''}
            variant="outlined"
            disabled
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs>
          <TextField
            label="Nome"
            value={responsibleCustomerPrimary.name || ''}
            variant="outlined"
            disabled
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs>
          <TextField
            label="Perfil"
            value={responsibleCustomerPrimary.profile || ''}
            variant="outlined"
            disabled
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs>
          <TextField
            label="Data de Inclusão"
            value={responsibleCustomerPrimary.inclusion_date || ''}
            variant="outlined"
            disabled
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>

    </Grid>
            )}
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
        onClick={handleOpenModal}
      >
        Adicionar Encarregado
      </Button>
      </Grid>
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>Adicionar Encarregado</DialogTitle>
        <DialogContent dividers={true}>
     
        <RadioGroup value={selectedSupervisor} onChange={(event) => handleSelectSupervisor(event, companiesSupervisorList.find(sup => sup.id.toString() === event.target.value))}>
  {companiesSupervisorList.map((supervisor: any) => (
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
      width: 'fit-content', // Ajusta a largura do papel para o conteúdo
      maxWidth: '400px', // Um valor máximo para garantir que não fique muito largo
      borderRadius: 8 // Aumentar para um efeito mais "quadrado"
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
      <strong> {newSupervisor} </strong>?
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
    </Grid>

  );
};