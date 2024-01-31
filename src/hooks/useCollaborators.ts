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
        role: data.role,
        profile: data.profile,
        phone: data.phone,
        cpf: data.cpf,
        dateOfBirth: data.dateOfBirth,
        registration: data.registration,
        email: data.email,
        admissionDate: data.admissionDate,
        dismissalDate: data.dismissalDate,
      });
      console.log("dados", data);
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
        email: collaboratorData.email,
        type: collaboratorData.type,
      });
      successMessage("Colaborador adicionado com sucesso!");
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
      await api.patch(`employees/${id}`, collaboratorData);
      successMessage("Colaborador atualizado com sucesso!");
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
      successMessage("Colaborador desabilitado com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível desabilitar colaborador!");
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
        `employees/id/progress/?disabled=false&limit=${LIMIT}&offset=${offset}`
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
    getCollaborator,
    addCollaborator,
    updateCollaborator,
    disableCollaborator,
    getAllCollaborators,
    getAllCollaboratorsHistory,
    getCollaboratorBySearch,
  };
};
