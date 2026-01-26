import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/hook";

function PriceSection() {
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const { priceDetails, bagItems } = useAppSelector((state) => state.bag);
  useEffect(() => {
    const newDate = new Date(deliveryDate);
    newDate.setDate(newDate.getDate() + 3);
    setDeliveryDate(newDate);
  }, []);

  return (
    <div className="w-full lg:w-1/2 p-4 border border-gray-200 rounded-lg shadow-sm text-sm space-y-4">
      {/* DELIVERY ESTIMATES */}
      <div>
        <h2 className="font-semibold text-gray-700 uppercase text-xs mb-2">
          Delivery Estimates
        </h2>
        <div className="flex gap-3 items-start">
          <img
            src="https://via.placeholder.com/50"
            alt="Product"
            className="w-12 h-12 rounded"
          />
          <div>
            <p className="text-gray-600">
              Estimated delivery by{" "}
              <span className="font-semibold text-black">
                {deliveryDate.toDateString()}
              </span>
            </p>
            <p className="text-green-600 flex items-center gap-1 mt-1">
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Open Box Verification included
            </p>
          </div>
        </div>
      </div>

      {/* PRICE DETAILS */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-sm font-bold text-gray-800 mb-3">
          PRICE DETAILS ({bagItems.length}) Items
        </h3>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>Total MRP</span>
            <span>₹{priceDetails.totalPrice}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>
              Discount on MRP <span className=""> ( you saved )</span>
            </span>
            <span>- ₹{priceDetails.discount}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              Platform Fee
              <span className="text-pink-600 cursor-pointer">Know More</span>
            </span>
            <span>₹{priceDetails.platformFee}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              Shipping Fee
              <span className="text-pink-600 cursor-pointer">Know More</span>
            </span>
            <span className="text-green-600">₹{priceDetails.shippingFee}</span>
          </div>
          <p className="text-xs text-gray-400">Free shipping for you</p>
        </div>
      </div>

      {/* TOTAL AMOUNT */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between font-semibold text-black text-base">
          <span>Total Amount</span>
          <span>₹{priceDetails.totalAmount}</span>
        </div>
      </div>

      {/* OFFER INFO */}
      <div className="border border-green-500 bg-green-50 text-green-700 rounded p-3 flex items-start gap-2">
        <svg
          className="w-5 h-5 mt-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p>
          Includes{" "}
          <span className="font-semibold">FREE open box verification</span> for
          1 item!
        </p>
      </div>

      <Link to={"/checkout/payment"}>
        <button className="w-full mt-2 bg-pink-600 text-white py-2 rounded font-semibold cursor-pointer hover:bg-pink-700 transition">
          CONTINUE
        </button>
      </Link>

      <p className="text-center text-sm text-gray-500 mt-2">
        Need Help ? <span className="underline cursor-pointer">Contact Us</span>
      </p>
    </div>
  );
}

export default PriceSection;
