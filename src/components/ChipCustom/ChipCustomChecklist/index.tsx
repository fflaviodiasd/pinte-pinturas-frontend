import React, { useEffect, useState } from "react";
import {
  StyledChip,
  StyledChipButtonDel,
  StyledChipDiv,
  StyledChipLabelNumber,
} from "./styles";
import { api } from "../../../services/api";
import { errorMessage, successMessage } from "../../Messages";

interface ChipCustomChecklistProps {
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
  hideOrdinal?: boolean;
}

export const ChipCustomChecklist = ({
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
  chipId,
  hideOrdinal = false,
}: ChipCustomChecklistProps) => {
  const [editingValue, setEditingValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(event.target.value);
  };

  useEffect(() => {
    setValueActual(editingValue);
  }, [editingValue, setValueActual]);

  const handleChipDeleteChecklist = async () => {
    try {
      const response = await api.delete(`checklists/${chipId}/`);
      console.log(response);
      successMessage("Checklist deletado com sucesso!");
    } catch (error) {
      errorMessage("Erro ao deletar checklist!");
      console.error("Erro ao deletar checklist:", error);
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
            bg={bg}
            post={post}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <StyledChipButtonDel onClick={handleChipDeleteChecklist}>
            x
          </StyledChipButtonDel>
        </div>
      ) : (
        <StyledChip tabIndex={0} value={value} bg={bg} />
      )}
      {number && (
        <StyledChipLabelNumber bg={bg}>{number}º</StyledChipLabelNumber>
      )}
      {number && hideOrdinal && (
        <StyledChipLabelNumber bg={bg}>{number}</StyledChipLabelNumber>
      )}
    </StyledChipDiv>
  );
};
