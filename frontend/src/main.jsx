import "./styles/global.css";
import "./styles/variables.css";
import "./styles/responsive.css";
import "./styles/navbar.css";
import "./styles/products.css";
import "./styles/admin.css";
import "./styles/animations.css";



import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);