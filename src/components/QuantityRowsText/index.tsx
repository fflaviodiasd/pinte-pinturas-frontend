import { Typography } from "@mui/material";

type QuantityRowsTextProps = {
  quantityRows: number;
};

export const QuantityRowsText = ({ quantityRows }: QuantityRowsTextProps) => {
  return (
    <>
      {quantityRows ? (
        <Typography
          style={{
            marginTop: 12,
            fontFamily: "Open Sans",
          }}
        >
          Mostrando {quantityRows} linha
          {quantityRows > 1 ? "s" : ""}.
        </Typography>
      ) : null}
    </>
  );
};
