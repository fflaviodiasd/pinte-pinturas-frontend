import { Button } from "@mui/material";
import { Launch } from "@mui/icons-material";

interface EditIconProps {
  onClick?: () => void;
  label: string;
  disabled?: boolean;
}

export const EditIcon = ({
  onClick,
  label,
  disabled,
  ...props
}: EditIconProps) => {
  return (
    <Button disabled={disabled} onClick={onClick} disableRipple>
      <Launch sx={{ color: "#C5C7C8" }} />
    </Button>
  );
};