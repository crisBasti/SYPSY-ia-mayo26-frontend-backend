import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Admin from "./pages/Admin";

import {
  ProductsProvider
} from "./context/ProductsContext";

function App() {

  return (

    <ProductsProvider>

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<Home />}
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