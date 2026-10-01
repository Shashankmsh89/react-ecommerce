import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

import products from "../data/products";

import {
    CreditCard,
    Headphones,
    Truck,
} from "lucide-react";

const categories = [
    "Accessories/Options",
    "Technical Attachments",
    "Engine Parts",
    "Reman Parts",
    "Service Kits",
    "Oil",
    "Filters",
    "Aftermarket Attachments",
];

function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [visibleCount, setVisibleCount] = useState(4);

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
                                    placeholder="Search products..."
                                    className="h-9 min-w-0 flex-1 border border-gray-300 bg-white px-3 text-xs outline-none"
                                />

                                <button
                                    type="button"
                                    className="h-9 bg-orange-500 px-5 text-[11px] font-bold text-white transition hover:bg-orange-600"
                                >
                                    SEARCH
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Action Cards */}
                <section className="px-3 py-6">
                    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-0 md:grid-cols-4">
                        {/* Order Now */}
                        <div className="px-5 py-4 text-center">
                            <h2 className="mb-5 text-sm font-bold">
                                Order Now
                            </h2>

                            <p className="mb-8 text-[9px] leading-4 text-gray-500">
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
                            <h2 className="mb-5 text-sm font-bold">
                                Featured Products
                            </h2>

                            <p className="mb-8 text-[9px] leading-4 text-gray-500">
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
                            <h2 className="mb-5 text-sm font-bold">
                                Categories
                            </h2>

                            <p className="mb-8 text-[9px] leading-4 text-gray-500">
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
                            <h2 className="mb-5 text-sm font-bold">
                                Support
                            </h2>

                            <p className="mb-8 text-[9px] leading-4 text-gray-500">
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
                        <h2 className="mb-6 text-center text-xl font-bold text-gray-900">
                            Featured Products
                        </h2>

                        <div className="relative">
                            {/* Previous */}
                            <button
                                type="button"
                                onClick={previousSlide}
                                disabled={currentSlide === 0}
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
                                                key={product.id}
                                                className="min-w-0"
                                            >
                                                <ProductCard
                                                    name={
                                                        product.name
                                                    }
                                                    imageUrl={
                                                        product.imageUrl
                                                    }
                                                    productCode={
                                                        product.productCode
                                                    }
                                                    rating={
                                                        product.rating
                                                    }
                                                    reviewCount={
                                                        product.reviewCount
                                                    }
                                                    price={
                                                        product.Price
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
                                onClick={nextSlide}
                                disabled={
                                    currentSlide >= maxSlide
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
                                    length: maxSlide + 1,
                                }).map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() =>
                                            setCurrentSlide(
                                                index
                                            )
                                        }
                                        aria-label={`Go to featured products slide ${index + 1
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
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Popular Categories */}
                <section className="px-3 py-5">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-4 text-center text-xl font-bold">
                            Popular Categories
                        </h2>

                        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                            {categories.map((category) => (
                                <Link
                                    key={category}
                                    to="/products"
                                    className="flex h-8 items-center justify-center border border-gray-400 bg-white px-2 text-[9px] font-semibold text-orange-500 transition hover:border-orange-500 hover:bg-orange-50"
                                >
                                    {category}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Service Strip */}
                <section className="bg-gray-800 px-4 py-5 text-white">
                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3">
                        {/* Secure Payments */}
                        <div className="flex items-center justify-center gap-3">
                            <CreditCard size={22} />

                            <div>
                                <h3 className="text-[10px] font-bold">
                                    SECURE PAYMENTS
                                </h3>

                                <p className="text-[9px] text-gray-300">
                                    Safe and secure checkout
                                </p>
                            </div>
                        </div>

                        {/* Help Center */}
                        <div className="flex items-center justify-center gap-3">
                            <Headphones size={22} />

                            <div>
                                <h3 className="text-[10px] font-bold">
                                    HELP CENTER
                                </h3>

                                <p className="text-[9px] text-gray-300">
                                    Get help when you need it
                                </p>
                            </div>
                        </div>

                        {/* Reliable Shipping */}
                        <div className="flex items-center justify-center gap-3">
                            <Truck size={22} />

                            <div>
                                <h3 className="text-[10px] font-bold">
                                    RELIABLE SHIPPING
                                </h3>

                                <p className="text-[9px] text-gray-300">
                                    Fast and dependable delivery
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