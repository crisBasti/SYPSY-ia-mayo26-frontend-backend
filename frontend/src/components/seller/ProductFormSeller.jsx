import { useState } from "react";
import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { createProductService } from "../../services/productService";

function ProductFormSeller({ addProduct }) {

  const { user } = useAuth();

  const { id } = useParams();

const navigate = useNavigate();



  const [formData, setFormData] =
  useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    images: []
});

useEffect(() => {

    if (id) {

        cargarProducto();

    }

}, [id]);

const cargarProducto = async () => {

    try {

        const response = await axios.get(

            `${import.meta.env.VITE_API_URL}/api/products`

        );

        const producto = response.data.find(

            p => p._id === id

        );

        if (!producto) return;

        setFormData({
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            categoria: producto.categoria,
            stock: producto.stock,
            images: []
        });
    }

    catch(error){
        console.error(error);
    }
};

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

  //console.log(user);

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

if(id){

    await axios.put(

        `${import.meta.env.VITE_API_URL}/api/products/${id}`,

        {

            nombre: formData.nombre,

            descripcion: formData.descripcion,

            precio: formData.precio,

            categoria: formData.categoria,

            stock: formData.stock

        },

        {

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

}

else{

    await createProductService(
      productData,
      token
    );
}

navigate("/micuenta");

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

    const files = Array.from(e.target.files);

    const nuevasImagenes = [
      ...(formData.images || []),
      ...files
    ];

    if (nuevasImagenes.length > 5) {

      alert("Solo podés subir un máximo de 5 imágenes.");

      return;

    }

    setFormData(prev => ({

      ...prev,

      images: nuevasImagenes

    }));

  }}
/>

<p
  style={{
    fontSize:"13px",
    color:"#64748b",
    marginTop:"8px"
  }}
>
Máximo permitido: 5 imágenes
</p>

<div className="preview-grid">

{formData.images?.map((file,index)=>(

<div
key={index}
className="preview-card"
>

<button
type="button"
className="remove-image"

onClick={()=>{

setFormData(prev=>({

...prev,

images:prev.images.filter((_,i)=>i!==index)

}));

}}

>

✕

</button>

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
        {id ? "Guardar cambios" : "Crear producto"}
      </button>
    </form>
  );
}



const styles = {
  form: {
    background: "var(--bg)",
    border: "1px solid var(--border)",
    borderRadius: "16px",
    padding: "25px",
    marginBottom: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow: "var(--shadow)"
  },

  title: {
    textAlign: "left"
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid var(--border)",
    fontSize: "16px",
    outline: "none"
  },

  button: {
    background: "var(--accent)",
    color: "white",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold"
  }
};

export default ProductFormSeller;