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
import { User } from "../types";

import { UserContext } from "./UserContext";

type DashboardContextProviderProps = {
  children: ReactNode;
};

type Item = {
  name: string;
  id: number;
};

type DashboardContextProps = {
  listConstructions: Item[];
  getAllConstructions: () => Promise<void>;
  listPackages: Item[];
  getAllPackages: () => Promise<void>;
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
};

const DashboardContext = createContext<DashboardContextProps>(
  {} as DashboardContextProps
);

const DashboardContextProvider = ({
  children,
}: DashboardContextProviderProps) => {
  const { user } = useContext(UserContext);

  const [selectedConstruction, setSelectedConstruction] = useState({
    id: 0,
    name: "",
  });

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
      // console.log("constructionList", constructionList);
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

  return (
    <DashboardContext.Provider
      value={{
        selectedConstruction,
        setSelectedConstruction,
        listConstructions,
        getAllConstructions,
        listPackages,
        getAllPackages,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContext, DashboardContextProvider };
