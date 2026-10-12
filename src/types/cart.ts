
import type { Product } from "./ecommerce";

export interface CartItem extends Product {
    quantity: number;
}
