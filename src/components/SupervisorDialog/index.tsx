import React, { useState } from 'react';
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
} from '@mui/material';
import { Add, Delete } from "@mui/icons-material";

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

  const handleCancel = () => {
    onClose();
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
        <List sx={{ width: '45%', overflow: 'auto' }}>
          <Typography variant="h6">Selecione Encarregados</Typography>
          {companiesSupervisorList.map((supervisor:any) => (
            <ListItem key={supervisor.id}>
              <ListItemText primary={supervisor.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => onAddSupervisor(supervisor)}>
                  <Add sx={{      color: '#0076be',
                  }}/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <List sx={{ width: '45%', overflow: 'auto' }}>
          <Typography variant="h6">Encarregados Selecionados</Typography>
          {selectedSupervisors.map((supervisor:any) => (
            <ListItem key={supervisor.id}>
              <ListItemText primary={supervisor.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => onRemoveSupervisor(supervisor.id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={handleSave}>Adicionar</Button>
        </Box>
    </DialogContent>
  </Dialog>
  );
};

export default SupervisorDialog;
