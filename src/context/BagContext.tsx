import { createContext, useContext, useEffect, useState } from "react";
import type { IProduct } from "../components/productCard/ProductCard";
import { usefetchProducts } from "../hooks/query";

interface IBagContext {
  bagItems: any[];
  setBagItems: (items: any[]) => void;
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
}

const BagContext = createContext<IBagContext | null>(null);

export const BagContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [bagItems, setBagItems] = useState<any[]>([]);
  const { data } = usefetchProducts();

  useEffect(() => {
    if (data) {
      setProducts(data.data);
    }
  }, [data]);

  const value = {
    bagItems,
    setBagItems,
    products,
    setProducts,
  };
  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
};

export const useBag = () => {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error("useBag must be used within a BagProvider");
  }
  return context;
};
