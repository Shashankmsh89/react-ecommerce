import {
    useEffect,
    useReducer,
} from "react";
import type { ReactNode } from "react";
import type { CartItem } from "../types/cart";
import type { Product } from "../types/ecommerce";
import { CartContext } from "./CartContextDefinition";

const CART_STORAGE_KEY = "cartItems";

export type CartAction =
    | {
        type: "ADD_ITEM";
        payload: { product: Product; quantity: number };
    }
    | { type: "REMOVE_ITEM"; payload: { productId: number } }
    | {
        type: "UPDATE_QTY";
        payload: { productId: number; quantity: number };
    }
    | { type: "CLEAR_CART" };

interface CartProviderProps {
    children: ReactNode;
}

function isCartItem(value: unknown): value is CartItem {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const item = value as Record<string, unknown>;

    return (
        typeof item.productId === "number" &&
        Number.isFinite(item.productId) &&
        typeof item.name === "string" &&
        typeof item.description === "string" &&
        typeof item.categoryId === "number" &&
        Number.isFinite(item.categoryId) &&
        typeof item.categoryName === "string" &&
        typeof item.brandId === "number" &&
        Number.isFinite(item.brandId) &&
        typeof item.brandName === "string" &&
        typeof item.price === "number" &&
        Number.isFinite(item.price) &&
        typeof item.rating === "number" &&
        Number.isFinite(item.rating) &&
        typeof item.quantity === "number" &&
        Number.isFinite(item.quantity) &&
        item.quantity >= 1
    );
}

function loadCartItems(): CartItem[] {
    try {
        const storedItems = localStorage.getItem(CART_STORAGE_KEY);

        if (storedItems === null) {
            return [];
        }

        const parsedItems: unknown = JSON.parse(storedItems);

        if (!Array.isArray(parsedItems) || !parsedItems.every(isCartItem)) {
            console.error("Saved cart data is invalid; starting with an empty cart.");
            return [];
        }

        return parsedItems;
    } catch (error: unknown) {
        if (error instanceof SyntaxError) {
            console.error("Saved cart data is not valid JSON; starting with an empty cart.", error);
            return [];
        }

        console.error("Unable to restore cart from localStorage.", error);
        return [];
    }
}

function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
    switch (action.type) {
        case "ADD_ITEM": {
            const { product, quantity } = action.payload;
            const existingItem = items.find(
                (item) => item.productId === product.productId
            );

            if (existingItem) {
                return items.map((item) =>
                    item.productId === product.productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...items, { ...product, quantity }];
        }
        case "REMOVE_ITEM":
            return items.filter(
                (item) => item.productId !== action.payload.productId
            );
        case "UPDATE_QTY":
            if (action.payload.quantity < 1) {
                return items;
            }

            return items.map((item) =>
                item.productId === action.payload.productId
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
        case "CLEAR_CART":
            return [];
    }
}

function CartProvider({ children }: CartProviderProps) {
    const [items, dispatch] = useReducer(
        cartReducer,
        undefined,
        loadCartItems
    );

    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        } catch (error: unknown) {
            console.error("Unable to persist cart to localStorage.", error);
        }
    }, [items]);

    function addToCart(product: Product, quantity: number) {
        dispatch({
            type: "ADD_ITEM",
            payload: { product, quantity },
        });
    }

    function removeFromCart(productId: number) {
        dispatch({
            type: "REMOVE_ITEM",
            payload: { productId },
        });
    }

    function updateQuantity(productId: number, quantity: number) {
        dispatch({
            type: "UPDATE_QTY",
            payload: { productId, quantity },
        });
    }

    function clearCart() {
        dispatch({ type: "CLEAR_CART" });
    }

    const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const totalItems = items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                subtotal,
                totalItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export { CartProvider };
