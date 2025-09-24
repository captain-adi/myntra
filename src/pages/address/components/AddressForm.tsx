import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { useAddNewAddress } from "../../../hooks/query";
import type { IAddress } from "../../../type/type";
import { useState } from "react";
import handleSuccess from "../../../utils/successHandler";

function AddressForm() {
  const { register, reset, handleSubmit } = useForm<IAddress>();
  const [open, setOpen] = useState<boolean>(false);
  const { mutate: addNewAddress } = useAddNewAddress();

  const onsubmit = (data: IAddress) => {
    addNewAddress(data, {
      onSuccess: (res) => {
        setOpen(false);
        reset();
        handleSuccess(res.message);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Address</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogTitle className="uppercase text-lg font-semibold mb-4">
          Add New Address
        </DialogTitle>
        <form className="space-y-5" onSubmit={handleSubmit(onsubmit)}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              {...register("fullName")}
              type="text"
              placeholder="Enter your full name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              {...register("phone", { required: true, maxLength: 10 })}
              type="tel"
              placeholder="Enter phone number"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              {...register("address", { required: true })}
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* City & State */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Zip / Postal Code
              </label>
              <input
                {...register("zipcode", { required: true })}
                type="number"
                placeholder="Enter pincode"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                type="text"
                {...register("state", { required: true })}
                placeholder="Enter state"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                {...register("city", { required: true })}
                type="text"
                placeholder="Enter city"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button (UI only) */}
          <Button className="w-full cursor-pointer" type="submit">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddressForm;
