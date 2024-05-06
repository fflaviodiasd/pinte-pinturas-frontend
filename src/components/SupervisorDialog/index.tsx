import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  TextField
} from '@mui/material';
import { Add, Delete, Warning } from "@mui/icons-material";

interface Supervisor {
  id: number;
  name: string;
}

interface SupervisorDialogProps {
  open: boolean;
  onClose: () => void;
  companiesSupervisorList: Supervisor[];
  selectedSupervisors: Supervisor[];
  onAddSupervisor: (supervisor: Supervisor) => void;
  onRemoveSupervisor: (supervisorId: number) => void;
  onSave: (selectedSupervisors: Supervisor[]) => void;
}

const SupervisorDialog: React.FC<SupervisorDialogProps> = ({
  open,
  onClose,
  companiesSupervisorList,
  selectedSupervisors,
  onAddSupervisor,
  onRemoveSupervisor,
  onSave,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSupervisors = useMemo(() => {
    return companiesSupervisorList.filter(supervisor =>
      supervisor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedSupervisors.find(selected => selected.id === supervisor.id)
    );
  }, [companiesSupervisorList, selectedSupervisors, searchTerm]);

  const handleAdd = (supervisor: Supervisor) => {
    onAddSupervisor(supervisor);
  };

  const handleRemove = (supervisorId: number) => {
    onRemoveSupervisor(supervisorId);
  };

  const handleCancel = () => {
    onClose();
  };

  
  const handleSelectAll = () => {
    filteredSupervisors.forEach(supervisor => onAddSupervisor(supervisor));
  };

  const handleRemoveAll = () => {
    selectedSupervisors.forEach(supervisor => onRemoveSupervisor(supervisor.id));
  };

  const handleSave = () => {
    onSave(selectedSupervisors);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Adicionar Encarregados Secundários</DialogTitle>
      <DialogContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
          <Box sx={{ width: '45%', overflow: 'auto' }}>
            <Typography variant="h6">Selecione Encarregados</Typography>
            {filteredSupervisors.length > 0 && (

            <TextField
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar..."
              margin="normal"
            />)}
                        <List sx={{ maxHeight: 300, overflowY: 'auto' }}>
              {filteredSupervisors.map(supervisor => (
                <ListItem key={supervisor.id}>
                  <ListItemText primary={supervisor.name} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleAdd(supervisor)}>
                    <Add sx={{ color: '#0076be' }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          
            </List>
            {filteredSupervisors.length > 0 && (
                <Button onClick={handleSelectAll} fullWidth sx={{ textTransform: 'none' }}>
                  Selecionar Todos
                </Button>
              )}
          </Box>
          <Box sx={{ width: '45%', overflow: 'auto' }}>
            <Typography variant="h6">Encarregados Selecionados</Typography>
            <List sx={{ maxHeight: 300, overflowY: 'auto' }}>
              {selectedSupervisors.map(supervisor => (
                <ListItem key={supervisor.id}>
                  <ListItemText primary={supervisor.name} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleRemove(supervisor.id)}>
                    <Delete sx={{color: '#D32F2F'}}/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          
            </List>
            {selectedSupervisors.length > 0 && (
                <Button onClick={handleRemoveAll} color="error" fullWidth  sx={{ textTransform: 'none' }} >
                  Remover Todos
                </Button>
              )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={handleCancel} sx={{ textTransform: 'none' }} >Cancelar</Button>
          <Button onClick={handleSave} variant='contained' sx={{ textTransform: 'none' }}  >Salvar</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SupervisorDialog;
