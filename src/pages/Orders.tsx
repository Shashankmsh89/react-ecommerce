import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

function Orders() {
    return (
        <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6">
            <div className="mx-auto max-w-6xl">
                <Breadcrumb className="mb-4 text-xs text-gray-500" />

                <h1 className="mb-6 text-2xl font-bold text-gray-900">
                    Orders
                </h1>

                <section className="border border-gray-200 bg-white px-6 py-16 text-center">
                    <h2 className="mb-2 text-xl font-bold text-gray-800">
                        No order history available
                    </h2>
                    <p className="mb-6 text-sm text-gray-500">
                        Your order history will appear here when available.
                    </p>
                    <Link
                        to="/products"
                        className="inline-block bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
                    >
                        CONTINUE SHOPPING
                    </Link>
                </section>
            </div>
        </main>
    );
}

export default Orders;
