import ProductCard from "./ProductCard";
import type { Product } from "../types/ecommerce";


interface ProductGridProps {
    products: Product[];
    onAddToCart: (
        product: Product,
        quantity: number
    ) => void;
}


function ProductGrid({ products, onAddToCart, }: ProductGridProps) {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
                <ProductCard
                    key={product.productId}
                    product={product}
                    name={product.name}
                    imageUrl={`/api/v1/Products/${product.productId}/image`}
                    price={product.price}
                    productCode={`PROD-${product.productId}`}
                    rating={product.rating}
                    variant="listing"
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
    );
}

export default ProductGrid;