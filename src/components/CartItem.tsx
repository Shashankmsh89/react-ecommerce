
import type { CartItem as CartItemType } from "../types/cart";

interface CartItemProps {
    item: CartItemType;
    onQuantityChange: (
        productId: number,
        quantity: number
    ) => void;
    onRemove: (productId: number) => void;
}

function CartItem({
    item,
    onQuantityChange,
    onRemove,
}: CartItemProps) {
    const lineTotal = item.price * item.quantity;

    return (
        <article className="grid grid-cols-[1fr_auto] gap-4 border-b border-gray-200 bg-white p-4 sm:grid-cols-[1fr_100px_110px_110px] sm:items-center">
            {/* Product details */}
            <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center bg-gray-50 p-2">
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                        Product
                    </div>
                </div>

                <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800">
                        {item.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                        {item.brandName}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        {item.categoryName}
                    </p>

                    <button
                        type="button"
                        onClick={() => onRemove(item.productId)}
                        className="mt-2 text-xs font-semibold text-red-500 hover:text-red-700"
                    >
                        Remove
                    </button>
                </div>
            </div>

            {/* Unit price */}
            <div className="flex flex-col justify-center sm:items-center">
                <span className="text-xs text-gray-500 sm:hidden">
                    Unit price
                </span>

                <span className="font-medium text-gray-800">
                    ₹{item.price.toFixed(2)}
                </span>
            </div>

            {/* Quantity selector */}
            <div className="flex flex-col justify-center sm:items-center">
                <span className="mb-1 text-xs text-gray-500 sm:hidden">
                    Quantity
                </span>

                <div className="flex items-center">
                    <button
                        type="button"
                        onClick={() =>
                            onQuantityChange(
                                item.productId,
                                item.quantity - 1
                            )
                        }
                        disabled={item.quantity <= 1}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="h-8 w-8 border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        −
                    </button>

                    <span
                        aria-live="polite"
                        className="flex h-8 min-w-9 items-center justify-center border-y border-gray-300 px-2 text-sm"
                    >
                        {item.quantity}
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            onQuantityChange(
                                item.productId,
                                item.quantity + 1
                            )
                        }
                        aria-label={`Increase quantity of ${item.name}`}
                        className="h-8 w-8 border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Line total */}
            <div className="flex flex-col justify-center sm:items-center">
                <span className="text-xs text-gray-500 sm:hidden">
                    Total
                </span>

                <span className="font-bold text-orange-600">
                    ₹{lineTotal.toFixed(2)}
                </span>
            </div>
        </article>
    );
}

export default CartItem;
