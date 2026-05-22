import "../styles/products.css";
import SellerBadge from "./SellerBadge";

function ProductCard({
  product,
  deleteProduct,
  startEdit,
  editingId,
  editForm,
  setEditForm,
  updateProduct
}) {

  return (

    <div className="product-card">

      <img
  src={
    product.image ||
    "https://placehold.co/600x400/0f172a/ffffff?text=SYPSY"
  }
  alt={product.nombre}
  className="product-image"
/>

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