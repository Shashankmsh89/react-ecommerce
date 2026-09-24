export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    productCode: string;
    unitsPrice?: number;
}

export interface DummyJsonProduct {
    id: number;
    title: string;
    price: number;
    category: string;
    thumbnail: string;
}

export interface DummyJsonProductResponse {
    products: DummyJsonProduct[];
    total: number;
    skip: number;
    limit: number;
}