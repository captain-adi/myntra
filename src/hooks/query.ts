import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../api/apiconfig";
import type { IApiResponse, IErrorResponse } from "../type/type";
import handleError from "../utils/errorHandler";
import handleSuccess from "../utils/successHandler";
import { useAuth } from "../context/AuthContext";

export const useLogin = () => {
  const { setUser } = useAuth();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await axios.post("/auth/login", data);
      return res.data;
    },
    onSuccess: (response: IApiResponse) => {
      setUser(response.data.user);
      handleSuccess(response.message);
    },
    onError: (error: IErrorResponse) => {
      handleError(error);
    },
  });
};

export const useLogout = () => {
  const { setUser } = useAuth();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const res = await axios.post("/auth/logout");
      return res.data;
    },
    onSuccess: (response: IApiResponse) => {
      setUser(null);
      handleSuccess(response.message);
    },
    onError: (error: IErrorResponse) => {
      handleError(error);
    },
  });
};

export const usefetchProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("/product");
      return res.data;
    },
  });
};
