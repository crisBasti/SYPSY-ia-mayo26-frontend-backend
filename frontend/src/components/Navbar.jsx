import { useState, useContext, useEffect } from "react";
import logo from "../assets/logo.png";
import "../styles/navbar.css";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { getMyRewards } from "../services/rewardService";

function Navbar({ search, setSearch }) {

  const [menuOpen, setMenuOpen] = useState(false);

  const [ubicacion, setUbicacion] = useState(null);

  const [saldoRSPY, setSaldoRSPY] = useState(0);

  const { user, logout } =
    useContext(AuthContext);


  // ==========================================
  // CARGAR DATOS DEL USUARIO
  // ==========================================

  useEffect(() => {

    const cargarDatosUsuario = async () => {

      if (!user) {

        setUbicacion(null);
        setSaldoRSPY(0);

        return;

      }


      try {

        const token =
          await user.getIdToken();


        // ======================================
        // PERFIL + RSPY
        // ======================================

        const [perfilResponse, rewardData] =
          await Promise.all([

            fetch(
              `${import.meta.env.VITE_API_URL}/api/profile`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            ),

            getMyRewards(token)

          ]);


        // ======================================
        // UBICACIÓN
        // ======================================

        if (perfilResponse.ok) {

          const data =
            await perfilResponse.json();


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

        }


        // ======================================
        // RSPY
        // ======================================

        setSaldoRSPY(
          Number(rewardData?.saldo) || 0
        );


      } catch (error) {

        console.error(
          "Error cargando datos del usuario:",
          error
        );

        setSaldoRSPY(0);

      }

    };


    cargarDatosUsuario();

  }, [user]);


  return (
    <>

      {/* ===================================== */}
      {/* NAV SUPERIOR                         */}
      {/* ===================================== */}

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


        {/* ================================= */}
        {/* AUTENTICACIÓN + RSPY              */}
        {/* ================================= */}

        <div className="auth-section">

          {user ? (

            <>

              <span className="user-name">
                👋 {user?.displayName?.split(" ")[0]}
              </span>


              {/* ============================ */}
              {/* SALDO RSPY                   */}
              {/* ============================ */}

              <Link
                to="/rewards"
                className="navbar-rspy"
                title="Mis recompensas RSPY"
              >
                🪙 {saldoRSPY} RSPY
              </Link>


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


        {/* ================================= */}
        {/* MENÚ                              */}
        {/* ================================= */}

        <button
          className="menu-btn"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </button>


        {/* ================================= */}
        {/* BUSCADOR                          */}
        {/* ================================= */}

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


        {/* ================================= */}
        {/* UBICACIÓN                         */}
        {/* ================================= */}

        <div className="location-bar">

          📍{" "}

          {ubicacion?.ciudad
            ? ubicacion.ciudad
            : "Seleccioná tu ubicación"}

        </div>

      </nav>


      {/* ===================================== */}
      {/* BARRA DE CATEGORÍAS                  */}
      {/* ===================================== */}

      <div
        className={`categories-bar ${
          menuOpen ? "active" : ""
        }`}
      >

        <Link to="/">
          🏠 Home
        </Link>

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