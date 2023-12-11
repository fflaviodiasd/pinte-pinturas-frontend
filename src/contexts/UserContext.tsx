import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { errorMessage } from "../components/Messages";

import { api } from "../services/api";
import {
  KEY_REFRESH_TOKEN,
  KEY_SIGNED,
  KEY_TOKEN,
  KEY_USER,
} from "../utils/consts";
import { User } from "../types";

type UserContextProviderProps = {
  children: ReactNode;
};

type UserContextProps = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  isSigned: boolean;
  setIsSigned: Dispatch<SetStateAction<boolean>>;
  loginData: LoginData;
  login: (values: LoginData) => Promise<void>;
  recoverPasswdData: RecoverPasswdData;
  recoverPasswd: (values: RecoverPasswdData) => Promise<true | undefined>;
  resetPasswdData: ResetPasswdData;
  resetPasswd: (values: ResetPasswdData) => Promise<void>;
};

type LoginData = {
  email: string;
  password: string;
};

type RecoverPasswdData = {
  email: string;
};

type ResetPasswdData = {
  newPasswd: string;
  confirmPasswd: string;
};

const UserContext = createContext<UserContextProps>({} as UserContextProps);

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const loadUser = () => {
    const storageUser = localStorage.getItem(KEY_USER);
    if (storageUser) {
      const userParsed: User = JSON.parse(storageUser);
      return {
        id: userParsed.id,
        isFirst: userParsed.isFirst,
        type: userParsed.type,
        name: userParsed.name,
        company: userParsed.company,
      };
    }
    return { id: 0, isFirst: false, type: 0, name: "", company: 0 };
  };
  const [user, setUser] = useState<User>(loadUser());

  const loadStorage = () => {
    const storageIsAuthenticated = localStorage.getItem(KEY_SIGNED);
    if (storageIsAuthenticated) {
      return Boolean(JSON.parse(storageIsAuthenticated));
    }
    return false;
  };
  const [isSigned, setIsSigned] = useState<boolean>(loadStorage());

  const loginData: LoginData = {
    email: "",
    password: "",
  };

  const login = async (values: LoginData) => {
    api.defaults.headers.common["Authorization"] = "";
    localStorage.clear();

    try {
      const { data } = await api.post("/accounts/token/", values);
      console.log(data);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;

      if (data.user) {
        localStorage.setItem(
          KEY_USER,
          JSON.stringify({
            id: data.user.id,
            isFirst: data.user.is_first,
            type: data.user.type,
            name: data.user.name || "",
            company: data.user.company || 0,
          })
        );
        setUser({
          id: data.user.id,
          isFirst: data.user.is_first,
          type: data.user.type,
          name: data.user.name || "",
          company: data.user.company || 0,
        });
      }
      localStorage.setItem(KEY_TOKEN, data.access);
      localStorage.setItem(KEY_REFRESH_TOKEN, data.refresh);
      localStorage.setItem(KEY_SIGNED, JSON.stringify(true));
      setIsSigned(true);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível realizar autenticação.");
    }
  };

  const recoverPasswdData: RecoverPasswdData = {
    email: "",
  };

  const recoverPasswd = async (values: RecoverPasswdData) => {
    try {
      // const { data } = await api.post("/accounts/token/", values.email);
      // console.log(data);
      console.log(values);
      return true;
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível realizar autenticação.");
    }
  };

  const resetPasswdData: ResetPasswdData = {
    newPasswd: "",
    confirmPasswd: "",
  };

  const resetPasswd = async (values: ResetPasswdData) => {
    try {
      // const { data } = await api.post("/accounts/token/", values);
      // console.log(data);
      console.log(values);
      return true;
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível realizar autenticação.");
    }
  };

  return (
    <UserContext.Provider
      value={{
        isSigned,
        setIsSigned,
        user,
        setUser,
        loginData,
        login,
        recoverPasswdData,
        recoverPasswd,
        resetPasswdData,
        resetPasswd,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
