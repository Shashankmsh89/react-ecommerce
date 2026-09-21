import { useState } from "react";

function QuantitySelector() {
    const productName = "Sony WH-1000XM5";
    const unitPrice = 29999;

    const [quantity, setQuantity] = useState(1);

    const totalPrice = unitPrice * quantity;

    function increaseQuantity() {
        setQuantity((currentQuantity) => currentQuantity + 1);
    }

    function decreaseQuantity() {
        setQuantity((currentQuantity) =>
            Math.max(1, currentQuantity - 1)
        );
    }

    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <section className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-lg">
                <h1 className="mb-4 text-2xl font-bold text-gray-900">
                    {productName}
                </h1>

                <p className="mb-6 text-gray-600">
                    Unit Price: ₹{unitPrice}
                </p>

                <div className="mb-6 flex items-center justify-center gap-6">
                    <button
                        onClick={decreaseQuantity}
                        disabled={quantity === 1}
                        className="h-10 w-10 rounded bg-gray-200 text-xl font-bold disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        −
                    </button>

                    <span className="text-xl font-bold">
                        {quantity}
                    </span>

                    <button
                        onClick={increaseQuantity}
                        className="h-10 w-10 rounded bg-orange-500 text-xl font-bold text-white hover:bg-orange-600"
                    >
                        +
                    </button>
                </div>

                <p className="text-xl font-bold text-orange-500">
                    Total: ₹{totalPrice}
                </p>
            </section>
        </main>
    );
}

export default QuantitySelector;