import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { errorMessage, successMessage } from "../components/Messages";
import { Material } from "../types";
import { api } from "../services/api";
import { UserContext } from "../contexts/UserContext";

const LIMIT = 10;

export const useMaterials = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [materialData, setMaterialData] = useState<Material>({
    id: 0,
    name: "",
    group: "",
    expectedConsumption: "",
    applicationType: "",
    unit: "",
  });

  const getMaterial = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/materials/${id}/`);
      setMaterialData({
        ...materialData,
        id: data.id,
        name: data.name,
        group: data.group,
        unit: data.unit,
        expectedConsumption: data.expected_consumption,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getMaterialBySearch = async (id: string) => {
    try {
      const { data } = await api.get(`materials/${id}`);
      const allMaterials = data.results.map((material: Material) => ({}));
      setListMaterials(allMaterials);
    } catch (error) {
      console.log(error);
    }
  };

  const addMaterialGroups = async (
    //materialData: Material,
    values: any
  ) => {
    setLoading(true);
    try {
      await api.post(`companies/${user.company}/materials_group/`, {
        name: values.group,
      });
      successMessage("Material adicionado com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível adicionar material!");
      setLoading(false);
    }
  };

  const addMaterial = async (materialData: Material) => {
    setLoading(true);
    try {
      await api.post(`/companies/${user.company}/materials/`, {
        name: materialData.name,
        group: materialData.group,
        expected_consumption: materialData.expectedConsumption,
        type_application: materialData.applicationType,
        unit: materialData.unit,
      });
      successMessage("Material adicionado com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível adicionar material!");
      setLoading(false);
    }
  };

  const updateMaterial = async (
    materialData: Material,
    selectedMaterialId: number
  ) => {
    setLoading(true);
    try {
      await api.patch(`materials/${selectedMaterialId}/`, {
        name: materialData.name,
        group: materialData.group,
        expected_consumption: materialData.expectedConsumption,
        type_application: materialData.applicationType,
        unit: materialData.unit,
      });
      successMessage("Material atualizado com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível atualizar material!");
      setLoading(false);
    }
  };

  const updateMaterialGroup = async (
    //materialData: Material,
    selectedMaterialGroupId: number,
    values: any
  ) => {
    setLoading(true);
    try {
      await api.patch(`material_groups/${selectedMaterialGroupId}/`, {
        name: values.group,
      });
      successMessage("Material atualizado com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível atualizar material!");
      setLoading(false);
    }
  };

  const disableMaterial = async (materialId: number) => {
    setLoading(true);
    try {
      await api.delete(`materials/${materialId}`);
      getAllMaterials();
      successMessage("Material apagado com sucesso!");
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.detail ===
          "Material já associado a uma ou mais obras. É necessário remover o material de cada obra antes de apagar."
      ) {
        errorMessage(
          "Material já associado a uma ou mais obras. É necessário remover o material de cada obra antes de apagar."
        );
      } else {
        errorMessage("Não foi possível apagar material!");
      }
      setLoading(false);
    }
  };

  const disableMaterialGroup = async (materialId: number) => {
    setLoading(true);
    try {
      await api.delete(`material_groups/${materialId}`);
      getAllMaterialGroups();
      successMessage("Grupo de material apagado com sucesso!");
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.detail ===
          "Grupo já associado a uma ou mais materiais. É necessário remover o grupo de cada material antes de apagar."
      ) {
        errorMessage(
          "Grupo já associado a um ou mais materiais. É necessário remover o grupo de cada material antes de apagar."
        );
      } else {
        errorMessage("Não foi possível apagar grupo de material!");
      }
      setLoading(false);
    }
  };

  const [listMaterialGroups, setListMaterialGroups] = useState<Material[]>([]);

  const getAllMaterialGroups = async (currentPage: number = 0) => {
    setLoading(true);
    const offset = (currentPage - 1) * LIMIT;
    try {
      const { data } = await api.get(
        `companies/${user.company}/materials_group/?disabled=false&limit=${LIMIT}&offset=${offset}`
      );
      const allMaterialGroups = data.results.map((result: any) => ({
        id: result.id,
        group: result.name,
      }));
      setListMaterialGroups(allMaterialGroups);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [listMaterials, setListMaterials] = useState<Material[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageQuantity: 1,
  });
  const handleChangePagination = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    getAllMaterials(value);
  };

  const getAllMaterials = async (currentPage: number = 0) => {
    setLoading(true);
    const offset = (currentPage - 1) * LIMIT;
    try {
      const { data } = await api.get(
        `companies/${user.company}/materials/?disabled=false&limit=${LIMIT}&offset=${offset}`
      );
      setPagination({
        currentPage: currentPage === 0 ? 1 : currentPage,
        pageQuantity: Math.ceil(data.count / LIMIT),
      });
      const allMaterials = data.map((result: any) => ({
        id: result.id,
        name: result.name,
        group: result.group,
        unit: result.unit,
        expectedConsumption: result.expected_consumption,
      }));
      setListMaterials(allMaterials);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    loading,
    setLoading,
    pagination,
    handleChangePagination,
    materialData,
    listMaterials,
    listMaterialGroups,
    getMaterial,
    addMaterial,
    addMaterialGroups,
    updateMaterial,
    updateMaterialGroup,
    disableMaterial,
    disableMaterialGroup,
    getAllMaterialGroups,
    getAllMaterials,
    getMaterialBySearch,
  };
};
