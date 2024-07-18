/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MRT_ColumnDef } from "material-react-table";

import { UserContext } from "../contexts/UserContext";

import { Construction, ConstructionData, ConstructionRegister } from "../types";
import { api } from "../services/api";

import { errorMessage, successMessage } from "../components/Messages";

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

// type ConstructionData = {
//   id: number;
//   name: string;
//   responsible: string;
//   status: string;
//   percentageCompleted: number;
//   type: string;
//   areas: string[];
//   teamName: string;
//   corporate_name: string;
//   team: string;
//   measurement: string;
//   package: string;
//   number: string;
//   checklistName: string;
// };

interface Supervisor {
  id: number;
  name: string;
}

export const useConstructions = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [constructionData, setConstructionData] = useState<ConstructionData>({
    id: 0,
    name: "",
    responsible: "",
    status: "",
    percentageCompleted: 0,
    type: "",
    areas: [],
    teamName: "",
    corporate_name: "",
    team: "",
    measurement: "",
    package: "",
    number: "",
    checklistName: "",
    customer: "",
    deleted: false,

    fantasy_name: "",
    cnpj: "",
    public_place: "",

    neighborhood: "",
    city: "",
    cep: "",
    complement: "",
    state: "",
    phone: "",
    cno: "",
    email: "",
    municipal_registration: "",
    state_registration: "",
    active: true,
  });

  const [constructInfoData, setConstructInfoData] = useState<any>({});
  const [companiesSupervisorList, setCompaniesSupervisor] = useState<any>([]);
  const [customersSupervisorList, setCustomersSupervisor] = useState<any>([]);

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

  const getCustomersSupervisorList = async (
    constructionId: string
  ): Promise<Supervisor[]> => {
    setLoading(true);
    try {
      // Primeiro, obtenha os detalhes da construção para obter o ID do cliente
      const constructionResponse = await api.get(
        `/constructions/${constructionId}/`
      );
      const customerId = constructionResponse.data.customer.id;
      console.log("ID do cliente:", customerId);
      console.log(">>>", constructionResponse.data);

      // Agora, obtenha a lista de encarregados do cliente
      const { data } = await api.get(
        `/customers/${customerId}/construction_supervisor/`
      );
      console.log("Supervisor do cliente:", data);
      setLoading(false);
      setCustomersSupervisor(data);
      console.log(customersSupervisorList);
      return data;
    } catch (error) {
      console.error(error);
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
            .map((column, index) => {
              const name =
                item && item[column.accessorKey as keyof typeof item];
              const filterId = item.ids && item.ids[index];

              console.log("ID de filterId:", filterId ? filterId.id : null);

              return {
                id: filterId ? filterId.id : null,
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
          errorMessage("Não foi possível atualizar área!");
        }
      });

      console.log({ areas: newList });

      await api.post(`constructions/${id}/areas/`, { areas: newList });
      successMessage("Área atualizada com sucesso!");
      setLoading(false);
      getAllConstructionsLocations(dynamicColumns);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível atualizar área!");
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
      successMessage("Obra apagada com sucesso!");
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

  const [listEmployeesMaterials, setListEmployeesMaterials] = useState<any[]>(
    []
  );
  const getAllEmployeesMaterials = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`constructions/${id}/employees`);
      const constructionMaterialsList = data.map((result: any) => ({
        id: result.id,
        material: result.name,
        name: result.name,
        group: result.total_company,
        productionBatch: result.total_workmanship,
      }));
      console.log(constructionMaterialsList);
      setListEmployeesMaterials(constructionMaterialsList);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // const [listConstructionsTeams, setListConstructionsTeams] = useState<any[]>(
  //   []
  // );

  // const getAllConstructionsTeams = async () => {
  //   setLoading(true);
  //   try {
  //     const { data } = await api.get(`constructions/${id}/teams`);
  //     const constructionTeamsList = data.map((result: any) => ({
  //       id: result.id,
  //       active: result.active,
  //       teams: result.name,
  //       collaborators: result.member_count,
  //     }));
  //     console.log(data);
  //     setListConstructionsTeams(constructionTeamsList);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  // const [listConstructionsTeamMembers, setListConstructionsTeamMembers] =
  //   useState<any[]>([]);
  // const getAllConstructionsTeamMembers = async (teamId: any) => {
  //   setLoading(true);
  //   try {
  //     const { data } = await api.get(`teams/${teamId}`);
  //     const constructionTeamMembersList = data.members.map((result: any) => ({
  //       id: result.id,
  //       active: result.active,
  //       avatar: result.avatar,
  //       name: result.name,
  //       role: result.office,
  //       profile: result.profile,
  //       cellPhone: result.cell_phone,
  //     }));
  //     // setListConstructionsTeamMembers(constructionTeamMembersList);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  const getAllConstructionsLocations = async (
    dynamicColumns: MRT_ColumnDef<any>[]
  ) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/constructions/${id}/areas/`);
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
            // levelNames[`nivel_${level.level.id}`] = {
            //   id: level.id,
            //   name: level.name,
            // };

            levelNamesWithId.push({
              id: level.id || null,
              id_ref: level.level.id,
              name: level.name,
            });
          }
        });
        return {
          id: result.id,
          code: result.code,
          checklist: result.checklist_count,
          ids: levelNamesWithId,
          lastLevelIsBlank: result.last_level_is_blank,
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
    corporate_name: string;
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
      let query;
      if (user.type === 2 || user.type === 3) {
        query = `/companies/${user.company}/constructions/`;
      } else if (user.type === 7) {
        query = `customers/${user.profile_id}/related_works/`;
      } else {
        query = `employees/${user.profile_id}/related_works/`;
      }
      const { data } = await api.get(query);

      console.log(data);

      const constructionList: ConstructionItem[] = data.map(
        (construction: any) => ({
          id: construction.id,
          active: construction.active,
          corporate_name: construction.fantasy_name,
          customer: construction.name || "",
          supervisor: construction.supervisor || "",
          execution: construction.execution || 0,
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

  const editConstructionPackage = async (
    packageId: number,
    data: { name: string; order?: number; discipline?: string }
  ) => {
    console.log("Data:", data);
    setLoading(true);
    try {
      const response = await api.patch(`/packages/${packageId}/`, data);
      if (response.status === 200) {
        successMessage("Pacote editado com sucesso!");
      } else {
        console.log("Erro ao editar pacote!", response.data.detail);
        errorMessage("Erro ao editar! " + response.data.detail);
      }
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

  const editConstructionMeasurement = async (
    measurementId: number,
    name: string
  ) => {
    setLoading(true);
    try {
      const response = await api.patch(`/measurements/${measurementId}/`, {
        name,
      });
      if (response.status === 200) {
        successMessage("Medição editada com sucesso!");
      } else {
        console.log("Erro ao editar medição!", response.data.detail);
        errorMessage("Erro ao editar! " + response.data.detail);
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

  // Dados da Construção
  const [constructionRegister, setConstructionRegister] =
    useState<ConstructionRegister>({
      id: 0,
      fantasy_name: "",
      customer: "",
      phone: "",
      corporate_name: "",
      cnpj: "",
      cno: "",
      email: "",
      municipal_registration: "",
      state_registration: "",
      active: true,

      cep: "",
      state: "",
      county: "",
      neighborhood: "",
      public_place: "",
      complement: "",
      number: "",
    });

  const getConstruction = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await api.get(`constructions/${id}`);
      setConstructionRegister({
        id: data.id,
        corporate_name: data.corporate_name,
        fantasy_name: data.fantasy_name,
        customer: data.customer.id,
        phone: data.phone,
        cnpj: data.cnpj,
        cno: data.cno,
        email: data.email,
        municipal_registration: data.municipal_registration,
        state_registration: data.state_registration,
        active: data.active,

        cep: data.cep,
        state: data.state,
        county: data.county,
        neighborhood: data.neighborhood,
        public_place: data.public_place,
        complement: data.complement,
        number: data.number,
      });
      setConstructInfoData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addCompaniesConstruction = async (
    constructionData: ConstructionRegister
  ) => {
    setLoading(true);
    console.log("constructionData para backend", constructionData);
    // console.log("userInfo", user);
    try {
      await api.post(
        `companies/${user.company}/constructions/`,
        constructionData
      );
      successMessage("Obra adicionada com sucesso!");
      navigate("/obras");
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível adicionar obra!");
    } finally {
      setLoading(false);
    }
  };

  const updateConstruction = async (constructionData: ConstructionRegister) => {
    setLoading(true);
    console.log("getConstruction", constructionData.public_place);
    try {
      await api.patch(`constructions/${id}/`, constructionData);
      successMessage("Obra atualizada com sucesso!");
      navigate("/obras/listagem");
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível atualizar obra!");
    } finally {
      setLoading(false);
    }
  };

  // Clientes de uma empresa
  type CompanyClientItem = {
    id: number;
    name: string;
  };

  const [listCompanyClients, setListCompanyClients] = useState<
    CompanyClientItem[]
  >([]);

  const getAllCompanyClients = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/companies/${user.company}/select_customer/`
      );
      const companyClients = data.map((result: any) => ({
        id: result.id,
        name: result.name,
      }));
      setListCompanyClients(companyClients);
    } catch (error) {
      console.log(error);
    } finally {
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
    listEmployeesMaterials,
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
    getAllEmployeesMaterials,
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

    listCompanyClients,
    getAllCompanyClients,
    constructionRegister,
    editConstructionMeasurement,
    editConstructionPackage,
    getCustomersSupervisorList,
    customersSupervisorList,
  };
};
