import styled from "styled-components";
interface Props {
  bg?: string;
  post?: boolean;
}

export const StyledChipDiv = styled.div`
  display: flex;
  position: relative;
`;
export const StyledChip = styled.input<Props>`
  background-color: ${(props) => props.bg};
  border-radius: 4px;
  padding: 5px 10px;
  /* border: 1px solid white; */
  border: none;
  outline: none;
  border-radius: 1rem;
  color: ${(props) => (props.bg === "black" ? "white" : "#FFFFFF")};
  padding-left: ${(props) => (props.post ? "5px" : "35px")};
  &::placeholder {
    color: #858484;
  }
  font-family: "Open Sans";
  font-weight: 400;
  line-height: 1rem;
  box-shadow: 15px 0px 0px 0px ${(props) => props.bg};
`;

export const StyledChipLabelNumber = styled.input<Props>`
  color: ${(props) => (props.bg === "black" ? "black" : "#2E3132")};
  font-weight: bold;
  position: absolute;
  background-color: ${(props) => (props.bg === "black" ? "white" : "#EBF4FA")};
  border-radius: 50%;
  padding: 3px;
  top: 4px;
  left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  width: 22px;
  border: none;
  padding-left: 7px;
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
  right: -10px;
  width: 15px;
  height: 15px;
  border: none;
  cursor: pointer;
`;

export const StyledChipChecklistPackage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 6px;
  right: -10px;
  width: 15px;
  height: 15px;
  border: none;
`;
