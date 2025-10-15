import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { IProduct } from "../../type/type";
import axios from "../../api/apiconfig";
import ProductCardSkeleton from "../../components/productCard/ProductCardSkeleton";
import handleError from "../../utils/errorHandler";
import ProductCard from "../../components/productCard/ProductCard";

function Category() {
  const { categoryname } = useParams();

  const [categoryItems, setCateogryItems] = useState<IProduct[]>([]);

  useEffect(() => {
    const datafetch = async () => {
      try {
        const apiResponse = await axios("/product");
        const responseData = apiResponse.data.data;
        const filteredData = responseData.filter(
          (products: IProduct) => products.category === categoryname
        );
        setCateogryItems(filteredData);
      } catch (error) {
        handleError(error);
      }
    };
    datafetch();
  }, [categoryname]);

  return (
    <div className="flex  container mx-auto flex-wrap  gap-8 mt-10 mb-10 justify-center ">
      {categoryItems.length > 0
        ? categoryItems.map((product) => (
            <Link
              to={`/category/${product.category}/product/${product._id}`}
              key={product.id}
            >
              <ProductCard key={product.id} product={product} />
            </Link>
          ))
        : [...Array(6)].map((_, index) => <ProductCardSkeleton key={index} />)}
    </div>
  );
}

export default Category;
