import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { FormChecklists } from "../FormChecklists";
import { api } from "../../../../services/api";

export default function AccordionChecklists({ localId }: any) {
  const [checklistName, setChecklistName] = useState([]);
  const [area, setArea] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`areas/${localId}/checklist`);
        const data = response.data.checklists;
        setChecklistName(data);
        setArea(response.data.area);
      } catch (error) {
        console.error("Erro ao buscar dados do backend:", error);
      }
    };

    fetchData();
  }, []);

  const STATUS_COLORS: { [key: string]: string } = {
    "NÃO LIBERADA": "#F44336",
    LIBERADA: "#FF9800",
    INICIADA: "#4CAF50",
    FINALIZADA: "#2196F3",
    ENTREGUE: "#512DA8",
  };

  return (
    <div>
      <button
        style={{
          cursor: "pointer",
          border: "none",
          backgroundColor: "#FFFFFF",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </button>
      {checklistName.map((item: any, index) => (
        <Accordion
          expanded={expanded}
          onChange={() => setExpanded(!expanded)}
          sx={{ marginBottom: "1rem" }}
          key={item.id}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: STATUS_COLORS[item.status],
                  marginLeft: "5px",
                }}
              />
              {item.name}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <FormChecklists checklistId={item.id} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
