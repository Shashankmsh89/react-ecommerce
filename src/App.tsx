
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductList from "./pages/ProductList";
import Cart from "./components/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import useCartContext from "./hooks/useCartContext";

const CheckoutControlled = lazy(() => import("./pages/CheckoutControlled"));
const CheckoutHookForm = lazy(() => import("./pages/CheckoutHookForm"));
const Login = lazy(() => import("./pages/Login"));
const Orders = lazy(() => import("./pages/Orders"));

function AppRoutes() {
  const { totalItems } = useCartContext();

  return (
    <Suspense fallback={<p className="p-6">Loading page...</p>}>
      <Routes>
        <Route element={<AppLayout cartCount={totalItems} />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout/controlled"
            element={
              <ProtectedRoute>
                <CheckoutControlled />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout/hook-form"
            element={
              <ProtectedRoute>
                <CheckoutHookForm />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
