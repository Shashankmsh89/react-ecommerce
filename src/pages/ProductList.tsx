import { useEffect, useState } from "react";
import ProductError from "../components/ProductError";
import ProductFilters from "../components/ProductFilters";
import ProductGrid from "../components/ProductGrid";
import ProductSkeleton from "../components/ProductSkeleton";
import { fetchProducts } from "../services/productService";
import type { Product } from "../types/product";
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

    const filteredProducts =
        selectedCategories.length === 0
            ? products
            : products.filter((product) =>
                selectedCategories.includes(product.category)
            );

    const categories = getCategories(products.map((product) => product.category));

    return (
        <main className="min-h-screen bg-gray-100">
            <div className="mx-auto max-w-6xl px-6 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <p className="mb-1 text-xs text-gray-500">
                            Home &gt; Products &gt; Search Results
                        </p>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Product Listing
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="text-xs text-gray-500">
                            Sort by: Price | Name | Rating
                        </p>
                        <button
                            onClick={refreshProducts}
                            className="rounded-sm bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-600"
                        >
                            Refresh
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[190px_1fr]">
                    <ProductFilters
                        categories={categories}
                        selectedCategories={selectedCategories}
                        onToggleCategory={toggleCategory}
                    />

                    <section>
                        {loading ? (
                            <ProductSkeleton />
                        ) : error ? (
                            <ProductError
                                message={error}
                                onRetry={refreshProducts}
                            />
                        ) : filteredProducts.length > 0 ? (
                            <ProductGrid products={filteredProducts} />
                        ) : (
                            <div className="rounded-sm border border-gray-200 bg-white p-10 text-center">
                                <p className="text-sm text-gray-600">
                                    No products found in this category.
                                </p>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}

export default ProductList;