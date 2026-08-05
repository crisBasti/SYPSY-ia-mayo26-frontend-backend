import "./styles/global.css";
import "./styles/variables.css";
import "./styles/responsive.css";
import "./styles/navbar.css";
import "./styles/products.css";
import "./styles/admin.css";
import "./styles/animations.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactGA from "react-ga4";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { LocationProvider } from "./context/LocationContext";

// GOOGLE ANALYTICS
ReactGA.initialize("G-4D3XVHNEEK");

ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <LocationProvider>
            <App />
        </LocationProvider>
    </AuthProvider>
  </StrictMode>
);