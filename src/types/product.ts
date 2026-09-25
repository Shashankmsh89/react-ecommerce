export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    productCode: string;
    unitsPrice?: number;
    discountPercentage: number;
    rating: number;
}

export interface DummyJsonProduct {
    id: number;
    title: string;
    price: number;
    category: string;
    thumbnail: string;
    discountPercentage: number;
    rating: number;
}

export interface DummyJsonProductResponse {
    products: DummyJsonProduct[];
    total: number;
    skip: number;
    limit: number;
}

export type SortOption =
    | ""
    | "price-asc"
    | "price-desc"
    | "name-asc"
    | "name-desc"
    | "rating-asc"
    | "rating-desc";