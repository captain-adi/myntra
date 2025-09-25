import LoadingDialog from "../../../components/loadingDialog/LoadingDialog";
import { useAuth } from "../../../context/AuthContext";
import { useRemoveAddress } from "../../../hooks/query";
import AddressForm from "./AddressForm";
import { Button } from "../../../components/ui/button";
import AddressEditForm from "./AddressEditForm";

function AddressSection() {
  const { address } = useAuth();
  const { mutate: removeAddress, isPending } = useRemoveAddress();
  const handleRemoveAddress = (id: string) => {
    removeAddress(id);
  };
  return (
    <div className="w-full lg:w-2/5 bg-white p-4 rounded shadow">
      <div className="flex justify-between">
        <div>
          <h2 className="font-semibold text-gray-800 text-lg">
            Select Delivery Address
          </h2>
          <p className="text-xs text-gray-500 mt-1 uppercase">
            Default Address
          </p>
        </div>
        <AddressForm />
        <LoadingDialog open={isPending} />
      </div>

      <div>
        {address.map((data) => (
          <div key={data._id} className="">
            <div className="py-4 space-y-4 text-sm">
              {/* Address Card */}
              <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-pink-600 rounded-full flex items-center justify-center">
                      <span className="w-2 h-2 bg-pink-600 rounded-full"></span>
                    </span>
                    <h3 className="font-semibold text-gray-800">
                      {data.fullName}
                    </h3>
                    <span className="text-xs text-green-700 border border-green-700 rounded px-2 py-0.5">
                      {data.city}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 mt-2 leading-relaxed">
                  {data.address}
                  <br />
                  {data.zipcode}
                </p>

                <p className="mt-2 text-gray-700">
                  <span className="font-medium">Mobile:</span>{" "}
                  <span className="font-semibold">{data.phone}</span>
                </p>

                <p className="text-gray-700 mt-1">
                  • Pay on Delivery available
                </p>

                <div className="flex gap-3 mt-4">
                  <Button
                    variant="outline"
                    className="cursor-pointer font-bold "
                    onClick={() => handleRemoveAddress(data._id)}
                  >
                    REMOVE
                  </Button>
                  <AddressEditForm addressData={data} />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="border border-dashed border-pink-600 p-4 text-pink-600 font-medium rounded text-center cursor-pointer hover:bg-pink-50">
          + Add New Address
        </div>
      </div>
    </div>
  );
}

export default AddressSection;
