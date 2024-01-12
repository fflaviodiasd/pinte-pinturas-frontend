import { Button, ButtonTextContainer, ButtonText } from "./styles";

type HeaderButtonProps = {
  onClick: () => void;
  isActive: boolean;
  text: string;
};

export const HeaderButton = ({
  isActive,
  onClick,
  text,
}: HeaderButtonProps) => {
  return (
    <Button onClick={onClick}>
      <ButtonTextContainer isactive={isActive}>
        <ButtonText>{text}</ButtonText>
      </ButtonTextContainer>
    </Button>
  );
};
