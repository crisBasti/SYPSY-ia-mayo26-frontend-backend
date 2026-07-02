import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";

function SellerProfile() {
  const { id } = useParams();
  const { productos } = useContext(ProductsContext);

  // 🔥 productos del vendedor por UID
  const sellerProducts = productos.filter(
  (p) => p.vendedor?.uid === id
);

const seller = sellerProducts[0]?.vendedor;

  // 🔥 si no hay productos
  if (sellerProducts.length === 0) {
    return (
      <div className="seller-profile">
        <h2>No hay productos para este vendedor</h2>
        <Link to="/">Volver</Link>
      </div>
    );
  }

  return (
    <div className="seller-profile">

      {/* HEADER */}
      <div className="seller-header">

        <h1>👤 {seller?.name || "Vendedor"}</h1>
        <p>{seller?.email}</p>
        <p>
          ID: {id}
        </p>
        <p>
  <a
    href="https://www.sypsy.com.ar"
    target="_blank"
    rel="noreferrer"
  >
    🌐 www.sypsy.com.ar
  </a>
</p>

      </div>

      {/* PRODUCTOS */}
      <h2>Productos publicados</h2>

      <div className="products-grid">

        {sellerProducts.map((product) => (
          <div key={product._id} className="product-card">

            <img
              src={product.images?.[0]}
              alt={product.nombre}
            />

            <div className="product-info">

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
  href={`https://wa.me/54${seller?.telefono}?text=${encodeURIComponent(
    `Hola ${seller?.name} 👋

Vi este producto en SYPSY:

📦 ${product.nombre}
💰 $${product.precio}

🌐 https://www.sypsy.com.ar

¿Sigue disponible?`
  )}`}
  target="_blank"
  rel="noreferrer"
>
  Contactar vendedor
</a>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default SellerProfile;