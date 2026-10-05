import type {
    Brand,
    Category,
    Product,
    ProductSearchResponse,
} from "../types/ecommerce";

const API_BASE_URL = "";

async function handleResponse<T>(
    response: Response
): Promise<T> {
    if (!response.ok) {
        throw new Error(
            `API request failed with status ${response.status}`
        );
    }

    return response.json() as Promise<T>;
}

export async function fetchProducts(
    signal?: AbortSignal
): Promise<Product[]> {
    const response = await fetch(
        `${API_BASE_URL}/api/v1/Products`,
        { signal }
    );

    return handleResponse<Product[]>(response);
}

export async function fetchCategories(
    signal?: AbortSignal
): Promise<Category[]> {
    const response = await fetch(
        `${API_BASE_URL}/api/Categories`,
        { signal }
    );

    return handleResponse<Category[]>(response);
}

export async function fetchBrands(
    signal?: AbortSignal
): Promise<Brand[]> {
    const response = await fetch(
        `${API_BASE_URL}/api/Brands`,
        { signal }
    );

    return handleResponse<Brand[]>(response);
}

export interface ProductSearchParams {
    search?: string;
    categoryId?: number;
    brandId?: number;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sortBy?: string;
    sortOrder?: string;
    page?: number;
    pageSize?: number;
}

export async function searchProducts(
    params: ProductSearchParams,
    signal?: AbortSignal
): Promise<ProductSearchResponse> {
    const query = new URLSearchParams();

    if (params.search) {
        query.set("Search", params.search);
    }

    if (params.categoryId !== undefined) {
        query.set("CategoryId", String(params.categoryId));
    }

    if (params.brandId !== undefined) {
        query.set("BrandId", String(params.brandId));
    }

    if (params.minPrice !== undefined) {
        query.set("MinPrice", String(params.minPrice));
    }

    if (params.maxPrice !== undefined) {
        query.set("MaxPrice", String(params.maxPrice));
    }

    if (params.minRating !== undefined) {
        query.set("MinRating", String(params.minRating));
    }

    if (params.sortBy) {
        query.set("SortBy", params.sortBy);
    }

    if (params.sortOrder) {
        query.set("SortOrder", params.sortOrder);
    }

    if (params.page !== undefined) {
        query.set("Page", String(params.page));
    }

    if (params.pageSize !== undefined) {
        query.set("PageSize", String(params.pageSize));
    }

    const response = await fetch(
        `${API_BASE_URL}/api/v1/Products/search?${query.toString()}`,
        { signal }
    );

    return handleResponse<ProductSearchResponse>(response);
}