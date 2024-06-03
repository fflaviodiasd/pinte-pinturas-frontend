/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Formik, Form as FormikForm } from "formik";

import { BackgroundAvatar } from "../../components/BackgroundAvatar";
import { Breadcrumb } from "../../components/Breadcrumb";
import { Loading } from "../../components/Loading";
import { Tab } from "../../components/Tab";

import { ListRelatedConstructions } from "./components/ListRelatedConstructions";
import { GeneralDataForm } from "./components/GeneralDataForm";
import { ListEmployees } from "./components/ListEmployees";
import { AddressForm } from "./components/AddressForm";

import { useClients } from "../../hooks/useClients";
import { Client as ClientType } from "../../types";

import { TabsContainer, useStyles } from "./styles";

export const Client = () => {
  const { classes } = useStyles();
  const { id: clientId } = useParams();
  const isEditScreen = clientId;
  const { clientData, getClient, addClient, updateClient, loading } =
    useClients();

  const [selectedTab, setSelectedTab] = useState(1);

  const handleSelectTab = (index: number) => {
    setSelectedTab(index);
  };

  useEffect(() => {
    if (clientId) {
      getClient(clientId);
    }
  }, [clientId]);

  //   const returnedButtonText = (index: number) => {
  //     if (index === 1) {
  //       return "Cadastrar";
  //     } else {
  //       return "Cadastrar";
  //     }
  //   };

  const handleSubmit = async (values: ClientType) => {
    if (isEditScreen) {
      updateClient(values);
    } else {
      addClient(values);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={clientData}
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
                    breadcrumbPath1={"Clientes"}
                    breadcrumbPath2={"Edição"}
                  />
                ) : (
                  <Breadcrumb
                    breadcrumbPath1={"Clientes"}
                    breadcrumbPath2={"Cadastro"}
                  />
                )}
              </div>

              <div className={classes.titleContainer}>
                {values.tradingName ? (
                  <div className={classes.tradingNameContainer}>
                    {values.tradingName && (
                      <BackgroundAvatar avatarName={values.tradingName} />
                    )}
                    <Typography className={classes.tradingNameText}>
                      {values.tradingName}
                    </Typography>
                  </div>
                ) : (
                  <Typography className={classes.title}>
                    Novo Cliente
                  </Typography>
                )}

                <Button
                  // startIcon={
                  //   isSubmitting ? <CircularProgress size="1rem" /> : null
                  // }
                  //   disabled={isSubmitting}
                  //   disabled
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.buttonSave}
                >
                  {/* {isEditScreen && step <= 1
                          ? "Salvar"
                          : isLastStep()
                          ? "Finalizar"
                          : "Avançar"} */}
                  {isEditScreen ? "Salvar" : "Cadastrar"}
                </Button>
              </div>
            </Grid>

            <Grid item sm={12} md={12} lg={12}>
              <TabsContainer>
                <Tab
                  text="Dados Gerais"
                  isActive={selectedTab === 1}
                  onClick={() => handleSelectTab(1)}
                />
                <Tab
                  text="Endereço"
                  isActive={selectedTab === 2}
                  onClick={() => handleSelectTab(2)}
                />
                {isEditScreen && (
                  <>
                    <Tab
                      text="Funcionário"
                      isActive={selectedTab === 3}
                      onClick={() => handleSelectTab(3)}
                    />
                    <Tab
                      text="Obras Relacionadas"
                      isActive={selectedTab === 4}
                      onClick={() => handleSelectTab(4)}
                    />
                  </>
                )}
              </TabsContainer>
            </Grid>

            {selectedTab === 1 && (
              <GeneralDataForm values={values} handleChange={handleChange} />
            )}
            {selectedTab === 2 && (
              <AddressForm values={values} handleChange={handleChange} />
            )}
            {selectedTab === 3 && <ListEmployees />}
            {selectedTab === 4 && <ListRelatedConstructions />}

            <Loading isLoading={loading} />
          </Grid>
        </FormikForm>
      )}
    </Formik>
  );
};
