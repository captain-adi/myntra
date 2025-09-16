import { createContext, useEffect, useState } from "react";
import React from "react";
import axios from "../api/apiconfig";

interface IUserResponse {
  id: string;
  email: string;
  username: string;
}

interface IContext {
  user: IUserResponse | null;
  setUser: (user: IUserResponse | null) => void;
}

const authContext = createContext<IContext | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUserResponse | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      const res = await axios.get("/auth/is-auth");
      setUser(res.data.data.user);
      console.log("is-auth res:", res.data);
    };
    checkLogin();
  }, []);

  const value = {
    user,
    setUser,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(authContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
