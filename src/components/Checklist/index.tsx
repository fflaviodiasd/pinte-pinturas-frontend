import React, { useState, useEffect } from "react";
import { Button, Chip, TextField } from "@mui/material";
import { api } from "../../services/api";
import { useParams } from "react-router-dom";

interface Checklist {
  id: number;
  name: string;
  color: string;
}

interface ChecklistComponentProps {
  localId: number;
  getChecklistEndpoint?: string;
  postChecklistEndpoint?: string;
}

const checklistColors = [
  "#4CAF50",
  "#512DA8",
  "#2196F3",
  "#F44336",
  "#FF9800",
  "#424242",
  "#BDBDBD",
  "#616161",
];

export const ChecklistComponent: React.FC<ChecklistComponentProps> = ({
  localId,
  getChecklistEndpoint,
  postChecklistEndpoint,
}) => {
  const [checklist, setChecklist] = useState<Checklist[]>([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [newChecklistName, setNewChecklistName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const response = await api.get(`/areas/${localId}/checklist/`);
        setChecklist(
          response.data.map((checklist: Checklist, index: number) => ({
            ...checklist,
            color: checklistColors[index % checklistColors.length],
          }))
        );
        console.log(response);
      } catch (error) {
        console.error("Erro ao buscar checklists:", error);
      }
    };

    fetchLevel();
  }, [localId, getChecklistEndpoint]);

  const handleAddChecklistClick = () => {
    setIsInputVisible(true);
  };

  const handleChecklistInputKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (newChecklistName.trim() !== "") {
        try {
          const response = await api.post(`/areas/${localId}/checklist/`, {
            name: `${checklist.length + 1}  - ${newChecklistName}`,
            order: `${checklist.length + 1}`,
          });
          console.log(response);
          const newChecklist: Checklist = {
            ...response.data,
            color: checklistColors[checklist.length % checklistColors.length],
          };
          setChecklist((prevChecklist) => [...prevChecklist, newChecklist]);
          setNewChecklistName("");
        } catch (error) {
          console.error("Erro ao criar um novo checklist:", error);
        }
      }
      setIsInputVisible(false);
    }
  };

  return (
    <div>
      <h2>Checklists</h2>
      <div>
        <Button
          onClick={handleAddChecklistClick}
          variant="contained"
          color="primary"
          style={{ marginRight: "0.5rem" }}
        >
          +
        </Button>
        {isInputVisible && (
          <TextField
            type="text"
            value={newChecklistName}
            onChange={(e) => setNewChecklistName(e.target.value)}
            onKeyDown={handleChecklistInputKeyDown}
            placeholder="Digite o nome do checklist e pressione Enter..."
          />
        )}
      </div>
      <div style={{ marginTop: "1rem" }}>
        {checklist.map((checklist) => (
          <Chip
            key={checklist.id}
            label={checklist.name}
            style={{
              marginRight: "0.5rem",
              backgroundColor: checklist.color,
              color: checklist.color === "black" ? "white" : "black",
              fontWeight: "bold",
            }}
          />
        ))}
      </div>
    </div>
  );
};
