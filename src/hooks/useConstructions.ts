import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { errorMessage, successMessage } from "../components/Messages";
import { api } from "../services/api";
import { Construction } from "../types";
import { UserContext } from "../contexts/UserContext";

type ConstructionArea = {
  id: number;
  name: string;
  type: number;
};

export const useConstructions = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [constructionData, setConstructionData] = useState<any>({
    id: 0,
    name: "",
    responsible: "",
    status: "",
    percentageCompleted: 0,
    type: "",
    areas: [],
    teamName: "",
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

  const getConstructionTeamMember = async (teamId: any) => {
    setLoading(true);
    try {
      const { data } = await api.get(`teams/${teamId}/`);
      setConstructionData({
        ...constructionData,
        id: data.id,
        teamName: data.name,
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

  const addConstructionMaterial = async (constructionData: Construction) => {
    setLoading(true);
    try {
      await api.post(`/constructions/${id}/materials/`, {
        production_batch: constructionData.productionBatch,
        price: constructionData.price,
        expiration_date: constructionData.expirationDate,
        material: constructionData.material,
      });
      successMessage("Material da obra adicionado com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível adicionar material da obra!");
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

  const updateConstructionMaterial = async (
    constructionData: Construction,
    selectedConstructionMaterialId: number
  ) => {
    setLoading(true);
    try {
      await api.patch(
        `material_constructions/${selectedConstructionMaterialId}/`,
        {
          production_batch: constructionData.productionBatch,
          price: constructionData.price,
          expiration_date: constructionData.expirationDate,
          material: constructionData.material,
        }
      );
      successMessage("Material da obra atualizado com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível atualizar material da obra!");
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

  const updateConstructionTeamMember = async (
    constructionData: any,
    teamId: any
  ) => {
    setLoading(true);
    try {
      await api.patch(`teams/${teamId}/`, { name: constructionData.teamName });
      successMessage("Equipe atualizada com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível atualizar equipe!");
      setLoading(false);
    }
  };

  const disableConstructionMaterial = async (materialId: number) => {
    setLoading(true);
    try {
      await api.delete(`material_constructions/${materialId}`);
      getAllConstructionsMaterials();
      successMessage("Material da obra apagado com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível apagar material da obra!");
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

  const [listConstructionsTeamMembers, setListConstructionsTeamMembers] =
    useState<any[]>([]);
  const getAllConstructionsTeamMembers = async (teamId: any) => {
    setLoading(true);
    try {
      const { data } = await api.get(`teams/${teamId}`);
      const constructionTeamMembersList = data.members.map((result: any) => ({
        id: result.id,
        active: result.active,
        avatar: result.avatar,
        name: result.name,
        role: result.office,
        profile: result.profile,
        cellPhone: result.cell_phone,
      }));
      setListConstructionsTeamMembers(constructionTeamMembersList);
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
      const { data } = await api.get(
        `/companies/${user.company}/constructions/`
      );
      const constructionList = data.map((result: any) => ({
        id: result.id,
        active: result.active,
        name: result.corporate_name,
        client: "",
        responsible: "",
        percentageCompleted: result.execution,
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
    listConstructionsTeamMembers,
    getConstruction,
    getConstructionTeamMember,
    addConstruction,
    addConstructionMaterial,
    updateConstruction,
    updateConstructionMaterial,
    updateConstructionTeamMember,
    disableConstruction,
    disableConstructionMaterial,
    getAllConstructions,
    listConstructionAreas,
    listConstructionsTeams,
    getAllConstructionAreas,
    getAllConstructionsTeams,
    getAllConstructionsMaterials,
    getAllConstructionsTeamMembers,
    addConstructionArea,
  };
};
