import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useBag } from "../../context/BagContext";
import type { IProduct } from "../../type/type";
function WishList() {
  const { wishlistItems, setWishlistItems } = useBag();
  const handleMoveToBag = (item: IProduct) => {
    toast.success("Added to Cart");
    const updatedWishlist = wishlistItems.filter((i) => i.id !== item.id);
    setWishlistItems(updatedWishlist);
  };

  const handleRemoveFromWishlist = (itemId: number) => {
    const updatedWishlist = wishlistItems.filter((i) => i.id !== itemId);
    setWishlistItems(updatedWishlist);
    toast.success("Removed from Wishlist");
  };

  return (
    <div className=" h-screen  container mx-auto  mt-8 px-4 py-8">
      <ToastContainer autoClose={2000} />
      {wishlistItems.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center h-[70vh] text-center px-4">
          <Heart className="w-16 h-16 text-pink-500 mb-4" strokeWidth={1.5} />
          <h2 className="text-2xl font-semibold mb-2">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/"
            className="bg-pink-500 text-white px-5 py-2 rounded-md hover:bg-pink-600 transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="border rounded-lg  shadow-sm ">
              <div className="relative aspect-[4/3] mt-4">
                <div className="w-full h-48  overflow-hidden rounded-md">
                  <img
                    src={item?.images?.[0] || "https://via.placeholder.com/200"}
                    alt={item?.title || "Product Image"}
                    className="w-full h-full object-contain "
                  />
                </div>
                <button
                  className="absolute top-2 right-2 text-gray-600 bg-white border rounded-full w-6 h-6 text-sm cursor-pointer"
                  onClick={() => handleRemoveFromWishlist(item?.id)}
                >
                  ×
                </button>
              </div>
              <div className="p-3 flex flex-col flex-1 ">
                <h2 className="text-sm text-gray-700 truncate font-medium">
                  {item.title}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-bold text-blue-900">
                    Rs.{item.price}
                  </span>
                  <span className="text-xs line-through text-muted-foreground">
                    Rs.2222
                  </span>
                  <span className="text-xs text-orange-500 font-semibold">
                    20% off
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleMoveToBag(item)}
                className="w-full mt-auto border-t text-sm text-pink-600 font-bold py-3 hover:bg-pink-50 transition cursor-pointer"
              >
                Move to Bag
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishList;
