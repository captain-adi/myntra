import PriceSection from "./components/PriceSection";
import AddressSection from "./components/AddressSection";

function Address() {
  return (
    <>
      <div className="flex flex-col lg:flex-row   gap-3  mt-6 justify-center items-start">
        {/* Address Section */}
        <AddressSection />

        {/* Price Summary Section */}
        <PriceSection />
      </div>
    </>
  );
}

export default Address;
