import { Delete, Minus, Plus } from "lucide-react";
import { toast } from "react-toastify";
import type { IBagItems } from "../../../type/type";
import { useRemoveFromBag } from "../../../hooks/query";
import LoadingDialog from "../../../components/loadingDialog/LoadingDialog";
import { useState } from "react";
import { setBagItems } from "../../../store/bag/BagSlice";
import { useAppDispatch } from "../../../hooks/hook";

interface IBagItemsProps {
  bagItems: IBagItems[];
}

function BagItems({ bagItems }: IBagItemsProps) {
  const dispatch = useAppDispatch();
  const date = new Date();
  const { mutate: RemoveFromBag, isPending } = useRemoveFromBag();
  const [quantity, setQuantity] = useState<number>(1);
  const handleRemoveFromBag = (id: string) => {
    RemoveFromBag(id, {
      onSuccess: () => {
        const updatedItems = bagItems.filter((item) => item.product._id !== id);
        dispatch(setBagItems(updatedItems));
        toast.success("Item removed from bag");
      },
    });
  };

  return (
    <>
      {bagItems.map((obj) => (
        <div className="bag-item-container" key={obj.product._id}>
          <div className="item-left-part  rounded-md shadow-sm p-3">
            <img
              className="bag-item-img h-full w-full  object-contain"
              src={obj.product.images[0]}
              alt="Product"
            />
          </div>
          {isPending && <LoadingDialog open={isPending} />}
          <div className="item-right-part">
            <div className="company">{obj.product.brand}</div>
            <div className="item-name">{obj.product.title}</div>
            <div className="price-container flex gap-3">
              <span className="current-price">Rs {obj.product.price}</span>
              <span className="original-price line-through">
                Rs{obj.product.originalPrice}
              </span>
              <span className="discount-percentage">
                {obj.product.discountPercentage}%
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
              <div className="bg-gray-300 w-fit px-2 py-0.5 text-xs mt-1  rounded-sm flex items-center gap-1">
                <Minus
                  onClick={() => setQuantity(quantity - 1)}
                  className="cursor-pointer"
                  size={12}
                />

                {obj.quantity}
                <Plus
                  onClick={() => setQuantity(quantity + 1)}
                  size={12}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="remove-from-cart">
            <Delete onClick={() => handleRemoveFromBag(obj.product._id)} />
          </div>
        </div>
      ))}
    </>
  );
}

export default BagItems;
