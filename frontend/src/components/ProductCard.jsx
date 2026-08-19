import "../styles/products.css";
import SellerBadge from "./SellerBadge";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "../context/LocationContext";
import calcularDistancia from "../utils/calcularDistancia";
import generarMensajeVenta from "../utils/generarMensajeVenta";
import FavoriteButton from "./FavoriteButton";
import { slugify } from "../utils/slugify";
import generarUbicacionProducto from "../utils/generarUbicacionProducto";

function ProductCard({
  product,
  deleteProduct,
  startEdit,
  editingId,
  editForm,
  setEditForm,
  updateProduct,
  onImpression,
  onClick
}) {

  const [currentImage, setCurrentImage] = useState(0);

  const location = useLocation();

  const images =
    product.images?.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [];

  const modoVendedor =
    deleteProduct &&
    startEdit &&
    updateProduct;

  const distancia = calcularDistancia(
    location?.lat,
    location?.lng,
    product?.ubicacion?.lat,
    product?.ubicacion?.lng
  );

  const ubicacionProducto = generarUbicacionProducto(
    product,
    distancia
);

  const mensajes = generarMensajeVenta(
    product,
    distancia
  );

  const productUrl =
    `/producto/${slugify(product.nombre)}-${product._id}`;

  const handleCardClick = () => {

    if (onClick) {
      onClick(product);
    }

  };

  return (

    <div
      className="product-card"
      onClick={handleCardClick}
    >

      <Link
        to={productUrl}
        className="product-carousel"
        onClick={() => {

          if (onImpression) {
            onImpression(product._id);
          }

        }}
      >

        {/* =========================
            BADGES
        ========================= */}

        <div className="card-top-badges">

          {product.nivelPromocion === 3 && (
            <span className="badge-premium">
              👑 Premium
            </span>
          )}

          {product.nivelPromocion === 2 && (
            <span className="badge-featured">
              🚀 Destacado
            </span>
          )}

          {product.nivelPromocion === 1 && (
            <span className="badge-promo">
              ⭐ Promoción
            </span>
          )}

          {product.createdAt &&
            (new Date() - new Date(product.createdAt)) <
            1000 * 60 * 60 * 24 * 7 && (

              <span className="badge-new">
                Nuevo
              </span>

            )}

        </div>

        {/* =========================
            FAVORITO
        ========================= */}

        <FavoriteButton
          productId={product._id}
        />

        {/* =========================
            IMAGEN
        ========================= */}

        <div className="product-card-image">

          {images.length > 0 ? (

            <img
              src={images[currentImage]}
              alt={product.nombre}
              className="product-image"
            />

          ) : (

            <div className="product-image-placeholder">
              Sin imagen
            </div>

          )}

          {images.length > 1 && (

            <>

              <button
                type="button"
                className="carousel-btn left"
                onClick={(e) => {

                  e.preventDefault();
                  e.stopPropagation();

                  setCurrentImage(
                    currentImage === 0
                      ? images.length - 1
                      : currentImage - 1
                  );

                }}
              >
                ‹
              </button>

              <button
                type="button"
                className="carousel-btn right"
                onClick={(e) => {

                  e.preventDefault();
                  e.stopPropagation();

                  setCurrentImage(
                    currentImage === images.length - 1
                      ? 0
                      : currentImage + 1
                  );

                }}
              >
                ›
              </button>

            </>

          )}

        </div>

        {/* =========================
              INFORMACIÓN RÁPIDA
            ========================= */}

<div className="product-card-meta">

  {distancia && (

    <span className="product-meta-badge distance">
      📍 A {distancia} km
    </span>

  )}

  {distancia && distancia <= 5 && (

    <span className="product-meta-badge delivery">
      ⚡ Llega hoy
    </span>

  )}

  {mensajes.slice(0, 2).map((m, index) => (

    <span
      key={index}
      className={`product-meta-badge ${m.tipo}`}
    >

      {m.icono} {m.texto}

    </span>

  ))}

</div>


{/* =========================
    PRECIO
========================= */}

<div className="product-card-price">

  <span className="price">
    ${product.precio}
  </span>

</div>

      </Link>


      {/* ==================================================
          INFORMACIÓN COMPLETA
          SOLO PARA MODO VENDEDOR
          ================================================== */}

      {modoVendedor && (

        <div className="product-info">

          <Link
            to={productUrl}
            className="product-title-link"
          >

            <h2 className="product-title">
              {product.nombre}
            </h2>

          </Link>

          <p className="product-description">
            {product.descripcion}
          </p>

          <div className="selling-messages">

            {mensajes.map((m, index) => (

              <div
                key={index}
                className={`selling-pill ${m.tipo}`}
              >

                {m.icono} {m.texto}

              </div>

            ))}

          </div>


          {ubicacionProducto && (

            <div className="product-location">

              📍 {ubicacionProducto}

            </div>

          )}

          {distancia && (

            <div className="product-distance">
              📍 A {distancia} km de vos
            </div>

          )}

          {distancia && distancia <= 5 && (

            <div className="delivery-today">
              ⚡ Puede llegar hoy
            </div>

          )}

          <div className="product-status">

            <span className="status-dot"></span>

            Disponible

          </div>

          <p className="product-category">
            {product.categoria}
          </p>

          <SellerBadge
            vendedor={product.vendedor}
          />

          {product.vendedor?.ciudad && (

            <p className="seller-location">
              📍 Vendedor en {product.vendedor.ciudad}
            </p>

          )}

          <div className="product-buttons">

            <button
              className="delete-btn"
              onClick={(e) => {

                e.preventDefault();
                e.stopPropagation();

                deleteProduct(product._id);

              }}
            >
              Eliminar
            </button>

            <button
              className="edit-btn"
              onClick={(e) => {

                e.preventDefault();
                e.stopPropagation();

                startEdit(product);

              }}
            >
              Editar
            </button>

            <Link
              to={productUrl}
              className="details-btn"
              onClick={() => {

                if (onImpression) {
                  onImpression(product._id);
                }

              }}
            >
              Ver producto
            </Link>

          </div>

          {editingId === product._id && (

            <div
              className="edit-box"
              onClick={(e) => e.stopPropagation()}
            >

              <input
                className="edit-input"
                type="text"
                value={editForm.nombre}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    nombre: e.target.value
                  })
                }
              />

              <input
                className="edit-input"
                type="text"
                value={editForm.descripcion}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    descripcion: e.target.value
                  })
                }
              />

              <input
                className="edit-input"
                type="number"
                value={editForm.precio}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    precio: e.target.value
                  })
                }
              />

              <input
                className="edit-input"
                type="text"
                value={editForm.categoria}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    categoria: e.target.value
                  })
                }
              />

              <button
                className="save-btn"
                onClick={updateProduct}
              >
                Guardar cambios
              </button>

            </div>

          )}

        </div>

      )}

    </div>

  );

}

export default ProductCard;