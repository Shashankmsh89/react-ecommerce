import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    CreditCard,
    Headphones,
    Truck,
} from "lucide-react";

import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

import {
    fetchCategories,
    fetchProducts,
} from "../services/ecommerceService";

import type {
    Category,
    Product,
} from "../types/ecommerce";

function Home() {
    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] =
        useState<Category[]>([]);

    const [loadingProducts, setLoadingProducts] =
        useState(true);

    const [loadingCategories, setLoadingCategories] =
        useState(true);

    const [productsError, setProductsError] =
        useState<string | null>(null);

    const [categoriesError, setCategoriesError] =
        useState<string | null>(null);

    const [searchTerm, setSearchTerm] =
        useState("");

    const [currentSlide, setCurrentSlide] =
        useState(0);

    const [visibleCount, setVisibleCount] =
        useState(4);

    useEffect(() => {
        const controller =
            new AbortController();

        fetchProducts(controller.signal)
            .then((loadedProducts) => {
                if (controller.signal.aborted) {
                    return;
                }

                setProducts(loadedProducts);
                setLoadingProducts(false);
            })
            .catch((requestError: unknown) => {
                if (
                    controller.signal.aborted ||
                    (requestError instanceof DOMException &&
                        requestError.name ===
                        "AbortError")
                ) {
                    return;
                }

                console.error(requestError);

                setProductsError(
                    "Failed to load featured products."
                );

                setLoadingProducts(false);
            });

        fetchCategories(controller.signal)
            .then((loadedCategories) => {
                if (controller.signal.aborted) {
                    return;
                }

                setCategories(loadedCategories);
                setLoadingCategories(false);
            })
            .catch((requestError: unknown) => {
                if (
                    controller.signal.aborted ||
                    (requestError instanceof DOMException &&
                        requestError.name ===
                        "AbortError")
                ) {
                    return;
                }

                console.error(requestError);

                setCategoriesError(
                    "Failed to load categories."
                );

                setLoadingCategories(false);
            });

        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        function updateVisibleCount() {
            if (window.innerWidth < 640) {
                setVisibleCount(1);
            } else if (window.innerWidth < 1024) {
                setVisibleCount(2);
            } else {
                setVisibleCount(4);
            }
        }

        updateVisibleCount();

        window.addEventListener(
            "resize",
            updateVisibleCount
        );

        return () => {
            window.removeEventListener(
                "resize",
                updateVisibleCount
            );
        };
    }, []);

    const maxSlide = Math.max(
        0,
        products.length - visibleCount
    );

    const featuredProducts = products.slice(
        currentSlide,
        currentSlide + visibleCount
    );

    function nextSlide() {
        setCurrentSlide((current) =>
            Math.min(current + 1, maxSlide)
        );
    }

    function previousSlide() {
        setCurrentSlide((current) =>
            Math.max(current - 1, 0)
        );
    }

    function handleSearch() {
        const trimmedSearch =
            searchTerm.trim();

        if (!trimmedSearch) {
            navigate("/products");
            return;
        }

        navigate(
            `/products?search=${encodeURIComponent(
                trimmedSearch
            )}`
        );
    }

    function handleSearchKeyDown(
        event: React.KeyboardEvent<HTMLInputElement>
    ) {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main>
                {/* Hero */}
                <section className="px-3 pt-3">
                    <div
                        className="mx-auto flex h-47.5 max-w-6xl items-center justify-center bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80')",
                        }}
                    >
                        <div className="w-full max-w-xl px-4 text-center">
                            <h1 className="mb-5 text-2xl font-bold uppercase tracking-wide text-white drop-shadow-lg md:text-3xl">
                                Find the Best Products
                                <br />
                                for Your Needs
                            </h1>

                            <div className="mx-auto flex max-w-lg">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(event) =>
                                        setSearchTerm(
                                            event.target.value
                                        )
                                    }
                                    onKeyDown={
                                        handleSearchKeyDown
                                    }
                                    placeholder="Search products..."
                                    aria-label="Search products"
                                    className="h-9 min-w-0 flex-1 border border-gray-300 bg-white px-3 text-sm outline-none"
                                />

                                <button
                                    type="button"
                                    onClick={handleSearch}
                                    className="h-9 bg-orange-500 px-5 text-xs font-bold text-white transition hover:bg-orange-600"
                                >
                                    SEARCH
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Action Cards */}
                {/* Action Cards */}
                <section className="px-3 py-6">
                    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-0 md:grid-cols-4">

                        {/* Order Now */}
                        <div className="px-5 py-4 text-center">
                            <h2 className="mb-5 text-[16px] font-bold leading-tight text-gray-900">
                                Order Now
                            </h2>

                            <p className="mb-8 text-[11px] leading-[1.4] text-gray-500">
                                Already know your part
                                <br />
                                number?
                            </p>

                            <Link to="/products">
                                <Button variant="primary">
                                    ORDER NOW
                                </Button>
                            </Link>
                        </div>

                        {/* Featured Products */}
                        <div className="bg-gray-200 px-5 py-4 text-center">
                            <h2 className="mb-5 text-[16px] font-bold leading-tight text-gray-900">
                                Featured Products
                            </h2>

                            <p className="mb-8 text-[11px] leading-[1.4] text-gray-500">
                                Browse through our popular
                                <br />
                                products.
                            </p>

                            <Link to="/products">
                                <Button variant="primary">
                                    VIEW PRODUCTS
                                </Button>
                            </Link>
                        </div>

                        {/* Categories */}
                        <div className="px-5 py-4 text-center">
                            <h2 className="mb-5 text-[16px] font-bold leading-tight text-gray-900">
                                Categories
                            </h2>

                            <p className="mb-8 text-[11px] leading-[1.4] text-gray-500">
                                Find the right products in
                                <br />
                                our categories.
                            </p>

                            <Link to="/products">
                                <Button variant="primary">
                                    VIEW CATEGORIES
                                </Button>
                            </Link>
                        </div>

                        {/* Support */}
                        <div className="bg-gray-200 px-5 py-4 text-center">
                            <h2 className="mb-5 text-[16px] font-bold leading-tight text-gray-900">
                                Support
                            </h2>

                            <p className="mb-8 text-[11px] leading-[1.4] text-gray-500">
                                Need help with your
                                <br />
                                order?
                            </p>

                            <Button variant="primary">
                                CONTACT US
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Featured Products Carousel */}
                <section className="px-3 py-5">
                    <div className="mx-auto max-w-5xl">
                        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
                            Featured Products
                        </h2>

                        {loadingProducts ? (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {Array.from({
                                    length: visibleCount,
                                }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="overflow-hidden rounded-sm border border-gray-200 bg-white"
                                    >
                                        <div className="h-48 animate-pulse bg-gray-200" />

                                        <div className="space-y-3 p-4">
                                            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />

                                            <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />

                                            <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />

                                            <div className="h-8 w-full animate-pulse rounded bg-gray-200" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : productsError ? (
                            <div className="rounded-sm border border-red-200 bg-red-50 p-8 text-center">
                                <p className="text-sm font-semibold text-red-700">
                                    {productsError}
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        window.location.reload()
                                    }
                                    className="mt-4 text-sm font-semibold text-orange-500 hover:text-orange-600"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="rounded-sm border border-gray-200 bg-white p-8 text-center">
                                <p className="text-sm text-gray-500">
                                    No featured products
                                    <br />
                                    available.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="relative">
                                    {/* Previous */}
                                    <button
                                        type="button"
                                        onClick={
                                            previousSlide
                                        }
                                        disabled={
                                            currentSlide ===
                                            0
                                        }
                                        aria-label="Previous featured products"
                                        className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-lg font-bold text-gray-700 shadow-sm transition hover:border-orange-500 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 disabled:cursor-not-allowed disabled:opacity-30"
                                    >
                                        ‹
                                    </button>

                                    {/* Products */}
                                    <div className="overflow-hidden px-2">
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                            {featuredProducts.map(
                                                (product) => (
                                                    <div
                                                        key={
                                                            product.productId
                                                        }
                                                        className="min-w-0"
                                                    >
                                                        <ProductCard
                                                            name={
                                                                product.name
                                                            }
                                                            imageUrl={`/api/v1/Products/${product.productId}/image`}
                                                            productCode={`PROD-${product.productId}`}
                                                            rating={
                                                                product.rating
                                                            }
                                                            price={
                                                                product.price
                                                            }
                                                            variant="featured"
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Next */}
                                    <button
                                        type="button"
                                        onClick={
                                            nextSlide
                                        }
                                        disabled={
                                            currentSlide >=
                                            maxSlide
                                        }
                                        aria-label="Next featured products"
                                        className="absolute right-0 top-1/2 z-10 flex h-9 w-9 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-lg font-bold text-gray-700 shadow-sm transition hover:border-orange-500 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 disabled:cursor-not-allowed disabled:opacity-30"
                                    >
                                        ›
                                    </button>
                                </div>

                                {/* Carousel Indicators */}
                                {maxSlide > 0 && (
                                    <div
                                        className="mt-5 flex justify-center gap-1.5"
                                        aria-label="Featured product carousel navigation"
                                    >
                                        {Array.from({
                                            length:
                                                maxSlide +
                                                1,
                                        }).map(
                                            (
                                                _,
                                                index
                                            ) => (
                                                <button
                                                    key={
                                                        index
                                                    }
                                                    type="button"
                                                    onClick={() =>
                                                        setCurrentSlide(
                                                            index
                                                        )
                                                    }
                                                    aria-label={`Go to featured products slide ${index +
                                                        1
                                                        }`}
                                                    aria-current={
                                                        currentSlide ===
                                                            index
                                                            ? "true"
                                                            : undefined
                                                    }
                                                    className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/30 ${currentSlide ===
                                                        index
                                                        ? "w-5 bg-orange-500"
                                                        : "w-1.5 bg-gray-400 hover:bg-orange-400"
                                                        }`}
                                                />
                                            )
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>

                {/* Popular Categories */}
                <section className="px-3 py-5">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-4 text-center text-2xl font-bold">
                            Popular Categories
                        </h2>

                        {loadingCategories ? (
                            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                                {Array.from({
                                    length: 8,
                                }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-9 animate-pulse border border-gray-200 bg-gray-100"
                                    />
                                ))}
                            </div>
                        ) : categoriesError ? (
                            <div className="rounded-sm border border-red-200 bg-red-50 p-6 text-center">
                                <p className="text-sm font-semibold text-red-700">
                                    {categoriesError}
                                </p>
                            </div>
                        ) : categories.length === 0 ? (
                            <div className="rounded-sm border border-gray-200 p-6 text-center">
                                <p className="text-sm text-gray-500">
                                    No categories
                                    <br />
                                    available.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                                {categories.map(
                                    (category) => (
                                        <Link
                                            key={
                                                category.categoryId
                                            }
                                            to={`/products?categoryId=${category.categoryId}`}
                                            className="flex h-9 items-center justify-center border border-gray-400 bg-white px-2 text-sm font-semibold text-orange-500 transition hover:border-orange-500 hover:bg-orange-50"
                                        >
                                            {
                                                category.name
                                            }
                                        </Link>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* Service Strip */}
                <section className="bg-gray-800 px-4 py-5 text-white">
                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3">

                        {/* Secure Payments */}
                        <div className="flex items-center justify-center gap-3">
                            <CreditCard size={22} />

                            <div>
                                <h3 className="text-sm font-bold">
                                    SECURE PAYMENTS
                                </h3>

                                <p className="text-xs text-gray-300">
                                    Safe and secure checkout
                                </p>
                            </div>
                        </div>

                        {/* Help Center */}
                        <div className="flex items-center justify-center gap-3">
                            <Headphones size={22} />

                            <div>
                                <h3 className="text-sm font-bold">
                                    HELP CENTER
                                </h3>

                                <p className="text-xs text-gray-300">
                                    Get help when you need it
                                </p>
                            </div>
                        </div>

                        {/* Reliable Shipping */}
                        <div className="flex items-center justify-center gap-3">
                            <Truck size={22} />

                            <div>
                                <h3 className="text-sm font-bold">
                                    RELIABLE SHIPPING
                                </h3>

                                <p className="text-xs text-gray-300">
                                    Fast and dependable
                                    <br />
                                    delivery
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Home;