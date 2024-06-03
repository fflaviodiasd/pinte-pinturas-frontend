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
import { History } from "./components/History";
import { AddressForm } from "./components/AddressForm";

import { useCollaborators } from "../../hooks/useCollaborators";
import { Collaborator as CollaboratorType } from "../../types";

import { TabsContainer, useStyles } from "./styles";

export const Collaborators = () => {
  const { classes } = useStyles();
  const { id: collaboratorId } = useParams();
  const isEditScreen = collaboratorId;
  const {
    collaboratorData,
    getCollaborator,
    addCollaborator,
    updateCollaborator,
    loading,
  } = useCollaborators();

  const [selectedTab, setSelectedTab] = useState(1);

  const handleSelectTab = (index: number) => {
    setSelectedTab(index);
  };

  useEffect(() => {
    if (collaboratorId) {
      getCollaborator(collaboratorId);
    }
  }, [collaboratorId]);

  const handleSubmit = async (values: CollaboratorType) => {
    if (isEditScreen) {
      updateCollaborator(values);
    } else {
      addCollaborator(values);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={collaboratorData}
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
                    breadcrumbPath1={"Colaboradores"}
                    breadcrumbPath2={"Edição"}
                  />
                ) : (
                  <Breadcrumb
                    breadcrumbPath1={"Colaboradores"}
                    breadcrumbPath2={"Cadastro"}
                  />
                )}
              </div>

              <div className={classes.titleContainer}>
                {values.name ? (
                  <div className={classes.nameContainer}>
                    {values.name && (
                      <BackgroundAvatar avatarName={values.name} />
                    )}
                    <Typography className={classes.nameText}>
                      {values.name}
                    </Typography>
                  </div>
                ) : (
                  <Typography className={classes.title}>
                    Novo Colaborador
                  </Typography>
                )}

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
                {isEditScreen && (
                  <>
                    <Tab
                      text="Histórico"
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
            {selectedTab === 3 && <History />}
            {selectedTab === 4 && <ListRelatedConstructions />}

            <Loading isLoading={loading} />
          </Grid>
        </FormikForm>
      )}
    </Formik>
  );
};
