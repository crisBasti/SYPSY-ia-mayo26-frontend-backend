import { useState } from "react";

import logo from "../assets/logo.png";

import "../styles/navbar.css";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { Link } from "react-router-dom";

function Navbar({
  search,
  setSearch
}) {

  const [menuOpen, setMenuOpen] =
    useState(false);

    const { user, logout } = useContext(AuthContext);

  console.log(user);

  return (

    <>

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


                <div className="auth-section">

  {user ? (

    <>
      <span>
        {user.email}
      </span>

      <button onClick={logout}>
        Cerrar sesión
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

        <div
          className={`navbar-links ${
            menuOpen
              ? "active"
              : ""
          }`}
        >

          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
           <Link to="/categoria/Electro">
              Electro
            </Link>
          </li>

          <li>
           <Link to="/categoria/Indumentaria">
             Indumentaria
           </Link>
          </li>

          <li>
           <Link to="/categoria/Servicios">
             Servicios
           </Link>
          </li>

          <li>
           <Link to="/categoria/Varios">
             Varios
           </Link>
          </li>

        </div>

        <div className="navbar-search">

          <input

            type="text"

            placeholder="Buscar productos..."

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        <button

          className="menu-btn"

          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }
        >

          ☰

        </button>



      </nav>

      <section className="hero">

        <div className="hero-content">

          <h2>
            Comprá rápido,
            simple y seguro
          </h2>

          <p>
            Productos,
            servicios y soluciones
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