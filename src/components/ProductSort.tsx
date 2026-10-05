import { useState } from "react";
import type { SortOption } from "../types/product";

interface ProductSortProps {
    value: string;
    onChange: (value: string) => void;
}

type SortGroup = "name" | "price" | "rating";

function ProductSort({
    value,
    onChange,
}: ProductSortProps) {
    const [expandedSort, setExpandedSort] =
        useState<SortGroup | null>(
            value.startsWith("name")
                ? "name"
                : value.startsWith("price")
                    ? "price"
                    : value.startsWith("rating")
                        ? "rating"
                        : null
        );

    function handleSortChange(option: SortOption) {
        onChange(option);
    }

    function clearSort() {
        onChange("");
        setExpandedSort(null);
    }

    function toggleSortGroup(group: SortGroup) {
        setExpandedSort((currentGroup) =>
            currentGroup === group ? null : group
        );
    }

    function isSelected(group: SortGroup) {
        return value.startsWith(group);
    }

    return (
        <section className="border-b border-gray-200 pb-4">
            <h2 className="mb-3 text-sm font-bold text-gray-800">
                Sort by
            </h2>

            <div className="space-y-2 text-xs text-gray-600">

                {/* Name */}
                <div>
                    <div
                        className={`flex w-full items-center rounded-sm ${expandedSort === "name"
                            ? "bg-orange-50"
                            : "hover:bg-gray-50"
                            }`}
                    >
                        <button
                            type="button"
                            onClick={() =>
                                toggleSortGroup("name")
                            }
                            aria-expanded={
                                expandedSort === "name"
                            }
                            className={`flex flex-1 items-center gap-2 px-3 py-1 text-left font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 ${expandedSort === "name"
                                ? "text-orange-500"
                                : "text-gray-700 hover:text-orange-500"
                                }`}
                        >
                            <span
                                className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${isSelected("name")
                                    ? "border-orange-500"
                                    : "border-gray-300"
                                    }`}
                            >
                                {isSelected("name") && (
                                    <span className="block h-1.5 w-1.5 rounded-full bg-orange-500" />
                                )}
                            </span>

                            Name
                        </button>

                        {isSelected("name") && (
                            <button
                                type="button"
                                onClick={clearSort}
                                aria-label="Clear name sorting"
                                className="mr-2 flex h-6 w-6 items-center justify-center rounded-sm text-base leading-none text-gray-400 transition-colors hover:bg-orange-100 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    {expandedSort === "name" && (
                        <div className="ml-5 mt-2 space-y-2 border-l-2 border-orange-500 pl-4">
                            <label className="flex cursor-pointer items-center gap-2 transition-colors hover:text-orange-500">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="name-asc"
                                    checked={
                                        value === "name-asc"
                                    }
                                    onChange={() =>
                                        handleSortChange(
                                            "name-asc"
                                        )
                                    }
                                    className="accent-orange-500 focus:ring-orange-500"
                                />

                                A - Z
                            </label>

                            <label className="flex cursor-pointer items-center gap-2 transition-colors hover:text-orange-500">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="name-desc"
                                    checked={
                                        value === "name-desc"
                                    }
                                    onChange={() =>
                                        handleSortChange(
                                            "name-desc"
                                        )
                                    }
                                    className="accent-orange-500 focus:ring-orange-500"
                                />

                                Z - A
                            </label>
                        </div>
                    )}
                </div>

                {/* Price */}
                <div>
                    <div
                        className={`flex w-full items-center rounded-sm ${expandedSort === "price"
                            ? "bg-orange-50"
                            : "hover:bg-gray-50"
                            }`}
                    >
                        <button
                            type="button"
                            onClick={() =>
                                toggleSortGroup("price")
                            }
                            aria-expanded={
                                expandedSort === "price"
                            }
                            className={`flex flex-1 items-center gap-2 px-3 py-1 text-left font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 ${expandedSort === "price"
                                ? "text-orange-500"
                                : "text-gray-700 hover:text-orange-500"
                                }`}
                        >
                            <span
                                className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${isSelected("price")
                                    ? "border-orange-500"
                                    : "border-gray-300"
                                    }`}
                            >
                                {isSelected("price") && (
                                    <span className="block h-1.5 w-1.5 rounded-full bg-orange-500" />
                                )}
                            </span>

                            Price
                        </button>

                        {isSelected("price") && (
                            <button
                                type="button"
                                onClick={clearSort}
                                aria-label="Clear price sorting"
                                className="mr-2 flex h-6 w-6 items-center justify-center rounded-sm text-base leading-none text-gray-400 transition-colors hover:bg-orange-100 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    {expandedSort === "price" && (
                        <div className="ml-5 mt-2 space-y-2 border-l-2 border-orange-500 pl-4">
                            <label className="flex cursor-pointer items-center gap-2 transition-colors hover:text-orange-500">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="price-asc"
                                    checked={
                                        value === "price-asc"
                                    }
                                    onChange={() =>
                                        handleSortChange(
                                            "price-asc"
                                        )
                                    }
                                    className="accent-orange-500 focus:ring-orange-500"
                                />

                                Low - High
                            </label>

                            <label className="flex cursor-pointer items-center gap-2 transition-colors hover:text-orange-500">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="price-desc"
                                    checked={
                                        value === "price-desc"
                                    }
                                    onChange={() =>
                                        handleSortChange(
                                            "price-desc"
                                        )
                                    }
                                    className="accent-orange-500 focus:ring-orange-500"
                                />

                                High - Low
                            </label>
                        </div>
                    )}
                </div>

                {/* Rating */}
                <div>
                    <div
                        className={`flex w-full items-center rounded-sm ${expandedSort === "rating"
                            ? "bg-orange-50"
                            : "hover:bg-gray-50"
                            }`}
                    >
                        <button
                            type="button"
                            onClick={() =>
                                toggleSortGroup("rating")
                            }
                            aria-expanded={
                                expandedSort === "rating"
                            }
                            className={`flex flex-1 items-center gap-2 px-3 py-1 text-left font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 ${expandedSort === "rating"
                                ? "text-orange-500"
                                : "text-gray-700 hover:text-orange-500"
                                }`}
                        >
                            <span
                                className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${isSelected("rating")
                                    ? "border-orange-500"
                                    : "border-gray-300"
                                    }`}
                            >
                                {isSelected("rating") && (
                                    <span className="block h-1.5 w-1.5 rounded-full bg-orange-500" />
                                )}
                            </span>

                            Rating
                        </button>

                        {isSelected("rating") && (
                            <button
                                type="button"
                                onClick={clearSort}
                                aria-label="Clear rating sorting"
                                className="mr-2 flex h-6 w-6 items-center justify-center rounded-sm text-base leading-none text-gray-400 transition-colors hover:bg-orange-100 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    {expandedSort === "rating" && (
                        <div className="ml-5 mt-2 space-y-2 border-l-2 border-orange-500 pl-4">
                            <label className="flex cursor-pointer items-center gap-2 transition-colors hover:text-orange-500">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="rating-desc"
                                    checked={
                                        value === "rating-desc"
                                    }
                                    onChange={() =>
                                        handleSortChange(
                                            "rating-desc"
                                        )
                                    }
                                    className="accent-orange-500 focus:ring-orange-500"
                                />

                                High - Low
                            </label>

                            <label className="flex cursor-pointer items-center gap-2 transition-colors hover:text-orange-500">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="rating-asc"
                                    checked={
                                        value === "rating-asc"
                                    }
                                    onChange={() =>
                                        handleSortChange(
                                            "rating-asc"
                                        )
                                    }
                                    className="accent-orange-500 focus:ring-orange-500"
                                />

                                Low - High
                            </label>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ProductSort;