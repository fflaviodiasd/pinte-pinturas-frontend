import React, { useState } from 'react';
import { Formik, FormikConfig, FormikValues, Form } from 'formik';
import { Grid, Box, Typography, Button, Popover, MenuItem, Select, FormControl, InputLabel, Checkbox, ListItemText, SelectChangeEvent } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useStyles } from '../styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupIcon from '@mui/icons-material/Group';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

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

export function FormikStepper({ children, onStepChange, onButtonClick, ...props }: FormikStepperProps) {
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

  const medicoes = ['Medição 1', 'Medição 2', 'Medição 3'];
  const equipes = ['Equipe 1', 'Equipe 2', 'Equipe 3'];

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
    setShowDatePicker((prev) => !prev);
  };

  const handleDateChange = (dates: [Date, Date]) => {
    setDateRange(dates);
    if (dates && dates[0] && dates[1]) {
      setShowDatePicker(false);
      if (onButtonClick) {
        onButtonClick('Período', dates);
      }
    }
  };

  const handleMedicaoClick = (event: React.MouseEvent<HTMLElement>) => {
    setMedicaoAnchorEl(event.currentTarget);
  };

  const handleEquipesClick = (event: React.MouseEvent<HTMLElement>) => {
    setEquipesAnchorEl(event.currentTarget);
  };

  const handleMedicaoClose = () => {
    setMedicaoAnchorEl(null);
  };

  const handleEquipesClose = () => {
    setEquipesAnchorEl(null);
  };

  const handleMedicoesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelectedMedicoes(value);
    if (onButtonClick) {
      onButtonClick('Medição', undefined, value);
    }
  };

  const handleEquipesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelectedEquipes(value);
    if (onButtonClick) {
      onButtonClick('Equipes', undefined, value);
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
                {/* <Box sx={{ display: 'flex', gap: 2, position: 'relative' }}>
                  <Button variant="outlined" startIcon={<CalendarTodayIcon />} onClick={handlePeriodoClick} sx={{ border: 1, borderRadius: 30 }}>
                    Período
                  </Button>
                  <Button variant="outlined" startIcon={<AssessmentIcon />} onClick={handleMedicaoClick} sx={{ border: 1, borderRadius: 30 }}>
                    Medição
                  </Button>
                  <Popover
                    open={Boolean(medicaoAnchorEl)}
                    anchorEl={medicaoAnchorEl}
                    onClose={handleMedicaoClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel>Medição</InputLabel>
                      <Select
                        multiple
                        value={selectedMedicoes}
                        onChange={handleMedicoesChange}
                        renderValue={(selected) => (selected as string[]).join(', ')}
                        MenuProps={MenuProps}
                      >
                        {medicoes.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={selectedMedicoes.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Popover>
                  <Button variant="outlined" startIcon={<GroupIcon />} onClick={handleEquipesClick} sx={{ border: 1, borderRadius: 30 }}>
                    Equipes
                  </Button>
                  <Popover
                    open={Boolean(equipesAnchorEl)}
                    anchorEl={equipesAnchorEl}
                    onClose={handleEquipesClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel>Equipes</InputLabel>
                      <Select
                        multiple
                        value={selectedEquipes}
                        onChange={handleEquipesChange}
                        renderValue={(selected) => (selected as string[]).join(', ')}
                        MenuProps={MenuProps}
                      >
                        {equipes.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={selectedEquipes.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Popover>
                  {showDatePicker && (
                    <Box sx={{ position: 'absolute', bottom: '100%', zIndex: 10, mb: 2 }}>
                      <DateRangePicker onChange={(value: any) => handleDateChange(value as [Date, Date])} value={dateRange} />
                    </Box>
                  )}
                </Box> */}
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
