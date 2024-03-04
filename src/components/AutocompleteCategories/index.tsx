import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

interface Option {
  firstLetter: string;
  active: boolean;
  name: string;
  office: string;
}

export default function AutocompleteCategories({ endpoint }: any) {
  const [options, setOptions] = useState<Option[]>([]);

  const fetchData = async () => {
    try {
      const response = await api.get<Option[]>(endpoint);
      setOptions(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Autocomplete
      id="grouped-demo"
      options={options.sort((a, b) => a.name.localeCompare(b.name))}
      groupBy={(option) => option.name.charAt(0).toUpperCase()}
      getOptionLabel={(option) =>
        `${option.active} - ${option.name} - ${option.office}`
      }
      sx={{ width: 800 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Adicionar colaborador por nome, matricula ou perfil"
        />
      )}
      multiple
      fullWidth
    />
  );
}
