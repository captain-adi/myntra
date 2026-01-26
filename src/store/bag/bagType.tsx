import type { IBagItems, IPriceDetails, IProduct } from "../../type/type";

export interface IBagState {
  bagItems: IBagItems[];
  products: IProduct[];
  priceDetails: IPriceDetails;
  wishlistItems: IProduct[];
  loading: boolean;
}
