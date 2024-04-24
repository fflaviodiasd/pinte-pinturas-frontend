import React, { ReactElement, forwardRef, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Info, Search } from "@mui/icons-material";
import { api } from "../../../services/api";
import { SelectComponent } from "../../Select";
import { Form, Formik } from "formik";
import { SelectPackages } from "./SelectPackages";
import { useParams } from "react-router-dom";

type ModalPackagesProps = {
  modalOpen: boolean;
  handleClose: () => void;
  handleDisable?: () => void;
};

interface Checklist {
  name: string;
}

interface Area {
  name: string;
  checklists: Checklist[];
}

export const ModalPackages = ({
  modalOpen,
  handleClose,
}: ModalPackagesProps) => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedChecklists, setSelectedChecklists] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const { id } = useParams();

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

  const handleSubmit = async () => {
    alert("Salvo");
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
    <Dialog
      open={modalOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
    >
      <div
        style={{
          width: 450,
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
                Associar Pacote
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Info fontSize="small" style={{ color: "#C5C7C8" }} />
            </div>
          </div>
          <Formik
            initialValues={{
              discipline: "",
              packages: "",
            }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {() => (
              <Form>
                <DialogContent>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <SelectComponent
                      name="discipline"
                      label="Disciplina"
                      endpoint={`disciplines`}
                      optionKey="id"
                      optionValueKey="id"
                      optionLabelKey="name"
                    />
                    <SelectPackages
                      name="packages"
                      label="Pacotes"
                      endpoint={`constructions/${id}/packages`}
                      optionKey="id"
                      optionValueKey="id"
                      optionLabelKey="name"
                    />
                  </div>
                </DialogContent>
              </Form>
            )}
          </Formik>
          <div style={{ paddingTop: "0.5rem" }}>
            <span
              style={{
                fontFamily: "Open Sans",
                fontWeight: 600,
                color: "#2E3132",
              }}
            >
              Checklists
            </span>
            <TextField
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={"Pesquisar"}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {errorMessageVisible && (
            <span
              style={{
                color: "#B71C1C",
                fontFamily: "Open Sans",
                fontWeight: 400,
                fontSize: "0.75rem",
                display: "flex",
                marginTop: "0.5rem",
              }}
            >
              É necessário selecionar os campos para associar pacote.
            </span>
          )}

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
            justifyContent: "space-evenly",
            paddingBottom: "1rem",
          }}
        >
          <Button onClick={handleClose} style={{ marginRight: "0.5rem" }}>
            <Typography style={{ textTransform: "capitalize" }}>
              Cancelar
            </Typography>
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            <Typography style={{ textTransform: "capitalize" }}>
              Salvar
            </Typography>
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
