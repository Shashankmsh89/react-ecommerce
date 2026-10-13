import { Link, useLocation } from "react-router-dom";

interface BreadcrumbItem {
    label: string;
    to?: string;
}

interface BreadcrumbProps {
    className: string;
    separator?: string;
    currentClassName?: string;
}

function getBreadcrumbItems(pathname: string): BreadcrumbItem[] {
    if (pathname === "/products") {
        return [
            { label: "Home", to: "/" },
            { label: "Products", to: "/products" },
            { label: "Search Results" },
        ];
    }

    if (pathname === "/cart") {
        return [
            { label: "Home", to: "/" },
            { label: "Shopping Cart" },
        ];
    }

    if (pathname === "/orders") {
        return [
            { label: "Home", to: "/" },
            { label: "Orders" },
        ];
    }

    if (
        pathname === "/checkout/controlled" ||
        pathname === "/checkout/hook-form"
    ) {
        return [
            { label: "Home", to: "/" },
            { label: "Cart", to: "/cart" },
            { label: "Checkout" },
        ];
    }

    return [{ label: "Home" }];
}

function Breadcrumb({
    className,
    separator = ">",
    currentClassName,
}: BreadcrumbProps) {
    const { pathname } = useLocation();
    const items = getBreadcrumbItems(pathname);

    return (
        <nav aria-label="Breadcrumb" className={className}>
            {items.map((item, index) => (
                <span key={`${item.label}-${index}`}>
                    {index > 0 && (
                        <span className="mx-2">{separator}</span>
                    )}
                    {item.to ? (
                        <Link
                            to={item.to}
                            className="hover:text-orange-500"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className={currentClassName}>
                            {item.label}
                        </span>
                    )}
                </span>
            ))}
        </nav>
    );
}

export default Breadcrumb;
