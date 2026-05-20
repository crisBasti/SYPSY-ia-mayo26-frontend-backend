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

    <div style={styles.card}>

      {
  product.image && (

    <img
      src={product.image}

      alt={product.nombre}

      style={styles.image}
    />
  )
}

      <h2 style={styles.title}>
        {product.nombre}
      </h2>

      <p style={styles.description}>
        {product.descripcion}
      </p>

      <p style={styles.price}>
        ${product.precio}
      </p>

      <p style={styles.category}>
        {product.categoria}
      </p>

      <div style={styles.buttons}>

        <button
          style={styles.deleteBtn}

          onClick={() =>
            deleteProduct(product._id)
          }
        >
          Eliminar
        </button>

        <button
          style={styles.editBtn}

          onClick={() =>
            startEdit(product)
          }
        >
          Editar
        </button>

      </div>

      {
        editingId === product._id && (

          <div style={styles.editBox}>

            <input
              style={styles.input}

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
              style={styles.input}

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
              style={styles.input}

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
              style={styles.input}

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
              style={styles.saveBtn}

              onClick={updateProduct}
            >
              Guardar cambios
            </button>

          </div>
        )
      }

    </div>
  );
}



const styles = {

  card: {

    background: "var(--bg)",

    border:
      "1px solid var(--border)",

    borderRadius: "16px",

    padding: "20px",

    marginBottom: "20px",

    boxShadow:
      "var(--shadow)",

    textAlign: "left"
  },

  image: {

  width: "100%",

  height: "250px",

  objectFit: "cover",

  borderRadius: "12px",

  marginBottom: "15px"
},

  title: {

    marginBottom: "10px"
  },

  description: {

    marginBottom: "15px",

    color: "var(--text)"
  },

  price: {

    fontSize: "22px",

    fontWeight: "bold",

    color: "var(--accent)",

    marginBottom: "10px"
  },

  category: {

    marginBottom: "20px",

    opacity: 0.8
  },

  buttons: {

    display: "flex",

    gap: "10px"
  },

  deleteBtn: {

    background: "#ff4d4f",

    color: "white",

    padding: "10px 15px",

    borderRadius: "8px"
  },

  editBtn: {

    background:
      "var(--accent)",

    color: "white",

    padding: "10px 15px",

    borderRadius: "8px"
  },

  editBox: {

    marginTop: "20px",

    display: "flex",

    flexDirection: "column",

    gap: "10px"
  },

  input: {

    padding: "10px",

    borderRadius: "8px",

    border:
      "1px solid var(--border)"
  },

  saveBtn: {

    background: "#22c55e",

    color: "white",

    padding: "12px",

    borderRadius: "8px"
  }
};

export default ProductCard;