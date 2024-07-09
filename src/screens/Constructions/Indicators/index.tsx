import React, { useState, useMemo, useEffect } from "react";
import {
  Grid,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { useStyles } from "./styles";
import { useCollaborators } from "../../../hooks/useCollaborators";
import { useConference } from "../../../hooks/useConference"; 
import MoreVertIcon from "@mui/icons-material/ExpandMore";
import ReportGeneral from "./ReportGeneral"; 
import ReportDetails from "./ReportDetails"; 
import ReportChecklist from "./ReportChecklist";
import { FormikStepper, FormikStep } from './FormikStepper'; 
import { TeamsContextProvider } from "../../../contexts/TeamsContext";

interface Collaborator {
  id: number;
  name: string;
}

interface IndicatorsProps {
  collaborators: Collaborator[];
  selectedEmployeeId: number | null; // Adicione esta linha
}

export function Indicators({ collaborators, selectedEmployeeId }: IndicatorsProps) { // Ajuste aqui
  const { id: collaboratorId } = useParams<{ id: string }>();
  const isEditScreen = Boolean(collaboratorId);
  const { classes } = useStyles();
  const { getAllCollaborators, getAllCollaboratorsWithoutPagination } = useCollaborators();
  const { getReportsNotation, getReportsNotationChecklist, listReportsNotation, listReportsNotationChecklist } = useConference(); 

  const [listcollaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCollaborator, setSelectedCollaborator] = useState<Collaborator | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [reportType, setReportType] = useState<string>("service");
  const [selectedMedicoes, setSelectedMedicoes] = useState<string[]>([]);
  const [selectedEquipes, setSelectedEquipes] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);

  useEffect(() => {
    getAllCollaboratorsWithoutPagination();
  }, []);

  useEffect(() => {
    console.log('Received collaborators:', collaborators);
    setCollaborators(collaborators);
  }, [collaborators]);

  const filteredCollaborators = useMemo(() => {
    if (!collaborators || !searchText) return collaborators;
    return collaborators.filter((collaborator) =>
      collaborator.name?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [collaborators, searchText]);
  
  useEffect(() => {
    if (filteredCollaborators.length > 0) {
      if (selectedEmployeeId) {
        const selected = filteredCollaborators.find(c => c.id === selectedEmployeeId) || filteredCollaborators[0];
        setSelectedCollaborator(selected);
        handleSelectCollaborator(selected);
      } else {
        setSelectedCollaborator(filteredCollaborators[0]);
        handleSelectCollaborator(filteredCollaborators[0]);
      }
    }
  }, [filteredCollaborators, selectedEmployeeId]);

  useEffect(() => {
    console.log('lista colaboradores', listcollaborators); 
    if (Array.isArray(listcollaborators)) {
      setCollaborators(listcollaborators);
      if (listcollaborators.length > 0) {
        handleSelectCollaborator(listcollaborators[0]);
      }
    }
  }, [listcollaborators]);

  useEffect(() => {
    console.log('listReportsNotation', listReportsNotation); 
  }, [listReportsNotation]);

  useEffect(() => {
    console.log('listReportsNotationChecklist', listReportsNotationChecklist); 
  }, [listReportsNotationChecklist]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSelectCollaborator = async (collaborator: Collaborator) => {
    setSelectedCollaborator(collaborator);
    setAnchorEl(null);
    await getReportsNotation(reportType, collaborator.id.toString());
    await getReportsNotationChecklist(collaborator.id.toString());
  };

  const handleReportTypeChange = async (value: string) => {
    setReportType(value);
    if (selectedCollaborator) {
      await getReportsNotation(value, selectedCollaborator.id.toString());
    }
  };

  const handleStepChange = async (step: number) => {
    if (step === 1 && selectedCollaborator) {
      await getReportsNotationChecklist(selectedCollaborator.id.toString());
    }
  };

  const handleButtonClick = (button: string, dates?: [Date, Date], selectedItems?: string[]) => {
    console.log(`Button clicked in parent component: ${button}`);
    if (dates) {
      console.log(`Selected dates: ${dates[0].toLocaleDateString()} - ${dates[1].toLocaleDateString()}`);
      setDateRange(dates);
    }
    if (selectedItems) {
      if (button === 'Medição') {
        setSelectedMedicoes(selectedItems);
        console.log(`Selected Medicoes: ${selectedItems.join(', ')}`);
      } else if (button === 'Equipes') {
        setSelectedEquipes(selectedItems);
        console.log(`Selected Equipes: ${selectedItems.join(', ')}`);
      }
    }
  };


  return (
    <Formik
      initialValues={{}}
      onSubmit={async (values) => {
        console.log(values);
      }}
    >
      <Form autoComplete="off">
        <Grid container>
          <Grid item sm={12} md={12} lg={12} className={classes.headerContainer}>

            <div className={classes.actionBar}>
              <div className={classes.actionBarLeftContent}>
                <Typography className={classes.pageSubtitle} sx={{ color: "#0076BE" }}>
                  {selectedCollaborator ? selectedCollaborator.name : "Selecione um colaborador"}
                </Typography>
                <IconButton onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Pesquisar"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </MenuItem>
                  {filteredCollaborators.map((collaborator: Collaborator, index: number) => (
                    <MenuItem
                      key={collaborator.id}
                      onClick={() => handleSelectCollaborator(collaborator)}
                    >
                      <ListItemText primary={collaborator.name} />
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>
          </Grid>
        </Grid>
        <TeamsContextProvider>

        <FormikStepper
          initialValues={{}}
          onSubmit={async (values) => {
            console.log(values);
          }}
          onStepChange={handleStepChange}
          onButtonClick={handleButtonClick}
        >
          <FormikStep label="Geral">
            <Grid container>
              {listReportsNotation && listReportsNotation.general && (
                <ReportGeneral
                  ranking={listReportsNotation.general.ranking}
                  totalChecklist={listReportsNotation.general.total_checklist}
                  totalPackages={listReportsNotation.general.total_packages}
                  totalPriceCompany={listReportsNotation.general.total_price_company}
                  totalPriceEmployee={listReportsNotation.general.total_price_employee}
                  teammates={listReportsNotation.general.teammates}
                />
              )}

              {listReportsNotation && (
                <ReportDetails
                  details={reportType === 'service' ? listReportsNotation.details.map((detail: any) => ({
                    service_name: detail.service_name,
                    stpe_service_name: detail.stpe_service_name,
                    amount_execution: detail.amount_execution,
                    amount_media: detail.amount_media,
                    price_unit: detail.price_unit,
                    total_step: detail.total_step,
                    production_value: detail.production_value,
                    total_production_value: detail.total_production_value,
                  })) : listReportsNotation.details.map((detail: any) => ({
                    package_name: detail.package_name,
                    amount_executed: detail.amount_executed,
                    average_time: detail.average_time,
                    package_price: detail.package_price,
                    total_package: detail.total_package,
                    package_price_workmanship: detail.package_price_workmanship,
                    total_package_workmanship: detail.total_package_workmanship,
                  }))}
                  reportType={reportType}
                  onReportTypeChange={handleReportTypeChange}
                />
              )}
            </Grid>
          </FormikStep>

          <FormikStep label="Checklist">
            <Grid container>
              {listReportsNotation && listReportsNotation.general && (
                <ReportGeneral
                  ranking={listReportsNotation.general.ranking}
                  totalChecklist={listReportsNotation.general.total_checklist}
                  totalPackages={listReportsNotation.general.total_packages}
                  totalPriceCompany={listReportsNotation.general.total_price_company}
                  totalPriceEmployee={listReportsNotation.general.total_price_employee}
                  teammates={listReportsNotation.general.teammates}
                />
              )}

              {listReportsNotationChecklist && (
                <ReportChecklist checklist={listReportsNotationChecklist} />
              )}
            </Grid>
          </FormikStep>
        </FormikStepper>
        </TeamsContextProvider>
      </Form>
    </Formik>
  );
}
