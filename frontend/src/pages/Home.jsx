import {
  useContext,
  useState
} from "react";

import {
  ProductsContext
} from "../context/ProductsContext";

function Home({
  search
}) {

  const { productos } =
    useContext(
      ProductsContext
    );

  const [categoriaActiva,
    setCategoriaActiva] =
      useState("Todos");

  // =========================
  // CATEGORÍAS
  // =========================

  const categorias = [

    "Todos",

    ...new Set(
      productos.map(
        (p) => p.categoria
      )
    )

  ];

  // =========================
  // FILTRO
  // =========================

  const filteredProducts =
    productos.filter(
      (product) => {

        const textoBusqueda =
  search.toLowerCase();

const coincideBusqueda =

  product.nombre
    .toLowerCase()
    .includes(textoBusqueda)

  ||

  product.descripcion
    .toLowerCase()
    .includes(textoBusqueda)

  ||

  product.categoria
    .toLowerCase()
    .includes(textoBusqueda);

        const coincideCategoria =

          categoriaActiva ===
          "Todos"

          ||

          product.categoria ===
          categoriaActiva;

        return (
          coincideBusqueda
          &&
          coincideCategoria
        );
      }
    );

  return (

    <div className="products-container">

      <div className="section-title">

        <h2>
          Productos destacados
        </h2>

        <p>
          Encontrá todo lo que
          necesitás en SYPSY
        </p>

      </div>

      {/* ========================= */}
      {/* FILTROS */}
      {/* ========================= */}

      <div className="filters">

        {categorias.map(
          (categoria) => (

            <button

              key={categoria}

              className={
                categoriaActiva ===
                categoria

                  ? "filter-btn active"

                  : "filter-btn"
              }

              onClick={() =>
                setCategoriaActiva(
                  categoria
                )
              }
            >

              {categoria}

            </button>
          )
        )}

      </div>

      {/* ========================= */}
      {/* GRID */}
      {/* ========================= */}

      <div className="products-grid">

        {filteredProducts.length > 0 ? (

          filteredProducts.map(
            (product) => (

              <div
                key={product.id}
                className="product-card"
              >

                <div className="product-image">

                  <img
                    src={product.imagen}
                    alt={product.nombre}
                  />

                </div>

                <div className="product-info">

                  <span className="category-badge">

                    {product.categoria}

                  </span>

                  <h3>
                    {product.nombre}
                  </h3>

                  <p>
                    {product.descripcion}
                  </p>

                  <span className="price">

                    $
                    {product.precio}

                  </span>

                <button className="view-btn">

                    Ver producto

                </button>

                </div>

              </div>
            )
          )

        ) : (

          <div className="no-results">

            <h3>
              No se encontraron
              productos
            </h3>

          </div>
        )}

      </div>

    </div>
  );
}

export default Home;