import { Button } from "@mui/material";
import { api } from "../../services/api";
import { ChipCustom } from "../ChipCustom";
import { useEffect, useState } from "react";

interface Checklist {
  id: number;
  name: string;
  bg: string;
  order: number;
  status: number;
}

interface ChecklistComponentProps {
  getChecklistEndpoint?: string;
  postChecklistEndpoint?: string;
  localId?: number;
}

const STATUS_COLORS: { [key: number]: string } = {
  1: "#FF9800",
  2: "#4CAF50",
  3: "#2196F3",
  4: "#512DA8",
};

export const ChecklistComponent: React.FC<ChecklistComponentProps> = ({
  getChecklistEndpoint,
  localId,
}) => {
  const [checklist, setChecklist] = useState<Checklist[]>([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [valueActual, setValueActual] = useState<string>("");
  const [editingChipId, setEditingChipId] = useState<number | null>(null);

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const response = await api.get(`areas/${localId}/checklist`);
        setChecklist(
          response.data.map((checklist: Checklist) => ({
            ...checklist,
            bg: STATUS_COLORS[checklist.status],
          }))
        );
        console.log(response);
      } catch (error) {
        console.error("Erro ao buscar checklists:", error);
      }
    };

    fetchChecklist();
  }, [getChecklistEndpoint, localId, valueActual]);

  const handleAddChecklistClick = () => {
    setIsInputVisible(true);
    setValueActual("");
  };

  const handleChecklistInputKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (valueActual.trim() !== "") {
        try {
          const response = await api.post(`areas/${localId}/checklist`, {
            name: valueActual,
            order: checklist.length + 1,
          });
          console.log(response);
          const newChecklist: Checklist = {
            ...response.data,
            color:
              STATUS_COLORS[
                checklist.length % Object.keys(STATUS_COLORS).length
              ],
          };
          setChecklist((prevChecklist) => [...prevChecklist, newChecklist]);
          setValueActual("");
        } catch (error) {
          console.error("Erro ao criar um novo checklist:", error);
        }
      }
      setIsInputVisible(false);
    }
  };

  const updateChecklistInputKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (valueActual.trim() !== "") {
        try {
          const response = await api.put(`/checklists/${editingChipId}/`, {
            name: valueActual,
          });
          console.log(response);
          setValueActual("");
          setEditingChipId(null);
        } catch (error) {
          console.error("Erro ao editar o checklist:", error);
        }
      }
    }
  };

  const handleChipClick = (chipId: number) => {
    setEditingChipId(chipId);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <h2>Checklists</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          onClick={handleAddChecklistClick}
          variant="contained"
          color="primary"
          style={{ marginRight: "0.5rem", padding: "0", maxWidth: "30px" }}
        >
          +
        </Button>
        {isInputVisible && (
          <ChipCustom
            name={"adicionar"}
            id={"adicionar"}
            bg={"black"}
            placeholder={"Digite o nome do checklist e pressione Enter..."}
            subtmitData={handleChecklistInputKeyDown}
            setValueActual={setValueActual}
            value={valueActual}
            editable={true}
            post={true}
          />
        )}
      </div>
      {checklist.map((checklist: Checklist) => (
        <ChipCustom
          key={checklist.id}
          name={checklist.name}
          id={String(checklist.id)}
          value={checklist.name}
          number={checklist.order}
          bg={checklist.bg}
          setValueActual={setValueActual}
          subtmitData={updateChecklistInputKeyDown}
          onClick={() => handleChipClick(checklist.id)}
          editable={editingChipId === checklist.id}
        />
      ))}
    </div>
  );
};
