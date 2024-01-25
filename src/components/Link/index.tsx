import { Button } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

interface LinkProps {
  onClick?: () => void;
  label: string;
  disabled?: boolean;
}

export const Link = ({ onClick, label, disabled, ...props }: LinkProps) => {
  return (
    <Button disabled={disabled} onClick={onClick} disableRipple>
      <ModeEditIcon sx={{ color: "#C5C7C8" }} />
    </Button>
  );
};
