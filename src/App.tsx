import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import CheckoutControlled from "./pages/CheckoutControlled";
import CheckoutHookForm from "./pages/CheckoutHookForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />

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