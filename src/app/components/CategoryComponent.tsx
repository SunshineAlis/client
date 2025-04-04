"use client";
import { useState, useEffect } from "react";

const CategoryComponent: React.FC<CategoryProps> = ({ categories, foodCountByCategory }) => {
  const [dropdown, setDropdown] = useState<string | null>(null);

  return (
    <div className="p-4 bg-gray-100 max-w-[1000px] w-full m-auto rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Dishes Category</h3>
      <div className="flex flex-wrap gap-3 items-center">
        {categories.map((cat) => (
          <div key={cat._id} className="relative">
            <span
              onClick={() => setDropdown(dropdown === cat._id ? null : cat._id)}
              className="px-3 py-1 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 transition"
            >
              {cat.categoryName} ({foodCountByCategory[cat._id] ?? 0})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryComponent;
