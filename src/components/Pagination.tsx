import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    const pages = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );

    return (
        <nav
            aria-label="Product pagination"
            className="mt-8 flex items-center justify-center gap-1"
        >
            {/* Previous */}
            <button
                type="button"
                onClick={() =>
                    onPageChange(Math.max(1, currentPage - 1))
                }
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-gray-300 bg-white text-gray-600 transition-all hover:border-orange-500 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 disabled:cursor-not-allowed disabled:opacity-40"
            >
                <ChevronLeft size={16} />
            </button>

            {/* Page Numbers */}
            {pages.map((page) => (
                <button
                    key={page}
                    type="button"
                    onClick={() => onPageChange(page)}
                    aria-label={`Go to page ${page}`}
                    aria-current={
                        currentPage === page
                            ? "page"
                            : undefined
                    }
                    className={`flex h-9 min-w-9 items-center justify-center rounded-sm border px-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/30 ${currentPage === page
                            ? "border-orange-500 bg-orange-500 text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:border-orange-500 hover:text-orange-500"
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Next */}
            <button
                type="button"
                onClick={() =>
                    onPageChange(
                        Math.min(totalPages, currentPage + 1)
                    )
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-gray-300 bg-white text-gray-600 transition-all hover:border-orange-500 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 disabled:cursor-not-allowed disabled:opacity-40"
            >
                <ChevronRight size={16} />
            </button>
        </nav>
    );
}

export default Pagination;