import Button from "./Button";

interface ProductErrorProps {
    message: string;
    onRetry: () => void;
}

function ProductError({ message, onRetry }: ProductErrorProps) {
    return (
        <div className="rounded-sm border border-red-200 bg-white p-10 text-center">
            <p className="mb-4 text-sm text-red-600">{message}</p>

            <Button variant="primary"
                onClick={onRetry}
            >
                Retry
            </Button>
        </div>
    );
}

export default ProductError;