import { formatCategory } from "../utils/category";

interface ProductFiltersProps {
    categories: readonly string[];
    selectedCategories: readonly string[];
    onToggleCategory: (category: string) => void;
}

function ProductFilters({
    categories,
    selectedCategories,
    onToggleCategory,
}: ProductFiltersProps) {
    return (
        <aside className="h-fit rounded-sm border border-gray-200 bg-white p-4">
            <h2 className="mb-4 border-b-2 border-orange-500 pb-2 text-sm font-bold">
                FILTERS
            </h2>
            <div>
                <h3 className="mb-2 text-xs font-bold">Category</h3>
                <div className="space-y-2 text-xs text-gray-600">
                    {categories.map((category) => (
                        <label key={category} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => onToggleCategory(category)}
                            />
                            {formatCategory(category)}
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
}

export default ProductFilters;