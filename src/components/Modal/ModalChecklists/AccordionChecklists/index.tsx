import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Chip from "@mui/material/Chip";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormChecklists } from "../FormChecklists";
import { api } from "../../../../services/api";

export default function AccordionChecklists({ localId }: any) {
  const [checklistName, setChecklistName] = useState([]);
  const [checklistHistory, setChecklistHistory] = useState([]);
  const [area, setArea] = useState("");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`checklists/id/histories`);
        const data = response.data;
        setChecklistHistory(data);
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
      {checklistName.map((item: any, index) => (
        <Accordion key={item.id}>
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
            <table>
              <thead>
                <tr
                  style={{
                    color: "#2E3132",
                  }}
                >
                  <th>Etapa</th>
                  <th>Digitada</th>
                  <th>Sistema</th>
                  <th>Atualização</th>
                </tr>
              </thead>
              <tbody>
                {checklistHistory.map((item: any, index: number) => (
                  <tr key={item.histories.id}>
                    <td>
                      <Chip
                        label={item.status}
                        style={{
                          backgroundColor: STATUS_COLORS[item.status],
                          color: "#FFFFFF",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                        }}
                      />
                    </td>
                    <td>
                      <span>{item.histories.written_date}</span>
                    </td>
                    <td>
                      <span>{item.histories.marking_action_date}</span>
                    </td>
                    <td>
                      <span>{item.histories.responsible_action}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <FormChecklists checklistId={item.id} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
