import { useState } from "react";

import ProductSort from "./ProductSort";
import { formatCategory } from "../utils/category";

interface FilterBrand {
    brandId: number;
    name: string;
}

interface ProductFiltersProps {
    categories: readonly string[];
    selectedCategories: readonly string[];
    onToggleCategory: (category: string) => void;

    brands: readonly FilterBrand[];
    selectedBrandId: number | undefined;
    onBrandChange: (
        brandId: number | undefined
    ) => void;

    minPrice: number | undefined;
    maxPrice: number | undefined;
    onPriceChange: (
        minPrice: number | undefined,
        maxPrice: number | undefined
    ) => void;

    minRating: number | undefined;
    onRatingChange: (
        rating: number | undefined
    ) => void;

    sortOption: string;
    onSortChange: (sortOption: string) => void;
}

function ProductFilters({
    categories,
    selectedCategories,
    onToggleCategory,
    brands,
    selectedBrandId,
    onBrandChange,
    minPrice,
    maxPrice,
    onPriceChange,
    minRating,
    onRatingChange,
    sortOption,
    onSortChange,
}: ProductFiltersProps) {
    const [priceMinInput, setPriceMinInput] =
        useState(
            minPrice !== undefined
                ? String(minPrice)
                : ""
        );

    const [priceMaxInput, setPriceMaxInput] =
        useState(
            maxPrice !== undefined
                ? String(maxPrice)
                : ""
        );

    const [showAllCategories, setShowAllCategories] =
        useState(false);

    const [showAllBrands, setShowAllBrands] =
        useState(false);

    function applyPriceFilter() {
        const parsedMin = priceMinInput
            ? Number(priceMinInput)
            : undefined;

        const parsedMax = priceMaxInput
            ? Number(priceMaxInput)
            : undefined;

        onPriceChange(
            parsedMin,
            parsedMax
        );
    }

    function clearPriceFilter() {
        setPriceMinInput("");
        setPriceMaxInput("");

        onPriceChange(
            undefined,
            undefined
        );
    }

    const visibleCategories = showAllCategories
        ? categories
        : categories.slice(0, 5);

    const visibleBrands = showAllBrands
        ? brands
        : brands.slice(0, 5);

    return (
        <aside className="h-fit rounded-sm border border-gray-200 bg-white shadow-sm lg:sticky lg:top-20">
            {/* Sort */}
            <div className="px-4 pt-4 pb-2">
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
                <div className="mb-6">
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-800">
                        Category
                    </h3>

                    <div
                        className={`space-y-3 ${showAllCategories
                            ? "max-h-48 overflow-y-auto pr-2"
                            : ""
                            }`}
                    >
                        {visibleCategories.map(
                            (category) => {
                                const isSelected =
                                    selectedCategories.includes(
                                        category
                                    );

                                return (
                                    <label
                                        key={category}
                                        className="group flex cursor-pointer items-center gap-3 text-xs text-gray-600"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={
                                                isSelected
                                            }
                                            onChange={() =>
                                                onToggleCategory(
                                                    category
                                                )
                                            }
                                            className="sr-only"
                                        />

                                        <span
                                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${isSelected
                                                ? "border-orange-500 bg-orange-500"
                                                : "border-gray-300 bg-white"
                                                }`}
                                        >
                                            {isSelected && (
                                                <span className="text-[11px] font-bold leading-none text-white">
                                                    ✓
                                                </span>
                                            )}
                                        </span>

                                        <span
                                            className={
                                                isSelected
                                                    ? "font-semibold text-gray-900"
                                                    : "group-hover:text-orange-500"
                                            }
                                        >
                                            {formatCategory(
                                                category
                                            )}
                                        </span>
                                    </label>
                                );
                            }
                        )}
                    </div>

                    {categories.length > 5 && (
                        <button
                            type="button"
                            onClick={() =>
                                setShowAllCategories(
                                    (current) =>
                                        !current
                                )
                            }
                            className="mt-4 text-xs font-semibold text-orange-500 transition-colors hover:text-orange-600"
                        >
                            {showAllCategories
                                ? "View less"
                                : "View more"}
                        </button>
                    )}
                </div>

                {/* Brand */}
                <div className="mb-6 border-t border-gray-200 pt-5">
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-800">
                        Brand
                    </h3>

                    <div
                        className={`space-y-3 ${showAllBrands
                            ? "max-h-48 overflow-y-auto pr-2"
                            : ""
                            }`}
                    >
                        {visibleBrands.map(
                            (brand) => {
                                const isSelected =
                                    selectedBrandId ===
                                    brand.brandId;

                                return (
                                    <label
                                        key={
                                            brand.brandId
                                        }
                                        className="group flex cursor-pointer items-center gap-3 text-xs text-gray-600"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={
                                                isSelected
                                            }
                                            onChange={() =>
                                                onBrandChange(
                                                    isSelected
                                                        ? undefined
                                                        : brand.brandId
                                                )
                                            }
                                            className="sr-only"
                                        />

                                        <span
                                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${isSelected
                                                ? "border-orange-500 bg-orange-500"
                                                : "border-gray-300 bg-white"
                                                }`}
                                        >
                                            {isSelected && (
                                                <span className="text-[11px] font-bold leading-none text-white">
                                                    ✓
                                                </span>
                                            )}
                                        </span>

                                        <span
                                            className={
                                                isSelected
                                                    ? "font-semibold text-gray-900"
                                                    : "group-hover:text-orange-500"
                                            }
                                        >
                                            {
                                                brand.name
                                            }
                                        </span>
                                    </label>
                                );
                            }
                        )}
                    </div>

                    {brands.length > 5 && (
                        <button
                            type="button"
                            onClick={() =>
                                setShowAllBrands(
                                    (current) =>
                                        !current
                                )
                            }
                            className="mt-4 text-xs font-semibold text-orange-500 transition-colors hover:text-orange-600"
                        >
                            {showAllBrands
                                ? "View less"
                                : "View more"}
                        </button>
                    )}
                </div>

                {/* Price Range */}
                <div className="mb-6 border-t border-gray-200 pt-5">
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-800">
                        Price Range
                    </h3>

                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="number"
                            min="0"
                            value={
                                priceMinInput
                            }
                            onChange={(event) =>
                                setPriceMinInput(
                                    event.target.value
                                )
                            }
                            placeholder="Min"
                            aria-label="Minimum price"
                            className="w-full rounded-sm border border-gray-300 px-2 py-2 text-xs outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                        />

                        <input
                            type="number"
                            min="0"
                            value={
                                priceMaxInput
                            }
                            onChange={(event) =>
                                setPriceMaxInput(
                                    event.target.value
                                )
                            }
                            placeholder="Max"
                            aria-label="Maximum price"
                            className="w-full rounded-sm border border-gray-300 px-2 py-2 text-xs outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                        />
                    </div>

                    <div className="mt-3 flex gap-2">
                        <button
                            type="button"
                            onClick={
                                applyPriceFilter
                            }
                            className="flex-1 rounded-sm bg-orange-500 px-2 py-2 text-xs font-semibold text-white transition hover:bg-orange-600"
                        >
                            Apply
                        </button>

                        <button
                            type="button"
                            onClick={
                                clearPriceFilter
                            }
                            className="rounded-sm border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-600 transition hover:border-orange-500 hover:text-orange-500"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                {/* Rating */}
                <div className="border-t border-gray-200 pt-5">
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-800">
                        Rating
                    </h3>

                    <div className="space-y-3">
                        {[4, 3, 2].map(
                            (rating) => {
                                const isSelected =
                                    minRating ===
                                    rating;

                                return (
                                    <label
                                        key={rating}
                                        className="flex cursor-pointer items-center gap-3 text-xs text-gray-600"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={
                                                isSelected
                                            }
                                            onChange={() =>
                                                onRatingChange(
                                                    isSelected
                                                        ? undefined
                                                        : rating
                                                )
                                            }
                                            className="sr-only"
                                        />

                                        <span
                                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${isSelected
                                                ? "border-orange-500 bg-orange-500"
                                                : "border-gray-300 bg-white"
                                                }`}
                                        >
                                            {isSelected && (
                                                <span className="text-[11px] font-bold leading-none text-white">
                                                    ✓
                                                </span>
                                            )}
                                        </span>

                                        <span>
                                            {rating}{" "}
                                            & above
                                        </span>
                                    </label>
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default ProductFilters;