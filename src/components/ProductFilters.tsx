import { formatCategory } from "../utils/category";
import type { SortOption } from "../types/product";
import ProductSort from "./ProductSort";

interface ProductFiltersProps {
    categories: readonly string[];
    selectedCategories: readonly string[];
    onToggleCategory: (category: string) => void;
    sortOption: SortOption;
    onSortChange: (sortOption: SortOption) => void;
}

function ProductFilters({
    categories,
    selectedCategories,
    onToggleCategory,
    sortOption,
    onSortChange,
}: ProductFiltersProps) {
    return (
        <aside className="h-fit rounded-sm border border-gray-200 bg-white shadow-sm lg:sticky lg:top-20">
            {/* Sort */}
            <div className="p-4">
                <ProductSort
                    value={sortOption}
                    onChange={onSortChange}
                />
            </div>

            {/* Filters */}
            <div className="border-t border-gray-200 p-4">
                <h2 className="mb-4 border-b-2 border-orange-500 pb-2 text-sm font-bold tracking-wide text-gray-900">
                    FILTERS
                </h2>

                {/* Category */}
                <div>
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-800">
                        Category
                    </h3>

                    <div className="space-y-3">
                        {categories.map((category) => {
                            const isSelected =
                                selectedCategories.includes(category);

                            return (
                                <label
                                    key={category}
                                    className="group flex cursor-pointer items-center gap-3 text-xs text-gray-600 transition-colors hover:text-orange-500"
                                >
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() =>
                                            onToggleCategory(category)
                                        }
                                        className="h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 bg-white transition-all checked:border-orange-500 checked:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
                                    />

                                    <span
                                        className={
                                            isSelected
                                                ? "font-semibold text-gray-900"
                                                : "group-hover:text-orange-500"
                                        }
                                    >
                                        {formatCategory(category)}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default ProductFilters;