import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Star } from "lucide-react";
import { Heart, IndianRupee, Handbag } from "lucide-react";
import ProductSkeleton from "../../components/skeletons/ProductSkeleton";
import type { IProduct } from "../../type/type";
import { useBag } from "../../context/BagContext";
import { useAddToBag } from "../../hooks/query";

const Product = () => {
  const { bagItems, products, wishlistItems, setWishlistItems } = useBag();
  const [quantity] = useState<number>(1);
  const { mutate: addToBag } = useAddToBag();
  const { id } = useParams();
  const addToCart = (product: IProduct) => {
    addToBag({ productId: product._id, quantity: quantity });
    console.log("bag items", bagItems);
  };
  const addToWishlist = (product: IProduct) => {
    toast.success("ADDED TO WISHLIST");
    const isInWishlist =
      wishlistItems.filter((item) => item.id === product.id).length > 0;
    if (!isInWishlist) {
      setWishlistItems([...wishlistItems, product]);
    }
  };
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const filteredData = products.filter(
      (product: IProduct) => product._id === id
    );
    setProduct(filteredData[0]);
  }, [id, products]);

  if (!product) {
    return <ProductSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="aspect-square bg-white rounded-2xl shadow-md flex items-center justify-center p-4 border">
            <img
              src={product?.images[0]}
              alt={product?.title}
              className="max-h-full max-w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl uppercase font-bold text-gray-800">
              {product?.title}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Category:{" "}
              <span className="font-medium text-gray-700">
                {product?.category}
              </span>
            </p>
          </div>

          {/* Rating */}
          {product?.rating && (
            <div className="flex items-center gap-1 text-[#14958F] text-sm">
              {[...Array(Math.round(product.rating))].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
              ))}
              <span className="text-gray-600 ml-2">
                ({product.rating.toFixed(1)})
              </span>
            </div>
          )}

          {/* Price */}
          <p className="text-3xl flex  items-center font-bold text-gray-800">
            <IndianRupee /> {product?.price?.toFixed(2)}
          </p>

          {/* Cart Button */}
          <div className="flex  gap-10">
            <button
              className="w-full flex justify-center items-center gap-4  md:w-auto px-8 py-3 bg-[#FF3E6C] text-white font-semibold rounded-sm hover:bg-[#FF5C7E] transition cursor-pointer hover:shadow-lg"
              onClick={() => addToCart(product)}
            >
              <Handbag className="mt-1 text-xl" />
              ADD TO BAG
            </button>
            {/* whishlist button  */}
            <button
              className="w-full flex border  justify-center items-center gap-4  md:w-auto px-8 py-3 font-semibold rounded-sm  transition cursor-pointer hover:bg-gray-100"
              onClick={() => addToWishlist(product)}
            >
              <Heart className="text-2xl" /> WISHLIST
            </button>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold uppercase text-[#FF3E6C] mb-1">
              Description
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {product?.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p>
              <strong>Warranty:</strong>{" "}
              {product?.warrantyInformation || "1 Year"}
            </p>
            <p>
              <strong>Shipping:</strong>{" "}
              {product?.shippingInformation || "Standard"}
            </p>
            <p>
              <strong>Return Policy:</strong>{" "}
              {product?.returnPolicy || "30 Days"}
            </p>
            <p>
              <strong>Availability:</strong>{" "}
              {product?.availabilityStatus || "Available"}
            </p>
          </div>

          {/* 👇 Product Info Block (placed above Tags) */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mt-4">
            <p>
              <strong>SKU:</strong> {product?.sku || "N/A"}
            </p>
            <p>
              <strong>Stock:</strong> {product?.stock || "In Stock"}
            </p>
            <p>
              <strong>Brand:</strong> {product?.brand || "Premium Brand"}
            </p>
            <p>
              <strong>Weight:</strong>{" "}
              {product?.weight ? `${product.weight} kg` : "N/A"}
            </p>
          </div>

          {/* Tags */}
          {product?.tags?.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-[#FF3E6C] mt-4 mb-2">
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Review Section (untouched as per your request) */}
      {product?.reviews?.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-[#FF3E6C] mb-4">
            Customer Reviews
          </h3>
          <div className="space-y-6">
            {product.reviews.map((review, i) => (
              <div
                key={i}
                className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                  {review.reviewerName?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-800 font-medium">
                      {review.reviewerName}
                    </p>
                    <span className="text-[#14958F] text-sm font-semibold">
                      ⭐ {review.rating}/5
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{review.comment}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
