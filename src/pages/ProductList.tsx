import { useEffect, useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import ProductError from "../components/ProductError";
import ProductFilters from "../components/ProductFilters";
import ProductGrid from "../components/ProductGrid";
import ProductSkeleton from "../components/ProductSkeleton";
import { fetchProducts } from "../services/productService";
import type { Product, SortOption } from "../types/product";
import { getCategories } from "../utils/category";

function isAbortError(error: unknown): boolean {
    return error instanceof DOMException && error.name === "AbortError";
}

function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedCategories, setSelectedCategories] =
        useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState<SortOption>("");

    useEffect(() => {
        const controller = new AbortController();

        fetchProducts(controller.signal)
            .then((loadedProducts) => {
                if (controller.signal.aborted) {
                    return;
                }

                setProducts(loadedProducts);
                setLoading(false);
            })
            .catch((requestError: unknown) => {
                if (controller.signal.aborted || isAbortError(requestError)) {
                    return;
                }

                console.error(requestError);
                setError("Failed to load products.");
                setLoading(false);
            });

        return () => {
            controller.abort();
        };
    }, [refreshKey]);

    function refreshProducts() {
        setLoading(true);
        setError(null);
        setRefreshKey((current) => current + 1);
    }

    function toggleCategory(category: string) {
        setSelectedCategories((currentCategories) =>
            currentCategories.includes(category)
                ? currentCategories.filter(
                    (currentCategory) =>
                        currentCategory !== category
                )
                : [...currentCategories, category]
        );
    }

    // 1. Search
    const searchedProducts = products.filter((product) =>
        product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    // 2. Category
    const filteredProducts =
        selectedCategories.length === 0
            ? searchedProducts
            : searchedProducts.filter((product) =>
                selectedCategories.includes(product.category)
            );

    // 3. Sort
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case "price-asc":
                return a.price - b.price;

            case "price-desc":
                return b.price - a.price;

            case "name-asc":
                return a.name.localeCompare(b.name);

            case "name-desc":
                return b.name.localeCompare(a.name);

            case "rating-asc":
                return a.rating - b.rating;

            case "rating-desc":
                return b.rating - a.rating;

            default:
                return 0;
        }
    });

    const categories = getCategories(
        products.map((product) => product.category)
    );

    return (
        <>
            <Header
                showSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <main className="min-h-screen bg-gray-100">
                <div className="mx-auto max-w-6xl px-6 py-8">

                    {/* Page Header */}
                    <div className="mb-5 flex items-end justify-between">
                        <div>
                            <p className="mb-1 text-xs text-gray-500">
                                Home &gt; Products &gt; Search Results
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

                    {/* Search */}
                    <div className="mb-4">
                    </div>

                    {/* Result Count */}
                    {!loading && !error && (
                        <p className="mb-4 text-xs text-gray-500 text-center" >
                            Showing {sortedProducts.length} results
                            {searchTerm.trim()
                                ? ` for "${searchTerm}"`
                                : ""}
                        </p>
                    )}

                    {/* Main Content */}
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[190px_1fr] lg:gap-6">

                        {/* Sidebar */}
                        <ProductFilters
                            categories={categories}
                            selectedCategories={selectedCategories}
                            onToggleCategory={toggleCategory}
                            sortOption={sortOption}
                            onSortChange={setSortOption}
                        />

                        {/* Products */}
                        <section>
                            {loading ? (
                                <ProductSkeleton />
                            ) : error ? (
                                <ProductError
                                    message={error}
                                    onRetry={refreshProducts}
                                />
                            ) : sortedProducts.length > 0 ? (
                                <ProductGrid
                                    products={sortedProducts}
                                />
                            ) : (
                                <div className="rounded-sm border border-gray-200 bg-white p-10 text-center">
                                    <p className="mb-2 text-base font-semibold text-gray-800">
                                        No products found
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Try changing your search or filters.
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