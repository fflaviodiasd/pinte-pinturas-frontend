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
    "NÃO LIBERADA": "#F44336",
    LIBERADA: "#FF9800",
    INICIADA: "#4CAF50",
    FINALIZADA: "#2196F3",
    ENTREGUE: "#512DA8",
  };

  return (
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
  );
}
