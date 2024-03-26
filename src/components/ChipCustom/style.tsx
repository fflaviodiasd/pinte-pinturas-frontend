import styled from "styled-components";
interface Props {
  bg?: string;
}

export const StyledChipDiv = styled.div`
  display: flex;
  position: relative;
`;
export const StyledChip = styled.input<Props>`
  background-color: ${(props) => props.bg};
  border-radius: 4px;
  padding: 5px 10px;
  border: 1px solid #252525;
  color: ${(props) => (props.bg === "black" ? "white" : "black")};
  padding-left: 35px;
  &::placeholder {
    color: white;
  }
`;

export const StyledChipLabelNumber = styled.label<Props>`
  color: ${(props) => (props.bg === "black" ? "black" : "white")};
  position: absolute;
  background-color: ${(props) => (props.bg === "black" ? "white" : "black")};
  border-radius: 50%;
  padding: 2px;
  top: 2px;
  left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  width: 22px;
`;

export const StyledChipButtonDel = styled.button`
  background-color: #1976d2;
  color: white;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  top: 6px;
  right: 5px;
  width: 15px;
  height: 15px;
  border: none;
  cursor: pointer;
`;
