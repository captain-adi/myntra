import { Skeleton } from "../ui/skeleton";

function ProductCardSkeleton() {
  return (
    <div className="w-64 h-fit border rounded-lg bg-white p-4">
      {/* Image */}
      <Skeleton className="w-full h-48 rounded-md" />

      <div className="flex flex-col flex-grow mt-3">
        {/* Title */}
        <Skeleton className="h-6 w-3/4 rounded-md" />
        {/* Subtitle */}
        <Skeleton className="h-4 w-1/2 rounded-md mt-1" />

        {/* Price Section */}
        <div className="flex items-center gap-2 mt-2">
          <Skeleton className="h-6 w-1/4 rounded-md" />
          <Skeleton className="h-4 w-1/4 rounded-md" />
          <Skeleton className="h-4 w-1/4 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
