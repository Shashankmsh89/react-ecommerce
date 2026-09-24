import type { DummyJsonProduct, Product } from "../types/product";

export function transformProduct(apiProduct: DummyJsonProduct): Product {
    return {
        id: apiProduct.id,
        name: apiProduct.title,
        price: apiProduct.price,
        category: apiProduct.category,
        productCode: `DUM-${apiProduct.id}`,
        image: apiProduct.thumbnail,
    };
}