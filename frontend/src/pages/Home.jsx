import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../context/ProductsContext";
import SellerBadge from "../components/SellerBadge";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

function Home({ search }) {
  const { productos, fetchProducts } = useContext(ProductsContext);
  useEffect(() => { fetchProducts(); }, []);

  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imgIndex, setImgIndex] = useState({});
  const nextImage = (productId, total) => {
  setImgIndex((prev) => ({
    ...prev,
    [productId]:
      ((prev[productId] || 0) + 1) % total
  }));
};

const prevImage = (productId, total) => {
  setImgIndex((prev) => ({
    ...prev,
    [productId]:
      ((prev[productId] || 0) - 1 + total) % total
  }));
};

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

  {/* FLECHA IZQUIERDA */}
  {product.images?.length > 1 && (
    <button
      className="carousel-btn left"
      onClick={() =>
        prevImage(
          product._id,
          product.images.length
        )
      }
    >
      ◀
    </button>
  )}

  {/* IMAGEN */}
  <img
    src={
      product.images?.[
        imgIndex[product._id] || 0
      ]
    }
    alt={product.nombre}
  />

  {/* FLECHA DERECHA */}
  {product.images?.length > 1 && (
    <button
      className="carousel-btn right"
      onClick={() =>
        nextImage(
          product._id,
          product.images.length
        )
      }
    >
      ▶
    </button>
  )}

</div>

<span className="seller-name">
  👤 {
    product.vendedor?.name ||
    product.vendedor?.email?.split("@")[0] ||
    "Usuario"
  }
</span>

<span className="seller-rating">
  ⭐ Vendedor activo
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
                href={`https://wa.me/${product.vendedor?.phone || "5491164521118"}`}
                target="_blank"
                rel="noreferrer"
              >
                <>
                   <FaWhatsapp />
                    Contactar vendedor
                </>
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
            <div className="modal-carousel">

  {selectedProduct.images?.length > 1 && (
    <button
      className="carousel-btn left"
      onClick={() =>
        prevImage(
          "modal",
          selectedProduct.images.length
        )
      }
    >
      ◀
    </button>
  )}

  <img
    src={
      selectedProduct.images?.[
        imgIndex["modal"] || 0
      ]
    }
    alt={selectedProduct.nombre}
  />

  {selectedProduct.images?.length > 1 && (
    <button
      className="carousel-btn right"
      onClick={() =>
        nextImage(
          "modal",
          selectedProduct.images.length
        )
      }
    >
      ▶
    </button>
  )}

</div>

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