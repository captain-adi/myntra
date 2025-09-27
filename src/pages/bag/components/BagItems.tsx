import { Delete } from "lucide-react";
import { toast } from "react-toastify";
import type { IProduct } from "../../../components/productCard/ProductCard";

interface IBagItemsProps {
  bagItems: IProduct[];
  setBagItems: (items: IProduct[]) => void;
}

function BagItems({ bagItems, setBagItems }: IBagItemsProps) {
  const date = new Date();

  const handleRemoveFromBag = (id: number) => {
    const updatedItems = bagItems.filter((item) => item.id !== id);
    setBagItems(updatedItems);
    toast.success("Item removed from bag");
  };
  return (
    <>
      {bagItems.map((product) => (
        <div className="bag-item-container" key={product.id}>
          <div className="item-left-part  rounded-md shadow-sm p-3">
            <img
              className="bag-item-img h-full w-full  object-contain"
              src={product.images[0]}
              alt="Product"
            />
          </div>

          <div className="item-right-part">
            <div className="company">{product.brand}</div>
            <div className="item-name">{product.title}</div>
            <div className="price-container flex gap-3">
              <span className="current-price">Rs {product.price}</span>
              <span className="original-price line-through">
                Rs{product.originalPrice}
              </span>
              <span className="discount-percentage">
                {product.discountPercentage}%
              </span>
            </div>
            <div className="return-period">
              <span className="return-period-days">14 days</span> return
              available
            </div>
            <div className="delivery-details">
              Delivery by{" "}
              <span className="delivery-details-days">
                {date.getDate() + 3}
              </span>
              <div className="bg-gray-300 w-fit px-2 py-0.5 text-xs mt-1  rounded-sm">
                <span className="font-bold"> Qty : </span>
                {product.quantity}
              </div>
            </div>
          </div>

          <div className="remove-from-cart">
            <Delete onClick={() => handleRemoveFromBag(product.id)} />
          </div>
        </div>
      ))}
    </>
  );
}

export default BagItems;
