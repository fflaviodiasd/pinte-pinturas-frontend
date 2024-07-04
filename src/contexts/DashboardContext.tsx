/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// import { errorMessage } from "../components/Messages";

import { api } from "../services/api";

import { UserContext } from "./UserContext";
import { KEY_DASHBOARD_CONSTRUCTION_OPTIONS } from "../utils/consts";

type DashboardContextProviderProps = {
  children: ReactNode;
};

type Item = {
  name: string;
  id: number;
};

type StatusChecklist = {
  liberado: number;
  finalizado: number;
  iniciado: number;
  entregue: number;
  nao_liberado: number;
  entregue_porcentagem: number;
  finalizado_porcentagem: number;
  iniciado_porcentagem: number;
  liberado_porcentagem: number;
  nao_liberado_porcentagem: number;
  total: number;
};

type Execution = {
  measurement: string;
  status: {
    liberado: number;
    finalizado: number;
    iniciado: number;
    entregue: number;
    nao_liberado: number;
  };
}[];

type ConstructionUpdate = {
  id: number;
  status: string;
  area: string;
  checklist: string;
  team: string;
  time: string;
  responsible: string;
}[];

type Interaction = {
  responsible_action: string;
  status: {
    entregue: number;
    finalizada: number;
    iniciada: number;
    liberada: number;
  };
};

interface Levels {
  [key: string]: string;
}

type GeneralDataTable = {
  id: number;
  construction: string;
  area: string;
  levels: Levels;
  checklist: string;
  package: string;
  measurement: string;
  levels_construction: {
    [key: string]: any;
  };
  team: string;
  released_typed: string;
  released_system: string;
  released_user: string;
  started_system: string;
  started_typed: string;
  finished_typed: string;
  delivered_typed: string;
}[];

interface FlattenedObject {
  id: number;
  construction: string;
  area: string;
  levels: Levels;
  checklist: string;
  package: string;
  measurement: string;
  levels_construction: {
    [key: string]: any;
  };
  team: string;
  released_typed: string;
  released_system: string;
  released_user: string;
  started_system: string;
  started_typed: string;
  finished_typed: string;
  delivered_typed: string;
  [key: string]: any;
}

type DashboardContextProps = {
  listConstructions: Item[];
  getAllConstructions: () => Promise<void>;
  listPackages: Item[];
  getAllPackages: () => Promise<void>;
  listChecklist: any[];
  getAllChekList: () => Promise<void>;
  listMeasurements: Item[];
  getAllMeasurements: () => Promise<void>;
  listChecklists: Item[];
  getAllChecklists: () => Promise<void>;
  listUsers: Item[];
  getAllUsers: () => Promise<void>;
  listEmployees: Item[];
  getAllEmployees: () => Promise<void>;
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
  dashboardChecklist: StatusChecklist;
  getDashboardChecklist: (filters?: string) => Promise<void>;
  dashboardExecution: Execution;
  getDashboardExecution: (filters?: string) => Promise<void>;
  dashboardGeneralData: GeneralDataTable;
  getDashboardGeneralData: (filters?: string) => Promise<void>;
  dashboardConstructionUpdate: ConstructionUpdate;
  getDashboardConstructionUpdate: (filters?: string) => Promise<void>;
  listInteractions: Interaction[];
  getInteractions: (filters?: string) => Promise<void>;
  variableLevels: string[];
};

const DashboardContext = createContext<DashboardContextProps>(
  {} as DashboardContextProps
);

