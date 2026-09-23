import Button from "./Button";

function Hero() {
    return (
        <section className="bg-gray-100">
            <div className="mx-auto flex min-h-105 max-w-6xl items-center px-6 py-16">
                <div className="max-w-2xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-orange-500">
                        Welcome to Online Express
                    </p>

                    <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
                        Everything You Need,
                        <br />
                        All in One Place
                    </h1>

                    <p className="mb-8 max-w-xl text-lg leading-7 text-gray-600">
                        Discover quality products across multiple
                        categories with a simple and convenient
                        shopping experience.
                    </p>

                    <Button variant="primary">
                        Shop Products
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default Hero;