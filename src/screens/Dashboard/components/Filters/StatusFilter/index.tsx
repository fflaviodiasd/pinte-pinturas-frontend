/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useContext, useState } from "react";
import { Button, Checkbox, TextField } from "@mui/material";

import { Formik, Form as FormikForm } from "formik";

import { DashboardContext } from "../../../../../contexts/DashboardContext";
import { warningMessage } from "../../../../../components/Messages";

import { useStyles } from "../filterStyles";
import { CheckboxLabel } from "./styles";

type StatusFilterProps = {
  handleClose: () => void;
};

type StatusOption = {
  name: string;
  color: string;
  startDate: keyof typeof statusFormValues;
  endDate: keyof typeof statusFormValues;
  checkBoxName: keyof typeof statusFormValues;
};

type StatusFormValues = {
  checkLiberado: boolean;
  startDateLiberado: string;
  endDateLiberado: string;
  checkIniciado: boolean;
  startDateIniciado: string;
  endDateIniciado: string;
  checkFinalizado: boolean;
  startDateFinalizado: string;
  endDateFinalizado: string;
  checkEntregue: boolean;
  startDateEntregue: string;
  endDateEntregue: string;
};

export const StatusFilter = ({ handleClose }: StatusFilterProps) => {
  const { classes } = useStyles();
  const { setAllQueriesFilters } = useContext(DashboardContext);

  const handleApply = (values: StatusFormValues) => {
    const statusOptionsFormatted = {
      liberado: {
        checked: values.checkLiberado,
        startDate: values.startDateLiberado,
        endDate: values.endDateLiberado,
      },
      iniciado: {
        checked: values.checkIniciado,
        startDate: values.startDateIniciado,
        endDate: values.endDateIniciado,
      },
      finalizado: {
        checked: values.checkFinalizado,
        startDate: values.startDateFinalizado,
        endDate: values.endDateFinalizado,
      },
      entregue: {
        checked: values.checkEntregue,
        startDate: values.startDateEntregue,
        endDate: values.endDateEntregue,
      },
    };

    let queryLiberado = "";
    let queryIniciado = "";
    let queryFinalizado = "";
    let queryEntregue = "";

    const isLiberadoValid = Boolean(
      statusOptionsFormatted.liberado.startDate &&
        statusOptionsFormatted.liberado.endDate
    );

    const isIniciadoValid = Boolean(
      statusOptionsFormatted.iniciado.startDate &&
        statusOptionsFormatted.iniciado.endDate
    );

    const isFinalizadoValid = Boolean(
      statusOptionsFormatted.finalizado.startDate &&
        statusOptionsFormatted.finalizado.endDate
    );

    const isEntregueValid = Boolean(
      statusOptionsFormatted.entregue.startDate &&
        statusOptionsFormatted.entregue.endDate
    );

    if (statusOptionsFormatted.liberado.checked && !isLiberadoValid) {
      return warningMessage("Por favor, preencha a data");
    } else {
      queryLiberado = statusOptionsFormatted.liberado.checked
        ? `status=liberado&start_date=${statusOptionsFormatted.liberado.startDate}&end_date=${statusOptionsFormatted.liberado.endDate}`
        : "";
    }

    if (statusOptionsFormatted.iniciado.checked && !isIniciadoValid) {
      return warningMessage("Por favor, preencha a data");
    } else {
      queryIniciado = statusOptionsFormatted.iniciado.checked
        ? `status=iniciado&start_date=${statusOptionsFormatted.iniciado.startDate}&end_date=${statusOptionsFormatted.iniciado.endDate}`
        : "";
    }

    if (statusOptionsFormatted.finalizado.checked && !isFinalizadoValid) {
      return warningMessage("Por favor, preencha a data");
    } else {
      queryFinalizado = statusOptionsFormatted.finalizado.checked
        ? `status=finalizado&start_date=${statusOptionsFormatted.finalizado.startDate}&end_date=${statusOptionsFormatted.finalizado.endDate}`
        : "";
    }

    if (statusOptionsFormatted.entregue.checked && !isEntregueValid) {
      return warningMessage("Por favor, preencha a data");
    } else {
      queryEntregue = statusOptionsFormatted.entregue.checked
        ? `status=entregue&start_date=${statusOptionsFormatted.entregue.startDate}&end_date=${statusOptionsFormatted.entregue.endDate}`
        : "";
    }

    const allQueries = [
      queryLiberado,
      queryIniciado,
      queryFinalizado,
      queryEntregue,
    ]
      .filter((query) => query)
      .join("&");

    setAllQueriesFilters((prevState) => ({
      ...prevState,
      status: allQueries,
    }));

    handleClose();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={statusFormValues}
      onSubmit={(values) => {
        handleApply(values);
      }}
    >
      {({ handleChange, values, handleReset }) => (
        <FormikForm>
          <div className={classes.container}>
            <div className={classes.content}>
              {listStatus.map((status) => (
                <Fragment key={status.name}>
                  <div className={classes.statusContainer}>
                    <Checkbox
                      name={status.checkBoxName}
                      checked={values[status.checkBoxName] as boolean}
                      onChange={handleChange}
                      style={{ marginLeft: -12 }}
                    />

                    <CheckboxLabel color={status.color}>
                      {status.name}
                    </CheckboxLabel>
                  </div>
                  <TextField
                    name={status.startDate}
                    value={values[status.startDate]}
                    onChange={handleChange}
                    className={classes.inputStatus}
                    size="small"
                    fullWidth
                    type="date"
                    disabled={!values[status.checkBoxName]}
                  />
                  <TextField
                    name={status.endDate}
                    value={values[status.endDate]}
                    onChange={handleChange}
                    className={classes.inputStatus}
                    size="small"
                    fullWidth
                    type="date"
                    disabled={!values[status.checkBoxName]}
                  />
                </Fragment>
              ))}
            </div>

            <div className={classes.buttonsContainer}>
              <Button
                variant="text"
                className={classes.clearButton}
                onClick={handleReset}
              >
                Limpar
              </Button>
              <Button
                variant="contained"
                className={classes.applyButton}
                type="submit"
              >
                Aplicar
              </Button>
            </div>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

const listStatus: StatusOption[] = [
  {
    name: "Liberado",
    color: "#ff9800",
    startDate: "startDateLiberado",
    endDate: "endDateLiberado",
    checkBoxName: "checkLiberado",
  },
  {
    name: "Iniciado",
    color: "#4caf50",
    startDate: "startDateIniciado",
    endDate: "endDateIniciado",
    checkBoxName: "checkIniciado",
  },
  {
    name: "Finalizado",
    color: "#2196f3",
    startDate: "startDateFinalizado",
    endDate: "endDateFinalizado",
    checkBoxName: "checkFinalizado",
  },
  {
    name: "Entregue",
    color: "#673ab7",
    startDate: "startDateEntregue",
    endDate: "endDateEntregue",
    checkBoxName: "checkEntregue",
  },
];

const statusFormValues = {
  checkLiberado: false,
  startDateLiberado: "",
  endDateLiberado: "",
  checkIniciado: false,
  startDateIniciado: "",
  endDateIniciado: "",
  checkFinalizado: false,
  startDateFinalizado: "",
  endDateFinalizado: "",
  checkEntregue: false,
  startDateEntregue: "",
  endDateEntregue: "",
};
