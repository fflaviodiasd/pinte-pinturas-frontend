import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useField } from "formik";

type CompanyClientItem = {
  id: number;
  name: string;
};

interface SelectClientComponentProps {
  label: string;
  name: string;
  error?: string;
  options: CompanyClientItem[];
  disabled?: any;
}

export const SelectClientComponent = ({
  label,
  name,
  options,
  error,
  disabled,
}: SelectClientComponentProps) => {
  const [field] = useField(name);

  return (
    <FormControl
      fullWidth
      error={Boolean(error)}
      variant="outlined"
      size="small"
      disabled={disabled}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select labelId={`${name}-label`} id={name} {...field} label={label}>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
