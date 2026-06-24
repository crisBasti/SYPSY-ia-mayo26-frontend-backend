import "../styles/products.css";
import SellerBadge from "./SellerBadge";
import { useState } from "react";

function ProductCard({
  product,
  deleteProduct,
  startEdit,
  editingId,
  editForm,
  setEditForm,
  updateProduct
}) {

  const [currentImage, setCurrentImage] =
  useState(0);

const images =
  product.images?.length > 0
    ? product.images
    : [product.image];

  return (

    <div className="product-card">

      <div className="product-carousel">

  <img
    src={
      images[currentImage]
    }
    alt={product.nombre}
    className="product-image"
  />

  {images.length > 1 && (

    <>

      <button
        className="carousel-btn left"
        onClick={() =>

          setCurrentImage(

            currentImage === 0
              ? images.length - 1
              : currentImage - 1
          )
        }
      >
        ‹
      </button>

      <button
        className="carousel-btn right"
        onClick={() =>

          setCurrentImage(

            currentImage === images.length - 1
              ? 0
              : currentImage + 1
          )
        }
      >
        ›
      </button>

    </>

  )}

</div>

      <div className="product-info">

        <h2 className="product-title">
          {product.nombre}
        </h2>

        <p className="product-description">
          {product.descripcion}
        </p>

        <p className="price">
          ${product.precio}
        </p>

        <p className="product-category">
          {product.categoria}
        </p>

        <SellerBadge sellerId={product.vendedor?._id || "1"} />

        <div className="product-buttons">

          <button
            className="delete-btn"
            onClick={() =>
              deleteProduct(product._id)
            }
          >
            Eliminar
          </button>

          <button
            className="edit-btn"
            onClick={() =>
              startEdit(product)
            }
          >
            Editar
          </button>

          <a href={`https://wa.me/5491164521118?text=${encodeURIComponent(
                   `Hola SYPSY! Quiero consultar por este producto:

                  📦 Producto: ${product.nombre}
                  💲 Precio: $${product.precio}
                  🆔 ID: ${product._id}`
          )}`}
                target="_blank"
                rel="noopener noreferrer"
        >
        <button className="buy-btn">
            Comprar por WhatsApp
        </button>
        </a>

        </div>

        {
          editingId === product._id && (

            <div className="edit-box">

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
                    descripcion:
                      e.target.value
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
                    categoria:
                      e.target.value
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
          )
        }

      </div>

    </div>
  );
}

export default ProductCard;