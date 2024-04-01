import React, { useEffect, useState } from "react";
import {
  StyledChip,
  StyledChipButtonDel,
  StyledChipDiv,
  StyledChipLabelNumber,
} from "./style";

interface ChipCustoProps {
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
}

export const ChipCustom = ({
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
}: ChipCustoProps) => {
  const [editingValue, setEditingValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(event.target.value);
  };

  useEffect(() => {
    setValueActual(editingValue);
  }, [editingValue, setValueActual]);

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
          {isFocused && !post && (
            <StyledChipButtonDel onClick={() => console.log("Delete")}>
              x
            </StyledChipButtonDel>
          )}
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
