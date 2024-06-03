/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Formik, Form as FormikForm } from "formik";

import { GeneralDataForm } from "./components/GeneralDataForm";
import { AddressForm } from "./components/AddressForm";

import { TabsContainer, useStyles } from "./styles";
import { useConstructions } from "../../../hooks/useConstructions";
import { useCompanies } from "../../../hooks/useCompanies";
import { Company } from "../../../types";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { Loading } from "../../../components/Loading";
import { Tab } from "../../../components/Tab";

export const RegisterConstruction = () => {
  const { id: clientId } = useParams();
  const isEditScreen = clientId;
  const { classes } = useStyles();
  const { constructData, getAllCompanyCustomers } = useCompanies();
  const { addCompaniesConstruction, loading } = useConstructions();
  const [selectedClientId, setSelectedClientId] = useState(""); // Estado para guardar o ID do cliente selecionado

  const [selectedTab, setSelectedTab] = useState(1);

  const handleSelectTab = (index: number) => {
    setSelectedTab(index);
  };

  const handleSubmit = async (values: Company) => {
    const valuesToSend = {
      ...values,
      customer: selectedClientId,
    };
    addCompaniesConstruction(valuesToSend);
  };

  useEffect(() => {
    getAllCompanyCustomers();
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={constructData}
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
                {/* {values.tradingName ? (
                  <div className={classes.nameContainer}>
                    {values.tradingName && (
                      <BackgroundAvatar avatarName={values.tradingName} />
                    )}
                    <Typography className={classes.nameText}>
                      {values.tradingName}
                    </Typography>
                  </div>
                ) : ( */}
                <Typography className={classes.title}>Nova Obra</Typography>
                {/* )} */}

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.buttonSave}
                >
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
              </TabsContainer>
            </Grid>

            {selectedTab === 1 && (
              <GeneralDataForm
                values={values}
                handleChange={handleChange}
                setSelectedClientId={setSelectedClientId}
              />
            )}
            {selectedTab === 2 && (
              <AddressForm values={values} handleChange={handleChange} />
            )}

            <Loading isLoading={loading} />
          </Grid>
        </FormikForm>
      )}
    </Formik>
  );
};
