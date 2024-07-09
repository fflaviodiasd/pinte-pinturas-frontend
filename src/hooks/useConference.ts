/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */

import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import { UserContext } from "../contexts/UserContext";
interface ReportNotation {
  general: {
    ranking: number;
    total_checklist: number;
    total_packages: number;
    total_price_company: string;
    total_price_employee: string;
    teammates: string[];
  };
  details: {
    service_name: string;
    stpe_service_name: string;
    amount_execution: number;
    amount_media: number;
    price_unit: string;
    total_step: string;
    production_value: string;
    total_production_value: string;
  }[];
}

interface ReportChecklist {
  levels: Record<string, string>;
  checklist_name: string;
  inital_dt: string | null;
  finish_dt: string | null;
  value_total: string;
  value_production: string;
  package_name: string;
}

export const useConference = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [listConferenceData, setListConferenceData] = useState<any[]>([]);
  const [listMeasurementsReports, setListMeasurementsReports] = useState<any[]>(
    []
  );
  const [listEmployeesReports, setListEmployeesReports] = useState<any[]>([]);
  const [listTeamsReports, setListTeamsReports] = useState<any[]>([]);
  const [listProductionData, setListProductionData] = useState<any[]>([]);
  const [listReportsWithMeasurements, setListReportsWithMeasurements] =
    useState<any[]>([]);
  const [listReportsWithEmployees, setListReportsWithEmployees] = useState<
    any[]
  >([]);
  const [listGeneralReports, setListGeneralReports] = useState<any[]>([]);
  const [listReportsWithTeams, setListReportsWithTeams] = useState<any[]>([]);
  const [listReportsNotation, setListReportsNotation] =
    useState<ReportNotation>();
    const [listReportsNotationChecklist, setListReportsNotationChecklist] = useState<ReportChecklist[]>([]);

  // const getReportsNotation = async (
  //   disjunction: string = "service",
  //   employeeId: string
  // ) => {
  //   try {
  //     const { data } = await api.get(
  //       `/reports_notation/${employeeId}/general/?disjunction=${disjunction}`
  //     );
  //     console.log("Reports Notation data:", data);
  //     setListReportsNotation(data);
  //     setLoading(false);
  //     return data;
  //   } catch (error) {
  //     console.error("Erro ao obter relatórios de notação:", error);
  //     setLoading(false);
  //     return [];
  //   }
  // };

  const getReportsNotation = async (
    disjunction: string = "service",
    employeeId: string,
    params?: { [key: string]: any }
  ) => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("disjunction", disjunction);
  
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== "") {
            if (Array.isArray(value)) {
              value.forEach(val => queryParams.append(key, val));
            } else {
              queryParams.append(key, value);
            }
          }
        });
      }
  
      const { data } = await api.get(
        `/reports_notation/${employeeId}/general/?${queryParams.toString()}`
      );
      console.log("Reports Notation data:", data);
      setListReportsNotation(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Erro ao obter relatórios de notação:", error);
      setLoading(false);
      return [];
    }
  };
  

  
  const getReportsNotationChecklist = async (employeeId: string) => {
    try {
      const { data } = await api.get(
        `/reports_notation/${employeeId}/checklist`
      );
      console.log("Reports Checklist data:", data);
      setListReportsNotationChecklist(data); // Atualizado aqui
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Erro ao obter relatórios de checklist:", error);
      setLoading(false);
      return [];
    }
  };

  const getConferenceData = async (
    measurementId: string,
    disjunction: string
  ) => {
    if (!id) {
      console.error("ID da construção não foi fornecido");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.get(
        `/reports_conference/${id}/measurements/?measurement=${measurementId}&disjunction=${disjunction}`
      );
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
      const { data } = await api.post(
        `/reports_conference/production/filter/`,
        { construction: id }
      );
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
      const { data } = await api.post(
        `/reports_conference/production/filter/`,
        { construction: id, measurement: measurementId }
      );
      console.log("Employees data:", data);
      setListEmployeesReports(data.employees);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter funcionários:", error);
      setLoading(false);
    }
  };

  const fetchTeams = async (measurementId: number, employeeId: number) => {
    if (!id) {
      console.error("ID da construção não foi fornecido");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post(
        `/reports_conference/production/filter/`,
        {
          construction: id,
          measurement: measurementId,
          employee: employeeId,
        }
      );
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
      const { data } = await api.get(
        `/reports_conference/${id}/production/?measurement=${measurementId}`
      );
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

  const getReportsWithEmployee = async (
    measurementId: number,
    employeeId: number
  ) => {
    if (!id) {
      console.error("ID da construção não foi fornecido");
      return [];
    }

    setLoading(true);
    try {
      const { data } = await api.get(
        `/reports_conference/${id}/production/?measurement=${measurementId}&?employee=${employeeId}`
      );
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

  const getReportsWithTeams = async (
    measurementId: number,
    employeeId: any,
    teamId: number
  ) => {
    if (!id) {
      console.error("ID da construção não foi fornecido");
      return [];
    }

    setLoading(true);
    try {
      const { data } = await api.get(
        `/reports_conference/${id}/production/?measurement=${measurementId}&?employee=${employeeId}&?team=${teamId}`
      );
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

  const getGeneralReports = async () => {
    if (!id) {
      console.error("ID da construção não foi fornecido");
      return [];
    }

    setLoading(true);
    try {
      const { data } = await api.get(`/reports_conference/${id}/general/`);
      console.log("General reports data:", data);
      setListGeneralReports(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Erro ao obter relatórios gerais:", error);
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
    listReportsWithEmployees,
    getGeneralReports,
    getReportsWithTeams,
    listGeneralReports,
    getReportsNotation,
    listReportsNotation,
    getReportsNotationChecklist,
    listReportsNotationChecklist
  };
};
