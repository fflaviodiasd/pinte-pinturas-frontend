/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { errorMessage, successMessage } from "../components/Messages";
import { Collaborator } from "../types";
import { api } from "../services/api";

const LIMIT = 10;

export const useCollaborators = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [collaboratorData, setCollaboratorData] = useState<Collaborator>({
    id: 0,
    name: "",
    type: 0,
    status: true,
    role: "",
    profile: "",
    phone: "",
    cpf: "",
    dateOfBirth: "",
    registration: "",
    email: "",
    admissionDate: "",
    dismissalDate: "",
    cep: "",
    state: "",
    city: "",
    neighborhood: "",
    publicPlace: "",
    complement: "",
    number: "",
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
        role: data.office,
        profile: data.profile,
        phone: data.phone,
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
        cell_phone: collaboratorData.phone,
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
        cell_phone: collaboratorData.phone,
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
      const allCollaboratorsHistory = data.results.map((result: any) => ({
        id: result.id,
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
      const getAllCollaboratorsRelatedWorks = data.results.map(
        (result: any) => ({
          id: result.id,
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
        `employees/?disabled=false&limit=${LIMIT}&offset=${offset}`
      );
      setPagination({
        currentPage: currentPage === 0 ? 1 : currentPage,
        pageQuantity: Math.ceil(data.count / LIMIT),
      });
      const allCollaborators = data.results.map((result: any) => ({
        id: result.id,
        name: result.name,
        cellPhone: result.cell_phone,
        profile: result.profile,
        email: result.email,
        role: result.office,
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
  };
};
