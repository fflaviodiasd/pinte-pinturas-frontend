import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useStyles } from "./styles";

export const Registers = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const listOptions = [
    {
      option: "Cadastro de Colaboradores",
      onClick: () => navigate("/cadastros/colaboradores"),
    },
    {
      option: "Cadastro de Clientes",
      onClick: () => navigate("/cadastros/clientes"),
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <Typography style={{ color: "#5A5A5A", fontSize: 24, fontWeight: 600 }}>
          Cadastros
        </Typography>
      </Grid>

      <Grid item xs={12} lg={3}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {listOptions.map((option) => (
            <div
              key={option.option}
              className={classes.optionContainer}
              onClick={option.onClick}
            >
              <Typography style={{ fontWeight: "700" }}>
                {option.option}
              </Typography>
            </div>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

// Tipos de Obras
// 1 = Prédio
// 2 = Casa/Estabelecimento

const obraPredio = {
  id: 1,
  name: "Obra do João",
  type: 1,
  areas: [
    {
      areaId: 1,
      areaName: "Torre 01",
      pavimentos: [
        {
          pavimentoId: 1,
          pavimentoName: "primeiro andar",
          aptos: [
            {
              aptoId: 1,
              aptoName: "101-A",
              compartimentos: [
                {
                  compartimentoId: 1,
                  compartimentoName: "Sala de Estar",
                  pacotes: [
                    { pacoteId: 1, pacoteName: "", servicos: [], etapas: [] },
                  ],
                },
              ],
            },
          ],
        },
        {
          pavimentoId: 2,
          pavimentoName: "segundo andar",
          aptos: [
            {
              aptoId: 1,
              aptoName: "201-A",
              compartimentos: [
                {
                  compartimentoId: 1,
                  compartimentoName: "Sala de Estar",
                  pacotes: [
                    { pacoteId: 1, pacoteName: "", servicos: [], etapas: [] },
                  ],
                },
              ],
            },
          ],
        },
        {
          pavimentoId: 3,
          pavimentoName: "terceiro andar",
          aptos: [
            {
              aptoId: 1,
              aptoName: "301-A",
              compartimentos: [
                {
                  compartimentoId: 1,
                  compartimentoName: "Sala de Estar",
                  pacotes: [
                    { pacoteId: 1, pacoteName: "", servicos: [], etapas: [] },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      areaId: 2,
      areaName: "Torre 02",
      pavimentos: [
        {
          pavimentoId: 1,
          pavimentoName: "primeiro andar",
          aptos: [
            {
              aptoId: 1,
              aptoName: "101-B",
              compartimentos: [
                {
                  compartimentoId: 1,
                  compartimentoName: "Sala de Estar",
                  pacotes: [
                    { pacoteId: 1, pacoteName: "", servicos: [], etapas: [] },
                  ],
                },
              ],
            },
          ],
        },
        {
          pavimentoId: 2,
          pavimentoName: "segundo andar",
          aptos: [
            {
              aptoId: 1,
              aptoName: "201-B",
              compartimentos: [
                {
                  compartimentoId: 1,
                  compartimentoName: "Sala de Estar",
                  pacotes: [
                    { pacoteId: 1, pacoteName: "", servicos: [], etapas: [] },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const obraCasa = {
  id: 1,
  name: "Obra do Joaquim",
  type: 2,
  pavimentos: [
    {
      pavimentoId: 1,
      pavimentoName: "Térreo",
      compartimentos: [
        {
          compartimentoId: 1,
          compartimentoName: "Sala de Estar",
          pacotes: [{ pacoteId: 1, pacoteName: "", servicos: [], etapas: [] }],
        },
        {
          compartimentoId: 2,
          compartimentoName: "Cozinha",
          pacotes: [{ pacoteId: 1, pacoteName: "", servicos: [], etapas: [] }],
        },
      ],
    },
    {
      pavimentoId: 2,
      pavimentoName: "Primeiro andar",
      compartimentos: [
        {
          compartimentoId: 1,
          compartimentoName: "Quarto Casal",
          pacotes: [{ pacoteId: 1, pacoteName: "", servicos: [], etapas: [] }],
        },
        {
          compartimentoId: 2,
          compartimentoName: "Banheiro - Quarto Cassal",
          pacotes: [{ pacoteId: 1, pacoteName: "", servicos: [], etapas: [] }],
        },
      ],
    },
  ],
};

const endpointObras = "obras/";
const endpointAreas = "obras/:idObra/areas/";
const endpointPavimentos = "obras/:idObra/areas/:idArea/pavimentos/";
const endpointAptos =
  "obras/:idObra/areas/:idArea/pavimentos/:idPavimento/apto/";
const endpointCompartimentos =
  "obras/:idObra/areas/:idArea/pavimentos/:idPavimento/apto/:idApto/compartimentos";
const endpointPacotes =
  "obras/:idObra/areas/:idArea/pavimentos/:idPavimento/apto/:idApto/compartimentos/:idCompartimento/pacotes";
