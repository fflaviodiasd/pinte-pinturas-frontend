import React, { useState, useEffect } from "react";

import { useField } from "formik";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { api } from "../../../services/api";

interface SelectRoleComponentProps {
  label: string;
  name: string;
  endpoint: string;
  error?: string;
  helperText?: string;
}

export const SelectRoleComponent: React.FC<SelectRoleComponentProps> = ({
  label,
  name,
  endpoint,
  error,
}) => {
  const [field, meta, helpers] = useField(name);
  const [options, setOptions] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(endpoint);
        setOptions(response.data.results);
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
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select labelId={`${name}-label`} id={name} {...field} label={label}>
        {loading ? (
          <MenuItem disabled>Carregando opções...</MenuItem>
        ) : (
          options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};
