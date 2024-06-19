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
  setControl?: any;
  setEditable?: any;
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
  editable,
  setEditable,
  post,
  onCreateLevel,
  chipId,
  setControl,
}: ChipCustomLevelProps) => {
  const [editingValue, setEditingValue] = useState(value);
  const [isDeleted, setIsDeleted] = useState(false);

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
        successMessage("Nível deletado com sucesso!");
        setIsDeleted(true);
        setControl(response);
      } catch (error) {
        errorMessage("Erro ao deletar nível!");
        console.error("Erro ao deletar nivel:", error);
      }
    }
  };

  if (isDeleted) {
    return null;
  }

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
            onBlur={() => {
              const time = setTimeout(() => {
                setEditable(false);
                clearInterval(time);
              }, 200);
              console.log("Perdeu o foco");
            }}
          />
          <StyledChipButtonDel onClick={handleChipDeleteLevel}>
            x
          </StyledChipButtonDel>
        </div>
      ) : (
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
          bg={bg}
          post={post}
        />
      )}
      {number && (
        <StyledChipLabelNumber bg={bg}>{number}º</StyledChipLabelNumber>
      )}
    </StyledChipDiv>
  );
};
