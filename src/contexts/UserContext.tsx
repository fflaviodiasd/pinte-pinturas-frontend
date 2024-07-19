import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
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
import { errorMessage } from "../components/Messages";

type UserContextProviderProps = {
  children: ReactNode;
};

type UserContextProps = {
  loading: boolean;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  isSigned: boolean;
  profile_id?: number;
  setIsSigned: Dispatch<SetStateAction<boolean>>;
  loginData: LoginData;
  login: (values: LoginData) => Promise<boolean>;
  recoverPasswdData: RecoverPasswdData;
  recoverPasswd: (values: RecoverPasswdData) => Promise<boolean>;
  resetPasswdData: ResetPasswdData;
  resetPasswd: (values: ResetPasswdData, token: string) => Promise<boolean>;
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
        profile_type: userParsed.profile_type,
        profileName: userParsed.profileName,
        company: userParsed.company,
        profile_id: userParsed.profile_id,
        companyCustomerId: userParsed.companyCustomerId,
      };
    }
    return {
      id: 0,
      isFirstAccessUser: false,
      isFirstLogin: false,
      type: 0,
      profileName: "",
      company: 0,
      profile_id: 0,
      companyCustomerId: 0,
    };
  };
  const [user, setUser] = useState<User>(loadUser());

  useEffect(() => {
    loadUser();
  }, []);

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
    // api.defaults.headers.common["Authorization"] = "";
    //ESTÁ COMENTANDO POR QUE ESTAVA IMPEDINDO DE CARREGAR OS DADOS NO PRIMEIRO LOGIN
    localStorage.clear();

    try {
      const { data } = await api.post("/accounts/token/", values);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
      if (data.user) {
        localStorage.setItem(
          KEY_USER,
          JSON.stringify({
            id: data.user.id,
            isFirstAccessUser: data.user.is_first_access_user,
            isFirstLogin: data.user.is_first_login,
            type: data.user.type,
            profile_type: data.user.profile_type,
            profileName: data.user.profile_name || "",
            company: data.user.company_id || 0,
            profile_id: data.user.profile_id,
            companyCustomerId: data.user.company_customer_id || 0,
          })
        );
        setUser({
          id: data.user.id,
          isFirstAccessUser: data.user.is_first_access_user,
          isFirstLogin: data.user.is_first_login,
          type: data.user.type,
          profile_type: data.user.profile_type,
          profileName: data.user.profile_name || "",
          company: data.user.company_id || 0,
          profile_id: data.user.profile_id,
          companyCustomerId: data.user.company_customer_id || 0,
        });
      }
      localStorage.setItem(KEY_TOKEN, data.access);
      localStorage.setItem(KEY_REFRESH_TOKEN, data.refresh);
      localStorage.setItem(KEY_SIGNED, JSON.stringify(true));
      setIsSigned(true);
      setLoading(false);

      return false;
    } catch (error: any) {
      console.log(error);
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.detail === "Usuário e/ou senha incorreto(s)"
      ) {
        errorMessage(
          "Não foi possível realizar autenticação. Usuário e/ou senha incorreto(s)."
        );
      } else {
        errorMessage("Não foi possível realizar autenticação.");
      }
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
      const { data } = await api.post("/accounts/password_recovery/", {
        email: values.email,
      });
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

  const resetPasswd = async (values: ResetPasswdData, token: string) => {
    try {
      await api.post("/accounts/password_recovery/confirm/", {
        password: values.confirmPasswd,
        token: token,
      });
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
