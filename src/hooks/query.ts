import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../api/apiconfig";
import type {
  IAddress,
  IApiResponse,
  IBagItemsResponse,
  ICategory,
  IErrorResponse,
  ILoginResponse,
} from "../type/type";
import handleError from "../utils/errorHandler";
import handleSuccess from "../utils/successHandler";
import type { IProduct } from "../type/type";
import {
  setUser as checkingLogin,
  logout as checkingLogout,
  setAddress,
} from "../store/auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "./hook";
import { setBagItems } from "../store/bag/BagSlice";

export const useFetchCategoryies = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<IApiResponse<ICategory[]>> => {
      const res = await axios.get("/category");
      return res.data;
    },
  });
};

export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await axios.post("/auth/login", data);
      console.log("the whole response after login is : ", res.data);
      return res.data;
    },
    onSuccess: (response: IApiResponse<ILoginResponse>) => {
      dispatch(checkingLogin(response.data.user));
      dispatch(setAddress(response.data.user.address || []));
      dispatch(setBagItems(response.data.user.bagItems || []));
      handleSuccess(response.message);
    },
    onError: (error: IErrorResponse) => {
      handleError(error);
    },
  });
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const res = await axios.post("/auth/logout");
      return res.data;
    },
    onSuccess: (response: IApiResponse<null>) => {
      dispatch(checkingLogout());
      handleSuccess(response.message);
    },
    onError: (error: IErrorResponse) => {
      handleError(error);
    },
  });
};

export const useFetchProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<IApiResponse<IProduct[]>> => {
      const res = await axios.get("/product");
      return res.data;
    },
  });
};

export const useAddNewAddress = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector((state) => state.auth.user?.address || []);
  return useMutation({
    mutationKey: ["addNewAddress"],
    mutationFn: async (data: IAddress) => {
      const res = await axios.post<IApiResponse<IAddress>>("/address", data);
      return res.data;
    },
    onSuccess: (response: IApiResponse<IAddress>) => {
      const updateAddress = response.data;
      dispatch(setAddress([...address, updateAddress]));
      handleSuccess(response.message);
    },
    onError: (error: IErrorResponse) => {
      console.error("Hook onError called:", error);
      handleError(error);
    },
  });
};

export const useRemoveAddress = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector((state) => state.auth.user?.address || []);
  return useMutation({
    mutationKey: ["removeAddress"],
    mutationFn: async (id: string) => {
      const res = await axios.delete<IApiResponse<IAddress>>(`/address/${id}`);
      return res.data;
    },
    onSuccess: (response: IApiResponse<IAddress>, id: string) => {
      const updateAddress = address.filter((addr) => addr._id !== id);
      dispatch(setAddress(updateAddress));
      handleSuccess(response.message);
    },
    onError: (error: IErrorResponse) => {
      console.error("Remove address failed:", error);
      handleError(error);
    },
  });
};

export const useUpdateAddress = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector((state) => state.auth.user?.address || []);
  return useMutation({
    mutationKey: ["updateAddress"],
    mutationFn: async (data: { id: string; addressData: IAddress }) => {
      const res = await axios.put<IApiResponse<IAddress>>(
        `/address/${data.id}`,
        data.addressData,
      );
      return res.data;
    },
    onSuccess: (response: IApiResponse<IAddress>) => {
      handleSuccess(response.message);
      const updatedAddress = response.data;
      const updatedAddressList = address.map((addr) =>
        addr._id === updatedAddress._id ? updatedAddress : addr,
      );
      dispatch(setAddress(updatedAddressList));
    },
    onError: (error: IErrorResponse) => {
      handleError(error);
    },
  });
};

export const usePlaceOrder = () => {
  return useMutation({
    mutationKey: ["placeOrder"],
    mutationFn: async (data: { addressId: string; paymentMethod: string }) => {
      const res = await axios.post<IApiResponse<null>>("/order", data);
      return res.data;
    },
  });
};

export const useAddToBag = () => {
  const dispatch = useAppDispatch();
  const { bagItems, products } = useAppSelector((state) => state.bag);
  return useMutation({
    mutationKey: ["addToBag"],
    mutationFn: async (data: { productId: string; quantity: number }) => {
      const res = await axios.post<IApiResponse<IBagItemsResponse>>(
        "/user/bag",
        data,
      );
      return res.data;
    },
    onSuccess: (response) => {
      const quantity = response.data.quantity;
      const existingItem = bagItems.find(
        (item) => item.product._id === response.data.productId,
      );
      if (existingItem) {
        // Update quantity of existing item
        const updated = bagItems.map((item) =>
          item.product._id === response.data.productId
            ? { ...item, quantity: response.data.quantity }
            : item,
        );
        dispatch(setBagItems(updated));
        handleSuccess("Updated quantity in bag");
      } else {
        // Add new item to bag
        const product = products.find(
          (items) => items._id === response.data.productId,
        );
        if (product) {
          dispatch(
            setBagItems([
              ...bagItems,
              {
                product: product,
                quantity: quantity,
                _id: response.data._id,
              },
            ]),
          );
          handleSuccess(response.message);
        }
      }
    },
    onError: (error: IErrorResponse) => {
      console.error("Add to bag failed:", error);
      handleError(error);
    },
  });
};

export const useRemoveFromBag = () => {
  const dispatch = useAppDispatch();
  const { bagItems } = useAppSelector((state) => state.bag);
  return useMutation({
    mutationKey: ["removeFromBag"],
    mutationFn: async (id: string) => {
      const res = await axios.delete<IApiResponse<IBagItemsResponse>>(
        `/user/bag/${id}`,
      );
      return res.data;
    },
    onSuccess: (response) => {
      const updatedBagItems = bagItems.filter(
        (item) => item._id !== response.data._id,
      );
      dispatch(setBagItems(updatedBagItems));
    },
    onError: (error: IErrorResponse) => {
      console.error("Remove from bag failed:", error);
      handleError(error);
    },
  });
};
