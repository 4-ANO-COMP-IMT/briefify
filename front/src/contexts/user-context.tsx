import { createContext, useState, useEffect, PropsWithChildren } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
}

export interface UserContextInterface {
  user: User | undefined;
  setUser: (user: User) => void;
  isLogged: boolean;
}

const defaultContext: UserContextInterface = {
  user: undefined,
  setUser: () => {},
  isLogged: false,
};

export const UserContext = createContext<UserContextInterface>(defaultContext);

export function UserProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | undefined>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : undefined;
  });

  const [isLogged, setIsLogged] = useState<boolean>(
    () => !!localStorage.getItem("user"),
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setIsLogged(true);
    } else {
      localStorage.removeItem("user");
      setIsLogged(false);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, isLogged }}>
      {children}
    </UserContext.Provider>
  );
}
