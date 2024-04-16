import React, { useEffect, useState } from "react";
import {
  StyledChip,
  StyledChipButtonDel,
  StyledChipChecklistPackage,
  StyledChipDiv,
  StyledChipLabelNumber,
} from "./styles";
import { api } from "../../../services/api";
import { errorMessage, successMessage } from "../../Messages";
import { GoPackage } from "react-icons/go";

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
  checklistPackage?: any;
  onCreateChecklist?: () => void;
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
  checklistPackage,
  onCreateChecklist,
}: ChipCustomChecklistProps) => {
  const [editingValue, setEditingValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [valueEdit, setValueEdit] = useState<any>(number);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(event.target.value);
  };

  useEffect(() => {
    setValueActual(editingValue);
  }, [editingValue, setValueActual]);

  const handleChipDeleteChecklist = async () => {
    if (onCreateChecklist) {
      onCreateChecklist();
    } else {
      try {
        const response = await api.delete(`checklists/${chipId}/`);
        console.log(response);
        successMessage("Checklist deletado com sucesso!");
      } catch (error) {
        errorMessage("Erro ao deletar checklist!");
        console.error("Erro ao deletar checklist:", error);
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
        <div>
          <StyledChip tabIndex={0} value={value} bg={bg} />
          {checklistPackage !== null && (
            <StyledChipChecklistPackage>
              <GoPackage color="white" />
            </StyledChipChecklistPackage>
          )}
        </div>
      )}
      {number && (
        <StyledChipLabelNumber
          type="text"
          value={`${valueEdit}°`}
          bg={bg}
          onChange={(e: any) => setValueEdit(e.target.value)}
        >
          {/* {number}º */}
        </StyledChipLabelNumber>
      )}
      {number && hideOrdinal && (
        <StyledChipLabelNumber
          type="text"
          bg={bg}
          value={valueEdit}
          onChange={(e: any) => setValueEdit(e.target.value)}
        >
          {/* {number} */}
        </StyledChipLabelNumber>
      )}
    </StyledChipDiv>
  );
};
