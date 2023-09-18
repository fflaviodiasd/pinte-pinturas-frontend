/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { errorMessage, successMessage } from "../components/Messages";
import { Area } from "../types";
import { api } from "../services/api";

const LIMIT = 10;

export const useAreas = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [areaData, setAreaData] = useState<Area>({
    id: 1,
    name: "",
    type: "",
    level: 0,
    childAreas: [
      { id: 1, name: "Torre 01", type: "Torre", level: 1 },
      { id: 2, name: "Torre 02", type: "Torre", level: 1 },
    ],
  });

  const getArea = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await api.get(`areas/${id}`);
      // setAreaData({});
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getAreaBySearch = async (id: string) => {
    try {
      const { data } = await api.get(`areas/${id}`);
      const allAreas = data.results.map((area: Area) => ({
        id: area.id,
        name: area.name,
      }));
      setListAreas(allAreas);
    } catch (error) {
      console.log(error);
    }
  };

  const addArea = async (areaData: Area) => {
    setLoading(true);
    try {
      await api.post("areas", areaData);
      successMessage("Área adicionada com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível adicionar área!");
      setLoading(false);
    }
  };

  const updateArea = async (areaData: Area) => {
    setLoading(true);
    try {
      await api.patch(`areas/${id}`, areaData);
      successMessage("Área atualizada com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível atualizar área!");
      setLoading(false);
    }
  };

  const disableArea = async (areaId: number) => {
    setLoading(true);
    try {
      await api.delete(`areas/${areaId}`);
      getAllAreas();
      successMessage("Área desabilitada com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível desabilitar área!");
      setLoading(false);
    }
  };

  const [listAreas, setListAreas] = useState<Area[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageQuantity: 1,
  });
  const handleChangePagination = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    getAllAreas(value);
  };

  const getAllAreas = async (currentPage: number = 0) => {
    setLoading(true);
    const offset = (currentPage - 1) * LIMIT;
    try {
      const { data } = await api.get(
        `areas/?disabled=false&limit=${LIMIT}&offset=${offset}`
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
    areaData,
    setAreaData,
    listAreas,
    getArea,
    addArea,
    updateArea,
    disableArea,
    getAllAreas,
    getAreaBySearch,
  };
};
