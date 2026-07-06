import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import { Helmet } from "react-helmet-async";

function CategoryPage() {

  const { categoria } = useParams();

  const descripcionCategoria =
  `Explorá productos y servicios de ${categoria} en SYPSY. Comprá y vendé con vendedores verificados y contacto directo.`;

  const { productos } =
    useContext(ProductsContext);

  const productosFiltrados =
    productos.filter(
      (producto) =>
        producto.categoria?.toLowerCase() ===
        categoria.toLowerCase()
    );

return (
  <>
    <Helmet>

      <title>
        {categoria} | SYPSY Marketplace
      </title>

      <meta
        name="description"
        content={descripcionCategoria}
      />

      <meta
        property="og:title"
        content={`${categoria} | SYPSY Marketplace`}
      />

      <meta
        property="og:description"
        content={descripcionCategoria}
      />

      <meta
        property="og:url"
        content={`https://www.sypsy.com.ar/categoria/${categoria}`}
      />

      <meta
        property="og:type"
        content="website"
      />

    </Helmet>

    <div className="home-container">

      <h1 className="category-title">
        {categoria}
      </h1>

      <div className="products-grid">

        {productosFiltrados.length > 0 ? (

          productosFiltrados.map((producto) => (

            <div
              key={producto._id}
              className="product-card"
            >

              <img
                src={producto.images?.[0]}
                alt={producto.nombre}
              />

              <h3>
                {producto.nombre}
              </h3>

              <p>
                {producto.descripcion}
              </p>

              <span>
                ${producto.precio}
              </span>

            </div>
          ))

        ) : (

          <p>
            No hay productos en esta categoría.
          </p>

        )}

      </div>

    </div>
     </>
  );
}

export default CategoryPage;