import { Link } from "react-router-dom";
import { useBag } from "../../../context/BagContext";
import { useState } from "react";

function BagDetails() {
  const { bagItems, setPriceDetails } = useBag();
  const [wantDonation, setWantDonation] = useState(false);
  const [donation, setDonation] = useState("0");
  let totalMRP = 0;
  let totalDiscount = 0;
  let shippingFee = 0;
  let platFormFee = 0;

  bagItems.map((items) => {
    totalMRP += Math.floor(items.price * items.quantity);
    totalDiscount += Math.floor(items.originalPrice - items.price);
  });
  let finalMRP = totalMRP + Number(donation);
  platFormFee = bagItems.length > 0 ? 0 : 20;
  shippingFee = Number(finalMRP < 1000 ? 50 : 0);
  finalMRP += shippingFee + platFormFee;

  const handlePriceDetails = () => {
    setPriceDetails({
      totalPrice: totalMRP,
      discount: totalDiscount,
      platformFee: platFormFee,
      totalAmount: finalMRP,
      shippingFee: shippingFee,
    });
  };

  return (
    <div className="border p-4 rounded-md shadow-sm bg-white w-full max-w-md">
      {/* Coupons */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 font-medium text-gray-700">
          <span>🏷️</span>
          Apply Coupons
        </div>
        <button className="text-pink-500 border border-pink-500 px-3 py-1 rounded-sm text-sm font-semibold hover:bg-pink-50">
          APPLY
        </button>
      </div>

      <hr className="my-2" />

      {/* Donation Section */}
      <div className="mb-4">
        <label className="flex items-center space-x-2 mb-2 font-medium text-gray-700">
          <input
            type="checkbox"
            checked={wantDonation}
            onChange={() => {
              setWantDonation(!wantDonation);
              console.log(wantDonation);
              if (!wantDonation === false) {
                setDonation("0");
              }
            }}
            className="accent-pink-500"
          />
          <span>Donate and make a difference</span>
        </label>
        <div className="flex gap-2 mb-1">
          {["10", "20", "50", "100"].map((amt) => (
            <button
              key={amt}
              className="border   px-3 py-1 rounded-full text-sm hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-300"
              onClick={() => setDonation(amt)}
              disabled={!wantDonation}
            >
              ₹{amt}
            </button>
          ))}
        </div>
        <button className="text-pink-600 text-sm font-semibold hover:underline">
          Know More
        </button>
      </div>

      <hr className="my-2" />

      {/* Price Details */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-3">
          PRICE DETAILS ({bagItems.length}) Item
        </h3>
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Total MRP</span>
          <span>₹{totalMRP}</span>
        </div>
        <div className="flex justify-between text-sm text-green-600 mb-1">
          <span>Discount on MRP (You Saved)</span>
          <span> ₹{totalDiscount}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Social Work Donation</span>
          <span>{donation}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Coupon Discount</span>
          <button className="text-pink-500 font-medium hover:underline text-sm">
            Apply Coupon
          </button>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>
            Platform Fee{" "}
            <button className="text-pink-500 text-xs hover:underline">
              Know More
            </button>
          </span>
          <span>₹{platFormFee}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>
            Shipping Fee{" "}
            <button className="text-pink-500 text-xs hover:underline">
              Know More
            </button>
          </span>
          <span className="text-green-500">
            {shippingFee ? `₹${shippingFee}` : "FREE"}
          </span>
        </div>
      </div>

      <hr className="my-3" />

      {/* Total */}
      <div className="flex justify-between items-center font-semibold text-gray-800 text-lg mb-2">
        <span>Total Amount</span>
        <span>{finalMRP}</span>
      </div>

      {/* Free verification */}
      <div className="text-sm text-gray-600 flex items-center gap-2 mb-4">
        <span>✅</span>
        <span>Includes FREE open box verification</span>
      </div>

      {/* Place Order Button */}
      <Link to={"/checkout/address"}>
        <button
          className="w-full bg-pink-500 text-white font-bold py-2 rounded-sm hover:bg-pink-600 transition cursor-pointer"
          onClick={() => handlePriceDetails()}
        >
          PLACE ORDER
        </button>
      </Link>
    </div>
  );
}

export default BagDetails;
