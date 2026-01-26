import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../api/apiconfig";
import type { IApiResponse, ILoginResponse } from "../../type/type";
import { setBagItems } from "../bag/BagSlice";
import convertBagItems from "../../utils/convertBagItems";
import type { RootState } from "../Store";

export const login = createAsyncThunk<
  IApiResponse<ILoginResponse>,
  void,
  { rejectValue: string; state: RootState }
>(
  "auth/checkLoginFromRedux",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await axios.get("auth/is-auth");
      const bagItems = convertBagItems(
        response.data.data.user.bagItems || [],
        getState().bag.products,
      );
      dispatch(setBagItems(bagItems));
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Login check failed");
    }
  },
);
