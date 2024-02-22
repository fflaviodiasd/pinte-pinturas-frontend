import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { errorMessage, successMessage } from "../components/Messages";
import { api } from "../services/api";

type ConstructionArea = {
  id: number;
  name: string;
  type: number;
};

export const useConstructions = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [constructionData, setConstructionData] = useState<any>({
    id: 0,
    name: "",
    responsible: "",
    status: "",
    percentageCompleted: 0,
    type: "",
    areas: [],
  });

  const getConstruction = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await api.get(`constructions/${id}`);
      setConstructionData({
        ...constructionData,
        id: data.id,
        name: data.name,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addConstructionArea = async (constructionId: string, name: string) => {
    try {
      await api.post(`constructions/${constructionId}/areas/`, {
        name,
        type: 5,
      });
      successMessage("Área adicionada com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível adicionar área!");
      setLoading(false);
    }
  };

  const addConstruction = async (constructionData: any) => {
    setLoading(true);
    try {
      await api.post("constructions/", { name: constructionData.name });
      successMessage("Obra adicionada com sucesso!");
      setLoading(false);
      navigate("/obras");
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível adicionar obra!");
      setLoading(false);
    }
  };

  const updateConstruction = async (constructionData: any) => {
    setLoading(true);
    try {
      await api.patch(`constructions/${id}/`, { name: constructionData.name });
      successMessage("Obra atualizada com sucesso!");
      setLoading(false);
      navigate("/obras");
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível atualizar obra!");
      setLoading(false);
    }
  };

  const disableConstruction = async (constructionId: number) => {
    setLoading(true);
    try {
      await api.delete(`constructions/${constructionId}`);
      getAllConstructions();
      successMessage("Obra desabilitada com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível desabilitar obra!");
      setLoading(false);
    }
  };

  const [listConstructionAreas, setListConstructionAreas] = useState<
    ConstructionArea[]
  >([]);
  const getAllConstructionAreas = async (constructionId: string) => {
    try {
      const { data } = await api.get(`constructions/${constructionId}/areas/`);
      const allConstructionArea = data.map(
        (construction: ConstructionArea) => ({
          id: construction.id,
          name: construction.name,
          type: construction.type,
        })
      );
      setListConstructionAreas(allConstructionArea);
    } catch (error) {
      console.log(error);
    }
  };

  const [listConstructionsMaterials, setListConstructionsMaterials] = useState<
    any[]
  >([]);
  const getAllConstructionsMaterials = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`constructions/${id}/materials`);
      const constructionMaterialsList = data.map((result: any) => ({
        id: result.id,
        material: result.material,
        group: result.group,
        productionBatch: result.production_batch,
        price: result.price,
        expirationDate: result.expiration_date,
      }));
      console.log(data);
      setListConstructionsMaterials(constructionMaterialsList);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [listConstructionsTeams, setListConstructionsTeams] = useState<any[]>(
    []
  );
  const getAllConstructionsTeams = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`constructions/${id}/teams`);
      const constructionTeamsList = data.map((result: any) => ({
        id: result.id,
        active: result.active,
        teams: result.name,
        collaborators: result.member_count,
      }));
      console.log(data);
      setListConstructionsTeams(constructionTeamsList);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [listConstructions, setListConstructions] = useState<any[]>([]);
  const getAllConstructions = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`constructions/`);
      const constructionList = data.results.map((result: any) => ({
        id: result.id,
        active: result.active,
        name: result.name,
        client: "",
        responsible: "",
        percentageCompleted: result.percentage,
      }));
      setListConstructions(constructionList);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    loading,
    setLoading,
    constructionData,
    setConstructionData,
    listConstructions,
    listConstructionsMaterials,
    getConstruction,
    addConstruction,
    updateConstruction,
    disableConstruction,
    getAllConstructions,
    listConstructionAreas,
    listConstructionsTeams,
    getAllConstructionAreas,
    getAllConstructionsTeams,
    getAllConstructionsMaterials,
    addConstructionArea,
  };
};
