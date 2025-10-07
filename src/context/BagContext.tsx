import { createContext, useContext, useEffect, useState } from "react";
import type { IProduct } from "../type/type";
import { usefetchProducts } from "../hooks/query";
import type { IBagItems, IBagItemsResponse } from "../type/type";
import axios from "../api/apiconfig";

interface IBagContext {
  bagItems: IBagItems[];
  setBagItems: (items: IBagItems[]) => void;
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
  convertBagItems: (bagItemsResponse: IBagItemsResponse[]) => IBagItems[];
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
  wishlistItems: IProduct[];
  setWishlistItems: (items: IProduct[]) => void;
}

const BagContext = createContext<IBagContext | null>(null);

export const BagContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [bagItems, setBagItems] = useState<IBagItems[]>([]);
  const [wishlistItems, setWishlistItems] = useState<IProduct[]>([]);
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
    const fetchBagItems = async () => {
      try {
        const { data: bagResponse } = await axios.get("/user/bag");

        // Use the helper function to convert the response
        const convertedBagItems = convertBagItems(bagResponse.data);
        setBagItems(convertedBagItems);
      } catch (error) {
        console.error("Error fetching bag items:", error);
      }
    };

    // Only fetch bag items after products are loaded
    if (products.length > 0) {
      fetchBagItems();
    }
  }, [data, products]);

  // Helper function to convert API response to IBagItems
  const convertBagItems = (
    bagItemsResponse: IBagItemsResponse[]
  ): IBagItems[] => {
    return bagItemsResponse
      .map((bagItem) => {
        // Find the actual product from the products list
        const product = products.find((p) => p._id === bagItem.productId);

        if (product) {
          return {
            product: product,
            quantity: bagItem.quantity,
            _id: bagItem._id,
          } as IBagItems;
        }

        // If product not found, you might want to handle this case
        console.warn(
          `Product with ID ${bagItem.productId} not found in products list`
        );
        return null;
      })
      .filter((item): item is IBagItems => item !== null); // Remove null values with type guard
  };

  const value = {
    bagItems,
    setBagItems,
    products,
    setProducts,
    convertBagItems,
    priceDetails,
    setPriceDetails,
    wishlistItems,
    setWishlistItems,
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
