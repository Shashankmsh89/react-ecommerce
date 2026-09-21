import Button from "../components/Button";
import Card from "../components/Card";
import "./ComponentShowcase.css";

function ComponentShowcase() {
    return (
        <main className="showcase">
            <h1>Reusable Component Library</h1>

            <section className="showcase-section">
                <h2>BUTTON VARIANTS</h2>

                <div className="button-showcase">
                    <div className="variant-item">
                        <Button variant="primary">
                            ORDER NOW
                        </Button>

                        <span>Primary</span>
                    </div>

                    <div className="variant-item">
                        <Button variant="secondary">
                            VIEW MANUALS
                        </Button>

                        <span>Secondary</span>
                    </div>

                    <div className="variant-item">
                        <Button variant="outline">
                            SEARCH
                        </Button>

                        <span>Outline</span>
                    </div>

                    <div className="variant-item">
                        <Button variant="danger">
                            REMOVE
                        </Button>

                        <span>Danger</span>
                    </div>
                </div>
            </section>

            <section className="showcase-section">
                <h2>CARD VARIANTS</h2>

                <div className="card-showcase">
                    <div className="card-variant">
                        <Card variant="elevated">
                            <h3>Order Now</h3>

                            <p>
                                Quickly place your order for parts.
                            </p>

                            <Button variant="primary">
                                ORDER NOW
                            </Button>
                        </Card>

                        <span>Elevated</span>
                    </div>

                    <div className="card-variant">
                        <Card variant="bordered">
                            <h3>Aftermarket Products</h3>

                            <p>Spare parts catalog.</p>

                            <Button variant="primary">
                                BROWSE PRODUCTS
                            </Button>
                        </Card>

                        <span>Bordered</span>
                    </div>

                    <div className="card-variant">
                        <Card variant="flat">
                            <h3>Support</h3>

                            <p>Technical help center.</p>

                            <Button variant="outline">
                                CONTACT SUPPORT
                            </Button>
                        </Card>

                        <span>Flat</span>
                    </div>
                </div>
            </section>


        </main>
    );
}

export default ComponentShowcase;