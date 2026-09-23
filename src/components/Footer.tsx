function Footer() {
    return (
        <footer className="bg-white">
            <div className="border-b border-gray-200">
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-8 sm:grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mb-4 text-xs font-bold uppercase">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-2 text-xs text-gray-500">
                            <a href="#">Sales & Service Locator</a>
                            <a href="#">Worldwide Locations</a>
                            <a href="#">About Us</a>
                            <a href="#">Investors</a>
                            <a href="#">Careers</a>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-xs font-bold uppercase">
                            Press Releases
                        </h3>

                        <a
                            href="#"
                            className="text-xs text-orange-500"
                        >
                            Press Releases
                        </a>
                    </div>

                    <div>
                        <h3 className="mb-4 text-xs font-bold uppercase">
                            Newsletters
                        </h3>

                        <a
                            href="#"
                            className="text-xs text-orange-500"
                        >
                            Direct Access
                        </a>
                    </div>

                    <div>
                        <h3 className="mb-4 text-xs font-bold uppercase">
                            Online Express
                        </h3>

                        <p className="text-xs leading-5 text-gray-500">
                            Your trusted online shopping experience
                            for quality products and reliable service.
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200">
                <div className="mx-auto flex max-w-5xl flex-col justify-between gap-3 px-6 py-4 text-xs text-gray-500 sm:flex-row">
                    <p>
                        © 2026 Online Express. All rights reserved.
                    </p>

                    <div className="flex gap-4">
                        <a href="#">Terms of Use</a>
                        <a href="#">Contact Us</a>
                        <a href="#">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;