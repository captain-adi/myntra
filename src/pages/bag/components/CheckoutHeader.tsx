import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function CheckoutHeader() {
  const [steps, setSteps] = useState("bag");
  const location = useLocation();
  const currentStep = location.pathname.split("/")[2];

  useEffect(() => {
    setSteps(currentStep);
  }, [currentStep]);

  return (
    <div className="flex items-center justify-between px-4 py-5 shadow-md bg-white flex-wrap">
      {/* Logo */}
      <Link to={"/"}>
        <div className="mb-2 md:mb-0 ">
          <img
            src="https://cdn.freelogovectors.net/wp-content/uploads/2023/01/myntra-logo-freelogovectors.net_.png"
            alt="Myntra Logo"
            className="h-4 md:h-8"
          />
        </div>
      </Link>

      {/* Steps */}
      <div className="flex items-center space-x-2 text-xs tracking-wide font-semibold text-gray-600 mb-2 md:mb-0">
        <span
          className={
            steps === "bag" ? "text-teal-500 border-b-2 border-teal-500" : ""
          }
        >
          BAG
        </span>
        <span>---------</span>
        <span
          className={
            steps === "address"
              ? "text-teal-500 border-b-2 border-teal-500"
              : ""
          }
        >
          ADDRESS
        </span>
        <span>---------</span>
        <span
          className={
            steps === "payment"
              ? "text-teal-500 border-b-2 border-teal-500"
              : ""
          }
        >
          PAYMENT
        </span>
      </div>

      {/* Secure Icon */}
      <div className="flex items-center space-x-1 text-sm text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-teal-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 11c0 .552-.224 1.052-.586 1.414A1.994 1.994 0 0110 13c-.552 0-1.052-.224-1.414-.586A1.994 1.994 0 018 11c0-.552.224-1.052.586-1.414A1.994 1.994 0 0110 9c.552 0 1.052.224 1.414.586A1.994 1.994 0 0112 11zM5 11a7 7 0 1114 0c0 5.25-3.5 9.75-7 12-3.5-2.25-7-6.75-7-12z"
          />
        </svg>
        <span>100% SECURE</span>
      </div>
    </div>
  );
}

export default CheckoutHeader;
