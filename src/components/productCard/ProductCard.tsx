import { IndianRupee } from "lucide-react";
export interface IProduct {
  availability: string;
  brand: string;
  category: string;
  description: string;
  dimensions: string;
  discountPercentage: number;
  images: string[];
  price: number;
  productId: string;
  quantity: number;
  rating: number;
  reviews: {
    comment: string;
    rating: number;
    _id: string;
    reviewerName: string;
    reviewerEmail: string;
    date: string;
  }[];
  size: string[];
  _id: string;
  warrantyInformation: string;
  title: string;
  slug: string;
  thumbnail: string;
  originalPrice: number;
  tags: string[];
  id: number;
  availabilityStatus: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  shippingInformation: string;
  sku: string;
  stock: number;
  weight: number;
}

function ProductCard({ product }: { product: IProduct }) {
  return (
    <div className="w-64 border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition duration-300">
      {/* Image Section */}
      <div className="w-full h-48 overflow-hidden rounded-md">
        <img
          src={product?.images?.[0] || "https://via.placeholder.com/200"}
          alt={product?.title || "Product Image"}
          className="w-full h-full object-contain "
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow mt-3">
        <h2 className="text-lg font-semibold line-clamp-1 uppercase">
          {product?.title || "No Title"}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {product?.category || "Unknown Category"}
        </p>
        <div className="flex  items-center gap-2">
          <span className=" font-bold mt-1 flex items-center text-[#FF3E6C]">
            <IndianRupee className="mt-1" size={16} />{" "}
            {product?.price?.toFixed(2) || "N/A"}
          </span>{" "}
          <span className="text-xs mt-2 flex items-center text-gray-500 line-through">
            <IndianRupee className=" mr-0 " size={16} />
            {product.originalPrice}
          </span>
          <span className="text-xs mt-2 text-orange-500 font-semibold">
            {product.discountPercentage}% off
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
