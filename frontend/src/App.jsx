import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { useState } from "react";

import Home from "./pages/Home";

import Admin from "./pages/Admin";

import Navbar from "./components/Navbar";

import {
  ProductsProvider
} from "./context/ProductsContext";

function App() {

  const [search, setSearch] =
    useState("");

  return (

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

            path="/admin"

            element={<Admin />}
          />

        </Routes>

      </BrowserRouter>

    </ProductsProvider>
  );
}

export default App;