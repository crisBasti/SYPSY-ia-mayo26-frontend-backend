import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../context/ProductsContext";
import SellerBadge from "../components/SellerBadge";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { slugify } from "../utils/slugify";
import { incrementWhatsappService } from "../services/productService";
import AdvertisementBanner from "../components/AdvertisementBanner";

function Home({ search }) {
  const { productos, fetchProducts } = useContext(ProductsContext);
  useEffect(() => { fetchProducts(); }, []);

  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imgIndex, setImgIndex] = useState({});
  const handleWhatsappClick = async (productId) => {

  try {

    await incrementWhatsappService(productId);

  } catch (error) {

    console.error(error);

  }

};

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
  <>
    <Helmet>

      <title>
        SYPSY | Marketplace de productos y servicios en Argentina
      </title>

      <meta
        name="description"
        content="Comprá y vendé productos, servicios y oportunidades en SYPSY. Marketplace argentino con vendedores verificados y contacto directo por WhatsApp."
      />

      <meta
        name="keywords"
        content="marketplace, ecommerce, argentina, comprar, vender, productos, servicios, whatsapp, sypsy"
      />

      <meta
        property="og:title"
        content="SYPSY | Marketplace de productos y servicios"
      />

      <meta
        property="og:description"
        content="Comprá y vendé productos y servicios con contacto directo por WhatsApp."
      />

      <meta
        property="og:url"
        content="https://www.sypsy.com.ar"
      />

      <meta
        property="og:type"
        content="website"
      />

    </Helmet>

    <div className="products-container">

      <AdvertisementBanner

        position="home_top"

      />

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

      <AdvertisementBanner

         position="home_middle"

      />

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
                  onClick={() =>
                      incrementWhatsappService(
                      product._id,
                      "home",
                      search
                  )
                }
                href={`https://wa.me/54${product.vendedor?.telefono}?text=${encodeURIComponent(
                `Hola ${product.vendedor?.name} 👋

Estoy interesado en este producto de SYPSY:

 📦 Producto: ${product.nombre}
 💰 Precio: $${product.precio}

 🌐 https://www.sypsy.com.ar

 ¿Sigue disponible?`
              )}`}
              
              target="_blank"
              rel="noreferrer"
              >
              <>
              <FaWhatsapp />
                Contactar vendedor
              </>
              </a>

              {/* VER PRODUCTO */}
              <Link
                to={`/producto/${slugify(product.nombre)}-${product._id}`}
                className="view-btn"
              >
              Ver producto
              </Link>

            </div>
          </div>
        ))}
      </div>

      <AdvertisementBanner

           position="home_bottom"

      />

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
    </>
  );
}

export default Home;