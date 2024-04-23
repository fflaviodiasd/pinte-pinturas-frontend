import React, { useEffect, useState } from "react";
import {
  StyledChip,
  StyledChipButtonDel,
  StyledChipDiv,
  StyledChipLabelNumber,
} from "./styles";
import { api } from "../../../services/api";
import { errorMessage, successMessage } from "../../Messages";

interface ChipCustomLevelProps {
  name: string;
  id: string;
  placeholder?: string;
  number?: number;
  value: string;
  bg: string;
  subtmitData: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  setValueActual: (event: string) => void;
  onClick?: () => void;
  editable?: boolean;
  post?: boolean;
  chipId?: number | null;
  onCreateLevel?: () => void;
}

export const ChipCustomLevel = ({
  name,
  id,
  value,
  number,
  placeholder,
  bg,
  subtmitData,
  setValueActual,
  onClick,
  editable = false,
  post,
  onCreateLevel,
  chipId,
}: ChipCustomLevelProps) => {
  const [editingValue, setEditingValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(event.target.value);
  };

  useEffect(() => {
    setValueActual(editingValue);
  }, [editingValue, setValueActual]);

  const handleChipDeleteLevel = async () => {
    if (onCreateLevel) {
      onCreateLevel();
    } else {
      try {
        const response = await api.delete(`level_area/${chipId}/`);
        console.log(response);
        successMessage("Nível deletado com sucesso!");
      } catch (error) {
        errorMessage("Erro ao deletar nível!");
        console.error("Erro ao deletar nivel:", error);
      }
    }
  };

  return (
    <StyledChipDiv onClick={onClick}>
      {editable ? (
        <div>
          <StyledChip
            autoFocus
            type="text"
            name={name}
            id={id}
            value={editingValue}
            onChange={handleChange}
            onKeyDown={subtmitData}
            placeholder={placeholder}
            onClick={onClick}
            bg={"#DEF4FF"}
            post={post}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <StyledChipButtonDel onClick={handleChipDeleteLevel}>
            x
          </StyledChipButtonDel>
        </div>
      ) : (
        <StyledChip tabIndex={0} value={value} bg={bg} />
      )}
      {number && (
        <StyledChipLabelNumber bg={bg}>{number}º</StyledChipLabelNumber>
      )}
    </StyledChipDiv>
  );
};
