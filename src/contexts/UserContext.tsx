import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { KEY_SIGNED, KEY_USER } from "../utils/consts";
import { User } from "../types";

type UserContextProviderProps = {
  children: ReactNode;
};

type UserContextProps = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  isSigned: boolean;
  setIsSigned: Dispatch<SetStateAction<boolean>>;
};

// const initialState = {
//   isSigned: true,
//   setIsSigned: () => {},
//   resetPassword: ()=>{}
// };

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

  return (
    <UserContext.Provider value={{ isSigned, setIsSigned, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
