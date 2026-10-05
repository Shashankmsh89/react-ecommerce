export interface Product {
    productId: number;
    name: string;
    description: string;
    categoryId: number;
    categoryName: string;
    brandId: number;
    brandName: string;
    price: number;
    rating: number;
}

export interface Category {
    categoryId: number;
    name: string;
}

export interface Brand {
    brandId: number;
    name: string;
}

export interface ProductSearchResponse {
    products: Product[];
    page: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
}