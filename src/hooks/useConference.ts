/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */

import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import { UserContext } from "../contexts/UserContext";

export const useConference = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [listConferenceData, setListConferenceData] = useState<any[]>([]);
  const [listMeasurementsReports, setListMeasurementsReports] = useState<any[]>([]);
  const [listEmployeesReports, setListEmployeesReports] = useState<any[]>([]);
  const [listTeamsReports, setListTeamsReports] = useState<any[]>([]);
  const [listProductionData, setListProductionData] = useState<any[]>([]);
  const [listReportsWithMeasurements, setListReportsWithMeasurements] = useState<any[]>([]);
  const [listReportsWithEmployees, setListReportsWithEmployees] = useState<any[]>([]);
  const getConferenceData = async (measurementId: string, disjunction: string) => {
    if (!id) {
      console.error("ID da construção não foi fornecido");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.get(`/reports_conference/${id}/measurements/?measurement=${measurementId}&disjunction=${disjunction}`);
      console.log("data:", data);
      setListConferenceData(data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter serviços de construção:", error);
      setLoading(false);
    }
  };

  const fetchMeasurements = async () => {
    if (!id) {
      console.error("ID da construção não foi fornecido");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post(`/reports_conference/production/filter/`, { construction: id });
      console.log("Measurements data:", data);
      setListMeasurementsReports(data.measurement);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter medições:", error);
      setLoading(false);
    }
  };

  const fetchEmployees = async (measurementId: number) => {
    if (!id) {
      console.error("ID da construção não foi fornecido");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post(`/reports_conference/production/filter/`, { construction: id, measurement: measurementId });
      console.log("Employees data:", data);
      setListEmployeesReports(data.employees);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter funcionários:", error);
      setLoading(false);
    }
  };

  const fetchTeams = async (measurementId: string, employeeId: number) => {
    if (!id) {
      console.error("ID da construção não foi fornecido");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post(`/reports_conference/production/filter/`, {
        construction: id,
        measurement: measurementId,
        employee: employeeId
      });
      console.log("Teams data:", data);
      setListTeamsReports(data.teams); 
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter times:", error);
      setLoading(false);
    }
  };

  const getProductionData = async () => {
    if (!id) {
      console.error("ID da construção não foi fornecido");
      return [];
    }

    setLoading(true);
    try {
      const { data } = await api.get(`/reports_conference/${id}/production/`);
      console.log("Production data:", data);
      setListProductionData(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Erro ao obter dados de produção:", error);
      setLoading(false);
      return [];
    }
  };

  const getReportsWithMeasurement = async (measurementId: number) => {
    if (!id) {
      console.error("ID da construção não foi fornecido");
      return [];
    }

    setLoading(true);
    try {
      const { data } = await api.get(`/reports_conference/${id}/production/?measurement=${measurementId}`);
      console.log("Reports with Measurement data:", data);
      setListReportsWithMeasurements(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Erro ao obter relatórios com medições:", error);
      setLoading(false);
      return [];
    }
  };

  const getReportsWithEmployee = async (employeeId: number) => {
    if (!id) {
      console.error("ID da construção não foi fornecido");
      return [];
    }

    setLoading(true);
    try {
      const { data } = await api.get(`/reports_conference/${id}/production/?employee=${employeeId}`);
      console.log("Reports with Employee data:", data);
      setListReportsWithEmployees(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Erro ao obter relatórios com medições:", error);
      setLoading(false);
      return [];
    }
  };

  return {
    loading,
    setLoading,
    getConferenceData,
    listConferenceData,
    fetchMeasurements,
    fetchEmployees,
    fetchTeams,
    getProductionData,
    listMeasurementsReports,
    listEmployeesReports,
    listTeamsReports,
    listProductionData,
    getReportsWithMeasurement,
    listReportsWithMeasurements,
    getReportsWithEmployee,
    listReportsWithEmployees
  };
};
