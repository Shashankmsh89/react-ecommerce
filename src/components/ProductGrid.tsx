import ProductCard from "./ProductCard";
import type { Product } from "../data/products";

interface ProductGridProps {
    products: Product[];
}

function ProductGrid({ products }: ProductGridProps) {
    return (
        <section className="product-grid">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    {...product}
                />
            ))}
        </section>
    );
}

export default ProductGrid;