const DashboardContextProvider = ({
  children,
}: DashboardContextProviderProps) => {
  const { user } = useContext(UserContext);

  const getStoredOptions = () => {
    const constructionOptionsStorage = localStorage.getItem(
      KEY_DASHBOARD_CONSTRUCTION_OPTIONS
    );
    if (constructionOptionsStorage) {
      const constructionOptionsParsed = JSON.parse(constructionOptionsStorage);
      return constructionOptionsParsed;
    }
    return [];
  };

  const [selectedConstruction, setSelectedConstruction] = useState(
    getStoredOptions().length > 0
      ? { id: getStoredOptions()[0].id, name: getStoredOptions()[0].name }
      : {
          id: 0,
          name: "",
        }
  );

  const [listConstructions, setListConstructions] = useState<Item[]>([]);
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

  const [listPackages, setListPackages] = useState<Item[]>([]);
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

  const [listChecklist, setListChecklist] = useState<any[]>([]);
  const getAllChekList = async () => {
    try {
      const { data } = await api.get(
        `/constructions/${selectedConstruction.id}/packages_checklists/`
      );
      console.log(data)
      setListChecklist(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [listMeasurements, setListMeasurements] = useState<any[]>([]);
  const getAllMeasurements = async () => {
    try {
      const { data } = await api.get(
        `/constructions/${selectedConstruction.id}/measurements/`
      );
      // console.log(
      //   "getAllMeasurements",
      //   data.map((measurement: any) => ({
      //     id: measurement.id,
      //     name: measurement.name,
      //   }))
      // );
      const allMeasurements = data.map((measurement: any) => ({
        id: measurement.id,
        name: measurement.name,
      }));
      setListMeasurements(allMeasurements);
    } catch (error) {
      console.error(error);
    }
  };

  const [listChecklists, setListChecklists] = useState<any[]>([]);
  const getAllChecklists = async () => {
    try {
      const { data } = await api.get(
        `constructions/${selectedConstruction.id}/checklists/`
      );
      // console.log(
      //   "getAllChecklists",
      //   data.areas.map((item: any) => item.checklists).flat()
      // );
      const allChecklists = data.areas
        .map((item: any) => item.checklists)
        .flat();
      setListChecklists(allChecklists);
    } catch (error) {
      console.error(error);
    }
  };

  const [listUsers, setListUsers] = useState<any[]>([]);
  const getAllUsers = async () => {
    try {
      const { data } = await api.get(
        `constructions/${selectedConstruction.id}/users/`
      );
      console.log("getAllUsers", data);
      // const allUsers = data.areas
      //   .map((item: any) => item.checklists)
      //   .flat();
      // setListUsers(allUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const [listEmployees, setListEmployees] = useState<any[]>([]);
  const getAllEmployees = async () => {
    try {
      const { data } = await api.get(
        `constructions/${selectedConstruction.id}/employees/`
      );
      console.log("getAllEmployees", data);
      // const allEmployees = data.areas
      //   .map((item: any) => item.checklists)
      //   .flat();
      // setListEmployees(allEmployees);
    } catch (error) {
      console.error(error);
    }
  };

  const [dashboardChecklist, setDashboardChecklist] = useState<StatusChecklist>(
    {
      entregue: 0,
      entregue_porcentagem: 0,
      finalizado: 0,
      finalizado_porcentagem: 0,
      iniciado: 0,
      iniciado_porcentagem: 0,
      liberado: 0,
      liberado_porcentagem: 0,
      nao_liberado: 0,
      nao_liberado_porcentagem: 0,
      total: 0,
    }
  );
  const getDashboardChecklist = async (filters?: string) => {
    let url = `/reports_construction/${selectedConstruction.id}/checklist/`;
    if (filters) {
      url = `/reports_construction/${selectedConstruction.id}/checklist/?${filters}`;
    }
    try {
      const { data } = await api.get(url);
      const checklistData = {
        entregue: data.entregue,
        entregue_porcentagem: data.entregue_porcentagem,
        finalizado: data.finalizado,
        finalizado_porcentagem: data.finalizado_porcentagem,
        iniciado: data.iniciado,
        iniciado_porcentagem: data.iniciado_porcentagem,
        liberado: data.liberado,
        liberado_porcentagem: data.liberado_porcentagem,
        nao_liberado: data.nao_liberado,
        nao_liberado_porcentagem: data.nao_liberado_porcentagem,
        total: data.total,
      };
      setDashboardChecklist(checklistData);
    } catch (error) {
      console.log(error);
    }
  };

  const [dashboardExecution, setDashboardExecution] = useState<Execution>([]);
  const getDashboardExecution = async (filters?: string) => {
    let url = `/reports_construction/${selectedConstruction.id}/execution/`;
    if (filters) {
      url = `/reports_construction/${selectedConstruction.id}/execution/?${filters}`;
    }
    try {
      const { data } = await api.get(url);
      setDashboardExecution(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [listInteractions, setListInteractions] = useState<Interaction[]>([]);
  const getInteractions = async (filters?: string) => {
    let url = `/reports_construction/${selectedConstruction.id}/interaction/`;
    if (filters) {
      url = `/reports_construction/${selectedConstruction.id}/interaction/?${filters}`;
    }
    try {
      const { data } = await api.get(url);
      setListInteractions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [variableLevels, setVariableLevels] = useState<string[]>([]);
  // function checkLevels<T>(...arrays: T[][]): T[] {
  //   return Array.from(new Set(arrays.flat()));
  // }

  // const variableColumns: MRT_ColumnDef<any>[] = variableLevels.map(
  //   (item, index) => ({
  //     accessorKey: item,
  //     header: `Nível ${variableLevels.length - index}`,
  //     size: 200,
  //   })
  // );

  const [dashboardGeneralData, setDashboardGeneralData] =
    useState<GeneralDataTable>([]);
  const getDashboardGeneralData = async (filters?: string) => {
    let url = `/reports_construction/${selectedConstruction.id}/general_data/`;
    if (filters) {
      url = `/reports_construction/${selectedConstruction.id}/general_data/?${filters}`;
    }
    try {
      const { data } = await api.get(url);
      const generalData = data.map((item: any) => {
        const test = {
          id: item.id,
          construction: item.construction || "",
          area: item.area || "",
          checklist: item.checklist || "",
          package: item.package || "",
          levels: item.levels,
          levels_construction: item.levels_construction,
          measurement: item.measurement || "",
          team: item.team || "",
          released_typed: item.released.released_typed || "",
          released_system: item.released.released_system || "",
          released_user: item.released.responsible || "",
          started_system: item.started_system || "",
          started_typed: item.started_typed || "",
          finished_typed: item.finished_typed || "",
          delivered_typed: item.delivered_typed || "",
          link: item.link || "",
        };

        const flattenedObject: FlattenedObject = {
          ...test,
        };

        Object.keys(test.levels).forEach((key) => {
          const newKey = key.split(" ")[0];
          flattenedObject[newKey] = test.levels[key];
        });

        delete flattenedObject.levels;

        return flattenedObject;
      });

      setDashboardGeneralData(generalData);

      const levelsList = data[0].levels_construction.map(
        (key: any) => key.split(" ")[0]
      );

      setVariableLevels(levelsList || []);
    } catch (error) {
      console.log(error);
    }
  };

  const [dashboardConstructionUpdate, setDashboardConstructionUpdate] =
    useState<ConstructionUpdate>([]);
  const getDashboardConstructionUpdate = async (filters?: string) => {
    let url = `/reports_construction/${selectedConstruction.id}/work_update/`;
    if (filters) {
      url = `/reports_construction/${selectedConstruction.id}/work_update/?${filters}`;
    }
    try {
      const { data } = await api.get(url);
      const constructionUpdateList = data.map((item: any) => ({
        id: item.id,
        area: item.area,
        checklist: item.checklist,
        responsible: item.responsible,
        status: item.status,
        team: item.team || "Sem Equipe",
        time: item.time,
      }));
      setDashboardConstructionUpdate(constructionUpdateList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedConstruction.id !== 0) {
      getInteractions();
      getDashboardChecklist();
      getDashboardExecution();
      getDashboardGeneralData();
      getDashboardConstructionUpdate();
      getAllChekList();
    }
  }, [selectedConstruction]);

  return (
    <DashboardContext.Provider
      value={{
        selectedConstruction,
        setSelectedConstruction,
        listConstructions,
        getAllConstructions,
        listPackages,
        getAllPackages,
        listChecklist,
        getAllChekList,
        listMeasurements,
        getAllMeasurements,
        listChecklists,
        getAllChecklists,
        listUsers,
        getAllUsers,
        listEmployees,
        getAllEmployees,
        dashboardChecklist,
        getDashboardChecklist,
        dashboardExecution,
        getDashboardExecution,
        dashboardGeneralData,
        getDashboardGeneralData,
        dashboardConstructionUpdate,
        getDashboardConstructionUpdate,
        listInteractions,
        getInteractions,
        variableLevels,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContext, DashboardContextProvider };
