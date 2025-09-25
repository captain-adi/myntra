import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import type { IAddress } from "../../../type/type";
import { useEffect, useState } from "react";
import { useUpdateAddress } from "../../../hooks/query";
import LoadingDialog from "../../../components/loadingDialog/LoadingDialog";

interface IAddressEditFormProps {
  addressData: IAddress;
}

function AddressEditForm({ addressData }: IAddressEditFormProps) {
  const { register, handleSubmit, reset } = useForm<IAddress>();
  const [open, setOpen] = useState<boolean>(false);
  const { mutate: updateAddress, isPending } = useUpdateAddress();

  useEffect(() => {
    if (addressData) {
      reset({
        fullName: addressData.fullName,
        phone: addressData.phone,
        address: addressData.address,
        city: addressData.city,
        state: addressData.state,
        zipcode: addressData.zipcode,
        _id: addressData._id,
      });
    }
  }, [addressData, reset]);

  const onsubmit = (data: IAddress) => {
    updateAddress(
      { id: addressData._id, addressData: data },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="uppercase font-bold">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogTitle className="uppercase text-lg font-semibold mb-4">
          Edit Address
        </DialogTitle>
        <LoadingDialog open={isPending} />
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

export default AddressEditForm;
