function ProductSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <div
                    key={index}
                    className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm"
                >
                    {/* Image */}
                    <div className="h-52 animate-pulse bg-gray-200" />

                    {/* Product Information */}
                    <div className="flex flex-col p-4">
                        {/* Product name */}
                        <div className="mb-2 h-4 animate-pulse rounded bg-gray-200" />

                        <div className="mb-3 h-4 w-2/3 animate-pulse rounded bg-gray-200" />

                        {/* Product code */}
                        <div className="mb-3 h-3 w-1/2 animate-pulse rounded bg-gray-200" />

                        {/* Price */}
                        <div className="mb-4 h-5 w-1/3 animate-pulse rounded bg-gray-200" />

                        {/* Quantity */}
                        <div className="mb-4 flex justify-center gap-2">
                            <div className="h-7 w-7 animate-pulse rounded bg-gray-200" />
                            <div className="h-7 w-8 animate-pulse rounded bg-gray-200" />
                            <div className="h-7 w-7 animate-pulse rounded bg-gray-200" />
                        </div>

                        {/* Button */}
                        <div className="h-10 animate-pulse rounded bg-gray-200" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductSkeleton;