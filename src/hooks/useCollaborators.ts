/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { errorMessage, successMessage } from "../components/Messages";
import { Collaborator } from "../types";
import { api } from "../services/api";
import { UserContext } from "../contexts/UserContext";

const LIMIT = 10;

export const useCollaborators = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [collaboratorData, setCollaboratorData] = useState<Collaborator>({
    id: 0,
    name: "",
    type: 0,
    status: true,
    role: "",
    profile: "",
    cell_phone: "",
    phoneNumber: "",
    cpf: "",
    dateOfBirth: null,
    registration: "",
    email: "",
    admissionDate: null,
    dismissalDate: null,
    cep: "",
    state: "",
    city: "",
    neighborhood: "",
    publicPlace: "",
    complement: "",
    number: "",
    disabled: false,
    active: false,
  });

  const getCollaborator = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await api.get(`employees/${id}`);
      setCollaboratorData({
        ...collaboratorData,
        id: data.id,
        name: data.name,
        type: data.type,
        status: data.status,
        role: data.office.id,
        profile: data.profile.type,
        cell_phone: data.cell_phone,
        phoneNumber: data.phone,
        cpf: data.cpf,
        dateOfBirth: data.birth_date,
        registration: data.registration,
        email: data.email,
        admissionDate: data.admission_dt,
        dismissalDate: data.dismissal_dt,
        cep: data.cep,
        state: data.state,
        city: data.county,
        neighborhood: data.neighborhood,
        publicPlace: data.public_place,
        complement: data.complement,
        number: data.number,
        active: data.active,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getCollaboratorBySearch = async (id: string) => {
    try {
      const { data } = await api.get(`collaborators/${id}`);
      const allCollaborators = data.results.map(
        (collaborator: Collaborator) => ({
          id: collaborator.id,
          name: collaborator.name,
        })
      );
      setListCollaborators(allCollaborators);
    } catch (error) {
      console.log(error);
    }
  };

  const addCollaborator = async (collaboratorData: Collaborator) => {
    setLoading(true);
    try {
      await api.post(`/employees/`, {
        name: collaboratorData.name,
        office: collaboratorData.role,
        type: collaboratorData.profile,
        cell_phone: collaboratorData.cell_phone,
        phone: collaboratorData.phoneNumber,
        cpf: collaboratorData.cpf,
        birth_date: collaboratorData.dateOfBirth,
        registration: collaboratorData.registration,
        email: collaboratorData.email,
        admission_dt: collaboratorData.admissionDate,
        dismissal_dt: collaboratorData.dismissalDate,
        status: collaboratorData.status,
        cep: collaboratorData.cep,
        state: collaboratorData.state,
        county: collaboratorData.city,
        neighborhood: collaboratorData.neighborhood,
        public_place: collaboratorData.publicPlace,
        complement: collaboratorData.complement,
        number: collaboratorData.number,
      });
      successMessage("Colaborador adicionado com sucesso!");
      navigate("/colaboradores/listagem");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível adicionar colaborador!");
      setLoading(false);
    }
  };

  const updateCollaborator = async (collaboratorData: Collaborator) => {
    setLoading(true);
    try {
      await api.patch(`employees/${id}/`, {
        name: collaboratorData.name,
        office: collaboratorData.role,
        type: collaboratorData.profile,
        cell_phone: collaboratorData.cell_phone,
        phone: collaboratorData.phoneNumber,
        cpf: collaboratorData.cpf,
        birth_date: collaboratorData.dateOfBirth,
        registration: collaboratorData.registration,
        email: collaboratorData.email,
        admission_dt: collaboratorData.admissionDate,
        dismissal_dt: collaboratorData.dismissalDate,
        status: collaboratorData.status,
        cep: collaboratorData.cep,
        state: collaboratorData.state,
        county: collaboratorData.city,
        neighborhood: collaboratorData.neighborhood,
        public_place: collaboratorData.publicPlace,
        complement: collaboratorData.complement,
        number: collaboratorData.number,
        active: collaboratorData.active,
      });
      successMessage("Colaborador atualizado com sucesso!");
      navigate("/colaboradores/listagem");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível atualizar colaborador!");
      setLoading(false);
    }
  };

  const disableCollaborator = async (collaboratorId: number) => {
    setLoading(true);
    try {
      await api.delete(`employees/${collaboratorId}`);
      getAllCollaborators();
      successMessage("Colaborador apagado com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível apagar colaborador!");
      setLoading(false);
    }
  };

  const [listCollaboratorsHistory, setListCollaboratorsHistory] = useState<
    Collaborator[]
  >([]);

  const getAllCollaboratorsHistory = async (currentPage: number = 0) => {
    setLoading(true);
    const offset = (currentPage - 1) * LIMIT;
    try {
      const { data } = await api.get(
        `employees/${id}/progress/?disabled=false&limit=${LIMIT}&offset=${offset}`
      );
      setPagination({
        currentPage: currentPage === 0 ? 1 : currentPage,
        pageQuantity: Math.ceil(data.count / LIMIT),
      });
      const allCollaboratorsHistory = data.logs.map((result: any) => ({
        id: result.id,
        role: result.office,
        salary: result.salary,
        dismissalDate: result.resignation_dt,
      }));
      setListCollaboratorsHistory(allCollaboratorsHistory);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [listCollaboratorsRelatedWorks, setListCollaboratorsRelatedWorks] =
    useState<Collaborator[]>([]);

  const getAllCollaboratorsRelatedWorks = async (currentPage: number = 0) => {
    setLoading(true);
    const offset = (currentPage - 1) * LIMIT;
    try {
      const { data } = await api.get(
        `employees/${id}/related_works/?disabled=false&limit=${LIMIT}&offset=${offset}`
      );
      setPagination({
        currentPage: currentPage === 0 ? 1 : currentPage,
        pageQuantity: Math.ceil(data.count / LIMIT),
      });
      const getAllCollaboratorsRelatedWorks = data.constructions.map(
        (result: any) => ({
          id: result.id,
          constructionName: result.name_construction,
          status: result.status,
          responsible: result.responsible,
        })
      );
      setListCollaboratorsRelatedWorks(getAllCollaboratorsRelatedWorks);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [listCollaborators, setListCollaborators] = useState<Collaborator[]>(
    []
  );
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageQuantity: 1,
  });
  const handleChangePagination = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    getAllCollaborators(value);
  };

  const getAllCollaborators = async (currentPage: number = 0) => {
    setLoading(true);
    const offset = (currentPage - 1) * LIMIT;
    try {
      const { data } = await api.get(
        `companies/${user.company}/employees/?disabled=false&limit=${LIMIT}&offset=${offset}`
      );
      setPagination({
        currentPage: currentPage === 0 ? 1 : currentPage,
        pageQuantity: Math.ceil(data.count / LIMIT),
      });
      const allCollaborators = data.map((result: any) => ({
        id: result.id,
        active: result.active,
        avatar: result.avatar,
        name: result.full_name,
        cellPhone: result.cell_phone,
        role: result.office,
        profile: result.profile,
      }));
      setListCollaborators(allCollaborators);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getAllCollaboratorsWithoutPagination = async (
    currentPage: number = 0
  ) => {
    setLoading(true);
    try {
      const { data } = await api.get(`employees/`);

      const allCollaborators = data.results.map((result: any) => ({
        id: result.id,
        name: result.name,
        cell_phone: result.cell_phone,
        profile: result.profile.name,
        email: result.email,
        role: result.office.name,
        active: result.active,
      }));
      setListCollaborators(allCollaborators);
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
    collaboratorData,
    listCollaborators,
    listCollaboratorsHistory,
    listCollaboratorsRelatedWorks,
    getCollaborator,
    addCollaborator,
    updateCollaborator,
    disableCollaborator,
    getAllCollaborators,
    getAllCollaboratorsHistory,
    getAllCollaboratorsRelatedWorks,
    getCollaboratorBySearch,
    getAllCollaboratorsWithoutPagination,
  };
};
