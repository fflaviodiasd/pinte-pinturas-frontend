import { Button } from "@mui/material";
import { api } from "../../services/api";
import { useParams } from "react-router-dom";
import { ChipCustom } from "../ChipCustom";
import { StyledGridLevel } from "./style";
import { useEffect, useState } from "react";

interface Level {
  id: number;
  name: string;
  color: string;
  order: number;
}

interface LevelComponentProps {
  getLevelEndpoint?: string;
  postLevelEndpoint?: string;
}

const levelColors = ["black", "#DEF4FF", "#B9EAFF"];

export const LevelComponent: React.FC<LevelComponentProps> = ({
  getLevelEndpoint,
}) => {
  const [level, setLevel] = useState<Level[]>([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const { id: levelId } = useParams();
  const [valueActual, setValueActual] = useState<string>("");
  const [editingChipId, setEditingChipId] = useState<number | null>(null);

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const response = await api.get(`constructions/${levelId}/level_area`);
        setLevel(
          response.data.results.map((level: Level, index: number) => ({
            ...level,
            color: levelColors[index % levelColors.length],
          }))
        );
        console.log(response);
      } catch (error) {
        console.error("Erro ao buscar níveis:", error);
      }
    };

    fetchLevel();
  }, [getLevelEndpoint, levelId, valueActual]);

  const handleAddLevelClick = () => {
    setIsInputVisible(true);
  };

  const handleLevelInputKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (valueActual.trim() !== "") {
        try {
          const response = await api.post(
            `constructions/${levelId}/level_area/`,
            {
              name: valueActual,
              order: level.length + 1,
            }
          );
          console.log(response);
          const newLevel: Level = {
            ...response.data,
            color: levelColors[level.length % levelColors.length],
          };
          setLevel((prevLevel) => [...prevLevel, newLevel]);
          setValueActual("");
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
          console.log(response);
          setValueActual("");
          setEditingChipId(null);
        } catch (error) {
          console.error("Erro ao editar o nível:", error);
        }
      }
    }
  };

  const handleChipClick = (chipId: number) => {
    setEditingChipId(chipId); // Definir o chip clicado como o chip em edição
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
      <h2>Níveis</h2>
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
          <ChipCustom
            name={"adicionar"}
            id={"adicionar"}
            bg={"black"}
            placeholder={"Digite o nome do nível e pressione Enter..."}
            subtmitData={handleLevelInputKeyDown}
            setValueActual={setValueActual}
            value={valueActual}
          />
        )}
      </div>
      <StyledGridLevel>
        {level.map((level: Level) => (
          <ChipCustom
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
          />
        ))}
      </StyledGridLevel>
    </div>
  );
};
