import { Link } from "react-router-dom";

function NotFound() {
    return (
        <main className="flex min-h-[60vh] items-center justify-center bg-gray-100 px-4 py-12">
            <div className="text-center">
                <p className="mb-2 text-6xl font-bold text-orange-500">
                    404
                </p>
                <h1 className="mb-3 text-2xl font-bold text-gray-900">
                    Page Not Found
                </h1>
                <p className="mb-6 text-sm text-gray-600">
                    The page you are looking for doesn’t exist.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
                >
                    Back to Home
                </Link>
            </div>
        </main>
    );
}

export default NotFound;
