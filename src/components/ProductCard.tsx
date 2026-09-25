import { useState } from "react";
import Button from "./Button";

interface ProductCardProps {
    name: string;
    imageUrl: string;
    rating?: number;
    reviewCount?: number;
    productCode?: string;
    price?: number;
    unitPrice?: number;
    discountPercentage?: number;
    variant?: "featured" | "listing";
}

function ProductCard({
    name,
    imageUrl,
    rating,
    reviewCount,
    productCode,
    price,
    unitPrice,
    discountPercentage,
    variant = "featured",
}: ProductCardProps) {
    const [quantity, setQuantity] = useState(1);

    const totalPrice =
        price !== undefined ? price * quantity : undefined;

    const originalPrice =
        discountPercentage !== undefined && discountPercentage > 0 && price !== undefined
            ? price / (1 - discountPercentage / 100)
            : price;

    function increaseQuantity() {
        setQuantity(
            (currentQuantity) => currentQuantity + 1
        );
    }

    function decreaseQuantity() {
        setQuantity((currentQuantity) =>
            Math.max(1, currentQuantity - 1)
        );
    }

    function handleAddToCart() {
        console.log(
            `Added to cart: ${name} | Quantity: ${quantity} | Total: ₹${totalPrice ?? 0}`
        );
    }

    return (
        <article className="flex h-full flex-col bg-white">
            {/* Product Image */}
            {/* Product Image */}
            <div className="relative flex h-44 items-center justify-center overflow-hidden bg-white p-4">
                {discountPercentage !== undefined &&
                    discountPercentage >= 10 && (
                        <span className="absolute left-2 top-2 z-10 rounded-sm bg-orange-500 px-2 py-1 text-[10px] font-bold text-white">
                            SALE
                        </span>
                    )}

                <img
                    src={imageUrl}
                    alt={name}
                    className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                />
            </div>

            {/* Product Information */}
            <div className="flex flex-1 flex-col px-4 pb-5 text-center">
                <h3 className="min-h-12 text-sm font-bold uppercase leading-5 text-orange-500">
                    {name}
                </h3>

                {productCode && (
                    <p className="mt-1 text-xs text-gray-500">
                        #{productCode}
                    </p>
                )}

                {unitPrice && (
                    <p className="mt-1 text-xs text-gray-500">
                        #{unitPrice}
                    </p>
                )}

                {variant === "listing" && price !== undefined && (
                    <div className="mt-2">
                        {discountPercentage !== undefined &&
                            discountPercentage >= 10 && (
                                <p className="text-xs text-gray-400 line-through">
                                    ₹{originalPrice?.toLocaleString("en-IN")}
                                </p>
                            )}

                        <p className="text-lg font-bold text-orange-500">
                            ₹{totalPrice?.toLocaleString("en-IN")}
                        </p>
                    </div>
                )}

                {variant === "featured" &&
                    price !== undefined && (
                        <p className="mt-2 text-sm font-semibold text-gray-600">
                            ₹{price.toLocaleString("en-IN")}
                        </p>
                    )}

                {rating !== undefined && (
                    <div className="mt-2 text-xs text-gray-500">
                        <span className="text-yellow-500">
                            ★★★★★
                        </span>{" "}
                        {rating}

                        {reviewCount !== undefined && (
                            <span>
                                {" "}
                                ({reviewCount})
                            </span>
                        )}
                    </div>
                )}

                {/* Quantity Selector - Listing Only */}
                {variant === "listing" && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                        <span className="text-xs font-medium text-gray-500">
                            QTY:
                        </span>

                        <button
                            type="button"
                            onClick={decreaseQuantity}
                            disabled={quantity === 1}
                            className="flex h-7 w-7 items-center justify-center rounded border border-gray-300 text-sm font-bold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            −
                        </button>

                        <span className="flex h-7 min-w-8 items-center justify-center rounded border border-gray-300 px-2 text-sm font-semibold">
                            {quantity}
                        </span>

                        <button
                            type="button"
                            onClick={increaseQuantity}
                            className="flex h-7 w-7 items-center justify-center rounded border border-gray-300 text-sm font-bold text-gray-700 transition hover:bg-gray-100"
                        >
                            +
                        </button>
                    </div>
                )}

                {/* Add To Cart */}
                <div className="mt-4">
                    <Button
                        variant="primary"
                        onClick={handleAddToCart}
                    >
                        ADD TO CART
                    </Button>
                </div>

                {/* Shopping List only for Featured */}
                {variant === "featured" && (
                    <button
                        type="button"
                        className="mt-3 text-xs font-bold text-orange-500 hover:text-orange-600"
                    >
                        + SHOPPING LIST
                    </button>
                )}
            </div>
        </article>
    );
}

export default ProductCard;