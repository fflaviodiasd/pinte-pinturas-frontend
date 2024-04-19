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
    <Button>
      <ButtonTextContainer isactive={isActive} onClick={onClick}>
        <ButtonText>{text}</ButtonText>
      </ButtonTextContainer>
    </Button>
  );
};
