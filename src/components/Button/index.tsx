import { Button as MuiButton } from "@mui/material";
import { useStyles } from "./styles";

interface ButtonProps {
  label: string | React.ReactNode;
  color: "primary" | "secondary";
  onClick?: () => void;
  onSubmit?: () => void;
}

export const Button = ({ label, color, ...props }: ButtonProps) => {
  const { classes } = useStyles();

  return (
    <MuiButton
      type="submit"
      className={
        color === "primary"
          ? classes.primaryButton
          : color === "secondary"
          ? classes.secondaryButton
          : ""
      }
      variant={color === "secondary" ? "outlined" : "text"}
      {...props}
    >
      {label}
    </MuiButton>
  );
};
