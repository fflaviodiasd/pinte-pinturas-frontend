/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { Formik, Form as FormikForm } from "formik";

import { useNewConstructions } from "../../../hooks/useNewConstruction";
import { ConstructionRegister } from "../../../types";

import { BackgroundAvatar } from "../../../components/BackgroundAvatar";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { Loading } from "../../../components/Loading";
import { Tab } from "../../../components/Tab";

import { MeasurementsConstructions } from "../MeasurementsConstructions";
import { SupervisorConstructions } from "../SupervisorConstructions";
import { ServicesConstructions } from "../ServicesConstructions";
import { PackageConstructions } from "../PackageConstructions";
import { CustomerSupervisor } from "../CustomerSupervisor";
import { ListConstructionsMaterials } from "../Materials";
import { ListLocal } from "../Local";
import { Teams } from "../Teams";

import { GeneralDataForm } from "./components/GeneralDataForm";
import { AddressForm } from "./components/AddressForm";

import { TabsContainer, useStyles } from "./styles";
import { ListConstructionsEmployees } from "../Employees";

type HandleChange = {
  (e: React.ChangeEvent<any>): void;
  <T = string | React.ChangeEvent<any>>(
    field: T
  ): T extends React.ChangeEvent<any>
    ? void
    : (e: string | React.ChangeEvent<any>) => void;
};

export const EmployeesConstruction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: constructionId, checklistid: checkListId } = useParams();
  console.log("CHECKLISTID>>>>", checkListId);
  const isEditScreen = constructionId;
  const { classes } = useStyles();

  const {
    loading,
    getConstruction,
    addConstruction,
    updateConstruction,
    constructionRegister,
  } = useNewConstructions();

  const [selectedTab, setSelectedTab] = useState(1);

  const handleSelectTab = (index: number) => {
    setSelectedTab(index);
  };

  const handleSubmit = async (values: ConstructionRegister) => {
    if (isEditScreen) {
      updateConstruction(values);
    } else {
      addConstruction(values);
    }
  };

  useEffect(() => {
    if (constructionId) {
      getConstruction(constructionId);
    }
  }, [constructionId]);

  const isCreation =
    location.pathname.includes("cadastrar/dados-gerais") ||
    location.pathname.includes("cadastrar/endereco");

  const displayContent = (
    values: ConstructionRegister,
    handleChange: HandleChange
  ) => {
    if (isCreation) {
      switch (true) {
        case location.pathname.includes("cadastrar/dados-gerais"):
          return (
            <GeneralDataForm values={values} handleChange={handleChange} />
          );
        case location.pathname.includes("cadastrar/endereco"):
          return <AddressForm values={values} handleChange={handleChange} />;
      }
    } else {
      switch (true) {
        case location.pathname.includes("locais"):
          return <ListLocal />;
        case location.pathname.includes("dados-gerais"):
          return (
            <GeneralDataForm values={values} handleChange={handleChange} />
          );
        case location.pathname.includes("endereco"):
          return <AddressForm values={values} handleChange={handleChange} />;
        case location.pathname.includes("cadastrar/dados-gerais"):
          return (
            <GeneralDataForm values={values} handleChange={handleChange} />
          );
        case location.pathname.includes("cadastrar/endereco"):
          return <AddressForm values={values} handleChange={handleChange} />;
        case location.pathname.includes("supervisores"):
          return <SupervisorConstructions />;
        case location.pathname.includes("encarregados-cliente"):
          return <CustomerSupervisor />;
        case location.pathname.includes("materiais"):
          return <ListConstructionsMaterials />;
        case location.pathname.includes("equipes"):
          return <Teams />;
        case location.pathname.includes("servicos"):
          return <ServicesConstructions />;
        case location.pathname.includes("pacotes"):
          return <PackageConstructions />;
        case location.pathname.includes("medicoes"):
          return <MeasurementsConstructions />;
        case location.pathname.includes("funcionarios"):
          return <ListConstructionsEmployees />;
      }
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={
        isEditScreen ? constructionRegister : constructionFormValues
      }
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ handleChange, values, errors }) => (
        <FormikForm>
          <Grid container>
            <Grid
              item
              sm={12}
              md={12}
              lg={12}
              className={classes.headerContainer}
            >
              <div>
                {isEditScreen ? (
                  <Breadcrumb
                    breadcrumbPath1={"Obras"}
                    breadcrumbPath2={"Edição"}
                  />
                ) : (
                  <Breadcrumb
                    breadcrumbPath1={"Obras"}
                    breadcrumbPath2={"Cadastro"}
                  />
                )}
              </div>

              <div className={classes.titleContainer}>
                {values.fantasy_name ? (
                  <div className={classes.nameContainer}>
                    {values.fantasy_name && (
                      <BackgroundAvatar avatarName={values.fantasy_name} />
                    )}
                    <Typography className={classes.nameText}>
                      {values.fantasy_name}
                    </Typography>
                  </div>
                ) : (
                  <Typography className={classes.title}>Nova Obra</Typography>
                )}

                {location.pathname.includes("dados-gerais") ||
                location.pathname.includes("endereco") ? (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.buttonSave}
                  >
                    {isEditScreen ? "Salvar" : "Cadastrar"}
                  </Button>
                ) : null}
              </div>
            </Grid>

            <Grid item sm={12} md={12} lg={12}>
              <TabsContainer>
                {isCreation ? (
                  <>
                    <Tab
                      text="Dados Gerais"
                      isActive={location.pathname.includes(
                        "cadastrar/dados-gerais"
                      )}
                      onClick={() => navigate("/obras/cadastrar/dados-gerais")}
                    />
                    <Tab
                      text="Endereço"
                      isActive={location.pathname.includes(
                        "cadastrar/endereco"
                      )}
                      onClick={() => navigate("/obras/cadastrar/endereco")}
                    />
                  </>
                ) : (
                  list.map((tab) => (
                    <Tab
                      key={tab.text}
                      text={tab.text}
                      isActive={location.pathname.includes(tab.path)}
                      onClick={() =>
                        navigate(`/obras/${constructionId}/${tab.path}`)
                      }
                    />
                  ))
                )}
              </TabsContainer>
            </Grid>

            {displayContent(values, handleChange)}

            <Loading isLoading={loading} />
          </Grid>
        </FormikForm>
      )}
    </Formik>
  );
};

