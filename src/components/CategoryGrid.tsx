import Card from "./Card";

const categories = [
    {
        name: "Smartphones",
        description:
            "Explore the latest smartphones and mobile technology.",
    },
    {
        name: "Shoes",
        description:
            "Find comfortable and stylish shoes for every occasion.",
    },
    {
        name: "Headphones",
        description:
            "Enjoy your favorite music with high-quality headphones.",
    },
];

function CategoryGrid() {
    return (
        <section
            id="categories"
            className="bg-white px-6 py-16"
        >
            <div className="mx-auto max-w-6xl">
                <div className="mb-10 text-center">
                    <h2 className="mb-3 text-3xl font-bold text-gray-900">
                        Shop by Category
                    </h2>

                    <p className="text-gray-600">
                        Explore our popular product categories.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {categories.map((category) => (
                        <Card
                            key={category.name}
                            variant="elevated"
                        >
                            <div className="p-2">
                                <h3 className="mb-3 text-xl font-bold text-gray-900">
                                    {category.name}
                                </h3>

                                <p className="mb-6 text-sm leading-6 text-gray-600">
                                    {category.description}
                                </p>

                                <ButtonLink />
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ButtonLink() {
    return (
        <a
            href="#"
            className="text-sm font-semibold text-orange-500 hover:text-orange-600"
        >
            Explore Category →
        </a>
    );
}

export default CategoryGrid;