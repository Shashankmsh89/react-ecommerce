
import { useState } from "react";
import type { Product } from "../types/ecommerce";
import type { CartItem } from "../types/cart";

function useCart() {
    const [items, setItems] = useState<CartItem[]>([]);

    function addToCart(
        product: Product,
        quantity: number
    ) {
        setItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.productId === product.productId
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.productId === product.productId
                        ? {
                            ...item,
                            quantity: item.quantity + quantity,
                        }
                        : item
                );
            }

            return [
                ...currentItems,
                { ...product, quantity },
            ];
        });
    }

    function updateQuantity(
        productId: number,
        quantity: number
    ) {
        if (quantity < 1) return;

        setItems((currentItems) =>
            currentItems.map((item) =>
                item.productId === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    }

    function removeFromCart(productId: number) {
        setItems((currentItems) =>
            currentItems.filter(
                (item) => item.productId !== productId
            )
        );
    }

    function clearCart() {
        setItems([]);
    }

    const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const totalItems = items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return {
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        totalItems,
    };
}

export default useCart;
