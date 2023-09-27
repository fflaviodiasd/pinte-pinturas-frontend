/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { errorMessage, successMessage } from "../components/Messages";
import { Area } from "../types";
import { api } from "../services/api";

export const useAreas = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [areaData, setAreaData] = useState<Area>({
    id: 0,
    name: "",
    type: "",
    level: 0,
    childAreas: [],
  });

  const getArea = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await api.get(`areas/${id}`);
      setAreaData({
        id: data.id,
        name: data.name,
        type: data.type,
        level: data.level,
        childAreas: data.child_areas.map((area: any) => ({
          id: area.id,
          name: area.name,
          type: area.type,
          level: area.level,
        })),
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addArea = async (idArea: string, areaData: Area) => {
    setLoading(true);
    try {
      await api.post(`areas/${idArea}/paviments/`, {
        name: areaData.name,
        // type: areaData.type,
        type: 6,
      });
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
      navigate(-1);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível desabilitar área!");
      setLoading(false);
    }
  };

  const [listAreas, setListAreas] = useState<Area[]>([]);

  const getAllAreas = async () => {
    setLoading(true);

    try {
      const { data } = await api.get(`areas/`);
      // setListAreas()
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    loading,
    setLoading,
    areaData,
    setAreaData,
    listAreas,
    getArea,
    addArea,
    updateArea,
    disableArea,
    getAllAreas,
  };
};
