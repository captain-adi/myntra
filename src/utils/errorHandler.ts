import { toast } from "react-toastify";
import type { IErrorResponse } from "../type/type";
import type { AxiosError } from "axios";

const handleError = (error: unknown, fallback = "something went wrong") => {
  const err = error as AxiosError<IErrorResponse>;
  if (err.response?.status === 401) {
    toast.error("Please login first");
    return;
  }
  toast.error(err.response?.data.message || fallback);
};
export default handleError;
