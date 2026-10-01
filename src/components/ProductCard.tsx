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
        discountPercentage !== undefined &&
            discountPercentage > 0 &&
            price !== undefined
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
        <article
            className="
                group
                flex h-full flex-col
                overflow-hidden
                rounded-sm
                border border-gray-200
                bg-white
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-lg
            "
        >
            {/* Product Image */}
            <div
                className="
                    relative
                    flex h-52
                    items-center justify-center
                    overflow-hidden
                    border-b border-gray-100
                    bg-gray-50
                    p-5
                "
            >
                {discountPercentage !== undefined &&
                    discountPercentage >= 10 && (
                        <span
                            className="
                                absolute left-3 top-3 z-10
                                rounded-sm
                                bg-orange-500
                                px-2.5 py-1
                                text-[10px] font-bold uppercase
                                tracking-wide text-white
                                shadow-sm
                            "
                        >
                            SALE
                        </span>
                    )}

                <img
                    src={imageUrl}
                    alt={name}
                    className="
                        h-full w-full
                        object-contain
                        transition-transform duration-500
                        ease-out
                        group-hover:scale-110
                    "
                />
            </div>

            {/* Product Information */}
            <div
                className="
                    flex flex-1 flex-col
                    px-4 pb-5 pt-4
                "
            >
                {/* Product Name */}
                <h3
                    className="
                        min-h-12
                        text-center
                        text-sm font-bold uppercase
                        leading-5
                        text-gray-800
                        transition-colors
                        group-hover:text-orange-500
                    "
                >
                    {name}
                </h3>

                {/* Product Code */}
                {productCode && (
                    <p className="mt-1 text-center text-xs text-gray-400">
                        #{productCode}
                    </p>
                )}

                {/* Unit Price */}
                {unitPrice && (
                    <p className="mt-1 text-center text-xs text-gray-500">
                        #{unitPrice}
                    </p>
                )}

                {/* Listing Price */}
                {variant === "listing" &&
                    price !== undefined && (
                        <div className="mt-3 text-center">
                            {discountPercentage !== undefined &&
                                discountPercentage >= 10 && (
                                    <p className="text-xs text-gray-400 line-through">
                                        ₹
                                        {originalPrice?.toLocaleString(
                                            "en-IN"
                                        )}
                                    </p>
                                )}

                            <p
                                className="
                                    text-lg font-bold
                                    text-orange-500
                                "
                            >
                                ₹
                                {totalPrice?.toLocaleString(
                                    "en-IN"
                                )}
                            </p>
                        </div>
                    )}

                {/* Featured Price */}
                {variant === "featured" &&
                    price !== undefined && (
                        <p className="mt-3 text-center text-sm font-semibold text-gray-700">
                            ₹{price.toLocaleString("en-IN")}
                        </p>
                    )}

                {/* Rating */}
                {rating !== undefined && (
                    <div
                        className="
                            mt-3
                            flex items-center justify-center
                            gap-1
                            text-xs text-gray-500
                        "
                    >
                        <span
                            aria-label={`Rating ${rating} out of 5`}
                            className="tracking-wide text-yellow-500"
                        >
                            ★★★★★
                        </span>

                        <span>{rating}</span>

                        {reviewCount !== undefined && (
                            <span className="text-gray-400">
                                ({reviewCount})
                            </span>
                        )}
                    </div>
                )}

                {/* Quantity Selector - Listing Only */}
                {variant === "listing" && (
                    <div
                        className="
                            mt-4
                            flex items-center justify-center gap-2
                        "
                    >
                        <span className="text-xs font-semibold uppercase text-gray-500">
                            Qty:
                        </span>

                        <button
                            type="button"
                            onClick={decreaseQuantity}
                            disabled={quantity === 1}
                            aria-label="Decrease quantity"
                            className="
                                flex h-8 w-8
                                items-center justify-center
                                rounded-sm
                                border border-gray-300
                                bg-white
                                text-sm font-bold text-gray-700
                                transition-colors
                                hover:border-orange-500
                                hover:bg-orange-50
                                hover:text-orange-500
                                focus:outline-none
                                focus:ring-2
                                focus:ring-orange-500
                                focus:ring-offset-1
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                            "
                        >
                            −
                        </button>

                        <span
                            aria-live="polite"
                            className="
                                flex h-8 min-w-9
                                items-center justify-center
                                rounded-sm
                                border border-gray-300
                                bg-gray-50
                                px-2
                                text-sm font-semibold
                                text-gray-800
                            "
                        >
                            {quantity}
                        </span>

                        <button
                            type="button"
                            onClick={increaseQuantity}
                            aria-label="Increase quantity"
                            className="
                                flex h-8 w-8
                                items-center justify-center
                                rounded-sm
                                border border-gray-300
                                bg-white
                                text-sm font-bold text-gray-700
                                transition-colors
                                hover:border-orange-500
                                hover:bg-orange-50
                                hover:text-orange-500
                                focus:outline-none
                                focus:ring-2
                                focus:ring-orange-500
                                focus:ring-offset-1
                            "
                        >
                            +
                        </button>
                    </div>
                )}

                {/* Add To Cart */}
                <div className="mt-auto flex justify-center pt-4">
                    <Button
                        variant="primary"
                        onClick={handleAddToCart}
                    >
                        ADD TO CART
                    </Button>
                </div>

                {/* Shopping List - Featured Only */}
                {variant === "featured" && (
                    <button
                        type="button"
                        className="
                            mt-3
                            text-center
                            text-xs font-bold
                            text-orange-500
                            transition-colors
                            hover:text-orange-600
                            focus:outline-none
                            focus:ring-2
                            focus:ring-orange-500
                            focus:ring-offset-2
                        "
                    >
                        + SHOPPING LIST
                    </button>
                )}
            </div>
        </article>
    );
}

export default ProductCard;