/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { UserContext } from "./UserContext";
import { api } from "../services/api";

import { errorMessage, successMessage } from "../components/Messages";

type AppointmentsContextProviderProps = {
  children: ReactNode;
};

type AppointmentsContextProps = {
  listConstructions: Construction[];
  getAllConstructions: () => Promise<void>;
  selectedConstruction: {
    id: number;
    name: string;
  };
  setSelectedConstruction: Dispatch<
    SetStateAction<{
      id: number;
      name: string;
    }>
  >;
  getConferenceData: (
    measurementId: string,
    disjunction: string
  ) => Promise<void>;
  listConferenceData: any[];
  addMeasurements: (newMeasurement: any) => Promise<void>;
  getAllMeasurements: () => Promise<void>;
  listMeasurements: any[];
  listGeneralReports: any[];
  getGeneralReports: () => Promise<any>;
  getProductionData: () => Promise<any>;
  getReportsWithEmployee: (
    measurementId: number,
    employeeId: number
  ) => Promise<any>;
  fetchEmployees: (measurementId: number) => Promise<void>;
  listEmployeesReports: any[];
  getReportsWithTeams: (
    measurementId: number,
    employeeId: any,
    teamId: number
  ) => Promise<any>;
  fetchTeams: (measurementId: number, employeeId: number) => Promise<void>;
  listTeamsReports: any[];
  getReportsWithMeasurement: (measurementId: number) => Promise<any>;
  fetchMeasurements: () => Promise<void>;
  listMeasurementsReports: any[];
  listReportsNotation: ReportNotation | undefined;
  getReportsNotation: (
    disjunction: string | undefined,
    employeeId: string
  ) => Promise<any>;
};

type Construction = {
  name: string;
  id: number;
};

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

const AppointmentsContext = createContext<AppointmentsContextProps>(
  {} as AppointmentsContextProps
);

const AppointmentsContextProvider = ({
  children,
}: AppointmentsContextProviderProps) => {
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [selectedConstruction, setSelectedConstruction] = useState({
    id: 0,
    name: "",
  });

  const [listConstructions, setListConstructions] = useState<Construction[]>(
    []
  );
  const getAllConstructions = async () => {
    try {
      const { data } = await api.get(
        `/companies/${user.company}/constructions/`
      );
      const constructionList = data.map((construction: any) => ({
        id: construction.id,
        name: construction.fantasy_name,
      }));
      setListConstructions(constructionList);
    } catch (error) {
      console.log(error);
    }
  };

  const [listConferenceData, setListConferenceData] = useState<any[]>([]);
  const getConferenceData = async (
    measurementId: string,
    disjunction: string
  ) => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/reports_conference/${selectedConstruction.id}/measurements/?measurement=${measurementId}&disjunction=${disjunction}`
      );
      setListConferenceData(data);
    } catch (error) {
      console.error("Erro ao obter serviços de construção:", error);
    } finally {
      setLoading(false);
    }
  };

  const [listMeasurements, setListMeasurements] = useState<any[]>([]);

  const getAllMeasurements = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/constructions/${selectedConstruction.id}/measurements/`
      );
      setListMeasurements(data);
    } catch (error) {
      console.error("Erro ao obter serviços de construção:", error);
    } finally {
      setLoading(false);
    }
  };

  const addMeasurements = async (newNeasurement: any) => {
    setLoading(true);
    try {
      await api.post(
        `/constructions/${selectedConstruction.id}/measurements/`,
        newNeasurement
      );
      successMessage("Pacote adicionado com sucesso!");
    } catch (error) {
      errorMessage("Erro ao adicionar o pacote!");
    } finally {
      setLoading(false);
    }
  };

  const [listEmployeesReports, setListEmployeesReports] = useState<any[]>([]);
  const getReportsWithEmployee = async (
    measurementId: number,
    employeeId: number
  ) => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/reports_conference/${selectedConstruction.id}/production/?measurement=${measurementId}&?employee=${employeeId}`
      );
      return data;
    } catch (error) {
      console.error("Erro ao obter relatórios com medições:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchEmployees = async (measurementId: number) => {
    setLoading(true);
    try {
      const { data } = await api.post(
        `/reports_conference/production/filter/`,
        { construction: selectedConstruction.id, measurement: measurementId }
      );
      setListEmployeesReports(data.employees);
    } catch (error) {
      console.error("Erro ao obter funcionários:", error);
    } finally {
      setLoading(false);
    }
  };

  const [listTeamsReports, setListTeamsReports] = useState<any[]>([]);
  const getReportsWithTeams = async (
    measurementId: number,
    employeeId: any,
    teamId: number
  ) => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/reports_conference/${selectedConstruction.id}/production/?measurement=${measurementId}&?employee=${employeeId}&?team=${teamId}`
      );
      return data;
    } catch (error) {
      console.error("Erro ao obter relatórios com medições:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchTeams = async (measurementId: number, employeeId: number) => {
    setLoading(true);
    try {
      const { data } = await api.post(
        `/reports_conference/production/filter/`,
        {
          construction: selectedConstruction.id,
          measurement: measurementId,
          employee: employeeId,
        }
      );
      setListTeamsReports(data.teams);
    } catch (error) {
      console.error("Erro ao obter times:", error);
    } finally {
      setLoading(false);
    }
  };

  const [listMeasurementsReports, setListMeasurementsReports] = useState<any[]>(
    []
  );
  const getReportsWithMeasurement = async (measurementId: number) => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/reports_conference/${selectedConstruction.id}/production/?measurement=${measurementId}`
      );
      return data;
    } catch (error) {
      console.error("Erro ao obter relatórios com medições:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchMeasurements = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(
        `/reports_conference/production/filter/`,
        { construction: selectedConstruction.id }
      );
      setListMeasurementsReports(data.measurement);
    } catch (error) {
      console.error("Erro ao obter medições:", error);
    } finally {
      setLoading(false);
    }
  };

  const getProductionData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/reports_conference/${selectedConstruction.id}/production/`
      );
      return data;
    } catch (error) {
      console.error("Erro ao obter dados de produção:", error);
    } finally {
      setLoading(false);
    }
  };

  const [listGeneralReports, setListGeneralReports] = useState<any[]>([]);
  const getGeneralReports = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/reports_conference/${selectedConstruction.id}/general/`
      );
      setListGeneralReports(data);
      return data;
    } catch (error) {
      console.error("Erro ao obter relatórios gerais:", error);
    } finally {
      setLoading(false);
    }
  };

  const [listReportsNotation, setListReportsNotation] =
    useState<ReportNotation>();
  const getReportsNotation = async (
    disjunction: string = "service",
    employeeId: string
  ) => {
    try {
      const { data } = await api.get(
        `/reports_notation/${employeeId}/general/?disjunction=${disjunction}`
      );

      setListReportsNotation(data);
      return data;
    } catch (error) {
      console.error("Erro ao obter relatórios de notação:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppointmentsContext.Provider
      value={{
        selectedConstruction,
        setSelectedConstruction,
        listConstructions,
        getAllConstructions,
        getConferenceData,
        listConferenceData,
        listMeasurements,
        getAllMeasurements,
        addMeasurements,
        getReportsWithEmployee,
        listEmployeesReports,
        fetchEmployees,
        getReportsWithMeasurement,
        listMeasurementsReports,
        fetchMeasurements,
        getReportsWithTeams,
        listTeamsReports,
        fetchTeams,
        getProductionData,
        getGeneralReports,
        listGeneralReports,
        listReportsNotation,
        getReportsNotation,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

export { AppointmentsContext, AppointmentsContextProvider };
