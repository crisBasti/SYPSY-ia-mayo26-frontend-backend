import { useState, useContext, useEffect } from "react";
import logo from "../assets/logo.png";
import "../styles/navbar.css";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Navbar({ search, setSearch }) {

  const [menuOpen, setMenuOpen] = useState(false);

  const [ubicacion, setUbicacion] = useState(null);

  const { user, logout } = useContext(AuthContext);

  useEffect(() => {

  const cargarUbicacion = async () => {

    if (!user) {

      setUbicacion(null);

      return;

    }

    try {

      const token =
        await user.getIdToken();

      const response =
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/profile`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      if (!response.ok) {

        throw new Error(
          "No se pudo obtener el perfil"
        );

      }

      const data =
        await response.json();

      setUbicacion({

        provincia:
          data.direccion?.provincia || "",

        ciudad:
          data.direccion?.ciudad || "",

        barrio:
          data.direccion?.barrio || "",

        lat:
          data.ubicacion?.lat || null,

        lng:
          data.ubicacion?.lng || null

      });

    } catch (error) {

      console.error(
        "Error cargando ubicación:",
        error
      );

    }

  };

  cargarUbicacion();

}, [user]);

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

          <span className="navbar-slogan">
            LO QUE QUERÉS YA!
          </span>
        </div>

                <div className="auth-section">
                  {user ? (
                <>
                <span className="user-name">
                  👋 {user?.displayName?.split(" ")[0]}
                </span>

                  <Link
                    to="/admin"
                    title="Panel"
                  >
                    ⚙️
                  </Link>

                  <button
                    title="Salir"
                    onClick={logout}
                  >
                    🚪
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


        <div className="navbar-search">
          <input
            type="text"
            placeholder="Buscar en SYPSY..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="location-bar">

         📍{" "}

          {ubicacion?.ciudad
            ? ubicacion.ciudad
            : "Seleccioná tu ubicación"}

        </div>

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

      </div>
    </>
  );
}

export default Navbar;