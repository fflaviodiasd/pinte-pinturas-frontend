/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { errorMessage, successMessage } from "../components/Messages";
import { Construction } from "../types";
import { api } from "../services/api";

type ConstructionArea = {
  id: number;
  name: string;
  type: number;
};

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
    areas: [],
  });

  const getConstruction = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await api.get(`constructions/${id}`);
      setConstructionData({
        ...constructionData,
        id: data.id,
        name: data.name,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addConstructionArea = async (constructionId: string, name: string) => {
    try {
      await api.post(`constructions/${constructionId}/areas/`, {
        name,
        level: 1,
        type: 1,
      });
      successMessage("Área adicionada com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível adicionar área!");
      setLoading(false);
    }
  };

  const addConstruction = async (constructionData: Construction) => {
    setLoading(true);
    try {
      await api.post("constructions/", { name: constructionData.name });
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

  const [listConstructionAreas, setListConstructionAreas] = useState<
    ConstructionArea[]
  >([]);
  const getAllConstructionAreas = async (constructionId: string) => {
    try {
      const { data } = await api.get(`constructions/${constructionId}/areas/`);
      const allConstructionArea = data.map(
        (construction: ConstructionArea) => ({
          id: construction.id,
          name: construction.name,
          type: construction.type,
        })
      );
      setListConstructionAreas(allConstructionArea);
    } catch (error) {
      console.log(error);
    }
  };

  const [listConstructions, setListConstructions] = useState<Construction[]>(
    []
  );
  const getAllConstructions = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`constructions/`);
      const constructionList = data.results.map((result: any) => ({
        id: result.id,
        name: result.name,
        responsible: "",
        percentageCompleted: 0,
        status: "",
      }));
      setListConstructions(constructionList);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    loading,
    setLoading,
    constructionData,
    setConstructionData,
    listConstructions,
    getConstruction,
    addConstruction,
    updateConstruction,
    disableConstruction,
    getAllConstructions,
    listConstructionAreas,
    getAllConstructionAreas,
    addConstructionArea,
  };
};
