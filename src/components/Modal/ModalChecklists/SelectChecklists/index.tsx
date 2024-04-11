import React, { useState, useEffect } from "react";
import { useField } from "formik";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { api } from "../../../../services/api";

interface Option {
  [key: string]: any;
}

interface SelectChecklistsProps {
  label: string;
  name: string;
  endpoint: string;
  error?: string;
  helperText?: string;
  optionKey: string;
  optionValueKey: string;
  optionLabelKey: string;
}

export const SelectChecklists: React.FC<SelectChecklistsProps> = ({
  label,
  name,
  endpoint,
  error,
  optionKey,
  optionValueKey,
  optionLabelKey,
}) => {
  const [field] = useField(name);
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(endpoint);
        setOptions(response.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return (
    <FormControl
      fullWidth
      error={Boolean(error)}
      variant="outlined"
      size="small"
      required
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select labelId={`${name}-label`} id={name} {...field} label={label}>
        {loading ? (
          <MenuItem disabled>Carregando opções...</MenuItem>
        ) : (
          options.map((option, index) => (
            <MenuItem key={option[optionKey]} value={option[optionValueKey]}>
              {option[optionLabelKey]}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};
