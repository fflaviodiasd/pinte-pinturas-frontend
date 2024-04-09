import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { errorMessage, successMessage } from "../components/Messages";
import { api } from "../services/api";
import { Construction } from "../types";
import { UserContext } from "../contexts/UserContext";
import { MRT_ColumnDef } from "material-react-table";

type ConstructionPackage = {
  id: number;
  name: string;
  discipline: string;
  package_value: string;
  package_workmanship: string;
};

type ConstructionService = {
  id: number;
  name: string;
  discipline: string;
  package_value: string;
  package_workmanship: string;
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
        corporateName: data.corporate_name,
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

  const addConstructionLocal = async (
    values: any,
    dynamicColumns: MRT_ColumnDef<any>[]
  ) => {
    try {
      if (dynamicColumns && dynamicColumns.length > 0) {
        const levels = dynamicColumns
          .filter(
            (column) =>
              column.accessorKey && column.accessorKey.startsWith("nivel_")
          )
          .map((column) => {
            const name =
              values && values[column.accessorKey as keyof typeof values];
            return {
              level: {
                name: column.header,
              },
              name: name || "",
            };
          });
        const requestData = {
          areas: [
            {
              code: values && values.code,
              levels: levels,
            },
          ],
        };
        console.log(requestData);
        await api.post(`constructions/${id}/areas/`, requestData);
        successMessage("Área adicionada com sucesso!");
        setLoading(false);
      } else {
        errorMessage("Não foi possível adicionar área!");
      }
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

  const addConstructionTeam = async (constructionData: any) => {
    setLoading(true);
    try {
      await api.post(`/constructions/${id}/teams/`, {
        name: constructionData.teamName,
      });
      successMessage("Equipe adicionada com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível adicionar equipe!");
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
      await api.patch(`teams/${teamId}/`, {
        name: constructionData.teamName,
        team_members: constructionData.teamMembers,
      });
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

  const disableConstructionTeam = async (teamId: number) => {
    setLoading(true);
    try {
      await api.delete(`teams/${teamId}`);
      getAllConstructionsTeams();
      successMessage("Equipe apagada com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível apagar equipe!");
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

  const [listConstructionsLocations, setListConstructionsLocations] = useState<
    any[]
  >([]);
  const getAllConstructionsLocations = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/constructions/${id}/areas/`);
      const constructionLocalList = data.areas.map((result: any) => {
        const levelNames: Record<string, string> = {};
        result.levels.forEach((level: any, index: number) => {
          levelNames[`nivel_${index}`] = level.name;
        });
        return {
          id: result.id,
          code: result.code,
          ...levelNames,
        };
      });
      setListConstructionsLocations(constructionLocalList);
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
        responsible: result.supervisor,
        percentageCompleted: result.execution,
      }));
      setListConstructions(constructionList);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [listConstructionServices, setListConstructionServices] = useState<ConstructionService[]>([]);

  const getAllConstructionServices = async () => {
    if (!id) {
      console.error('ID da construção não foi fornecido');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.get(`/constructions/${id}/services/`);
      setListConstructionServices(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao obter serviços de construção:', error);
      setLoading(false);
    }
  };

  const disableConstructionService = async (packageId: number) => {
    setLoading(true);
    try {
      await api.delete(`/services/${packageId}`);
    } catch (error) {
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  const getAllServiceStepsById = async (serviceId: number) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/services/${serviceId}/steps/`);
      setLoading(false);
      return data; 
    } catch (error) {
      console.error('Erro ao obter etapas do serviço:', error);
      setLoading(false);
      throw error; 
    }
  };

  const getServiceById = async (serviceId: number) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/services/${serviceId}/`);
      setLoading(false);
      return data; 
    } catch (error) {
      console.error('Erro ao obter info do serviço:', error);
      setLoading(false);
      throw error; 
    }
  };

  const addConstructionService = async (newService: any) => {
    setLoading(true);
    try {
      const response = await api.post(`/constructions/${id}/services/`, newService);
      setListConstructionServices(prevServices => [...prevServices, response.data]);
      successMessage('Serviço adicionado com sucesso!');
    } catch (error) {
      errorMessage('Erro ao adicionar o serviço!');
    } finally {
      setLoading(false);
    }
  };

  const addServiceStep = async (stepId:any, stepData:any) => {
    setLoading(true);
    try {
      const response = await api.post(`/services/${stepId}/steps/`, stepData);
      successMessage('Etapa adicionada com sucesso!');
      return response.data; 
    } catch (error) {
      console.error('Erro ao adicionar etapa:', error);
      errorMessage('Não foi possível adicionar a etapa!');
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  const deleteServiceStep = async (stepId:any) => {
    setLoading(true);
    try {
      await api.delete(`/step_services/${stepId}/`);
      successMessage('Etapa removida com sucesso!');
    } catch (error) {
      console.error('Erro ao remover etapa:', error);
      errorMessage('Não foi possível remover a etapa!');
      throw error; 
    } finally {
      setLoading(false);
    }
  };


const [listConstructionPackages, setListConstructionPackages] = useState<ConstructionPackage[]>([]);

  const getAllConstructionPackages = async () => {
    if (!id) {
      console.error('ID da construção não foi fornecido');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.get(`/constructions/${id}/packages/`);
      setListConstructionPackages(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao obter pacotes de construção:', error);
      setLoading(false);
    }
  };

  const disableConstructionPackage = async (packageId: number) => {
    setLoading(true);
    try {
      await api.delete(`/packages/${packageId}`);
    } catch (error) {
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  const addConstructionPackage = async (newPackage: any) => {
    setLoading(true);
    try {
      const response = await api.post(`/constructions/${id}/packages/`, newPackage);
      setListConstructionPackages(prevPackages => [...prevPackages, response.data]);
      successMessage('Pacote adicionado com sucesso!');
    } catch (error) {
      errorMessage('Erro ao adicionar o pacote!');
    } finally {
      setLoading(false);
    }
  };

const getAllPackageStepsById = async (packageId: number) => {
  setLoading(true);
  try {
    const { data } = await api.get(`/packages/${packageId}/steps/`);
    setLoading(false);
    return data; 
  } catch (error) {
    console.error('Erro ao obter etapas do pacote:', error);
    setLoading(false);
    throw error; 
  }
};



  const getAllDisciplines = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/disciplines/`);
      setLoading(false);
      return data
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  
  const addPackageStep = async (packageId:any, stepData:any) => {
    setLoading(true);
    try {
      const response = await api.post(`/packages/${packageId}/steps/`, stepData);
      successMessage('Etapa adicionada com sucesso!');
      return response.data; 
    } catch (error) {
      console.error('Erro ao adicionar etapa:', error);
      errorMessage('Não foi possível adicionar a etapa!');
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  const deletePackageStep = async (stepId:any) => {
    setLoading(true);
    try {
      await api.delete(`/step_packages/${stepId}/`);
      successMessage('Etapa removida com sucesso!');
    } catch (error) {
      console.error('Erro ao remover etapa:', error);
      errorMessage('Não foi possível remover a etapa!');
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  const getAllUnits = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/units/`);
      setLoading(false);
      return data; // Retorna os dados obtidos
    } catch (error) {
      console.log(error);
      setLoading(false);
      return []; // Retorna um array vazio em caso de erro
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
    addConstructionTeam,
    updateConstruction,
    updateConstructionMaterial,
    updateConstructionTeamMember,
    disableConstruction,
    disableConstructionMaterial,
    disableConstructionTeam,
    getAllConstructions,
    listConstructionsLocations,
    listConstructionsTeams,
    getAllConstructionsTeams,
    getAllConstructionsMaterials,
    getAllConstructionsTeamMembers,
    getAllConstructionsLocations,
    addConstructionLocal,
    listConstructionPackages,
    getAllConstructionPackages,
    disableConstructionPackage,
    addConstructionPackage,
    getAllDisciplines,
    getAllPackageStepsById,
    addPackageStep,
    deletePackageStep,
    getAllUnits,
    listConstructionServices,
    getAllConstructionServices,
    disableConstructionService,
    addConstructionService,
    getAllServiceStepsById,
    addServiceStep,
    deleteServiceStep,
    getServiceById

  };
};
