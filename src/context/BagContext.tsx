import { createContext, useContext, useEffect, useState } from "react";
import type { IProduct } from "../components/productCard/ProductCard";
import { usefetchProducts } from "../hooks/query";

interface IBagContext {
  bagItems: IProduct[];
  setBagItems: (items: IProduct[]) => void;
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
  priceDetails: {
    totalPrice: number;
    discount: number;
    platformFee: number;
    totalAmount: number;
    shippingFee: number;
  };
  setPriceDetails: (details: {
    totalPrice: number;
    discount: number;
    platformFee: number;
    totalAmount: number;
    shippingFee: number;
  }) => void;
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
  const [priceDetails, setPriceDetails] = useState({
    totalPrice: 0,
    discount: 0,
    platformFee: 0,
    totalAmount: 0,
    shippingFee: 0,
  });

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
    priceDetails,
    setPriceDetails,
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
