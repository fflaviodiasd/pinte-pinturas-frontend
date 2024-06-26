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
  setControl?: any;
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
  setControl,
}: ChipCustomChecklistProps) => {
  const [editingValue, setEditingValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [valueEdit, setValueEdit] = useState<any>(number);
  const [orderValue, setOrderValue] = useState<number | undefined>(number);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(event.target.value);
  };

  useEffect(() => {
    setValueActual(editingValue);
    setOrderValue(valueEdit);
  }, [editingValue, setValueActual, valueEdit]);

  const handleChipDeleteChecklist = async () => {
    if (onCreateChecklist) {
      onCreateChecklist();
    } else {
      try {
        const response = await api.delete(`checklists/${chipId}/`);
        setControl(response);
        successMessage("Checklist deletado com sucesso!");
      } catch (error) {
        errorMessage("Erro ao deletar checklist!");
        console.error("Erro ao deletar checklist:", error);
      }
    }
  };

  const handleUpdateChecklistOrder = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      try {
        await api.put(`checklists/${chipId}/`, { order: orderValue });
        successMessage("Ordem do checklist atualizada com sucesso!");
        event.target.blur();
      } catch (error) {
        errorMessage("Erro ao atualizar ordem do checklist!");
        console.error("Erro ao atualizar ordem do checklist:", error);
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
          <StyledChipButtonDel
            type="button"
            onClick={handleChipDeleteChecklist}
          >
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
          onKeyDown={handleUpdateChecklistOrder}
        >
          {/* {number} */}
        </StyledChipLabelNumber>
      )}
      {/* Botão para enviar a ordem para o backend */}
    </StyledChipDiv>
  );
};
