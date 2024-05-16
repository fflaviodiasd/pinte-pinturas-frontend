/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */

import { useContext, useEffect, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { errorMessage, successMessage } from "../components/Messages";
import { api } from "../services/api";
import { Construction } from "../types";
import { UserContext } from "../contexts/UserContext";
import { MRT_ColumnDef } from "material-react-table";
import { LevelComponent } from "../components/Level";

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

type ConstructionData = {
  id: number;
  name: string;
  responsible: string;
  status: string;
  percentageCompleted: number;
  type: string;
  areas: string[];
  teamName: string;
  corporateName: string;
  team: string;
  measurement: string;
  package: string;
  number: string;
  checklistName: string;
};

interface Supervisor {
  id: number;
  name: string;
}

export const useConstructions = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [constructionData, setConstructionData] = useState<ConstructionData>({
    id: 0,
    name: "",
    responsible: "",
    status: "",
    percentageCompleted: 0,
    type: "",
    areas: [],
    teamName: "",
    corporateName: "",
    team: "",
    measurement: "",
    package: "",
    number: "",
    checklistName: "",
  });

  const [constructInfoData, setConstructInfoData] = useState<any>({});
  const [companiesSupervisorList, setCompaniesSupervisor] = useState<any>([]);

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
      // console.log('constructInfoDataAPI', data)
      setConstructInfoData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // const getCompaniesSupervisorList = async () => {
  //   setLoading(true);
  //   try {
  //     const { data } = await api.get(`companies/${user.company}/construction_supervisor`);
  //     setCompaniesSupervisor(data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // }

  const getCompaniesSupervisorList = async (): Promise<Supervisor[]> => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `companies/${user.company}/construction_supervisor`
      );
      setLoading(false);
      setCompaniesSupervisor(data);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      return [];
    }
  };

  const getChecklists = async (checklistId: any) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/checklists/${checklistId}/`);
      setConstructionData({
        ...constructionData,
        team: data.team.id,
        measurement: data.measurement.id,
        package: data.package.id,
        number: data.order,
        checklistName: data.name,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const [listConstructionsLocations, setListConstructionsLocations] = useState<
    any[]
  >([]);

  const addConstructionLocal = async (
    dynamicColumns: MRT_ColumnDef<any>[],
    list: any[]
  ) => {
    try {
      const newList = list.map((item: any) => {
        if (dynamicColumns && dynamicColumns.length > 0) {
          const levels = dynamicColumns
            .filter(
              (column) =>
                column.accessorKey && column.accessorKey.startsWith("nivel_")
            )
            .map((column) => {
              const name =
                item && item[column.accessorKey as keyof typeof item];
              const filterId =
                item.length > 0 &&
                item.ids?.filter((item: any) => item.name === name);
              return {
                id: filterId ? filterId[0].id : null,
                level: {
                  id: Number(column?.id?.slice(6, column.id?.length)),
                  name: column.header,
                },
                name: name || "",
              };
            });
          return {
            id: item.id ? item.id : null,
            code: item && item.code,
            levels: levels,
          };
        } else {
          errorMessage("Não foi possível adicionar área!");
        }
      });
      console.log({ areas: newList });

      await api.post(`constructions/${id}/areas/`, { areas: newList });
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

  const addCompaniesConstruction = async (constructionData: any) => {
    setLoading(true);
    console.log("constructionData:", constructionData);
    console.log("userInfo", user);
    try {
      await api.post(
        `companies/${user.company}/constructions/`,
        constructionData
      );
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

  const addDisciplinePackage = async (
    selectedPackageId: any,
    selectedChecklists: any
  ) => {
    setLoading(true);
    try {
      const response = await api.post("/packages/checklist_bulk/", {
        package_id: selectedPackageId,
        checklist_ids: selectedChecklists,
      });
      console.log("Pacote associado!", response);
      successMessage("Pacote associado com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Erro ao associar pacote!");
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

  const updateChecklist = async (values: any, checklistId: any) => {
    setLoading(true);
    try {
      await api.patch(`checklists/${checklistId}/`, {
        team: values.team,
        measurement: values.measurement,
        package: values.package,
        order: values.number,
        name: values.checklistName,
      });
      successMessage("Checklist atualizado com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível atualizar checklist!");
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

  const disableConstructionLocal = async (areaIds: number[]) => {
    setLoading(true);
    try {
      const requestBody = {
        area_ids: areaIds,
      };

      await api.delete(`/areas/bulk/`, { data: requestBody });
      successMessage("Local apagado com sucesso!");
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.detail ===
          "Não é possível deletar algumas áreas porque existem checklists associados a elas."
      ) {
        errorMessage("Não é possível remover um local que tenha checklist!");
      } else {
        errorMessage("Não foi possível apagar local!");
      }
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

  const getAllConstructionsLocations = async (
    dynamicColumns: MRT_ColumnDef<any>[]
  ) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/constructions/${id}/areas/`);
      console.log(data);
      const constructionLocalList = data.areas.map((result: any) => {
        // const levelNames: Record<string, string> = {};
        const levelNames: any = {};
        const levelNamesWithId: any = [];
        result.levels.forEach((level: any) => {
          const matchingColumn = dynamicColumns.find(
            (column) => column.accessorKey === `nivel_${level.level.id}`
          );
          if (matchingColumn) {
            levelNames[`nivel_${level.level.id}`] = level.name;
            // levelNamesWithId[`nivel_${level.level.id}`] = {
            //   id: level.id,
            //   name: level.name,
            // };
            levelNamesWithId.push({
              id: level.id,
              name: level.name,
            });
          }
        });
        return {
          id: result.id,
          code: result.code,
          checklist: result.checklist_count,
          ids: levelNamesWithId,
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

  type ConstructionItem = {
    id: number;
    active: boolean;
    corporateName: string;
    customer: string;
    supervisor: string;
    execution: number;
  };

  const [listConstructions, setListConstructions] = useState<
    ConstructionItem[]
  >([]);
  const getAllConstructions = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/companies/${user.company}/constructions/`
      );
      const constructionList: ConstructionItem[] = data.map(
        (construction: any) => ({
          id: construction.id,
          active: construction.active,
          corporateName: construction.corporate_name,
          customer: construction.customer.name || "",
          supervisor: construction.supervisor.name || "",
          execution: construction.execution,
        })
      );
      setListConstructions(constructionList);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [listConstructionServices, setListConstructionServices] = useState<
    ConstructionService[]
  >([]);

  const getAllConstructionServices = async () => {
    if (!id) {
      console.error("ID da construção não foi fornecido");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.get(`/constructions/${id}/services/`);
      setListConstructionServices(data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter serviços de construção:", error);
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

  const getAllServiceStepsById = async (serviceId: any) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/services/${serviceId}/steps/`);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Erro ao obter etapas do serviço:", error);
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
      console.error("Erro ao obter info do serviço:", error);
      setLoading(false);
      throw error;
    }
  };

  const addConstructionService = async (newService: any) => {
    setLoading(true);
    try {
      const response = await api.post(
        `/constructions/${id}/services/`,
        newService
      );
      setListConstructionServices((prevServices) => [
        ...prevServices,
        response.data,
      ]);
      successMessage("Serviço adicionado com sucesso!");
    } catch (error) {
      errorMessage("Erro ao adicionar o serviço!");
    } finally {
      setLoading(false);
    }
  };

  const addServiceStep = async (stepId: any, stepData: any) => {
    setLoading(true);
    try {
      const response = await api.post(`/services/${stepId}/steps/`, stepData);
      successMessage("Etapa adicionada com sucesso!");
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar etapa:", error);
      errorMessage("Não foi possível adicionar a etapa!");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteServiceStep = async (stepId: any) => {
    setLoading(true);
    try {
      await api.delete(`/step_services/${stepId}/`);
      successMessage("Etapa removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover etapa:", error);
      errorMessage("Não foi possível remover a etapa!");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const [listConstructionPackages, setListConstructionPackages] = useState<
    ConstructionPackage[]
  >([]);

  const getAllConstructionPackages = async () => {
    if (!id) {
      console.error("ID da construção não foi fornecido");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.get(`/constructions/${id}/packages/`);
      setListConstructionPackages(data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter pacotes de construção:", error);
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
      const response = await api.post(
        `/constructions/${id}/packages/`,
        newPackage
      );
      setListConstructionPackages((prevPackages) => [
        ...prevPackages,
        response.data,
      ]);
      successMessage("Pacote adicionado com sucesso!");
    } catch (error) {
      errorMessage("Erro ao adicionar o pacote!");
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
      console.error("Erro ao obter etapas do pacote:", error);
      setLoading(false);
      throw error;
    }
  };

  const getAllDisciplines = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/disciplines/`);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addPackageStep = async (packageId: any, stepData: any) => {
    setLoading(true);
    try {
      const response = await api.post(
        `/packages/${packageId}/steps/`,
        stepData
      );
      successMessage("Etapa adicionada com sucesso!");
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar etapa:", error);
      errorMessage("Não foi possível adicionar a etapa!");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deletePackageStep = async (stepId: any) => {
    setLoading(true);
    try {
      await api.delete(`/step_packages/${stepId}/`);
      successMessage("Etapa removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover etapa:", error);
      errorMessage("Não foi possível remover a etapa!");
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

  const [listConstructionsMeasurements, setListConstructionsMeasurements] =
    useState<any[]>([]);

  const getAllConstructionsMeasurements = async () => {
    if (!id) {
      console.error("ID da construção não foi fornecido");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.get(`/constructions/${id}/measurements/`);
      console.log("data:", data);
      setListConstructionsMeasurements(data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter serviços de construção:", error);
      setLoading(false);
    }
  };

  const disableConstructionMeasurements = async (measurementId: number) => {
    setLoading(true);
    try {
      const response = await api.delete(`/measurements/${measurementId}`);
      if (response.status === 204) {
        successMessage("Medição apagada com sucesso!");
      } else {
        console.log("Erro ao apagar medição!", response.data.detail);
        errorMessage("Erro ao apagar! " + response.data.detail);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addConstructionMeasurements = async (newmeasurement: any) => {
    setLoading(true);
    try {
      const response = await api.post(
        `/constructions/${id}/measurements/`,
        newmeasurement
      );
      setListConstructionPackages((prevMeasurement) => [
        ...prevMeasurement,
        response.data,
      ]);
      successMessage("Pacote adicionado com sucesso!");
    } catch (error) {
      errorMessage("Erro ao adicionar o pacote!");
    } finally {
      setLoading(false);
    }
  };

  const updateResponsible = async (
    responsibleId: number | null,
    isCustomer: boolean,
    isDeleteAction: boolean = false
  ) => {
    setLoading(true);
    const propertyName = isCustomer
      ? "responsible_customer_primary"
      : "responsible_primary";
    const updateData = {
      [propertyName]: isDeleteAction ? null : responsibleId,
    };

    try {
      await api.patch(`constructions/${id}/`, updateData);
      setLoading(false);
      if (isDeleteAction) {
        // successMessage("Responsável removido com sucesso!");
      } else {
        // successMessage("Responsável atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar/remover responsável:", error);
      setLoading(false);
      // errorMessage("Não foi possível atualizar/remover o responsável!");
    }
  };

  const updateResponsibleSecondary = async (
    responsibleSecondaryData: any,
    isCustomer: boolean
  ) => {
    setLoading(true);
    const propertyName = isCustomer
      ? "responsible_customer_secondary"
      : "responsible_secondary";
    const updateData = { [propertyName]: responsibleSecondaryData };

    try {
      await api.patch(`constructions/${id}/`, updateData);
      setLoading(false);
      successMessage("Responsável atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar/remover responsável:", error);
      setLoading(false);
      // errorMessage("Não foi possível atualizar/remover o responsável!");
    }
  };

  const [historySupervisor, setHistorySupervisor] = useState<any[]>([]);

  const getHistorySupervisor = async (id: string, isCustomer: boolean) => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `constructions/${id}/history/?responsible_primary=${!isCustomer}`
      );
      setHistorySupervisor(data);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
    setLoading(false);
  };

  return {
    loading,
    setLoading,
    constructionData,
    setConstructionData,
    listConstructions,
    listConstructionsMaterials,
    getConstruction,
    getChecklists,
    addConstruction,
    addConstructionMaterial,
    addConstructionTeam,
    addDisciplinePackage,
    updateConstruction,
    updateConstructionMaterial,
    updateChecklist,
    disableConstruction,
    disableConstructionMaterial,
    disableConstructionLocal,
    getAllConstructions,
    listConstructionsLocations,
    getAllConstructionsMaterials,
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
    getServiceById,
    getCompaniesSupervisorList,
    companiesSupervisorList,
    constructInfoData,
    addCompaniesConstruction,
    updateResponsible,
    updateResponsibleSecondary,
    getHistorySupervisor,
    historySupervisor,
    getAllConstructionsMeasurements,
    listConstructionsMeasurements,
    disableConstructionMeasurements,
    addConstructionMeasurements,
    setListConstructionsLocations,
  };
};
