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

interface Collaborator {
  id: number;
  name: string;
}

export function Indicators() {
  const { id: collaboratorId } = useParams<{ id: string }>();
  const isEditScreen = Boolean(collaboratorId);
  const { classes } = useStyles();
  const { getAllCollaborators, listCollaborators, getAllCollaboratorsWithoutPagination } = useCollaborators();
  const { getReportsNotation, getReportsNotationChecklist, listReportsNotation, listReportsNotationChecklist } = useConference(); 

  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCollaborator, setSelectedCollaborator] = useState<Collaborator | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [reportType, setReportType] = useState<string>("service");

  useEffect(() => {
    getAllCollaboratorsWithoutPagination();
  }, []);

  useEffect(() => {
    console.log('lista colaboradores', listCollaborators); 
    if (Array.isArray(listCollaborators)) {
      setCollaborators(listCollaborators);
      if (listCollaborators.length > 0) {
        handleSelectCollaborator(listCollaborators[0]);
      }
    }
  }, [listCollaborators]);

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

  const filteredCollaborators = useMemo(() => {
    return collaborators.filter((collaborator) =>
      collaborator.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [collaborators, searchText]);

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
            <Breadcrumb breadcrumbPath1="Obras" breadcrumbPath2="Funcionários" />

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
                  {filteredCollaborators.map((collaborator: Collaborator) => (
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

        <FormikStepper
          initialValues={{}}
          onSubmit={async (values) => {
            console.log(values);
          }}
          onStepChange={handleStepChange}
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
      </Form>
    </Formik>
  );
}
