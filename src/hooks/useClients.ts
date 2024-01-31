/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { errorMessage, successMessage } from "../components/Messages";
import { Client } from "../types";
import { api } from "../services/api";

const LIMIT = 10;

export const useClients = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [clientData, setClientData] = useState<Client>({
    id: 0,
    name: "",
    status: true,
    responsible: "",
    tradingName: "",
    cnpj: "",
    phone: "",
    email: "",
    corporateName: "",
    municipalRegistration: "",
    stateRegistration: "",
    cep: "",
    state: "",
    city: "",
    neighborhood: "",
    publicPlace: "",
    complement: "",
    number: "",
  });

  const getClient = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await api.get(`customers/${id}`);
      setClientData({
        ...clientData,
        id: data.id,
        responsible: data.responsible,
        name: data.name,
        status: data.status,
        tradingName: data.fantasy_name,
        cnpj: data.cnpj,
        phone: data.phone_number,
        email: data.email,
        corporateName: data.corporate_name,
        municipalRegistration: data.municipal_registration,
        stateRegistration: data.state_registration,
        cep: data.cep,
        state: data.state,
        city: data.city,
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

  const getClientBySearch = async (id: string) => {
    try {
      const { data } = await api.get(`customers/${id}`);
      const allClients = data.results.map((client: Client) => ({
        id: client.id,
        name: client.name,
      }));
      setListClients(allClients);
    } catch (error) {
      console.log(error);
    }
  };

  const addClient = async (clientData: Client) => {
    setLoading(true);
    try {
      await api.post(`/customers/`, {
        corporate_name: clientData.corporateName,
        municipal_registration: clientData.municipalRegistration,
        cnpj: clientData.cnpj,
        email: clientData.email,
        responsible: clientData.responsible,
        fantasy_name: clientData.tradingName,
        phone_number: clientData.phone,
        stateRegistration: clientData.stateRegistration,
        cep: clientData.cep,
        state: clientData.state,
        city: clientData.city,
        neighborhood: clientData.neighborhood,
        public_place: clientData.publicPlace,
        complement: clientData.complement,
        number: clientData.number,
        //description: areaData.description,
      });
      successMessage("Cliente adicionado com sucesso!");
      setLoading(false);
      navigate("/clientes/listagem");
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível adicionar cliente!");
      setLoading(false);
    }
  };

  const updateClient = async (clientData: Client) => {
    setLoading(true);
    try {
      await api.patch(`customers/${id}`, clientData);
      successMessage("Cliente atualizado com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível atualizar cliente!");
      setLoading(false);
    }
  };

  const disableClient = async (clientId: number) => {
    setLoading(true);
    try {
      await api.delete(`customers/${clientId}`);
      getAllClients();
      successMessage("Cliente desabilitado com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível desabilitar cliente!");
      setLoading(false);
    }
  };

  const [listClientsRelatedWorks, setListClientsRelatedWorks] = useState<
    Client[]
  >([]);

  const getAllClientsRelatedWorks = async (currentPage: number = 0) => {
    setLoading(true);
    const offset = (currentPage - 1) * LIMIT;
    try {
      const { data } = await api.get(
        `customers/{id}/related_works/?disabled=false&limit=${LIMIT}&offset=${offset}`
      );
      setPagination({
        currentPage: currentPage === 0 ? 1 : currentPage,
        pageQuantity: Math.ceil(data.count / LIMIT),
      });
      const getAllClientsRelatedWorks = data.constructions.map(
        (result: any) => ({
          id: result.id,
        })
      );
      setListClientsRelatedWorks(getAllClientsRelatedWorks);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [listClients, setListClients] = useState<Client[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageQuantity: 1,
  });
  const handleChangePagination = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    getAllClients(value);
  };

  const getAllClients = async (currentPage: number = 0) => {
    setLoading(true);
    const offset = (currentPage - 1) * LIMIT;
    try {
      const { data } = await api.get(
        `customers/?disabled=false&limit=${LIMIT}&offset=${offset}`
      );
      setPagination({
        currentPage: currentPage === 0 ? 1 : currentPage,
        pageQuantity: Math.ceil(data.count / LIMIT),
      });
      const allClients = data.results.map((result: any) => ({
        id: result.id,
        tradingName: result.fantasy_name,
        responsible: result.responsible,
        cnpj: result.cnpj,
        email: result.email,
        phoneNumber: result.phone_number,
      }));
      setListClients(allClients);
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
    clientData,
    listClients,
    listClientsRelatedWorks,
    getClient,
    addClient,
    updateClient,
    disableClient,
    getAllClients,
    getAllClientsRelatedWorks,
    getClientBySearch,
  };
};
