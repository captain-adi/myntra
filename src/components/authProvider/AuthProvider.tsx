import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/hook";
import { login as checkLoginFromRedux } from "../../store/auth/authThunks";
import { useFetchProducts } from "../../hooks/query";
import { setProducts } from "../../store/bag/BagSlice";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { data } = useFetchProducts();

  useEffect(() => {
    dispatch(checkLoginFromRedux());
    if (data) {
      dispatch(setProducts(data?.data || []));
    }
  }, [dispatch, data]);

  return <>{children}</>;
}

export default AuthProvider;
