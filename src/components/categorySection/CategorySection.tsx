import { memo } from "react";

import { Link } from "react-router-dom";

import { useFetchCategoryies } from "../../hooks/query";
function CategorySection() {
  const { data: categories, isLoading } = useFetchCategoryies();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <section>
      <h3 className="text-xl ml-3 md:text-3xl font-semibold text-gray-800 mb-0 pb-0 border-b-2 border-gray-200 md:pb-2 md:mb-6 md:mt-8 md:ml-5">
        CATEGORIES
      </h3>
      <section className="bg-gray-100 py-4 ">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4 md:gap-6 px-4 items-center ">
          {categories?.data.slice(0, 5)?.map((obj) => (
            <div
              className="bg-white rounded-md shadow-sm overflow-hidden w-full "
              key={obj._id}
            >
              <Link to={`/category/${obj.slug}`}>
                <div className="w-full aspect-[4/3] bg-gray-100">
                  <img
                    src={obj.image}
                    alt={obj.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>
              <p className="mt-2 text-center text-xs sm:text-sm md:text-base lg:text-lg font-medium px-2 truncate">
                {obj.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default memo(CategorySection);
