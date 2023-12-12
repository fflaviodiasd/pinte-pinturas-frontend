import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

// import { errorMessage } from "../components/Messages";

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
  loading: boolean;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  isSigned: boolean;
  setIsSigned: Dispatch<SetStateAction<boolean>>;
  loginData: LoginData;
  login: (values: LoginData) => Promise<boolean>;
  recoverPasswdData: RecoverPasswdData;
  recoverPasswd: (values: RecoverPasswdData) => Promise<boolean>;
  resetPasswdData: ResetPasswdData;
  resetPasswd: (values: ResetPasswdData) => Promise<boolean>;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RecoverPasswdData = {
  email: string;
};

export type ResetPasswdData = {
  newPasswd: string;
  confirmPasswd: string;
};

const UserContext = createContext<UserContextProps>({} as UserContextProps);

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [loading, setLoading] = useState(false);

  const loadUser = () => {
    const storageUser = localStorage.getItem(KEY_USER);
    if (storageUser) {
      const userParsed: User = JSON.parse(storageUser);
      return {
        id: userParsed.id,
        isFirstAccessUser: userParsed.isFirstAccessUser,
        isFirstLogin: userParsed.isFirstLogin,
        type: userParsed.type,
        profileName: userParsed.profileName,
        company: userParsed.company,
      };
    }
    return {
      id: 0,
      isFirstAccessUser: false,
      isFirstLogin: false,
      type: 0,
      profileName: "",
      company: 0,
    };
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
    setLoading(true);
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
            isFirstAccessUser: data.user.is_first_access_user,
            isFirstLogin: data.user.is_first_login,
            type: data.user.type,
            profileName: data.user.profile_name || "",
            company: data.user.company || 0,
          })
        );
        setUser({
          id: data.user.id,
          isFirstAccessUser: data.user.is_first_access_user,
          isFirstLogin: data.user.is_first_login,
          type: data.user.type,
          profileName: data.user.profile_name || "",
          company: data.user.company || 0,
        });
      }
      localStorage.setItem(KEY_TOKEN, data.access);
      localStorage.setItem(KEY_REFRESH_TOKEN, data.refresh);
      localStorage.setItem(KEY_SIGNED, JSON.stringify(true));
      setIsSigned(true);
      setLoading(false);
      return false;
    } catch (error) {
      console.log(error);
      // errorMessage("Não foi possível realizar autenticação.");
      setLoading(false);
      return true;
    }
  };

  const recoverPasswdData: RecoverPasswdData = {
    email: "",
  };

  const recoverPasswd = async (values: RecoverPasswdData) => {
    setLoading(true);
    try {
      const { data } = await api.post(
        "/accounts/password_recovery/",
        values.email
      );
      console.log(data);
      console.log(values);
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      console.log(error);
      // errorMessage("Não foi possível realizar autenticação.");
      return false;
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
      // errorMessage("Não foi possível realizar autenticação.");
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        loading,
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
