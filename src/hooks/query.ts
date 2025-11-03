import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "../api/apiconfig";
import type {
  IAddress,
  IApiResponse,
  IBagItemsResponse,
  IErrorResponse,
  ILoginResponse,
} from "../type/type";
import handleError from "../utils/errorHandler";
import handleSuccess from "../utils/successHandler";
import { useAuth } from "../context/AuthContext";
import type { IProduct } from "../type/type";
import { useBag } from "../context/BagContext";

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

export const usePlaceOrder = () => {
  return useMutation({
    mutationKey: ["placeOrder"],
    mutationFn: async (data: { addressId: string; paymentMethod: string }) => {
      const res = await axios.post<IApiResponse<null>>("/order", data);
      return res.data;
    },
  });
};

// Hook to fetch and convert bag items from API
export const useFetchBagItems = () => {
  const { setBagItems, convertBagItems } = useBag();

  const queryResult = useQuery({
    queryKey: ["bagItems"],
    queryFn: async (): Promise<IApiResponse<IBagItemsResponse[]>> => {
      const res = await axios.get("/user/bag");
      return res.data;
    },
  });

  // Handle the conversion when data is available
  useEffect(() => {
    if (queryResult.data) {
      const convertedBagItems = convertBagItems(queryResult.data.data);
      setBagItems(convertedBagItems);
    }
  }, [queryResult.data, convertBagItems, setBagItems]);

  return queryResult;
};

export const useAddToBag = () => {
  const { bagItems, setBagItems, products } = useBag();
  return useMutation({
    mutationKey: ["addToBag"],
    mutationFn: async (data: { productId: string; quantity: number }) => {
      const res = await axios.post<IApiResponse<IBagItemsResponse>>(
        "/user/bag",
        data
      );
      return res.data;
    },
    onSuccess: (response) => {
      const quantity = response.data.quantity;
      const product = products.find(
        (items) => items._id === response.data.productId
      );
      const existingItem = bagItems.find(
        (item) => item.product._id === response.data.productId
      );
      if (existingItem) {
        // Increment quantity immutably
        const updated = bagItems.map((item) =>
          item.product._id === response.data.productId
            ? { ...item, quantity: response.data.quantity }
            : item
        );
        setBagItems(updated);
        handleSuccess("Item quantity updated in bag");
        return;
      }
      if (product) {
        setBagItems([
          ...bagItems,
          {
            product: product,
            quantity: quantity,
            _id: response.data._id,
          },
        ]);
      }
      handleSuccess(response.message);
    },
    onError: (error: IErrorResponse) => {
      console.error("Add to bag failed:", error);
      handleError(error);
    },
  });
};

export const useRemoveFromBag = () => {
  const { bagItems, setBagItems } = useBag();
  return useMutation({
    mutationKey: ["removeFromBag"],
    mutationFn: async (id: string) => {
      const res = await axios.delete<IApiResponse<IBagItemsResponse>>(
        `/user/bag/${id}`
      );
      return res.data;
    },
    onSuccess: (response) => {
      const updatedBagItems = bagItems.filter(
        (item) => item._id !== response.data._id
      );
      setBagItems(updatedBagItems);
    },
    onError: (error: IErrorResponse) => {
      console.error("Remove from bag failed:", error);
      handleError(error);
    },
  });
};
