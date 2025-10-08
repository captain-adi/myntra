import { createContext, useEffect, useState } from "react";
import React from "react";
import axios from "../api/apiconfig";
import type { IAddress } from "../type/type";

interface IUserResponse {
  id: string;
  email: string;
  username: string;
}

interface IContext {
  user: IUserResponse | null;
  setUser: (user: IUserResponse | null) => void;
  address: IAddress[];
  setAddress: (address: IAddress[]) => void;
  loading?: boolean;
  setLoading?: (loading: boolean) => void;
}

const authContext = createContext<IContext | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [address, setAddress] = useState<IAddress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("/auth/is-auth");
        setUser(res.data.data.user);
        setAddress(res.data.data.user.address || []);
        console.log("is-auth res:", res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  const value = {
    user,
    setUser,
    setAddress,
    address,
    loading,
    setLoading,
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
