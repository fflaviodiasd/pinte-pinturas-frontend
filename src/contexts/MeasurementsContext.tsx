/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

// import { errorMessage } from "../components/Messages";

import { api } from "../services/api";
import { UserContext } from "./UserContext";

type MeasurementsContextProviderProps = {
  children: ReactNode;
};

type MeasurementsContextProps = {
  listConstructions: Construction[];
  getAllConstructions: () => Promise<void>;
  listPackages: Construction[];
  getAllPackages: () => Promise<void>;
  listDisciplines: Construction[];
  getAllDisciplines: () => Promise<void>;
  dataTable: DataItem[];
  getDataTable: (filters?: string) => Promise<void>;
  execution: Execution[];
  getExecution: (filters?: string) => Promise<void>;
  lessProfitable: ProfitableItem[];
  moreProfitable: ProfitableItem[];
  getProfitability: (filters?: string) => Promise<void>;
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
  setAllQueriesFilters: Dispatch<
    SetStateAction<{
      days: string;
      discipline: string;
      package: string;
      period: string;
      profitability: string;
    }>
  >;
};

type Construction = {
  name: string;
  id: number;
};

type ProfitableItemReturned = {
  name_package: string;
  avg_days: string;
  price_days: string;
  price_workmanship_days: string;
};

type ProfitableItem = {
  namePackage: string;
  avgDays: string;
  priceDays: string;
  priceWorkmanshipDays: string;
};

type Execution = {
  measurement: string;
  status: { liberado: number; finalizado: number };
};

type DataItemReturned = {
  discipline: string;
  name_package: string;
  avg_days: string;
  price_days: string;
  price_workmanship_days: string;
};

type DataItem = {
  discipline: string;
  namePackage: string;
  avgDays: string;
  priceDays: string;
  priceWorkmanshipDays: string;
};

const MeasurementsContext = createContext<MeasurementsContextProps>(
  {} as MeasurementsContextProps
);

const MeasurementsContextProvider = ({
  children,
}: MeasurementsContextProviderProps) => {
  const { user } = useContext(UserContext);

  const [selectedConstruction, setSelectedConstruction] = useState({
    id: 0,
    name: "",
  });

  useEffect(() => {
    if (selectedConstruction.id !== 0) {
      getDataTable();
      getExecution();
      getProfitability();
    }
  }, [selectedConstruction]);

  const [allQueriesFilters, setAllQueriesFilters] = useState({
    days: "",
    discipline: "",
    package: "",
    period: "",
    profitability: "",
  });

  useEffect(() => {
    const joinedQueries = Object.values(allQueriesFilters)
      .filter((query) => query)
      .join("&");
    // console.log("joinedQueries", joinedQueries);

    getProfitability(joinedQueries);
    getDataTable(joinedQueries);
  }, [allQueriesFilters]);

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
      // console.log("constructionList", constructionList);
      setListConstructions(constructionList);
    } catch (error) {
      console.log(error);
    }
  };

  const [listPackages, setListPackages] = useState<Construction[]>([]);
  const getAllPackages = async () => {
    try {
      const { data } = await api.get(
        `constructions/${selectedConstruction.id}/packages`
      );
      const packageList = data.map((construction: any) => ({
        id: construction.id,
        name: construction.name,
      }));
      setListPackages(packageList);
    } catch (error) {
      console.log(error);
    }
  };

  const [listDisciplines, setListDisciplines] = useState<Construction[]>([]);
  const getAllDisciplines = async () => {
    try {
      const { data } = await api.get(`/disciplines/`);
      const disciplineList = data.results.map((construction: any) => ({
        id: construction.id,
        name: construction.name,
      }));
      setListDisciplines(disciplineList);
    } catch (error) {
      console.log(error);
    }
  };

  const [dataTable, setDataTable] = useState<DataItem[]>([]);
  const getDataTable = async (filters?: string) => {
    let url = `/reports_measurements/${selectedConstruction.id}/data_table/`;
    if (filters) {
      url = `/reports_measurements/${selectedConstruction.id}/data_table/?${filters}`;
    }
    try {
      const { data } = await api.get(url);
      // console.log("Tabela", data);
      if (data.length) {
        const dataTableResponse = data.map((item: DataItemReturned) => ({
          discipline: item.discipline,
          namePackage: item.name_package,
          avgDays: item.avg_days,
          priceDays: item.price_days,
          priceWorkmanshipDays: item.price_workmanship_days,
        }));
        setDataTable(dataTableResponse);
      } else {
        setDataTable([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [execution, setExecution] = useState<Execution[]>([]);
  const getExecution = async (filters?: string) => {
    let url = `/reports_measurements/${selectedConstruction.id}/execution/`;
    if (filters) {
      url = `/reports_measurements/${selectedConstruction.id}/execution/?${filters}`;
    }
    try {
      const { data } = await api.get(url);
      // console.log("Execução", data);
      if (data.length) {
        setExecution(data);
      } else {
        setExecution([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [lessProfitable, setLessProfitable] = useState<ProfitableItem[]>([]);
  const [moreProfitable, setMoreProfitable] = useState<ProfitableItem[]>([]);
  const getProfitability = async (filters?: string) => {
    let url = `/reports_measurements/${selectedConstruction.id}/profitability/`;
    if (filters) {
      url = `/reports_measurements/${selectedConstruction.id}/profitability/?${filters}`;
    }
    try {
      const { data } = await api.get(url);

      // console.log("Menos rentáveis", data.less_profitable);
      if (data.less_profitable.length) {
        const lessProfitableResponse = data.less_profitable.map(
          (item: ProfitableItemReturned) => ({
            namePackage: item.name_package,
            avgDays: item.avg_days,
            priceDays: item.price_days,
            priceWorkmanshipDays: item.price_workmanship_days,
          })
        );
        setLessProfitable(lessProfitableResponse);
      } else {
        setLessProfitable([]);
      }

      // console.log("Mais rentáveis", data.more_profitable);
      if (data.more_profitable.length) {
        const moreProfitableResponse = data.more_profitable.map(
          (item: ProfitableItemReturned) => ({
            namePackage: item.name_package,
            avgDays: item.avg_days,
            priceDays: item.price_days,
            priceWorkmanshipDays: item.price_workmanship_days,
          })
        );
        setMoreProfitable(moreProfitableResponse);
      } else {
        setMoreProfitable([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MeasurementsContext.Provider
      value={{
        selectedConstruction,
        setSelectedConstruction,
        execution,
        getExecution,
        dataTable,
        getDataTable,
        lessProfitable,
        moreProfitable,
        getProfitability,
        listConstructions,
        getAllConstructions,
        listPackages,
        getAllPackages,
        listDisciplines,
        getAllDisciplines,
        setAllQueriesFilters,
      }}
    >
      {children}
    </MeasurementsContext.Provider>
  );
};

export { MeasurementsContext, MeasurementsContextProvider };
