import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { api } from "../../../../services/api";
import { useParams } from "react-router-dom";

interface Option {
  [key: string]: any;
}

interface FilterPackagesDisciplineProps {
  label: string;
  name: string;
  disciplineEndpoint: string;
  packagesEndpoint: string;
  optionKey: string;
  optionValueKey: string;
  optionLabelKey: string;
  setSelectedPackageId: (id: string) => void;
}

export const FilterPackagesDiscipline: React.FC<
  FilterPackagesDisciplineProps
> = ({
  label,
  name,
  disciplineEndpoint,
  packagesEndpoint,
  optionKey,
  optionValueKey,
  optionLabelKey,
  setSelectedPackageId,
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [disciplineOptions, setDisciplineOptions] = useState<Option[]>([]);
  const [packageOptions, setPackageOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const response = await api.get(disciplineEndpoint);
        setDisciplineOptions(response.data.results);
      } catch (error) {
        console.error("Error fetching disciplines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDisciplines();
  }, [disciplineEndpoint]);

  useEffect(() => {
    const fetchPackages = async () => {
      if (selectedDiscipline) {
        try {
          const response = await api.get(
            `${packagesEndpoint}?search=${encodeURIComponent(
              selectedDiscipline
            )}`
          );
          setPackageOptions(response.data);
          console.log("URL", response);
          console.log(
            "URL",
            `${packagesEndpoint}?search=${encodeURIComponent(
              selectedDiscipline
            )}`
          );
        } catch (error) {
          console.error("Error fetching packages:", error);
        }
      } else {
        try {
          const response = await api.get(`constructions/${id}/packages`);
          setPackageOptions(response.data);
        } catch (error) {
          console.error("Error fetching packages:", error);
        }
      }
    };

    fetchPackages();
  }, [selectedDiscipline, packagesEndpoint, id]);

  const handleDisciplineChange = (event: SelectChangeEvent<string>) => {
    const selectedOption = disciplineOptions.find(
      (option) => option[optionValueKey] === event.target.value
    );
    const disciplineName = selectedOption ? selectedOption[optionLabelKey] : "";
    setSelectedDiscipline(disciplineName);
  };

  const handlePackageChange = (event: SelectChangeEvent<string>) => {
    setSelectedPackage(event.target.value);
    setSelectedPackageId(event.target.value);
    console.log("ID do pacote selecionado:", event.target.value);
  };

  return (
    <>
      <FormControl fullWidth variant="outlined">
        <InputLabel id={`${name}-discipline-label`}>{label}</InputLabel>
        <Select
          labelId={`${name}-discipline-label`}
          id={`${name}-discipline`}
          value={selectedDiscipline}
          onChange={handleDisciplineChange}
          label={label}
        >
          {loading ? (
            <MenuItem disabled>Carregando disciplinas...</MenuItem>
          ) : (
            disciplineOptions.map((option, index) => (
              <MenuItem key={option[optionKey]} value={option[optionValueKey]}>
                {option[optionLabelKey]}
              </MenuItem>
            ))
          )}
        </Select>
        <span>Disciplina Selecionada: {selectedDiscipline}</span>
      </FormControl>
      <FormControl fullWidth variant="outlined">
        <InputLabel id={`${name}-package-label`}>Pacotes</InputLabel>
        <Select
          labelId={`${name}-package-label`}
          id={`${name}-package`}
          label="Pacotes"
          value={selectedPackage}
          onChange={handlePackageChange}
        >
          {loading ? (
            <MenuItem disabled>Carregando pacotes...</MenuItem>
          ) : (
            packageOptions.map((option, index) => (
              <MenuItem key={option[optionKey]} value={option[optionValueKey]}>
                {option[optionLabelKey]}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </>
  );
};
