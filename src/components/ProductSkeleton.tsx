function ProductSkeleton() {
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <div
                    key={index}
                    className="animate-pulse rounded-sm bg-white p-4"
                >
                    <div className="mb-4 h-40 bg-gray-200" />

                    <div className="mb-2 h-4 bg-gray-200" />

                    <div className="mb-4 h-4 w-2/3 bg-gray-200" />

                    <div className="h-10 bg-gray-200" />
                </div>
            ))}
        </div>
    );
}

export default ProductSkeleton;