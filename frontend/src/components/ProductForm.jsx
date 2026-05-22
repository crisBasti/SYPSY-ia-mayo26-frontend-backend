import { useState } from "react";


import { useAuth } from "../context/AuthContext";



function ProductForm({ addProduct }) {


  const { user } = useAuth();

  const [formData, setFormData] =
    useState({

      nombre: "",

      descripcion: "",

      precio: "",

      categoria: ""
    });

    const [image, setImage] = useState(null);




  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  };




const handleSubmit = (e) => {

  e.preventDefault();

  if (

    !formData.nombre.trim() ||

    !formData.descripcion.trim() ||

    !formData.precio ||

    Number(formData.precio) <= 0 ||

    !formData.categoria.trim()

  ) {

    alert(
      "Completa correctamente todos los campos"
    );

    return;
  }

  const productData =
    new FormData();

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

  console.log(user);

  productData.append(
  "vendedor",
  JSON.stringify({
    uid: user.uid,
    email: user.email,
    name: user.displayName || "Usuario"
  })
);

  productData.append(
    "image",
    image
  );

  addProduct(productData);

  setFormData({

    nombre: "",

    descripcion: "",

    precio: "",

    categoria: ""
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

      <input
        style={styles.input}

        type="text"

        name="categoria"

        placeholder="Categoría"

        value={formData.categoria}

        onChange={handleChange}
      />

      <input
        type="file"
        
        accept="image/*"
        
        onChange={(e) =>
        
          setImage(
      
            e.target.files[0]
    
          )
  
        }

      />

      <button
        type="submit"

        style={styles.button}
      >
        Crear producto
      </button>

    </form>
  );
}



const styles = {

  form: {

    background: "var(--bg)",

    border:
      "1px solid var(--border)",

    borderRadius: "16px",

    padding: "25px",

    marginBottom: "30px",

    display: "flex",

    flexDirection: "column",

    gap: "15px",

    boxShadow:
      "var(--shadow)"
  },

  title: {

    textAlign: "left"
  },

  input: {

    padding: "14px",

    borderRadius: "10px",

    border:
      "1px solid var(--border)",

    fontSize: "16px",

    outline: "none"
  },

  button: {

    background:
      "var(--accent)",

    color: "white",

    padding: "14px",

    borderRadius: "10px",

    fontSize: "16px",

    fontWeight: "bold"
  }
};

export default ProductForm;