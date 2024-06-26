import { Button } from "@mui/material";
import { api } from "../../services/api";
import { useParams } from "react-router-dom";
import { StyledGridLevel } from "./styles";
import { useEffect, useState } from "react";
import { ChipCustomLevel } from "../ChipCustom/ChipCustomLevel";

interface Level {
  id: number;
  name: string;
  color: string;
  order: number;
  is_last_level?: boolean;
}

interface LevelComponentProps {
  getLevelEndpoint?: string;
  postLevelEndpoint?: string;
  control?: any;
  setControl?: any;
}

export const LevelComponent: React.FC<LevelComponentProps> = ({
  getLevelEndpoint,
  setControl,
  control,
}) => {
  const [level, setLevel] = useState<Level[]>([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const { id } = useParams();
  const [valueActual, setValueActual] = useState<string>("");
  const [editingChipId, setEditingChipId] = useState<number | null>(null);

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const response = await api.get(`constructions/${id}/level_area`);
        setLevel(
          response.data.map((level: Level) => ({
            ...level,
            color: level.is_last_level === true ? "black" : "white",
          }))
        );
      } catch (error) {
        console.error("Erro ao buscar níveis:", error);
      }
    };
    fetchLevel();
  }, [getLevelEndpoint, id, valueActual, control]);

  const handleAddLevelClick = () => {
    setIsInputVisible(true);
    setValueActual("");
  };

  const handleLevelInputKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (valueActual.trim() !== "") {
        try {
          const response = await api.post(`constructions/${id}/level_area/`, {
            name: valueActual,
            order: level.length + 1,
          });
          const newLevel: Level = {
            ...response.data,
          };
          setLevel((prevLevel) => [...prevLevel, newLevel]);
          setValueActual("");
          setControl(response);
        } catch (error) {
          console.error("Erro ao criar um novo nível:", error);
        }
      }
      setIsInputVisible(false);
    }
  };

  const updateLevelInputKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (valueActual.trim() !== "") {
        try {
          const response = await api.put(`/level_area/${editingChipId}/`, {
            name: valueActual,
          });
          setValueActual("");
          setEditingChipId(null);
          setControl(response);
        } catch (error) {
          console.error("Erro ao editar o nível:", error);
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
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <span
        style={{ fontFamily: "Open Sans", fontWeight: 600, color: "#2E3132" }}
      >
        Níveis:
      </span>
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          onClick={handleAddLevelClick}
          variant="contained"
          color="primary"
          style={{ marginRight: "0.5rem", padding: "0", maxWidth: "30px" }}
        >
          +
        </Button>
        {isInputVisible && (
          <ChipCustomLevel
            name={"adicionar"}
            id={"adicionar"}
            bg={"#B9EAFF"}
            placeholder={"Nome do nível"}
            subtmitData={handleLevelInputKeyDown}
            setValueActual={setValueActual}
            value={valueActual}
            editable={true}
            post={true}
            onCreateLevel={() => setIsInputVisible(false)}
          />
        )}
      </div>
      <StyledGridLevel>
        {level.map((level: Level) => (
          <ChipCustomLevel
            key={level.id}
            name={level.name}
            id={String(level.id)}
            value={level.name}
            number={level.order}
            bg={level.color}
            setValueActual={setValueActual}
            subtmitData={updateLevelInputKeyDown}
            onClick={() => handleChipClick(level.id)}
            editable={editingChipId === level.id}
            setEditable={setEditingChipId}
            chipId={editingChipId}
            setControl={setControl}
          />
        ))}
      </StyledGridLevel>
    </div>
  );
};
