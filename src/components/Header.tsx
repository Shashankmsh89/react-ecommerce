import {
    Menu,
    Search,
    Globe,
    User,
    ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4">
                {/* Left */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="text-gray-600 hover:text-orange-500 md:hidden"
                    >
                        <Menu size={16} />
                    </button>

                    <Link
                        to="/"
                        className="text-sm font-bold tracking-tight text-orange-500"
                    >
                        ONLINE EXPRESS
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="hidden items-center gap-5 md:flex">
                    <Link
                        to="/"
                        className="text-[11px] text-gray-600 hover:text-orange-500"
                    >
                        Home
                    </Link>

                    <Link
                        to="/products"
                        className="text-[11px] text-gray-600 hover:text-orange-500"
                    >
                        Products
                    </Link>

                    <Link
                        to="/"
                        className="text-[11px] text-gray-600 hover:text-orange-500"
                    >
                        Categories
                    </Link>
                </nav>

                {/* Icons */}
                <div className="flex items-center gap-3 text-gray-500">
                    <button
                        type="button"
                        className="hover:text-orange-500"
                    >
                        <Search size={13} />
                    </button>

                    <button
                        type="button"
                        className="hidden hover:text-orange-500 sm:block"
                    >
                        <Globe size={13} />
                    </button>

                    <button
                        type="button"
                        className="hidden hover:text-orange-500 sm:block"
                    >
                        <User size={13} />
                    </button>

                    <button
                        type="button"
                        className="hover:text-orange-500"
                    >
                        <ShoppingCart size={13} />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;