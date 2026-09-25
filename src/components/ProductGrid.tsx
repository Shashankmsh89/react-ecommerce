import ProductCard from "./ProductCard";
import type { Product } from "../types/product";

interface ProductGridProps {
    products: Product[];
}

function ProductGrid({ products }: ProductGridProps) {
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    name={product.name}
                    imageUrl={product.image}
                    price={product.price}
                    unitPrice={product.unitsPrice}
                    productCode={product.productCode}
                    discountPercentage={product.discountPercentage}
                    variant="listing"
                />
            ))}
        </div>
    );
}

export default ProductGrid;