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
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import AdminReports from "./pages/AdminReports";
import AdminPanel from "./pages/AdminPanel";
import MyAccountPanel from "./pages/MyAccountPanel";
import AdminRoute from "./components/AdminRoute";
import RoleRoute from "./components/RoleRoute";
import ProductFormSeller from "./components/seller/ProductFormSeller";
import Payments from "./pages/admin/Payments";


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
            path="/micuenta/producto/:id"
            element={
              <ProtectedRoute>
                <ProductFormSeller />
              </ProtectedRoute>
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
              <RoleRoute role="admin">
                <AdminPanel />
              </RoleRoute>
            }
          />

          <Route
            path="/micuenta"
            element={
              <ProtectedRoute>
              <MyAccountPanel />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute>
              <AdminReports />
              </ProtectedRoute>
          }
          />

          <Route
            path="/admin/payments"
            element={<Payments/>}
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

          <Route path="*" element={<NotFound />} />

        </Routes>

      </BrowserRouter>
    </ProductsProvider>
  </HelmetProvider>
);
}

export default App;