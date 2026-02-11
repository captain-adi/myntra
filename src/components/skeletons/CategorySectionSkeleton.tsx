import { Skeleton } from "../ui/skeleton";

function CategorySectionSkeleton() {
  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden w-full">
      <Skeleton className="w-full aspect-[4/3]" />
      <div className="p-2 flex justify-center">
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export default CategorySectionSkeleton;
