import type {
    DummyJsonProductResponse,
    Product,
} from "../types/product";
import { transformProduct } from "../utils/productTransform";

const PRODUCTS_URL = "https://dummyjson.com/products";

export async function fetchProducts(signal: AbortSignal): Promise<Product[]> {
    const response = await fetch(PRODUCTS_URL, { signal });

    if (!response.ok) {
        throw new Error("Failed to fetch products.");
    }

    const data: DummyJsonProductResponse = await response.json();

    return data.products.map(transformProduct);
}