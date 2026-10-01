function Footer() {
    return (
        <footer className="mt-12 bg-gray-900 text-white">
            <div className="mx-auto max-w-6xl px-4 py-8">

                <div className="grid gap-8 md:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <h2 className="text-lg font-bold text-orange-500">
                            ONLINE EXPRESS
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-gray-400">
                            Simple, reliable shopping for the
                            products you use every day.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">
                            Quick Links
                        </h3>

                        <div className="space-y-2 text-sm text-gray-400">
                            <a
                                href="/"
                                className="block hover:text-white"
                            >
                                Home
                            </a>

                            <a
                                href="/products"
                                className="block hover:text-white"
                            >
                                Products
                            </a>

                            <a
                                href="/products"
                                className="block hover:text-white"
                            >
                                Categories
                            </a>
                        </div>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">
                            Customer Support
                        </h3>

                        <div className="space-y-2 text-sm text-gray-400">
                            <p>Help Center</p>
                            <p>Shipping Information</p>
                            <p>Returns & Refunds</p>
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">
                            Company
                        </h3>

                        <div className="space-y-2 text-sm text-gray-400">
                            <p>About Us</p>
                            <p>Contact Us</p>
                            <p>Privacy Policy</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-800 pt-5 text-center text-xs text-gray-500">
                    © 2026 Online Express. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;