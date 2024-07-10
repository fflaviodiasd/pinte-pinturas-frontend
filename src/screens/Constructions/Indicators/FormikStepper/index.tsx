import React, { useState, useEffect, useContext } from 'react';
import { Formik, FormikConfig, FormikValues, Form } from 'formik';
import { Grid, Box, Typography, Button, Select, FormControl, InputLabel, Checkbox, ListItemText, SelectChangeEvent, Drawer, IconButton, MenuItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useStyles } from '../styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupIcon from '@mui/icons-material/Group';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import CloseIcon from '@mui/icons-material/Close';
import { useConstructions } from "../../../../hooks/useConstructions";
import {
  TeamsContext,
  TeamsContextProvider,
} from "../../../../contexts/TeamsContext";

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

interface FormikStepperProps extends FormikConfig<FormikValues> {
  children: React.ReactNode;
  onStepChange?: (step: number) => void;
  onButtonClick?: (button: string, dates?: [Date, Date], selectedItems?: string[]) => void;
  onSave?: (params: any) => void; // Adicionando a prop onSave
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function FormikStepper({ children, onStepChange, onButtonClick, onSave, ...props }: FormikStepperProps) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
  
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step] as React.ReactElement<FormikStepProps>;
  const { classes } = useStyles();
  const { id: collaboratorId } = useParams<{ id: string }>();
  const isEditScreen = Boolean(collaboratorId);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [medicaoAnchorEl, setMedicaoAnchorEl] = useState<null | HTMLElement>(null);
  const [equipesAnchorEl, setEquipesAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMedicoes, setSelectedMedicoes] = useState<string[]>([]);
  const [selectedEquipes, setSelectedEquipes] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false); // Estado para controlar a abertura do Drawer
  const [medicaoDrawerOpen, setMedicaoDrawerOpen] = useState(false); // Estado para controlar a abertura do Drawer de Medição
  const [filteredMeasurements, setFilteredMeasurements] = useState<any[]>([]);
  const [equipesDrawerOpen, setEquipesDrawerOpen] = useState(false); // Estado para controlar a abertura do Drawer de Equipes

  const {
    listTeams,
    getAllTeams,
  } = useContext(TeamsContext);
  const { id } = useParams();
  const {
    listConstructionsMeasurements,
    getAllConstructionsMeasurements,
  } = useConstructions();

  useEffect(() => {
    if (id) {
      getAllConstructionsMeasurements();
    }
  }, [id]);

  useEffect(() => {
    getAllTeams();
  }, []);

  useEffect(() => {
    if (
      listConstructionsMeasurements &&
      listConstructionsMeasurements.length > 0
    ) {
      const filteredData = listConstructionsMeasurements.filter(
        (measurement) => measurement.construction.toString() === id
      );
      setFilteredMeasurements(filteredData);
    }
  }, [listConstructionsMeasurements, id]);

  useEffect(() => {
    const params = {
      measurements: selectedMedicoes,
      teams: selectedEquipes,
      start_dt: dateRange ? dateRange[0].toLocaleDateString('en-CA') : null,
      end_dt: dateRange ? dateRange[1].toLocaleDateString('en-CA') : null,
    };
    console.log('Params:', params);
  }, [selectedMedicoes, selectedEquipes, dateRange]);
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStepChange = (index: number) => {
    setStep(index);
    if (onStepChange) {
      onStepChange(index);
    }
  };

  const handlePeriodoClick = () => {
    console.log('Período button clicked');
    setDrawerOpen(true); // Abrir o Drawer ao clicar no botão de Período
  };

  const handleDateChange = (dates: [Date, Date]) => {
    setDateRange(dates);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleMedicaoClick = () => {
    console.log('Medição button clicked');
    setMedicaoDrawerOpen(true); // Abrir o Drawer ao clicar no botão de Medição
  };

  const handleMedicoesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelectedMedicoes(value);
  };

  const handleMedicaoDrawerClose = () => {
    setMedicaoDrawerOpen(false);
  };

  const handleEquipesClick = () => {
    console.log('Equipes button clicked');
    setEquipesDrawerOpen(true); // Abrir o Drawer ao clicar no botão de Equipes
  };

  const handleEquipesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelectedEquipes(value);
  };

  const handleEquipesDrawerClose = () => {
    setEquipesDrawerOpen(false);
  };

  const handleSaveClick = () => {
    setDrawerOpen(false); // Fechar o Drawer ao clicar no botão Salvar
    if (onButtonClick && dateRange) {
      onButtonClick('Período', dateRange);
    }
    if (onSave) {
      const params = {
        measurements: selectedMedicoes,
        teams: selectedEquipes,
        start_dt: dateRange ? dateRange[0].toLocaleDateString('en-CA') : null,
        end_dt: dateRange ? dateRange[1].toLocaleDateString('en-CA') : null,
      };
      onSave(params);
    }
  };

  const handleSaveMedicaoClick = () => {
    setMedicaoDrawerOpen(false); // Fechar o Drawer ao clicar no botão Salvar
    if (onButtonClick) {
      onButtonClick('Medição', undefined, selectedMedicoes);
    }
    if (onSave) {
      const params = {
        measurements: selectedMedicoes,
        teams: selectedEquipes,
        start_dt: dateRange ? dateRange[0].toLocaleDateString('en-CA') : null,
        end_dt: dateRange ? dateRange[1].toLocaleDateString('en-CA') : null,
      };
      onSave(params);
    }
  };

  const handleSaveEquipesClick = () => {
    setEquipesDrawerOpen(false); // Fechar o Drawer ao clicar no botão Salvar
    if (onButtonClick) {
      onButtonClick('Equipes', undefined, selectedEquipes);
    }
    if (onSave) {
      const params = {
        measurements: selectedMedicoes,
        teams: selectedEquipes,
        start_dt: dateRange ? dateRange[0].toLocaleDateString('en-CA') : null,
        end_dt: dateRange ? dateRange[1].toLocaleDateString('en-CA') : null,
      };
      onSave(params);
    }
  };

  return (
    <Formik
      {...props}
      validationSchema={currentChild?.props?.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isEditScreen) {
          await props.onSubmit(values, helpers);
        } else {
          handleStepChange(step + 1);
        }
      }}
      enableReinitialize={true}
    >
      {() => (
        <Form autoComplete="off">
          <Grid container>
            <Grid item sm={12} md={12} lg={12} className={classes.headerContainer}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {childrenArray.map((child, index) => (
                    <Box
                      key={child.props.label}
                      sx={{
                        height: '100%',
                        borderRadius: '0.5rem 0.5rem 0px 0px',
                        padding: '0.25rem 1rem',
                        fontWeight: 600,
                        border: 'none',
                        backgroundColor: index === step ? '#0076BE' : '#eff1f3',
                        color: index === step ? '#FFF' : '#0076BE',
                        cursor: 'pointer',
                        fontFamily: 'Open Sans, sans-serif',
                        fontSize: '0.875rem',
                      }}
                      onClick={() => handleStepChange(index)}
                    >
                      {child.props.label}
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 2, position: 'relative' }}>
                  <Button variant="outlined" startIcon={<CalendarTodayIcon />} onClick={handlePeriodoClick} sx={{ border: 1, borderRadius: 30 }}>
                    Período
                  </Button>
                  <Button variant="outlined" startIcon={<AssessmentIcon />} onClick={handleMedicaoClick} sx={{ border: 1, borderRadius: 30 }}>
                    Medição
                  </Button>
                  <Button variant="outlined" startIcon={<GroupIcon />} onClick={handleEquipesClick} sx={{ border: 1, borderRadius: 30 }}>
                    Equipes
                  </Button>

                  {/* Drawer para Período */}
                  <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={handleDrawerClose}
                  >
                    <Box sx={{ width: 300, p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <IconButton onClick={handleDrawerClose} sx={{ alignSelf: 'flex-end', mb: 2 }}>
                        <CloseIcon />
                      </IconButton>
                      <DateRangePicker onChange={(value: any) => handleDateChange(value as [Date, Date])} value={dateRange} />
                      <Box sx={{ flexGrow: 1 }} /> {/* Espaço flexível para empurrar o botão "Salvar" para o rodapé */}
                      <Button variant="contained" color="primary" onClick={handleSaveClick} sx={{ mt: 2 }}>
                        Salvar
                      </Button>
                    </Box>
                  </Drawer>

                  {/* Drawer para Medição */}
                  <Drawer
                    anchor="right"
                    open={medicaoDrawerOpen}
                    onClose={handleMedicaoDrawerClose}
                  >
                    <Box sx={{ width: 300, p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <IconButton onClick={handleMedicaoDrawerClose} sx={{ alignSelf: 'flex-end', mb: 2 }}>
                        <CloseIcon />
                      </IconButton>
                      <FormControl sx={{ m: 1, width: '100%' }}>
                        <InputLabel>Medição</InputLabel>
                        <Select
                          multiple
                          value={selectedMedicoes}
                          onChange={handleMedicoesChange}
                          renderValue={(selected) => (selected as string[]).join(', ')}
                          MenuProps={MenuProps}
                        >
                          {filteredMeasurements.map((measurement) => (
                            <MenuItem key={measurement.id} value={measurement.name}>
                              <Checkbox checked={selectedMedicoes.indexOf(measurement.name) > -1} />
                              <ListItemText primary={measurement.name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Box sx={{ flexGrow: 1 }} /> {/* Espaço flexível para empurrar o botão "Salvar" para o rodapé */}
                      <Button variant="contained" color="primary" onClick={handleSaveMedicaoClick} sx={{ mt: 2 }}>
                        Salvar
                      </Button>
                    </Box>
                  </Drawer>

                  {/* Drawer para Equipes */}
                  <Drawer
                    anchor="right"
                    open={equipesDrawerOpen}
                    onClose={handleEquipesDrawerClose}
                  >
                    <Box sx={{ width: 300, p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <IconButton onClick={handleEquipesDrawerClose} sx={{ alignSelf: 'flex-end', mb: 2 }}>
                        <CloseIcon />
                      </IconButton>
                      <FormControl sx={{ m: 1, width: '100%' }}>
                        <InputLabel>Equipes</InputLabel>
                        <Select
                          multiple
                          value={selectedEquipes}
                          onChange={handleEquipesChange}
                          renderValue={(selected) => (selected as string[]).join(', ')}
                          MenuProps={MenuProps}
                          label="Equipes"
                        >
                          {listTeams.map((team) => (
                            <MenuItem key={team.id} value={team.name}>
                              <Checkbox checked={selectedEquipes.indexOf(team.name) > -1} />
                              <ListItemText primary={team.name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Box sx={{ flexGrow: 1 }} /> {/* Espaço flexível para empurrar o botão "Salvar" para o rodapé */}
                      <Button variant="contained" color="primary" onClick={handleSaveEquipesClick} sx={{ mt: 2 }}>
                        Salvar
                      </Button>
                    </Box>
                  </Drawer>
                </Box>
              </Box>
              {(dateRange || selectedMedicoes.length > 0 || selectedEquipes.length > 0) && (
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    {dateRange && `Data selecionada: ${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()} ; `}
                    {selectedMedicoes.length > 0 && `Medições selecionadas: ${selectedMedicoes.join(', ')} ; `}
                    {selectedEquipes.length > 0 && `Equipes selecionadas: ${selectedEquipes.join(', ')}`}
                  </Typography>
                </Box>
              )}
            </Grid>

            {currentChild}
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
