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
    const featuredProducts = products.slice(0, 4);

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
                                    className="h-9 bg-orange-500 px-5 text-[11px] font-bold text-white hover:bg-orange-600"
                                >
                                    SEARCH
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

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

                        {/* Aftermarket Products */}
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

                        {/* Interactive Parts */}
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

                        {/* Technical Publications */}
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

                {/* Featured Products */}
                <section className="px-3 py-5">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-6 text-center text-xl font-bold">
                            Featured Products
                        </h2>

                        <div className="grid grid-cols-2 gap-0 md:grid-cols-4">
                            {featuredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="border-b border-gray-200 px-3"
                                >
                                    <ProductCard
                                        name={product.name}
                                        imageUrl={product.imageUrl}
                                        productCode={product.productCode}
                                        rating={product.rating}
                                        reviewCount={product.reviewCount}
                                        price={product.Price}
                                        variant="featured"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Carousel dots */}
                        <div className="mt-5 flex justify-center gap-1">
                            {Array.from({ length: 12 }).map((_, index) => (
                                <span
                                    key={index}
                                    className="h-1.5 w-1.5 rounded-full bg-gray-500"
                                />
                            ))}
                        </div>
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