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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`areas/${localId}/checklist`);
        const data = response.data.checklists;
        setChecklistName(data);
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
                <tr>
                  <td>
                    <Chip
                      label="Liberado"
                      style={{
                        backgroundColor: "#FF9800",
                        color: "#FFFFFF",
                        fontFamily: "Open Sans",
                        fontWeight: 600,
                      }}
                    />
                  </td>
                  <td>
                    <span>DD/MM/YYYY</span>
                  </td>
                  <td>
                    <span>DD/MM/YYYY - 00:00:00 </span>
                  </td>
                  <td>
                    <span>Teste</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Chip
                      label="Iniciado"
                      style={{
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                        fontFamily: "Open Sans",
                        fontWeight: 600,
                      }}
                    />
                  </td>
                  <td>
                    <span>-</span>
                  </td>
                  <td>
                    <span>-</span>
                  </td>
                  <td>
                    <span>-</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Chip
                      label="Finalizado"
                      style={{
                        backgroundColor: "#2196F3",
                        color: "#FFFFFF",
                        fontFamily: "Open Sans",
                        fontWeight: 600,
                      }}
                    />
                  </td>
                  <td>
                    <span>-</span>
                  </td>
                  <td>
                    <span>-</span>
                  </td>
                  <td>
                    <span>-</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Chip
                      label="Entregue"
                      style={{
                        backgroundColor: "#673AB7",
                        color: "#FFFFFF",
                        fontFamily: "Open Sans",
                        fontWeight: 600,
                      }}
                    />
                  </td>
                  <td>
                    <span>-</span>
                  </td>
                  <td>
                    <span>-</span>
                  </td>
                  <td>
                    <span>-</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <FormChecklists checklistId={item.id} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
