import {
  createContext,
  useEffect,
  useState
} from "react";

export const ProductsContext =
  createContext();

export function ProductsProvider({
  children
}) {

  const [productos, setProductos] =
    useState([]);

  // =========================
  // OBTENER PRODUCTOS
  // =========================

  const fetchProducts =
    async () => {

      try {

        const res =
          await fetch(`${import.meta.env.VITE_API_URL}/api/products`);

        const data =
          await res.json();

        setProductos(data);

      } catch (error) {

        console.log(
          "Error obteniendo productos:",
          error
        );
      }
    };

  // =========================
  // CREAR PRODUCTO
  // =========================

  const addProduct =
    async (
      productData,
      token
    ) => {

      try {

        const res =
          await fetch( `${import.meta.env.VITE_API_URL}/api/products`,
            {
              method: "POST",

              headers: {
                Authorization:
                  `Bearer ${token}`
              },

              body: productData
            }
          );

        const data =
          await res.json();

        setProductos(
          (prev) => [
            data,
            ...prev
          ]
        );

      } catch (error) {

        console.log(
          "Error creando producto:",
          error
        );
      }
    };

    const agregarProducto = async (producto) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });

    if (!response.ok) {
      throw new Error("Error al crear producto");
    }

    const nuevoProducto = await response.json();

    setProductos((prev) => [...prev, nuevoProducto]);

    return nuevoProducto;

  } catch (error) {
    console.error("Error creando producto:", error);
  }
};

const actualizarProducto = async (id, productoActualizado) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/products/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoActualizado),
      }
    );

    if (!response.ok) {
      throw new Error("Error actualizando producto");
    }

    const data = await response.json();

    setProductos((prev) =>
      prev.map((p) => (p._id === id ? data : p))
    );

    return data;

  } catch (error) {
    console.error("Error actualizando producto:", error);
  }
};



  // =========================
  // ELIMINAR PRODUCTO
  // =========================

  const eliminarProducto = async (id) => {

      try {

        await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`,
  {
    method: "DELETE"
  }
);

        setProductos(
          (prev) =>
            prev.filter(
              (p) => p._id !== id
            )
        );

      } catch (error) {

        console.log(error);
      }
    };

  // =========================
  // CARGAR AL INICIAR
  // =========================

  useEffect(() => {

    fetchProducts();

  }, []);

  return (

    <ProductsContext.Provider

      value={{

        productos,

        setProductos,

        fetchProducts,      

        addProduct,

        agregarProducto,

        actualizarProducto,

        editarProducto: actualizarProducto,

        eliminarProducto

      }}
    >

      {children}

    </ProductsContext.Provider>
  );
}