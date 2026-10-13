import {
    Menu,
    Search,
    Globe,
    User,
    ShoppingCart,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import ProductSearch from "./ProductSearch";

interface HeaderProps {
    showSearch?: boolean;
    searchTerm?: string;
    onSearchChange?: (value: string) => void;
    cartCount?: number;
}

function Header({
    showSearch = false,
    searchTerm = "",
    onSearchChange,
    cartCount = 0,
}: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
            <div className="mx-auto my-2 flex h-12 max-w-6xl items-center justify-between px-4 ">

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

                {/* Center Search */}
                {showSearch && onSearchChange && (
                    <div className="mx-6 w-full max-w-md">
                        <ProductSearch
                            value={searchTerm}
                            onChange={onSearchChange}
                        />
                    </div>
                )}

                {/* Navigation */}
                <nav className="hidden items-center gap-5 md:flex">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `text-[11px] ${isActive
                                ? "font-semibold text-orange-500"
                                : "text-gray-600 hover:text-orange-500"
                            }`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            `text-[11px] ${isActive
                                ? "font-semibold text-orange-500"
                                : "text-gray-600 hover:text-orange-500"
                            }`
                        }
                    >
                        Products
                    </NavLink>

                    <Link
                        to="/"
                        className="text-[11px] text-gray-600 hover:text-orange-500"
                    >
                        Categories
                    </Link>
                </nav>

                {/* Icons */}
                <div className="ml-5 flex items-center gap-3 text-gray-500">
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

                    <Link
                        to="/cart"
                        aria-label={`Shopping cart, ${cartCount} items`}
                        className="relative hover:text-orange-500"
                    >
                        <ShoppingCart size={13} />

                        {cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-bold text-white">
                                {cartCount > 99 ? "99+" : cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;