const constructionFormValues = {
  id: 0,
  fantasy_name: "",
  customer: "",
  phone: "",
  corporate_name: "",
  cnpj: "",
  cno: "",
  email: "",
  municipal_registration: "",
  state_registration: "",
  active: true,

  cep: "",
  state: "",
  county: "",
  neighborhood: "",
  public_place: "",
  complement: "",
  number: "",
};

// const list = [
//   { text: "Locais", path: "locais" },
//   { text: "Dados Gerais", path: "dados-gerais" },
//   { text: "Endereço", path: "endereco" },
//   { text: "Encarregados", path: "supervisores" },
//   { text: "Encarregados do Cliente", path: "encarregados-cliente" },
//   { text: "Materiais", path: "materiais" },
//   { text: "Equipes", path: "equipes" },
//   { text: "Serviços", path: "servicos" },
//   { text: "Pacotes", path: "pacotes" },
//   { text: "Medições", path: "medicoes" },
//   { text: "Funcionários", path: "funcionarios" },
// ];

const list = [
  { text: "Locais", path: "locais" },
  { text: "Serviços", path: "servicos" },
  { text: "Pacotes", path: "pacotes" },
  { text: "Equipes", path: "equipes" },
  { text: "Medições", path: "medicoes" },

  { text: "Dados Gerais", path: "dados-gerais" },
  { text: "Endereço", path: "endereco" },
  { text: "Encarregados", path: "supervisores" },
  { text: "Encarregados do Cliente", path: "encarregados-cliente" },
  { text: "Materiais", path: "materiais" },
  { text: "Funcionários", path: "funcionarios" },
];
