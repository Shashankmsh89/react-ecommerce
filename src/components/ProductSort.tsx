import { useState } from "react";
import type { SortOption } from "../types/product";

interface ProductSortProps {
    value: SortOption;
    onChange: (value: SortOption) => void;
}

function ProductSort({
    value,
    onChange,
}: ProductSortProps) {
    const [expandedSort, setExpandedSort] = useState<
        "name" | "price" | "rating" | null
    >(
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

    function toggleSortGroup(
        group: "name" | "price" | "rating"
    ) {
        setExpandedSort((currentGroup) =>
            currentGroup === group ? null : group
        );
    }

    return (
        <section className="border-b border-gray-200 pb-4">
            <h2 className="mb-3 text-sm font-bold text-gray-800">
                Sort by
            </h2>

            <div className="space-y-2 text-xs text-gray-600">

                {/* Name */}
                <div>
                    <button
                        type="button"
                        onClick={() => toggleSortGroup("name")}
                        className={`flex w-full items-center justify-between rounded-sm px-3 py-2 text-left font-semibold ${expandedSort === "name"
                                ? "bg-orange-50 text-orange-500"
                                : "hover:bg-gray-50"
                            }`}
                    >
                        <span className="flex items-center gap-2">
                            <span
                                className={`h-4 w-4 rounded-full border-2 ${value.startsWith("name")
                                        ? "border-orange-500"
                                        : "border-gray-300"
                                    }`}
                            >
                                {value.startsWith("name") && (
                                    <span className="mx-auto mt-[3px] block h-1.5 w-1.5 rounded-full bg-orange-500" />
                                )}
                            </span>

                            Name
                        </span>

                        {value.startsWith("name") && (
                            <span className="text-lg leading-none">
                                ×
                            </span>
                        )}
                    </button>

                    {expandedSort === "name" && (
                        <div className="ml-5 mt-2 space-y-2 border-l-2 border-orange-500 pl-4">
                            <label className="flex cursor-pointer items-center gap-2">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="name-asc"
                                    checked={value === "name-asc"}
                                    onChange={() =>
                                        handleSortChange("name-asc")
                                    }
                                />
                                A - Z
                            </label>

                            <label className="flex cursor-pointer items-center gap-2">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="name-desc"
                                    checked={value === "name-desc"}
                                    onChange={() =>
                                        handleSortChange("name-desc")
                                    }
                                />
                                Z - A
                            </label>
                        </div>
                    )}
                </div>

                {/* Price */}
                <div>
                    <button
                        type="button"
                        onClick={() => toggleSortGroup("price")}
                        className={`flex w-full items-center justify-between rounded-sm px-3 py-2 text-left font-semibold ${expandedSort === "price"
                                ? "bg-orange-50 text-orange-500"
                                : "hover:bg-gray-50"
                            }`}
                    >
                        <span className="flex items-center gap-2">
                            <span
                                className={`h-4 w-4 rounded-full border-2 ${value.startsWith("price")
                                        ? "border-orange-500"
                                        : "border-gray-300"
                                    }`}
                            >
                                {value.startsWith("price") && (
                                    <span className="mx-auto mt-[3px] block h-1.5 w-1.5 rounded-full bg-orange-500" />
                                )}
                            </span>

                            Price
                        </span>

                        {value.startsWith("price") && (
                            <span className="text-lg leading-none">
                                ×
                            </span>
                        )}
                    </button>

                    {expandedSort === "price" && (
                        <div className="ml-5 mt-2 space-y-2 border-l-2 border-orange-500 pl-4">
                            <label className="flex cursor-pointer items-center gap-2">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="price-asc"
                                    checked={value === "price-asc"}
                                    onChange={() =>
                                        handleSortChange("price-asc")
                                    }
                                />
                                Low - High
                            </label>

                            <label className="flex cursor-pointer items-center gap-2">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="price-desc"
                                    checked={value === "price-desc"}
                                    onChange={() =>
                                        handleSortChange("price-desc")
                                    }
                                />
                                High - Low
                            </label>
                        </div>
                    )}
                </div>

                {/* Rating */}
                <div>
                    <button
                        type="button"
                        onClick={() => toggleSortGroup("rating")}
                        className={`flex w-full items-center justify-between rounded-sm px-3 py-2 text-left font-semibold ${expandedSort === "rating"
                                ? "bg-orange-50 text-orange-500"
                                : "hover:bg-gray-50"
                            }`}
                    >
                        <span className="flex items-center gap-2">
                            <span
                                className={`h-4 w-4 rounded-full border-2 ${value.startsWith("rating")
                                        ? "border-orange-500"
                                        : "border-gray-300"
                                    }`}
                            >
                                {value.startsWith("rating") && (
                                    <span className="mx-auto mt-[3px] block h-1.5 w-1.5 rounded-full bg-orange-500" />
                                )}
                            </span>

                            Rating
                        </span>

                        {value.startsWith("rating") && (
                            <span className="text-lg leading-none">
                                ×
                            </span>
                        )}
                    </button>

                    {expandedSort === "rating" && (
                        <div className="ml-5 mt-2 space-y-2 border-l-2 border-orange-500 pl-4">
                            <label className="flex cursor-pointer items-center gap-2">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="rating-desc"
                                    checked={value === "rating-desc"}
                                    onChange={() =>
                                        handleSortChange("rating-desc")
                                    }
                                />
                                High - Low
                            </label>

                            <label className="flex cursor-pointer items-center gap-2">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="rating-asc"
                                    checked={value === "rating-asc"}
                                    onChange={() =>
                                        handleSortChange("rating-asc")
                                    }
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