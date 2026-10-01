import { Search } from "lucide-react";

interface ProductSearchProps {
    value: string;
    onChange: (value: string) => void;
}

function ProductSearch({
    value,
    onChange,
}: ProductSearchProps) {
    return (
        <div className="relative w-full">
            <Search
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="w-full rounded-sm border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
        </div>
    );
}

export default ProductSearch;