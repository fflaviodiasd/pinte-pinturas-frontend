import { Grid, Typography } from "@mui/material";
import { useStyles } from "./styles";

type TitleScreenProps = {
  title: string;
};

export const TitleScreen = ({ title }: TitleScreenProps) => {
  const { classes } = useStyles();

  return (
    <Grid item xs={12} lg={12}>
      <Typography className={classes.title}>{title}</Typography>
    </Grid>
  );
};
