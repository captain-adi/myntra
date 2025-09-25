import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../api/apiconfig";
import type {
  IAddress,
  IApiResponse,
  IErrorResponse,
  ILoginResponse,
} from "../type/type";
import handleError from "../utils/errorHandler";
import handleSuccess from "../utils/successHandler";
import { useAuth } from "../context/AuthContext";
import type { IProduct } from "../components/productCard/ProductCard";

export const useLogin = () => {
  const { setUser } = useAuth();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await axios.post("/auth/login", data);
      return res.data;
    },
    onSuccess: (response: IApiResponse<ILoginResponse>) => {
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
    onSuccess: (response: IApiResponse<null>) => {
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
    queryFn: async (): Promise<IApiResponse<IProduct[]>> => {
      const res = await axios.get("/product");
      return res.data;
    },
  });
};

export const useAddNewAddress = () => {
  const { setAddress, address } = useAuth();
  return useMutation({
    mutationKey: ["addNewAddress"],
    mutationFn: async (data: IAddress) => {
      const res = await axios.post<IApiResponse<IAddress>>("/address", data);
      return res.data;
    },
    onSuccess: (response: IApiResponse<IAddress>) => {
      const updateAddress = response.data;
      setAddress([...address, updateAddress]);
      handleSuccess(response.message);
    },
    onError: (error: IErrorResponse) => {
      console.error("Hook onError called:", error);
      handleError(error);
    },
  });
};

export const useRemoveAddress = () => {
  const { setAddress, address } = useAuth();
  return useMutation({
    mutationKey: ["removeAddress"],
    mutationFn: async (id: string) => {
      const res = await axios.delete<IApiResponse<IAddress>>(`/address/${id}`);
      return res.data;
    },
    onSuccess: (response: IApiResponse<IAddress>, id: string) => {
      const updateAddress = address.filter((addr) => addr._id !== id);
      setAddress(updateAddress);
      handleSuccess(response.message);
    },
    onError: (error: IErrorResponse) => {
      console.error("Remove address failed:", error);
      handleError(error);
    },
  });
};

export const useUpdateAddress = () => {
  const { setAddress, address } = useAuth();
  return useMutation({
    mutationKey: ["updateAddress"],
    mutationFn: async (data: { id: string; addressData: IAddress }) => {
      const res = await axios.put<IApiResponse<IAddress>>(
        `/address/${data.id}`,
        data.addressData
      );
      return res.data;
    },
    onSuccess: (response: IApiResponse<IAddress>) => {
      handleSuccess(response.message);
      const updatedAddress = response.data;
      const updatedAddressList = address.map((addr) =>
        addr._id === updatedAddress._id ? updatedAddress : addr
      );
      setAddress(updatedAddressList);
    },
    onError: (error: IErrorResponse) => {
      handleError(error);
    },
  });
};
