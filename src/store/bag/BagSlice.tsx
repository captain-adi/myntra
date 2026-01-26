import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IBagState } from "./bagType";
import type { IBagItems, IPriceDetails, IProduct } from "../../type/type";

const initialState: IBagState = {
  bagItems: [],
  products: [],
  priceDetails: {
    totalPrice: 0,
    discount: 0,
    platformFee: 0,
    totalAmount: 0,
    shippingFee: 0,
  },
  wishlistItems: [],
  loading: false,
};

const BagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    setBagItems: (state, action: PayloadAction<IBagItems[]>) => {
      console.log(action.payload, "paylaod");
      state.bagItems = action.payload;
    },
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    setPriceDetails: (state, action: PayloadAction<IPriceDetails>) => {
      state.priceDetails = action.payload;
    },
    setWishlistItems: (state, action: PayloadAction<IProduct[]>) => {
      state.wishlistItems = action.payload;
    },
    clearBag: (state) => {
      state.bagItems = [];
      state.priceDetails = initialState.priceDetails;
    },
  },
});

export default BagSlice.reducer;
export const { setBagItems, setProducts, setPriceDetails, setWishlistItems } =
  BagSlice.actions;
