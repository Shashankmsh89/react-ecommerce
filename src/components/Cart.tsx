
import { Link } from "react-router-dom";
import type { CartItem as CartItemType } from "../types/cart";
import CartItem from "./CartItem";

interface CartProps {
    items: CartItemType[];
    onQuantityChange: (
        productId: number,
        quantity: number
    ) => void;
    onRemove: (productId: number) => void;
}

function Cart({
    items,
    onQuantityChange,
    onRemove,
}: CartProps) {
    const subtotal = items.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const totalItems = items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6">
            <div className="mx-auto max-w-6xl">
                {/* Breadcrumb */}
                <nav className="mb-4 text-xs text-gray-500">
                    <Link
                        to="/"
                        className="hover:text-orange-500"
                    >
                        Home
                    </Link>

                    <span className="mx-2">&gt;</span>

                    <span>Shopping Cart</span>
                </nav>

                <h1 className="mb-6 text-2xl font-bold text-gray-900">
                    Shopping Cart ({totalItems}{" "}
                    {totalItems === 1 ? "Item" : "Items"})
                </h1>

                {items.length === 0 ? (
                    /* Empty cart */
                    <section className="border border-gray-200 bg-white px-6 py-16 text-center">
                        <div className="mb-4 text-5xl text-gray-300">
                            🛒
                        </div>

                        <h2 className="mb-2 text-xl font-bold text-gray-800">
                            Your cart is empty
                        </h2>

                        <p className="mb-6 text-sm text-gray-500">
                            Browse our products and add
                            something you love.
                        </p>

                        <Link
                            to="/products"
                            className="inline-flex bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
                        >
                            CONTINUE SHOPPING
                        </Link>
                    </section>
                ) : (
                    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_280px]">
                        {/* Cart item list */}
                        <section className="min-w-0 overflow-hidden border border-gray-200 bg-white">
                            <div className="hidden grid-cols-[1fr_100px_110px_110px] gap-4 bg-gray-900 px-4 py-3 text-xs font-bold uppercase text-white sm:grid">
                                <span>Product</span>
                                <span className="text-center">
                                    Unit Price
                                </span>
                                <span className="text-center">
                                    Qty
                                </span>
                                <span className="text-center">
                                    Total
                                </span>
                            </div>

                            {items.map((item) => (
                                <CartItem
                                    key={item.productId}
                                    item={item}
                                    onQuantityChange={
                                        onQuantityChange
                                    }
                                    onRemove={onRemove}
                                />
                            ))}
                        </section>

                        {/* Order summary */}
                        <aside className="border border-gray-200 bg-white p-5">
                            <h2 className="mb-5 border-b border-gray-200 pb-3 text-sm font-bold uppercase text-gray-800">
                                Order Summary
                            </h2>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between gap-3">
                                    <span className="text-gray-500">
                                        Subtotal ({totalItems}{" "}
                                        items)
                                    </span>

                                    <span className="font-medium text-gray-800">
                                        ₹{subtotal.toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-3">
                                    <span className="text-gray-500">
                                        Shipping
                                    </span>

                                    <span className="text-gray-800">
                                        Calculated at checkout
                                    </span>
                                </div>
                            </div>

                            <div className="mt-5 flex items-center justify-between border-t-2 border-orange-500 pt-4">
                                <span className="font-bold text-gray-900">
                                    Subtotal
                                </span>

                                <span className="text-xl font-bold text-orange-600">
                                    ₹{subtotal.toFixed(2)}
                                </span>
                            </div>

                            <p className="mt-2 text-xs text-gray-400">
                                Taxes and shipping are not
                                included.
                            </p>

                            <Link
                                to="/checkout/controlled"
                                className="mt-5 flex w-full items-center justify-center bg-orange-500 px-4 py-3 text-center text-xs font-bold text-white transition hover:bg-orange-600"
                            >
                                PROCEED TO CHECKOUT
                            </Link>

                            <Link
                                to="/products"
                                className="mt-3 flex w-full items-center justify-center border border-gray-300 px-4 py-3 text-center text-xs font-bold text-gray-700 transition hover:bg-gray-50"
                            >
                                CONTINUE SHOPPING
                            </Link>
                        </aside>
                    </div>
                )}
            </div>
        </main>
    );
}

export default Cart;
