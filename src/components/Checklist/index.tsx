import { Button, Tooltip } from "@mui/material";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { ChipCustomChecklist } from "../ChipCustom/ChipCustomChecklist";
import { StyledGridChecklist } from "./styles";
import LaunchIcon from "@mui/icons-material/Launch";
import { ModalChecklists } from "../Modal/ModalChecklists";
import { useParams } from "react-router-dom";


interface Checklist {
  id: number;
  name: string;
  bg: string;
  order: number;
  status: string;
  package?: any;
}

interface ChecklistComponentProps {
  getChecklistEndpoint?: string;
  postChecklistEndpoint?: string;
  localId?: number;
}

const STATUS_COLORS: { [key: string]: string } = {
  "NÃO LIBERADA": "#F44336",
  LIBERADA: "#FF9800",
  INICIADA: "#4CAF50",
  FINALIZADA: "#2196F3",
  ENTREGUE: "#512DA8",
};

export const ChecklistComponent: React.FC<ChecklistComponentProps> = ({
  getChecklistEndpoint,
  localId,
}) => {
  const [checklist, setChecklist] = useState<Checklist[]>([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [valueActual, setValueActual] = useState<string>("");
  const [editingChipId, setEditingChipId] = useState<number | null>(null);
  const [tooltipData, setTooltipData] = useState<any>(null);
  const [tooltipChecklistId, setTooltipChecklistId] = useState<number | null>(
    null
  );
  const [modalOpen, setIsModalOpen] = useState(false);
  const { id: constructionId , checklistid: checkListId} = useParams();

  console.log("NOVO>>>>>>>>>", checkListId)

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const response = await api.get(`areas/${localId}/checklist`);
        setChecklist(
          response.data.checklists.map((checklist: Checklist) => ({
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

  useEffect(() => {
    const fetchTooltipData = async () => {
      try {
        if (tooltipChecklistId) {
          const response = await api.get(
            `/checklists/${tooltipChecklistId}/history_tooltip/`
          );
          setTooltipData(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar tooltip data:", error);
      }
    };

    fetchTooltipData();
  }, [tooltipChecklistId]);

  useEffect(() => {
    if(checkListId !== undefined){
      setIsModalOpen(true)
    }
  }, [checkListId]);

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
          const response = await api.post(`/areas/${localId}/checklist/`, {
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
      <div style={{ display: "flex", gap: "10px" }}>
        <Tooltip title="Novo Checklist">
          <Button
            onClick={handleAddChecklistClick}
            variant="contained"
            color="primary"
            style={{ marginRight: "0.5rem", padding: "0", maxWidth: "30px" }}
          >
            +
          </Button>
        </Tooltip>
        {isInputVisible && (
          <ChipCustomChecklist
            name={"adicionar"}
            id={"adicionar"}
            bg={"black"}
            placeholder={"Nome do checklist"}
            subtmitData={handleChecklistInputKeyDown}
            setValueActual={setValueActual}
            value={valueActual}
            editable={true}
            post={true}
            onCreateChecklist={() => setIsInputVisible(false)}
          />
        )}
      </div>
      <StyledGridChecklist>
        {checklist.map((checklist: Checklist) => (
          <Tooltip
            key={checklist.id}
            title={
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>Início: {tooltipData?.started}</span>
                <span>Término: {tooltipData?.finished}</span>
                <span>Equipe: {tooltipData?.team}</span>
                <span>Medição: {tooltipData?.measurement}</span>
                <button
                  style={{
                    backgroundColor: "#0076BE",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "0.5rem",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  <LaunchIcon
                    style={{ color: "white" }}
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  />
                </button>
              </div>
            }
            arrow
            placement="top"
            onMouseEnter={() => setTooltipChecklistId(checklist.id)}
          >
            <div>
              <ChipCustomChecklist
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
                chipId={editingChipId}
                hideOrdinal={true}
                checklistPackage={checklist.package?.id}
              />
            </div>
          </Tooltip>
        ))}
      </StyledGridChecklist>
      <ModalChecklists
        modalOpen={modalOpen}
        handleClose={handleClose}
        localId={localId}
      />
    </div>
  );
};
