import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";

function CategoryPage() {

  const { categoria } = useParams();

  const { productos } =
    useContext(ProductsContext);

  const productosFiltrados =
    productos.filter(
      (producto) =>
        producto.categoria?.toLowerCase() ===
        categoria.toLowerCase()
    );

  return (
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
  );
}

export default CategoryPage;