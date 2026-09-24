export function formatCategory(category: string): string {
    return category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export function getCategories(categories: readonly string[]): string[] {
    return [...new Set(categories)].sort();
}