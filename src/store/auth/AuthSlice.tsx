import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAuthState } from "./authType";
import { login } from "./authThunks";
import type { IApiResponse, ILoginResponse } from "../../type/type";

const initialState: IAuthState = {
  user: null,
  address: [],
  loading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthState["user"]>) => {
      state.user = action.payload;
    },
    setAddress: (state, action: PayloadAction<IAuthState["address"]>) => {
      state.address = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.address = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<IApiResponse<ILoginResponse>>) => {
        state.user = action.payload.data.user;
        state.loading = false;
        state.address = action.payload.data.user.address || [];
      },
    );
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to check login";
    });
  },
});

export default AuthSlice.reducer;
export const { setUser, setAddress, logout } = AuthSlice.actions;
