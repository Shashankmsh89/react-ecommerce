interface ProductErrorProps {
    message: string;
    onRetry: () => void;
}

function ProductError({ message, onRetry }: ProductErrorProps) {
    return (
        <div className="rounded-sm border border-red-200 bg-white p-10 text-center">
            <p className="mb-4 text-sm text-red-600">{message}</p>

            <button
                onClick={onRetry}
                className="rounded-sm bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600"
            >
                Retry
            </button>
        </div>
    );
}

export default ProductError;