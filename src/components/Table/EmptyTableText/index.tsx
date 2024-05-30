import { Typography } from "@mui/material";

export const EmptyTableText = () => {
  return (
    <Typography
      style={{
        marginTop: 20,
        marginBottom: 20,
        fontSize: 16,
        fontWeight: 600,
        fontStyle: "italic",
        fontFamily: "Open Sans",
        textAlign: "center",
        color: "#AAA",
      }}
    >
      Nenhum dado a ser exibido.
    </Typography>
  );
};
