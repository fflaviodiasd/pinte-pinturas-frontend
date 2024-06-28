import React, { useState } from 'react';
import { Formik, FormikConfig, FormikValues, Form } from 'formik';
import { Grid, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useStyles } from '../styles';

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

interface FormikStepperProps extends FormikConfig<FormikValues> {
  children: React.ReactNode;
  onStepChange?: (step: number) => void;
}

export function FormikStepper({ children, onStepChange, ...props }: FormikStepperProps) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step] as React.ReactElement<FormikStepProps>;
  const { classes } = useStyles();
  const { id: collaboratorId } = useParams<{ id: string }>();
  const isEditScreen = Boolean(collaboratorId);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
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
                      onClick={() => handleStepChange(index)}
                    >
                      {child.props.label}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>

            {currentChild}
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
