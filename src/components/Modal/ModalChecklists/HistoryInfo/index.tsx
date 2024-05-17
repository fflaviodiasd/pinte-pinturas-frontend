import { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import { Chip } from "@mui/material";

export function HistoryInfo({ checklistId }: any) {
  const [checklistHistory, setChecklistHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`checklists/${checklistId}/histories`);
        const data = response.data;
        setChecklistHistory(data);
      } catch (error) {
        console.error("Erro ao buscar dados do backend:", error);
      }
    };

    fetchData();
  }, []);

  const STATUS_COLORS: { [key: string]: string } = {
    //"NÃO LIBERADA": "#F44336",
    LIBERADA: "#FF9800",
    INICIADA: "#4CAF50",
    FINALIZADA: "#2196F3",
    ENTREGUE: "#512DA8",
  };

  return (
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
        {Object.keys(STATUS_COLORS).map((status: string, index: number) => (
          <tr key={index}>
            <td>
              <Chip
                label={status}
                style={{
                  backgroundColor: STATUS_COLORS[status],
                  color: "#FFFFFF",
                  fontFamily: "Open Sans",
                  fontWeight: 600,
                }}
              />
            </td>
            {checklistHistory.map(
              (item: any) =>
                item.status === status && (
                  <>
                    <td>
                      <span>{item.histories.written_date}</span>
                    </td>
                    <td>
                      <span>{item.histories.marking_action_date}</span>
                    </td>
                    <td>
                      <span>{item.histories.responsible_action}</span>
                    </td>
                  </>
                )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
