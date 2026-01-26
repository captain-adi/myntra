import type { IAddress, IUser } from "../../type/type";

export interface IAuthState {
  user: IUser | null;
  loading: boolean;
  address: IAddress[];
  error: string | null;
}
