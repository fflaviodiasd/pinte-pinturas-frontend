import React, { useCallback, useEffect, useState } from "react";
import { api } from "../../../../services/api";
import { Chip, TextField } from "@mui/material";
import { InputMask } from "../../../InputMask";
import { errorMessage, successMessage } from "../../../Messages";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";


interface History {
  written_date: string;
  marking_action_date: string;
  responsible_action: string;
}

interface ChecklistItem {
  status: string;
  histories: History;
}

interface HistoryInfoProps {
  checklistId: string;
}

export function HistoryInfo({ checklistId }: HistoryInfoProps) {
  const [checklistHistory, setChecklistHistory] = useState<ChecklistItem[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ChecklistItem | null>(null);
  const [editedDates, setEditedDates] = useState<{ [key: string]: string }>({});

  const { id: constructionId } = useParams();

  const getChecklistsHistories = useCallback(async () => {
    try {
      const response = await api.get(`checklists/${checklistId}/histories`);
      const data = response.data;
      setChecklistHistory(data);
    } catch (error) {
      console.error("Erro ao buscar dados do backend:", error);
    }
  }, [checklistId]);

  useEffect(() => {
    getChecklistsHistories();
  }, [getChecklistsHistories]);

  const STATUS_COLORS: { [key: string]: string } = {
    //"NÃO LIBERADA": "#F44336",
    LIBERADA: "#FF9800",
    INICIADA: "#4CAF50",
    FINALIZADA: "#2196F3",
    ENTREGUE: "#512DA8",
  };

  const handleEditClick = (item: ChecklistItem, status: string) => {
    setSelectedItem(item);
    const newEditedDates = {
      ...editedDates,
      [status]: item.histories.written_date || "",
    };
    setEditedDates(newEditedDates);
    setEditMode(true);
  };

  const handleBlur = () =>{
    setEditMode(false);
  };

  const handleKeyDown = async (
    e: React.KeyboardEvent<HTMLDivElement>,
    status: string
  ) => {
    if (e.key === "Enter") {
      setEditMode(false);
      await updateChecklistStatus(status, editedDates[status]);
    }
  };

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    status: string
  ) => {
    const newDate = e.target.value;
    const newEditedDates = { ...editedDates, [status]: newDate };
    setEditedDates(newEditedDates);
  };

  const updateChecklistStatus = async (status: string, date: string) => {
    try {
      const statusPatch = {
        [status]: date,
      };
      await api.patch(`/checklists/${checklistId}/`, { status: statusPatch });
      console.log("Modal de checklists atualizado com sucesso!");
      getChecklistsHistories();
      successMessage("Modal de checklists atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar modal de checklists!", error);
      errorMessage("Erro ao atualizar modal de checklists!");
    }
  };

  useEffect(() => {
    const socket = io('ws://10.10.5.240:86/', {
      transports: [ "websocket" ]
    });

    socket.emit("request_join_room", {room: constructionId?.toString()})

    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    socket.on('checklist_updated', (data) => {
      console.log('Received checklist_updated data from the server:', data?.data?.checklist_history);
      setChecklist(data?.data?.checklist_history)
      setChecklistHistory(data?.data?.checklist_history); 
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <table>
      <thead>
        <tr style={{ color: "#2E3132" }}>
          <th>Etapa</th>
          <th>Digitada</th>
          <th>Sistema</th>
          <th>Atualização</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(STATUS_COLORS).map((status: string, index: number) => {

          const filteredItems = checklistHistory.filter(
            (item: ChecklistItem) => item.status === status
          );


          return (
            <tr key={index}>
              <td>
                <Chip
                  label={status}
                  style={{
                    backgroundColor: STATUS_COLORS[status],
                    color: "#FFFFFF",
                    fontFamily: "Open Sans",
                    fontWeight: 600,
                    width: "100%",
                  }}
                />
              </td>
              <td>
                {filteredItems.length > 0 ? (
                  filteredItems.map(
                    (item: ChecklistItem, itemIndex: number) => (
                      <React.Fragment key={itemIndex}>
                        {editMode && selectedItem === item ? (
                          <TextField
                            style={{ width: "80%" }}
                            value={editedDates[status] || ""}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleDateChange(e, status)}
                            onKeyDown={(e) => handleKeyDown(e, status)}
                            onBlur={handleBlur}
                            variant="outlined"
                            size="small"
                            InputProps={{
                              inputComponent: InputMask as any,
                            }}
                          />
                        ) : (
                          <span onClick={() => handleEditClick(item, status)}>
                            {item.histories.written_date || ""}
                          </span>
                        )}
                      </React.Fragment>
                    )
                  )
                ) : (
                  <TextField
                    style={{ width: "80%" }}
                    value={editedDates[status] || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleDateChange(e, status)
                    }
                    onKeyDown={(e) => handleKeyDown(e, status)}
                    onBlur={handleBlur}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      inputComponent: InputMask as any,
                    }}
                  />
                )}
              </td>
              <td>
                {filteredItems.length > 0 && (
                  <span>{filteredItems[0].histories.marking_action_date}</span>
                )}
              </td>
              <td>
                {filteredItems.length > 0 && (
                  <span>{filteredItems[0].histories.responsible_action}</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
