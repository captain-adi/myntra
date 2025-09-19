import { Delete } from "lucide-react";
import { toast } from "react-toastify";
import type { IProduct } from "../../../components/productCard/ProductCard";

function BagItems({ bagItems }: { bagItems: IProduct[] }) {
  const date = new Date();

  return (
    <>
      {bagItems.map((product: IProduct) => (
        <div className="flex  border text-sm" key={product.id}>
          <div className="item-left-part p-3 w-40 h-40 rounded-md shadow-md">
            <img
              className="bag-item-img h-full w-full  object-contain"
              src={product.images[0]}
              alt="Product"
            />
          </div>

          <div className=" border-4 w-full  pl-3 relative  ">
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
            <div className=" text-sm pt-2.5">
              <span className="return-period-days">14 days</span> return
              available
            </div>
            <div className="delivery-details mt-1.5 text-sm mb-2 ">
              Delivery by{" "}
              <span className="delivery-details-days  ">
                {date.getDate() + 3}
              </span>
            </div>
          </div>

          <div className="remove-from-cart  text-[25px] top-2.5 right-4 w-3.5 cursor-pointer">
            <Delete
              onClick={() => {
                toast.success("Item Removed from Bag");
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default BagItems;
