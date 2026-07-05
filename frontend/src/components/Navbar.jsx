import { useState, useContext } from "react";
import logo from "../assets/logo.png";
import "../styles/navbar.css";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Navbar({ search, setSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);
  console.log(user);

  return (
    <>
      {/* NAV SUPERIOR */}
      <nav className="navbar">

        <div className="navbar-logo">
          <img
            src={logo}
            alt="SYPSY Logo"
            className="logo-img"
          />

          <span>
            LO QUE QUERES YA!
          </span>
        </div>

        <div className="navbar-search">
          <input
            type="text"
            placeholder="🔍 Buscar productos..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="auth-section">
          {user ? (
            <>
              <span className="user-name">
                👋 {user.displayName || "Usuario"}
              </span>

              <button onClick={logout}>
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Registro
              </Link>
            </>
          )}
        </div>

        <button
          className="menu-btn"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </button>

      </nav>

      {/* BARRA DE CATEGORÍAS */}
      <div
        className={`categories-bar ${
          menuOpen ? "active" : ""
        }`}
      >
        <Link to="/">🏠 Home</Link>

        <Link to="/categoria/Indumentaria">
          👕 Indumentaria
        </Link>

        <Link to="/categoria/Electro">
          📺 Electro
        </Link>

        <Link to="/categoria/Servicios">
          🔧 Servicios
        </Link>

        <Link to="/categoria/Varios">
          📦 Varios
        </Link>

        {user && (
          <Link to="/admin">
            ⚙️ Admin
          </Link>
        )}
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">

          <h2>
            Comprá rápido, simple y seguro
          </h2>

          <p>
            Productos, servicios y soluciones
            en un solo lugar.
          </p>

          <button>
            Explorar ahora
          </button>

        </div>
      </section>
    </>
  );
}

export default Navbar;