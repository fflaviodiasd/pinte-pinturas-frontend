import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { KEY_SIGNED } from "../utils/consts";

type UserContextProviderProps = {
  children: ReactNode;
};

type UserContextProps = {
  // user: User;
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
  // const [user, setUser] = useState<User>(() => {
  //   const storageUser = localStorage.getItem(KEY_USER);
  //   if (storageUser) {
  //     const userParsed: User = JSON.parse(storageUser);
  //     return {
  //       id: userParsed.id,
  //       is_first: userParsed.is_first,
  //       type: userParsed.type,
  //       username: userParsed.username,
  //     };
  //   }
  //   return { id: 0, is_first: false, type: 0, username: "" };
  // });

  const loadStorage = () => {
    const storageIsAuthenticated = localStorage.getItem(KEY_SIGNED);
    if (storageIsAuthenticated) {
      return Boolean(JSON.parse(storageIsAuthenticated));
    }
    return false;
  };
  const [isSigned, setIsSigned] = useState<boolean>(loadStorage());

  return (
    <UserContext.Provider value={{ isSigned, setIsSigned }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
