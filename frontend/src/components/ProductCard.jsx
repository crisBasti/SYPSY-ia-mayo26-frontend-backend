import "../styles/products.css";
import SellerBadge from "./SellerBadge";
import { useState } from "react";
import { Link } from "react-router-dom";

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


const modoVendedor =

deleteProduct &&
startEdit &&
updateProduct;

  return (

    <div className="product-card">

      <Link
        to={`/producto/${product._id}`}
        className="product-carousel"
      >

        <div className="card-top-badges">

          <span className="badge-new">

            NUEVO

          </span>

        </div>

        <button
          type="button"
          className="favorite-btn"
        >

          🤍

        </button>

      <img
        src={images[currentImage]}
        alt={product.nombre}
        className="product-image"
      />

  {images.length > 1 && (
    <>
      <button
        type="button"
        className="carousel-btn left"
        onClick={(e)=>{
          e.preventDefault();
          e.stopPropagation();

          setCurrentImage(
            currentImage===0
            ? images.length-1
            : currentImage-1
          );
        }}
      >
        ‹
      </button>

      <button
        type="button"
        className="carousel-btn right"
        onClick={(e)=>{
          e.preventDefault();
          e.stopPropagation();

          setCurrentImage(
            currentImage===images.length-1
            ? 0
            : currentImage+1
          );
        }}
      >
        ›
      </button>

    </>
  )}

</Link>

      <div className="product-info">

        <Link
          to={`/producto/${product._id}`}
          className="product-title-link"
        >

            <h2 className="product-title">
              {product.nombre}
            </h2>

        </Link>

        <p className="product-description">
          {product.descripcion}
        </p>

        <p className="price">
          ${product.precio}
        </p>

        <div className="product-status">

          <span className="status-dot"></span>

             Disponible

        </div>

        <p className="product-category">
          {product.categoria}
        </p>

        <SellerBadge sellerId={product.vendedor?._id || "1"} />

        <div className="product-buttons">

{modoVendedor && (

<>

<button
className="delete-btn"
onClick={()=>deleteProduct(product._id)}
>

Eliminar

</button>

<button
className="edit-btn"
onClick={()=>startEdit(product)}
>

Editar

</button>

</>

)}

<Link
to={`/producto/${product._id}`}
className="details-btn"
>

Ver producto

</Link>

</div>

        {
          modoVendedor &&
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