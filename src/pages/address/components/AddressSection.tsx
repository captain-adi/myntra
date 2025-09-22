function AddressSection() {
  const address = [
    {
      nameOfUser: "John Doe",
      place: "Home",
      address: "123 Main St, City, State",
      pincode: "123456",
      mobileNumber: "9876543210",
    },
  ];
  return (
    <>
      {address.map((data) => (
        <div key={data.mobileNumber} className="w-full lg:w-1/2">
          <div className="p-4 space-y-4 text-sm">
            <div>
              <h2 className="font-semibold text-gray-800 text-lg">
                Select Delivery Address
              </h2>
              <p className="text-xs text-gray-500 mt-1 uppercase">
                Default Address
              </p>
            </div>

            {/* Address Card */}
            <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-pink-600 rounded-full flex items-center justify-center">
                    <span className="w-2 h-2 bg-pink-600 rounded-full"></span>
                  </span>
                  <h3 className="font-semibold text-gray-800">
                    {data.nameOfUser}
                  </h3>
                  <span className="text-xs text-green-700 border border-green-700 rounded px-2 py-0.5">
                    {data.place}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mt-2 leading-relaxed">
                {data.address}
                <br />
                {data.pincode}
              </p>

              <p className="mt-2 text-gray-700">
                <span className="font-medium">Mobile:</span>{" "}
                <span className="font-semibold">{data.mobileNumber}</span>
              </p>

              <p className="text-gray-700 mt-1">• Pay on Delivery available</p>

              <div className="flex gap-3 mt-4">
                <button className="border border-gray-500 px-4 py-1 rounded text-sm font-medium hover:bg-gray-100">
                  REMOVE
                </button>
                <button className="border border-gray-500 px-4 py-1 rounded text-sm font-medium hover:bg-gray-100">
                  EDIT
                </button>
              </div>
            </div>

            <div className="border border-dashed border-pink-600 p-4 text-pink-600 font-medium rounded text-center cursor-pointer hover:bg-pink-50">
              + Add New Address
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default AddressSection;
