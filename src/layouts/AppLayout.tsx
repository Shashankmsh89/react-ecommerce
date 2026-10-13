
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface AppLayoutProps {
    cartCount: number;
}

function AppLayout({ cartCount }: AppLayoutProps) {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("search") ?? "";

    function handleSearchChange(value: string) {
        setSearchParams((currentParams) => {
            const params = new URLSearchParams(currentParams);

            if (value.trim()) {
                params.set("search", value);
            } else {
                params.delete("search");
            }

            params.delete("page");

            return params;
        });
    }

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header
                showSearch={location.pathname === "/products"}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                cartCount={cartCount}
            />

            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default AppLayout;
