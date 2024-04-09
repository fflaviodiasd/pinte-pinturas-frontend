import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { api } from "../../../services/api";
import { errorMessage, successMessage } from "../../Messages";
import { Info } from "@mui/icons-material";

interface Checklist {
  name: string;
}

interface Area {
  name: string;
  checklists: Checklist[];
}

export const ChecklistDrawer = ({ open, onClose, selectedLocalIds }: any) => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedChecklists, setSelectedChecklists] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<{ areas: Area[] }>("areas/checklists");
        setAreas(response.data.areas);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleCopy = async () => {
    try {
      await Promise.all(
        selectedLocalIds.map(async (localId: any) => {
          const response = await api.get(`/areas/${localId}/checklist`);
          const existingChecklists = response.data;
          const lastOrder =
            existingChecklists.length > 0
              ? existingChecklists[existingChecklists.length - 1].order
              : 0;

          await Promise.all(
            selectedChecklists.map(async (checklistName, index) => {
              await api.post(`/areas/${localId}/checklist/`, {
                name: checklistName,
                order: lastOrder + index + 1,
              });
            })
          );
        })
      );
      successMessage("Checklist copiado com sucesso!");
    } catch (error: any) {
      errorMessage("Erro ao copiar checklist!");
    }
  };

  const handleToggleChecklist = (checklistName: string) => {
    if (selectedChecklists.includes(checklistName)) {
      setSelectedChecklists(
        selectedChecklists.filter((name) => name !== checklistName)
      );
    } else {
      setSelectedChecklists([...selectedChecklists, checklistName]);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div
        style={{
          width: 300,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ margin: "1rem", flexGrow: 1, overflowY: "auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "Open Sans",
                  fontWeight: 600,
                  fontSize: "1.125rem",
                }}
              >
                Copiar Checklists
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Tooltip title="Selecione o(s) checklist(s) que deseja copiar para os locais selecionados na tabela (um novo checklist será criado, com o status inicial de 'Não Liberado' e mantendo apenas o mesmo nome.">
                <Info fontSize="small" style={{ color: "#C5C7C8" }} />
              </Tooltip>
            </div>
          </div>
          <div>
            <TextField
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={"Pesquisar"}
            />
          </div>

          <List>
            {areas.map((area, areaIndex) => (
              <React.Fragment key={areaIndex}>
                <ListItem disablePadding>
                  <ListItemText primary={area.name} />
                </ListItem>
                {area.checklists
                  .filter((checklist) =>
                    checklist.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((checklist, checklistIndex) => (
                    <ListItem
                      key={`${areaIndex}-${checklistIndex}`}
                      button
                      onClick={() => handleToggleChecklist(checklist.name)}
                    >
                      <Checkbox
                        edge="start"
                        checked={selectedChecklists.includes(checklist.name)}
                        tabIndex={-1}
                        disableRipple
                      />
                      <ListItemText primary={checklist.name} />
                    </ListItem>
                  ))}
              </React.Fragment>
            ))}
          </List>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "1rem",
          }}
        >
          <Button onClick={onClose} style={{ marginRight: "0.5rem" }}>
            <Typography style={{ textTransform: "capitalize" }}>
              Cancelar
            </Typography>
          </Button>
          <Button onClick={handleCopy} variant="contained">
            <Typography style={{ textTransform: "capitalize" }}>
              Copiar
            </Typography>
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
