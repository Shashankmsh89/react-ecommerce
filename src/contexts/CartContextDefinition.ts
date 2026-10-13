import { createContext } from "react";
import type { CartItem } from "../types/cart";
import type { Product } from "../types/ecommerce";

export interface CartContextValue {
    items: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    subtotal: number;
    totalItems: number;
}

export const CartContext =
    createContext<CartContextValue | undefined>(undefined);
