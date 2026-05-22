import { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import SellerBadge from "../components/SellerBadge";
import { Link } from "react-router-dom";

function Home({ search }) {
  const { productos } = useContext(ProductsContext);

  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [imgIndex, setImgIndex] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  // =========================
  // CATEGORÍAS
  // =========================
  const categorias = [
    "Todos",
    ...new Set(productos.map((p) => p.categoria))
  ];

  // =========================
  // FILTRO
  // =========================
  const filteredProducts = productos.filter((product) => {
    const textoBusqueda = search.toLowerCase();

    return (
      product.nombre.toLowerCase().includes(textoBusqueda) ||
      product.descripcion.toLowerCase().includes(textoBusqueda) ||
      product.categoria.toLowerCase().includes(textoBusqueda)
    ) &&
      (categoriaActiva === "Todos" ||
        product.categoria === categoriaActiva);
  });

  return (
    <div className="products-container">

      <div className="section-title">
        <h2>Productos destacados</h2>
        <p>Encontrá todo lo que necesitás en SYPSY</p>
      </div>

      {/* FILTROS */}
      <div className="filters">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            className={
              categoriaActiva === categoria
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setCategoriaActiva(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="products-grid">

        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card">

            {/* IMAGEN */}
            <div className="card-image">
              <img
                src={product.image}
                alt={product.nombre}
              />
            </div>

            <span className="seller-name">
  👤 {product.vendedor?.nombre || "Vendedor"}
</span>

<span className="seller-rating">
  ⭐ {product.vendedor?.rating || "Nuevo"}
</span>

            {/* INFO */}
            <div className="product-info">

              {/* 🔥 SELLER LINK CORRECTO */}
              <SellerBadge vendedor={product.vendedor} />

              <span className="category-badge">
                {product.categoria}
              </span>

              <h3>{product.nombre}</h3>

              <p>{product.descripcion}</p>

              <span className="price">
                ${product.precio}
              </span>

              {/* WHATSAPP */}
              <a
                className="contact-btn"
                href={`https://wa.me/${product.vendedor?.phone || "5490000000000"}`}
                target="_blank"
                rel="noreferrer"
              >
                Contactar vendedor
              </a>

              {/* VER PRODUCTO */}
              <button
                className="view-btn"
                onClick={() => setSelectedProduct(product)}
              >
                Ver producto
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedProduct.image}
              alt={selectedProduct.nombre}
            />

            <h2>{selectedProduct.nombre}</h2>
            <p>{selectedProduct.descripcion}</p>
            <span>${selectedProduct.precio}</span>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;