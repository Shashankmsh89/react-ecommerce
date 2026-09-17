import "./App.css";
import ProductGrid from "./components/ProductGrid";
import { products } from "./data/products";

function App() {
  return (
    <main>
      <section className="featured-products">
        <div className="section-heading">
          <h1>Featured Products</h1>

          <p>Top picks just for you</p>
        </div>

        <ProductGrid products={products} />
      </section>
    </main>
  );
}

export default App;