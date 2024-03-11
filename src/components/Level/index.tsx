import React, { useState, useEffect } from "react";
import { Button, Chip, TextField } from "@mui/material";
import { api } from "../../services/api";
import { useParams } from "react-router-dom";

interface Level {
  id: number;
  name: string;
  color: string;
}

interface LevelComponentProps {
  getLevelEndpoint?: string;
  postLevelEndpoint?: string;
}

const levelColors = ["black", "#DEF4FF", "#B9EAFF"];

export const LevelComponent: React.FC<LevelComponentProps> = ({
  getLevelEndpoint,
  postLevelEndpoint,
}) => {
  const [level, setLevel] = useState<Level[]>([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [newLevelName, setNewLevelName] = useState("");
  const { id: levelId } = useParams();

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
  }, [getLevelEndpoint]);

  const handleAddLevelClick = () => {
    setIsInputVisible(true);
  };

  const handleLevelInputKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (newLevelName.trim() !== "") {
        try {
          const response = await api.post(
            `constructions/${levelId}/level_area/`,
            {
              name: `${level.length + 1}  - ${newLevelName}`,
            }
          );
          console.log(response);
          const newLevel: Level = {
            ...response.data,
            color: levelColors[level.length % levelColors.length],
          };
          setLevel((prevLevel) => [...prevLevel, newLevel]);
          setNewLevelName("");
        } catch (error) {
          console.error("Erro ao criar um novo nível:", error);
        }
      }
      setIsInputVisible(false);
    }
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
      <div>
        <Button
          onClick={handleAddLevelClick}
          variant="contained"
          color="primary"
          style={{ marginRight: "0.5rem" }}
        >
          +
        </Button>
        {isInputVisible && (
          <TextField
            type="text"
            value={newLevelName}
            onChange={(e) => setNewLevelName(e.target.value)}
            onKeyDown={handleLevelInputKeyDown}
            placeholder="Digite o nome do nível e pressione Enter..."
          />
        )}
      </div>
      <div style={{ marginTop: "1rem" }}>
        {level.map((level) => (
          <Chip
            key={level.id}
            label={level.name}
            style={{
              marginRight: "0.5rem",
              backgroundColor: level.color,
              color: level.color === "black" ? "white" : "black",
              fontWeight: "bold",
            }}
          />
        ))}
      </div>
    </div>
  );
};
