import { Typography } from "@mui/material";
import { useStyles } from "./styles";

type SectionTitleProps = {
  title: string;
};

export const SectionTitle = ({ title }: SectionTitleProps) => {
  const { classes } = useStyles();

  const underlinedLetters = title.slice(0, -2);
  const nonUnderlinedLetters = title.slice(-2);

  return (
    <Typography className={classes.teamsTitle}>
      <span className={classes.teamsBorder}>{underlinedLetters}</span>
      {nonUnderlinedLetters}
    </Typography>
  );
};
