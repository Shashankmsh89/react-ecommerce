interface ProductCardProps {
    id: number;
    name: string;
    imageUrl: string;
    category?: string;
    rating?: number;
    reviewCount?: number;
    productCode?: string;
}

function ProductCard(props: ProductCardProps) {
    function handleAddToCart() {
        console.log(
            `Added to cart: ${props.name} (ID: ${props.id})`
        );
    }

    return (
        <article className="product-card">
            <div className="product-image">
                <img
                    src={props.imageUrl}
                    alt={props.name}
                />
            </div>

            <div className="product-info">
                <h2>{props.name}</h2>

                {props.productCode && (
                    <p className="product-code">
                        #{props.productCode}
                    </p>
                )}

                {props.rating !== undefined && (
                    <div className="product-rating">
                        <span className="rating-stars">
                            ★★★★★
                        </span>

                        <span className="rating-value">
                            {props.rating}
                        </span>

                        {props.reviewCount !== undefined && (
                            <span className="review-count">
                                ({props.reviewCount})
                            </span>
                        )}
                    </div>
                )}

                <div className="product-quantity">
                    <label htmlFor={`quantity-${props.id}`}>
                        QTY:
                    </label>

                    <select
                        id={`quantity-${props.id}`}
                        defaultValue="1"
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <button
                    className="add-to-cart"
                    onClick={handleAddToCart}
                >
                    ADD TO CART
                </button>

                <button className="shopping-list">
                    + SHOPPING LIST
                </button>
            </div>
        </article>
    );
}

export default ProductCard;