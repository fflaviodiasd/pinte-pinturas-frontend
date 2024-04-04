import { Box } from "@mui/material";

export const StatusPanel = () => {
  return (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        Não Liberado
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#F44336",
            marginLeft: "5px",
          }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        Liberado
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#FF9800",
            marginLeft: "5px",
          }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        Iniciado
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#4CAF50",
            marginLeft: "5px",
          }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        Finalizado
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#2196F3",
            marginLeft: "5px",
          }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        Entregue
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#673AB7",
            marginLeft: "5px",
          }}
        />
      </div>
    </Box>
  );
};
