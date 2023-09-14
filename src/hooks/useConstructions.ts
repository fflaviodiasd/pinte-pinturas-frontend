/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { errorMessage, successMessage } from "../components/Messages";
import { Construction } from "../types";
import { api } from "../services/api";

const LIMIT = 10;

export const useConstructions = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [constructionData, setConstructionData] = useState<Construction>({
    id: 0,
    name: "",
    responsible: "",
    status: "",
    percentageCompleted: 0,
    type: "",
    areas: [
      { id: 1, name: "Torre 01", type: "Torre", level: 1 },
      { id: 2, name: "Torre 02", type: "Torre", level: 1 },
    ],
  });

  const getConstruction = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await api.get(`constructions/${id}`);
      // setConstructionData({});
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getConstructionBySearch = async (id: string) => {
    try {
      const { data } = await api.get(`constructions/${id}`);
      const allConstructions = data.results.map(
        (construction: Construction) => ({
          id: construction.id,
          name: construction.name,
        })
      );
      setListConstructions(allConstructions);
    } catch (error) {
      console.log(error);
    }
  };

  const addConstruction = async (constructionData: Construction) => {
    setLoading(true);
    try {
      await api.post("constructions", constructionData);
      successMessage("Obra adicionada com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível adicionar obra!");
      setLoading(false);
    }
  };

  const updateConstruction = async (constructionData: Construction) => {
    setLoading(true);
    try {
      await api.patch(`constructions/${id}`, constructionData);
      successMessage("Obra atualizada com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível atualizar obra!");
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

  const [listConstructions, setListConstructions] = useState<Construction[]>(
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
    getAllConstructions(value);
  };

  const getAllConstructions = async (currentPage: number = 0) => {
    setLoading(true);
    const offset = (currentPage - 1) * LIMIT;
    try {
      const { data } = await api.get(
        `constructions/?disabled=false&limit=${LIMIT}&offset=${offset}`
      );
      setPagination({
        currentPage: currentPage === 0 ? 1 : currentPage,
        pageQuantity: Math.ceil(data.count / LIMIT),
      });
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
    constructionData,
    setConstructionData,
    listConstructions,
    getConstruction,
    addConstruction,
    updateConstruction,
    disableConstruction,
    getAllConstructions,
    getConstructionBySearch,
  };
};
