import { useState } from "react";
import ProductCard from "../components/ProductCard";

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    productCode: string;
    unitsPrice?: number;
}

const products: Product[] = [
    {
        id: 1,
        name: "iPhone 16 Pro",
        price: 119999,
        category: "Smartphone",
        productCode: "IPH-16P",
        unitsPrice: 119999,
        image:
            "https://upgreat.ee/ugvam/resource/images/IPHONE_16PRO--white_titanium--1.jpg",
    },
    {
        id: 2,
        name: "Samsung Galaxy S25",
        price: 79999,
        category: "Smartphone",
        productCode: "SAM-S25",
        unitsPrice: 79999,
        image:
            "https://cdn.idealo.com/folder/Product/205569/4/205569450/s4_produktbild_max/samsung-galaxy-s25.jpg",
    },
    {
        id: 3,
        name: "Nike Air Max 270",
        price: 12999,
        category: "Shoes",
        productCode: "NIK-AM270",
        unitsPrice: 12999,
        image:
            "https://static.ftshp.digital/img/p/4/2/3/9/4/3/423943.jpg",
    },
    {
        id: 4,
        name: "Sony WH-1000XM5",
        price: 29999,
        category: "Headphones",
        productCode: "SON-XM5",
        unitsPrice: 29999,
        image:
            "https://www.pakbyte.pk/cdn/shop/files/Sony-WH-1000XM5-Wireless-Headphones-Midnight-Blue-PakByte-Computers-26342357532739.jpg?v=1753669596",
    },
    {
        id: 5,
        name: "Apple Watch Series 10",
        price: 46999,
        category: "Smartwatch",
        productCode: "APL-W10",
        unitsPrice: 46999,
        image:
            "https://upload.wikimedia.org/wikipedia/commons/2/2e/Apple_Watch_Series_10.jpeg",
    },
    {
        id: 6,
        name: "Adidas Ultraboost",
        price: 14999,
        category: "Shoes",
        productCode: "ADI-UB",
        unitsPrice: 14999,
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },
];

function ProductList() {
    const [selectedCategories, setSelectedCategories] =
        useState<string[]>([]);

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

    return (
        <main className="min-h-screen bg-gray-100">
            {/* Page Container */}
            <div className="mx-auto max-w-6xl px-6 py-8">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <p className="mb-1 text-xs text-gray-500">
                            Home &gt; Products &gt; Search Results
                        </p>

                        <h1 className="text-2xl font-bold text-gray-900">
                            Product Listing
                        </h1>
                    </div>

                    <p className="text-xs text-gray-500">
                        Sort by: Price | Name | Rating
                    </p>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[190px_1fr]">
                    {/* Filters */}
                    <aside className="h-fit rounded-sm border border-gray-200 bg-white p-4">
                        <h2 className="mb-4 border-b-2 border-orange-500 pb-2 text-sm font-bold">
                            FILTERS
                        </h2>

                        <div>
                            <h3 className="mb-2 text-xs font-bold">
                                Category
                            </h3>

                            <div className="space-y-2 text-xs text-gray-600">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes("Smartphone")}
                                        onChange={() =>
                                            toggleCategory("Smartphone")
                                        }
                                    />
                                    Smartphones
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes("Shoes")}
                                        onChange={() =>
                                            toggleCategory("Shoes")
                                        }
                                    />
                                    Shoes
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes("Headphones")}
                                        onChange={() =>
                                            toggleCategory("Headphones")
                                        }
                                    />
                                    Headphones
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes("Smartwatch")}
                                        onChange={() =>
                                            toggleCategory("Smartwatch")
                                        }
                                    />
                                    Smartwatches
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes("Laptop")}
                                        onChange={() =>
                                            toggleCategory("Laptop")
                                        }
                                    />
                                    Laptops
                                </label>
                            </div>
                        </div>

                        {/* Price Range - visual only */}
                        <div className="mt-6">
                            <h3 className="mb-2 text-xs font-bold">
                                Price Range
                            </h3>

                            <div className="space-y-2 text-xs text-gray-600">
                                <p>□ ₹0 - ₹500</p>
                                <p>□ ₹500 - ₹5,000</p>
                                <p>□ ₹5,000 - ₹50,000</p>
                                <p>□ ₹50,000+</p>
                            </div>
                        </div>

                        {/* Rating - visual only */}
                        <div className="mt-6">
                            <h3 className="mb-2 text-xs font-bold">
                                Rating
                            </h3>

                            <div className="space-y-2 text-xs text-gray-600">
                                <p>□ 4 Stars &amp; Up</p>
                                <p>□ 3 Stars &amp; Up</p>
                            </div>
                        </div>
                    </aside>

                    {/* Products */}
                    <section>
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        name={product.name}
                                        imageUrl={product.image}
                                        price={product.price}
                                        unitPrice={product.unitsPrice}
                                        productCode={product.productCode}
                                        variant="listing"
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-sm border border-gray-200 bg-white p-10 text-center">
                                <p className="text-sm text-gray-600">
                                    No products found in this
                                    category.
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