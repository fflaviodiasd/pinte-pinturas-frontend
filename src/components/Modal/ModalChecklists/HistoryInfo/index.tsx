import React, { useCallback, useEffect, useState } from "react";
import { api } from "../../../../services/api";
import { Chip, TextField } from "@mui/material";
import { InputMask } from "../../../InputMask";
import { errorMessage, successMessage } from "../../../Messages";

export function HistoryInfo({ checklistId }: any) {
  const [checklistHistory, setChecklistHistory] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedDate, setEditedDate] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const response = await api.get(`checklists/${checklistId}/histories`);
      const data = response.data;
      setChecklistHistory(data);
    } catch (error) {
      console.error("Erro ao buscar dados do backend:", error);
    }
  }, [checklistId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const STATUS_COLORS: { [key: string]: string } = {
    //"NÃO LIBERADA": "#F44336",
    LIBERADA: "#FF9800",
    INICIADA: "#4CAF50",
    FINALIZADA: "#2196F3",
    ENTREGUE: "#512DA8",
  };

  const handleEditClick = (item: any) => {
    setSelectedItem(item);
    setEditedDate(item.histories.written_date);
    setEditMode(true);
  };

  const handleBlur = () => {
    setEditMode(false);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      console.log("STATUS:", selectedItem?.status);
      console.log("DATA EDITADA:", editedDate);
      setEditMode(false);
      await patchChecklistStatus(selectedItem?.status, editedDate);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedDate(e.target.value);
  };

  const patchChecklistStatus = async (status: string, date: string) => {
    try {
      const statusPatch = {
        [status]: date,
      };
      await api.patch(`/checklists/${checklistId}/`, { status: statusPatch });
      console.log("Modal de checklists atualizado com sucesso!");
      fetchData();
      successMessage("Modal de checklists atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar modal de checklists!", error);
      errorMessage("Erro ao atualizar modal de checklists!");
    }
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
              (item: any, itemIndex: number) =>
                item.status === status && (
                  <React.Fragment key={itemIndex}>
                    <td>
                      {editMode && selectedItem === item ? (
                        <TextField
                          style={{ width: "80%" }}
                          value={editedDate}
                          onChange={handleDateChange}
                          onKeyDown={handleKeyDown}
                          onBlur={handleBlur}
                          variant="outlined"
                          size="small"
                          InputProps={{
                            inputComponent: InputMask as any,
                          }}
                        />
                      ) : (
                        <span onClick={() => handleEditClick(item)}>
                          {item.histories.written_date}
                        </span>
                      )}
                    </td>
                    <td>
                      <span>{item.histories.marking_action_date}</span>
                    </td>
                    <td>
                      <span>{item.histories.responsible_action}</span>
                    </td>
                  </React.Fragment>
                )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
