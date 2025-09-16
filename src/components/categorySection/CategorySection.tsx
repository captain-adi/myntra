import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "../../api/apiconfig";
import type { ICategory } from "../../type/type";
function CategorySection() {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const apiResponse = await axios("/category");
        const { data } = apiResponse.data;
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategory(); // Fixed incorrect function call
  }, []);

  return (
    <>
      <h3 className="bagCategorieshead text-xl ml-3 md:text-3xl font-semibold text-gray-800 mb-0 pb-0 border-b-2 border-gray-200 md:pb-2 md:mb-6 md:mt-8 md:ml-5">
        CATEGORIES
      </h3>
      <section className="bagcategory bg-gray-100">
        <div className="upperBagCategories flex gap-2 p-2 sm:gap-10 sm:p-7 ">
          {categories.slice(0, 5)?.map((obj) => (
            <div
              className="bg-white rounded-md shadow-sm overflow-hidden"
              key={obj._id}
            >
              <Link to={`/category/${obj.slug}`}>
                <div className="w-full bg-gray-100">
                  <img
                    src={obj.image}
                    alt={obj.name}
                    className="w-full h-24 sm:h-32 md:h-40 lg:h-56 xl:h-72 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>
              <p className="mt-2 text-center text-sm sm:text-base md:text-lg font-medium px-2 truncate">
                {obj.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default CategorySection;
