import { useState } from "react";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

function ProductForm({ addProduct }) {

  const { user } = useAuth();

  const [formData, setFormData] =
  useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    images: []
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (
    !formData.nombre.trim() ||
    !formData.descripcion.trim() || 
    !formData.precio ||
    Number(formData.precio) <= 0 ||
    !formData.categoria
  ) {
    alert(
      "Completa correctamente todos los campos"
    );
    return;
  }

  const productData = new FormData();

  productData.append(
    "nombre",
    formData.nombre
  );

  productData.append(
    "descripcion",
    formData.descripcion
  );

  productData.append(
    "precio",
    formData.precio
  );

  productData.append(
    "categoria",
    formData.categoria
  );

  productData.append(
  "vendedor",
  JSON.stringify({
    uid: user.uid,
    email: user.email,
    name: user.displayName || "Usuario"
  })
);

  formData.images?.forEach((file) => {

  productData.append(
    "images",
    file
  );
});

  const token = await auth.currentUser.getIdToken();

  await addProduct(productData, token);

  setFormData({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    images: []
  });
};

  return (
    <form
      onSubmit={handleSubmit}
      style={styles.form}
    >
      <h2 style={styles.title}>
        Crear producto
      </h2>
      <input
        style={styles.input}
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
      />

      <input
        style={styles.input}
        type="text"
        name="descripcion"
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
      />

      <input
        style={styles.input}
        type="number"
        name="precio"
        placeholder="Precio"
        value={formData.precio}
        onChange={handleChange}
      />

      <select
  style={styles.input}
  name="categoria"
  value={formData.categoria}
  onChange={handleChange}
>
  <option value="">
    Seleccionar categoría
  </option>

  <option value="Indumentaria">
    👕 Indumentaria
  </option>

  <option value="Electro">
    📺 Electro
  </option>

  <option value="Servicios">
    🔧 Servicios
  </option>

  <option value="Varios">
    📦 Varios
  </option>
</select>

      <input
        type="file"
        multiple
        accept="image/*"
          onChange={(e) => {

  const files =
    Array.from(e.target.files);
    setFormData((prev) => ({
  ...prev,
  images: [
    ...(prev.images || []),
    ...files
  ]
}));
}}
/>

<div className="preview-grid">
  {formData.images?.map((file, index) => (
    <div
      key={index}
      className="preview-card"
    >
      <img
        src={URL.createObjectURL(file)}
        alt={`preview-${index}`}
        className="preview-image"
      />
    </div>
  ))}

</div>
      <button
        type="submit"
        style={styles.button}
      >
        Crear producto
      </button>
    </form>
  );
}





export default ProductForm;