import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Button from "../components/Button";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import ProductError from "../components/ProductError";
import ProductFilters from "../components/ProductFilters";
import ProductGrid from "../components/ProductGrid";
import ProductSkeleton from "../components/ProductSkeleton";

import {
    searchProducts,
    fetchCategories,
    fetchBrands,
} from "../services/ecommerceService";

import type {
    Brand,
    Category,
    Product,
    ProductSearchResponse,
} from "../types/ecommerce";

const PRODUCTS_PER_PAGE = 8;

function isAbortError(error: unknown): boolean {
    return (
        error instanceof DOMException &&
        error.name === "AbortError"
    );
}

function ProductList() {
    const [searchParams, setSearchParams] =
        useSearchParams();

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] =
        useState<Category[]>([]);

    const [brands, setBrands] = useState<Brand[]>([]);

    const [selectedBrandId, setSelectedBrandId] =
        useState<number | undefined>(undefined);

    const [minPrice, setMinPrice] =
        useState<number | undefined>(undefined);

    const [maxPrice, setMaxPrice] =
        useState<number | undefined>(undefined);

    const [minRating, setMinRating] =
        useState<number | undefined>(undefined);

    const [loading, setLoading] = useState(true);
    const [error, setError] =
        useState<string | null>(null);

    const [searchTerm, setSearchTerm] =
        useState(
            searchParams.get("search") ?? ""
        );

    const [selectedCategoryId, setSelectedCategoryId] =
        useState<number | undefined>(() => {
            const value =
                searchParams.get("categoryId");

            return value ? Number(value) : undefined;
        });

    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    const [currentPage, setCurrentPage] =
        useState(1);

    const [totalRecords, setTotalRecords] =
        useState(0);

    const [totalPages, setTotalPages] =
        useState(0);

    useEffect(() => {
        const controller = new AbortController();

        searchProducts(
            {
                search:
                    searchTerm.trim() || undefined,

                categoryId:
                    selectedCategoryId,

                brandId:
                    selectedBrandId,

                minPrice,

                maxPrice,

                minRating,

                sortBy:
                    sortBy || undefined,

                sortOrder:
                    sortOrder || undefined,

                page: currentPage,

                pageSize:
                    PRODUCTS_PER_PAGE,
            },
            controller.signal
        )
            .then(
                (
                    response: ProductSearchResponse
                ) => {
                    if (controller.signal.aborted) {
                        return;
                    }

                    setProducts(response.products);
                    setTotalRecords(
                        response.totalRecords
                    );
                    setTotalPages(
                        response.totalPages
                    );
                    setLoading(false);
                }
            )
            .catch((requestError: unknown) => {
                if (
                    controller.signal.aborted ||
                    isAbortError(requestError)
                ) {
                    return;
                }

                console.error(requestError);

                setError(
                    "Failed to load products."
                );
                setLoading(false);
            });

        return () => {
            controller.abort();
        };
    }, [
        searchTerm,
        selectedCategoryId,
        selectedBrandId,
        minPrice,
        maxPrice,
        minRating,
        sortBy,
        sortOrder,
        currentPage,
    ]);

    useEffect(() => {
        const controller = new AbortController();

        Promise.all([
            fetchCategories(controller.signal),
            fetchBrands(controller.signal),
        ])
            .then(
                ([
                    loadedCategories,
                    loadedBrands,
                ]) => {
                    if (controller.signal.aborted) {
                        return;
                    }

                    setCategories(loadedCategories);
                    setBrands(loadedBrands);
                }
            )
            .catch((requestError: unknown) => {
                if (
                    controller.signal.aborted ||
                    isAbortError(requestError)
                ) {
                    return;
                }

                console.error(
                    "Failed to load filters:",
                    requestError
                );
            });;

        return () => {
            controller.abort();
        };
    }, []);

    function handleSearchChange(value: string) {
        setLoading(true);
        setError(null);

        setSearchTerm(value);
        setCurrentPage(1);

        setSearchParams((currentParams) => {
            const params = new URLSearchParams(
                currentParams
            );

            if (value.trim()) {
                params.set(
                    "search",
                    value.trim()
                );
            } else {
                params.delete("search");
            }

            params.delete("page");

            return params;
        });
    }

    function handleBrandChange(
        brandId: number | undefined
    ) {
        setLoading(true);
        setError(null);

        setSelectedBrandId(brandId);
        setCurrentPage(1);

        setSearchParams((params) => {
            const nextParams =
                new URLSearchParams(params);

            if (brandId !== undefined) {
                nextParams.set(
                    "brandId",
                    String(brandId)
                );
            } else {
                nextParams.delete("brandId");
            }

            nextParams.delete("page");

            return nextParams;
        });
    }

    function handlePriceChange(
        nextMinPrice: number | undefined,
        nextMaxPrice: number | undefined
    ) {
        setLoading(true);
        setError(null);

        setMinPrice(nextMinPrice);
        setMaxPrice(nextMaxPrice);
        setCurrentPage(1);

        setSearchParams((params) => {
            const nextParams =
                new URLSearchParams(params);

            if (nextMinPrice !== undefined) {
                nextParams.set(
                    "minPrice",
                    String(nextMinPrice)
                );
            } else {
                nextParams.delete("minPrice");
            }

            if (nextMaxPrice !== undefined) {
                nextParams.set(
                    "maxPrice",
                    String(nextMaxPrice)
                );
            } else {
                nextParams.delete("maxPrice");
            }

            nextParams.delete("page");

            return nextParams;
        });
    }

    function handleRatingChange(
        rating: number | undefined
    ) {
        setLoading(true);
        setError(null);

        setMinRating(rating);
        setCurrentPage(1);

        setSearchParams((params) => {
            const nextParams =
                new URLSearchParams(params);

            if (rating !== undefined) {
                nextParams.set(
                    "minRating",
                    String(rating)
                );
            } else {
                nextParams.delete("minRating");
            }

            nextParams.delete("page");

            return nextParams;
        });
    }

    function handleCategoryChange(
        categoryId: number
    ) {
        setLoading(true);
        setError(null);

        setSelectedCategoryId((current) => {
            const next =
                current === categoryId
                    ? undefined
                    : categoryId;

            setSearchParams((params) => {
                const nextParams =
                    new URLSearchParams(params);

                if (next !== undefined) {
                    nextParams.set(
                        "categoryId",
                        String(next)
                    );
                } else {
                    nextParams.delete(
                        "categoryId"
                    );
                }

                nextParams.delete("page");

                return nextParams;
            });

            return next;
        });

        setCurrentPage(1);
    }

    function handleSortChange(
        value: string
    ) {
        setLoading(true);
        setError(null);

        let nextSortBy = "";
        let nextSortOrder = "";

        if (value) {
            const [field, order] =
                value.split("-");

            nextSortBy = field;
            nextSortOrder = order;
        }

        setSortBy(nextSortBy);
        setSortOrder(nextSortOrder);
        setCurrentPage(1);

        setSearchParams((params) => {
            const nextParams =
                new URLSearchParams(params);

            if (nextSortBy) {
                nextParams.set(
                    "sortBy",
                    nextSortBy
                );

                nextParams.set(
                    "sortOrder",
                    nextSortOrder
                );
            } else {
                nextParams.delete("sortBy");
                nextParams.delete("sortOrder");
            }

            nextParams.delete("page");

            return nextParams;
        });
    }

    function refreshProducts() {
        setLoading(true);
        setError(null);

        setSearchTerm("");
        setSelectedCategoryId(undefined);
        setSelectedBrandId(undefined);

        setMinPrice(undefined);
        setMaxPrice(undefined);
        setMinRating(undefined);

        setSortBy("");
        setSortOrder("");

        setCurrentPage(1);

        setSearchParams({});
    }

    const selectedCategoryIds =
        selectedCategoryId === undefined
            ? []
            : [selectedCategoryId];

    const selectedCategoryNames =
        categories
            .filter((category) =>
                selectedCategoryIds.includes(
                    category.categoryId
                )
            )
            .map((category) => category.name);

    const sortValue =
        sortBy && sortOrder
            ? `${sortBy}-${sortOrder}`
            : "";

    return (
        <>
            <Header
                showSearch
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
            />

            <main className="min-h-screen bg-gray-100">
                <div className="mx-auto max-w-6xl px-6 py-8">
                    {/* Header */}
                    <div className="mb-5 flex items-end justify-between">
                        <div>
                            <p className="mb-1 text-xs text-gray-500">
                                Home &gt; Products &gt; Search
                                Results
                            </p>

                            <h1 className="text-2xl font-bold text-gray-900">
                                Product Listing
                            </h1>
                        </div>

                        <Button
                            variant="primary"
                            onClick={refreshProducts}
                        >
                            Refresh
                        </Button>
                    </div>

                    {/* Product count */}
                    {!loading && !error && (
                        <p className="mb-4 text-center text-xs text-gray-500">
                            Showing{" "}
                            {products.length} of{" "}
                            {totalRecords} products
                            {searchTerm.trim()
                                ? ` for "${searchTerm}"`
                                : ""}
                        </p>
                    )}

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[190px_1fr] lg:gap-6">
                        <ProductFilters
                            categories={categories.map(
                                (category) => category.name
                            )}
                            selectedCategories={
                                selectedCategoryNames
                            }
                            onToggleCategory={
                                (categoryName) => {
                                    const category =
                                        categories.find(
                                            (item) =>
                                                item.name ===
                                                categoryName
                                        );

                                    if (category) {
                                        handleCategoryChange(
                                            category.categoryId
                                        );
                                    }
                                }
                            }

                            brands={brands}
                            selectedBrandId={selectedBrandId}
                            onBrandChange={handleBrandChange}

                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            onPriceChange={handlePriceChange}

                            minRating={minRating}
                            onRatingChange={handleRatingChange}

                            sortOption={sortValue}
                            onSortChange={handleSortChange}
                        />

                        <section>
                            {loading ? (
                                <ProductSkeleton />
                            ) : error ? (
                                <ProductError
                                    message={error}
                                    onRetry={
                                        refreshProducts
                                    }
                                />
                            ) : products.length > 0 ? (
                                <>
                                    <ProductGrid
                                        products={
                                            products
                                        }
                                    />

                                    <Pagination
                                        currentPage={
                                            currentPage
                                        }
                                        totalPages={
                                            totalPages
                                        }
                                        onPageChange={(page) => {
                                            setLoading(true);
                                            setError(null);
                                            setCurrentPage(page);

                                            setSearchParams((params) => {
                                                const nextParams =
                                                    new URLSearchParams(params);

                                                nextParams.set(
                                                    "page",
                                                    String(page)
                                                );

                                                return nextParams;
                                            });
                                        }}
                                    />
                                </>
                            ) : (
                                <div className="rounded-sm border border-gray-200 bg-white p-10 text-center">
                                    <p className="mb-2 text-base font-semibold text-gray-800">
                                        No products found
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Try changing your
                                        search or filters.
                                    </p>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ProductList;