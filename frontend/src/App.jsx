import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import CategoryPage from "./pages/CategoryPage";
import { useState } from "react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import SellerProfile from "./pages/SellerProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductsProvider } from "./context/ProductsContext";
import { HelmetProvider } from "react-helmet-async";
import ProductDetail from "./pages/ProductDetail";

function App() {

  const [search, setSearch] = useState("");

  return (
  <HelmetProvider>
    <ProductsProvider>
      <BrowserRouter>

        <Navbar
          search={search}
          setSearch={setSearch}
        />

        <Routes>

          <Route
            path="/"
            element={
              <Home
                search={search}
              />
            }
          />

          <Route
            path="/categoria/:categoria"
            element={<CategoryPage />}
          />

          <Route
            path="/producto/:id"
            element={<ProductDetail />}
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/seller/:id"
            element={<SellerProfile />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

        </Routes>

      </BrowserRouter>
    </ProductsProvider>
  </HelmetProvider>
);
}

export default App;