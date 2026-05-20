import { useState } from "react";

import logo from "../assets/logo.png";

import "../styles/navbar.css";

function Navbar({
  search,
  setSearch
}) {

  const [menuOpen, setMenuOpen] =
    useState(false);

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

        <div
          className={`navbar-links ${
            menuOpen
              ? "active"
              : ""
          }`}
        >

          <a href="#">
            Inicio
          </a>

          <a href="#">
            Electro
          </a>

          <a href="#">
            Indumentaria
          </a>

          <a href="#">
            Calzado
          </a>

          <a href="#">
            Servicios
          </a>

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