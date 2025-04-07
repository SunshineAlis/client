"use client";

import { useCategoryContext } from "@/app/components/provider/CategoryProvider";

const CategoryComponent = () => {
  const { categories } = useCategoryContext();

  const allFoods = categories?.flatMap((cat) => cat.foods || []) || [];
  const allFoodsCount = allFoods.length;
  const foodCountByCategory: Record<string, number> = {};
  categories?.forEach((cat) => {
    foodCountByCategory[cat._id] = cat.foods?.length || 0;
  });

  return (
    <div className="p-4 bg-gray-100 max-w-[1000px] w-full mx-auto rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-center sm:text-left">
        Dishes Category
      </h3>
      <div className="flex flex-wrap gap-2 sm:gap-3 items-center justify-center sm:justify-start mt-4">
        <span className="px-3 py-1 text-sm sm:text-base rounded-lg bg-gray-200 whitespace-nowrap">
          All of Dishes ({allFoodsCount})
        </span>
        {categories?.map((cat) => (
          <div key={cat._id} className="relative">
            <span className="px-3 py-1 text-sm sm:text-base rounded-lg bg-gray-200 whitespace-nowrap">
              {cat.categoryName} ({foodCountByCategory[cat._id]})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryComponent;
