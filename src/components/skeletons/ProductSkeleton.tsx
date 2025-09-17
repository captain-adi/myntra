function ProductSkeleton() {
  return (
    <div className="bg-white p-4 w-[70vw] m-auto">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="w-full   h-[70vh] bg-gray-200 rounded-2xl flex items-center justify-center p-4">
            <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="h-10 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-4 w-4 bg-[#14958F] rounded-full animate-pulse"
              ></div>
            ))}
            <div className="h-4 bg-gray-200 rounded animate-pulse ml-2 w-16"></div>
          </div>

          <div className="h-8 bg-red-600 rounded animate-pulse w-1/4"></div>

          <button className="w-full md:w-auto px-8 py-3 bg-[#FF3E6C] text-white font-semibold rounded-lg animate-pulse">
            <div className="h-4 bg-gray-200 rounded"></div>
          </button>

          <div>
            <div className="h-6 bg-gray-300 rounded animate-pulse mb-1"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
