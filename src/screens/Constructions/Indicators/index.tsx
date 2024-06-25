import React, { useState, useMemo } from "react";
import {
  Grid,
  Box,
  Card,
  CardContent,
  Paper,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { Formik, Form, FormikConfig, FormikValues } from "formik";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { useStyles } from "./styles";
import { useCollaborators } from "../../../hooks/useCollaborators";
import MoreVertIcon from "@mui/icons-material/ExpandMore";
import { Details } from "./Details";
interface Collaborator {
  id: number;
  name: string;
}

const mockCollaborators: Collaborator[] = [
  { id: 1, name: "Franco Jácomo" },
  { id: 2, name: "João Silva" },
  { id: 3, name: "Maria Souza" },
  { id: 4, name: "Pedro Lima" },
  { id: 5, name: "Ana Clara" },
  { id: 6, name: "José Santos" },
  { id: 7, name: "Carlos Oliveira" },
  { id: 8, name: "Mariana Costa" },
];

const mockData = {
  ranking: "24º",
  company: "R$ 10.484,99",
  companyAvg: "Média Geral: R$ 9.250,85",
  employee: "R$ 4.023,87",
  employeeAvg: "Média Geral: R$ 3.250,85",
  checklists: "234",
  checklistsAvg: "14 média/dia",
  packages: "543",
  packagesAvg: "13 média/dia",
  teamMembers: [
    "Antônio Carlos - EQ01 | EQ02",
    "João Carlos - EQ01 | EQ02",
    "Olavo Gomes - EQ01 | EQ02",
    "Daniel Oliveira - EQ01",
  ],
};

export function Indicators() {
  const { id: collaboratorId } = useParams<{ id: string }>();
  const isEditScreen = Boolean(collaboratorId);
  const { classes } = useStyles();
  const { collaboratorData } = useCollaborators();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCollaborator, setSelectedCollaborator] =
    useState<Collaborator>(mockCollaborators[0]);
  const [searchText, setSearchText] = useState<string>("");

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSelectCollaborator = (collaborator: Collaborator) => {
    setSelectedCollaborator(collaborator);
    setAnchorEl(null);
  };

  const filteredCollaborators = useMemo(() => {
    return mockCollaborators.filter((collaborator) =>
      collaborator.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  return (
    <FormikStepper
      initialValues={collaboratorData}
      onSubmit={async (values) => {
        console.log(values);
      }}
    >
      <FormikStep label="Geral">
        <Details />
      </FormikStep>

      <FormikStep label="Checklist">
        {/* Conteúdo da aba Checklist */}
      </FormikStep>
    </FormikStepper>
  );
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues> & { children: React.ReactNode }) {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[
    step
  ] as React.ReactElement<FormikStepProps>;
  const { classes } = useStyles();
  const { id: collaboratorId } = useParams<{ id: string }>();
  const isEditScreen = Boolean(collaboratorId);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCollaborator, setSelectedCollaborator] =
    useState<Collaborator>(mockCollaborators[0]);
  const [searchText, setSearchText] = useState<string>("");

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSelectCollaborator = (collaborator: Collaborator) => {
    setSelectedCollaborator(collaborator);
    setAnchorEl(null);
  };

  const filteredCollaborators = useMemo(() => {
    return mockCollaborators.filter((collaborator) =>
      collaborator.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  return (
    <Formik
      {...props}
      validationSchema={currentChild?.props?.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isEditScreen) {
          await props.onSubmit(values, helpers);
        } else {
          setStep((s) => s + 1);
        }
      }}
      enableReinitialize={true}
    >
      {() => (
        <Form autoComplete="off">
          <Grid container>
            <Grid
              item
              sm={12}
              md={12}
              lg={12}
              className={classes.headerContainer}
            >
              <Breadcrumb
                breadcrumbPath1="Obras"
                breadcrumbPath2="Funcionários"
              />

              <div className={classes.actionBar}>
                <div className={classes.actionBarLeftContent}>
                  <Typography
                    className={classes.pageSubtitle}
                    sx={{ color: "#0076BE" }}
                  >
                    {selectedCollaborator.name}
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
                    {filteredCollaborators.map((collaborator) => (
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

            <Grid item xs={12} sm={3} md={1} lg={1} style={{ padding: 12 }}>
              <Paper elevation={3} sx={{ padding: "8px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      paddingLeft: 2,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color={"#a1a1a1"}
                    >
                      Ranking
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                      {mockData.ranking}
                    </Typography>
                    <Typography variant="body2" color={"#a1a1a1"}>
                      Atual
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={5} md={3} lg={3} style={{ padding: 12 }}>
              <Paper elevation={3} sx={{ padding: "8px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      borderRight: "1px solid #ccc",
                      paddingRight: 2,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color={"#a1a1a1"}
                    >
                      Empresa
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                      {mockData.company}
                    </Typography>
                    <Typography variant="body2" color={"#a1a1a1"}>
                      {mockData.companyAvg}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      paddingLeft: 2,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color={"#a1a1a1"}
                    >
                      Funcionário
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                      {mockData.employee}
                    </Typography>
                    <Typography variant="body2" color={"#a1a1a1"}>
                      {mockData.employeeAvg}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={5} md={2} lg={2} style={{ padding: 12 }}>
              <Paper elevation={3} sx={{ padding: "8px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      borderRight: "1px solid #ccc",
                      paddingRight: 2,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color={"#a1a1a1"}
                    >
                      Checklists
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                      {mockData.checklists}
                    </Typography>
                    <Typography variant="body2" color={"#a1a1a1"}>
                      {mockData.checklistsAvg}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      paddingLeft: 2,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color={"#a1a1a1"}
                    >
                      Pacotes
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                      {mockData.packages}
                    </Typography>
                    <Typography variant="body2" color={"#a1a1a1"}>
                      {mockData.packagesAvg}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6} style={{ padding: 12 }}>
              <Paper
                elevation={3}
                sx={{
                  padding: "8px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <CardContent
                  sx={{ padding: "8px", maxHeight: "100px", overflow: "auto" }}
                >
                  <Typography variant="subtitle2" color={"#a1a1a1"}>
                    Companheiros de Equipe
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      maxHeight: "100px",
                      overflowX: "auto",
                    }}
                  >
                    {mockData.teamMembers.map((member, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                        fontWeight={300}
                        sx={{ marginRight: 2, whiteSpace: "nowrap" }}
                      >
                        •{member}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Paper>
            </Grid>
          </Grid>

          <Grid item lg={12} style={{ display: "flex", paddingLeft: 12 }}>
            {childrenArray.map((child, index) => (
              <Box
                key={child.props.label}
                sx={{
                  height: "100%",
                  borderRadius: "0.5rem 0.5rem 0px 0px",
                  padding: "0.25rem 1rem",
                  fontWeight: 600,
                  border: "none",
                  backgroundColor: index === step ? "#0076BE" : "#eff1f3",
                  color: index === step ? "#FFF" : "#0076BE",
                  cursor: "pointer",
                  fontFamily: "Open Sans, sans-serif",
                  fontSize: "0.875rem",
                }}
                onClick={() => setStep(index)}
              >
                {child.props.label}
              </Box>
            ))}
          </Grid>
          {currentChild}
        </Form>
      )}
    </Formik>
  );
}
