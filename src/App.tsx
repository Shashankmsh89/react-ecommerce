
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Cart from "./components/Cart";
import CheckoutControlled from "./pages/CheckoutControlled";
import CheckoutHookForm from "./pages/CheckoutHookForm";

import useCart from "./hooks/useCart";

function App() {
  const {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
  } = useCart();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={
            <ProductList
              onAddToCart={addToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              items={items}
              onQuantityChange={updateQuantity}
              onRemove={removeFromCart}
            />
          }
        />

        <Route
          path="/checkout/controlled"
          element={<CheckoutControlled />}
        />

        <Route
          path="/checkout/hook-form"
          element={<CheckoutHookForm />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
