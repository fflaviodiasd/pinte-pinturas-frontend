/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

import { ConstructionRegister } from "../types";
import { api } from "../services/api";

import { errorMessage, successMessage } from "../components/Messages";

type ConstructionItem = {
  id: number;
  active: boolean;
  corporate_name: string;
  customer: string;
  supervisor: string;
  execution: number;
};

export const useNewConstructions = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addConstruction = async (constructionData: ConstructionRegister) => {
    setLoading(true);
    try {
      await api.post(
        `companies/${user.company}/constructions/`,
        constructionData
      );
      successMessage("Obra adicionada com sucesso!");
      navigate("/obras/listagem");
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

  const disableConstruction = async (constructionId: number) => {
    setLoading(true);
    try {
      await api.delete(`constructions/${constructionId}`);
      getAllConstructions();
      successMessage("Obra desabilitada com sucesso!");
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível desabilitar obra!");
    } finally {
      setLoading(false);
    }
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
          corporate_name: construction.corporate_name,
          customer: construction.customer.name || "",
          supervisor: construction.supervisor.name || "",
          execution: construction.execution,
        })
      );
      setListConstructions(constructionList);
    } catch (error) {
      console.log(error);
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
    constructionRegister,
    getConstruction,
    addConstruction,
    updateConstruction,
    disableConstruction,
    listConstructions,
    getAllConstructions,
    listCompanyClients,
    getAllCompanyClients,
  };
};
