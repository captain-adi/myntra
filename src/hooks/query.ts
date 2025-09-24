import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../api/apiconfig";
import type {
  IAddress,
  IApiResponse,
  IErrorResponse,
  ILoginResponse,
  IAddressResponse,
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
  const { setAddress } = useAuth();
  return useMutation({
    mutationKey: ["addNewAddress"],
    mutationFn: async (data: IAddress) => {
      const res = await axios.post<IApiResponse<IAddressResponse>>(
        "/address",
        data
      );
      return res.data;
    },
    onSuccess: (response: IApiResponse<IAddressResponse>) => {
      const updateAddress = response.data.user.address;
      setAddress(updateAddress || []);
      handleSuccess(response.message);
    },
  });
};

export const useRemoveAddress = () => {
  const { setAddress, address } = useAuth();
  return useMutation({
    mutationKey: ["removeAddress"],
    mutationFn: async (id: string) => {
      const res = await axios.delete<IApiResponse<IAddressResponse>>(
        `/address/${id}`
      );
      return res.data;
    },
    onSuccess: (response: IApiResponse<IAddressResponse>, variables) => {
      const updateAddress = address.filter(
        (addr) => addr._id !== variables // variables is the id parameter passed to mutationFn
      );
      setAddress(updateAddress);
      handleSuccess(response.message);
    },
  });
};
