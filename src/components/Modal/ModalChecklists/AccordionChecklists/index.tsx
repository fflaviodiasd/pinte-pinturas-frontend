import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Chip from "@mui/material/Chip";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormChecklists } from "../FormChecklists";

export default function AccordionChecklists({ accordionTitle }: any) {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {accordionTitle}
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
          <FormChecklists />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
