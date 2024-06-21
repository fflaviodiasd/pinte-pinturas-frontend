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
  getReportsWithEmployee: (employeeId: number) => Promise<any>;
  fetchEmployees: (measurementId: number) => Promise<void>;
  listEmployeesReports: any[];
  getReportsWithTeams: (employeeId: any, teamId: number) => Promise<any>;
  fetchTeams: (measurementId: string, employeeId: number) => Promise<void>;
  listTeamsReports: any[];
  getReportsWithMeasurement: (measurementId: number) => Promise<any>;
  fetchMeasurements: () => Promise<void>;
  listMeasurementsReports: any[];
};

type Construction = {
  name: string;
  id: number;
};

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
        name: construction.corporate_name,
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
  const getReportsWithEmployee = async (employeeId: number) => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/reports_conference/${selectedConstruction.id}/production/?employee=${employeeId}`
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
  const getReportsWithTeams = async (employeeId: any, teamId: number) => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/reports_conference/${selectedConstruction.id}/production/?employee=${employeeId}&?team=${teamId}`
      );
      return data;
    } catch (error) {
      console.error("Erro ao obter relatórios com medições:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchTeams = async (measurementId: string, employeeId: number) => {
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
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

export { AppointmentsContext, AppointmentsContextProvider };
