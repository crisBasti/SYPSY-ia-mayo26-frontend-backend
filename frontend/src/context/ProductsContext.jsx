import { createContext, useEffect, useState } from "react";

export const ProductsContext = createContext();

export function ProductsProvider({
  children
}) {

  const [productos, setProductos] = useState([]);

  // =========================
  // OBTENER PRODUCTOS
  // =========================

  const fetchProducts =
    async () => {

      try {

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);

        const data = await res.json();

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

//const addProduct = async (productData, token) => {
//  try {
//    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
//     method: "POST",
//      headers: {
//        Authorization: `Bearer ${token}`
//      },
//      body: productData
//    });

//    const data = await res.json();

//    setProductos((prev) => [data, ...prev]);
//
//  } catch (error) {
//    console.log("Error creando producto:", error);
//  }
//};


const actualizarProducto = (
  id,
  productoActualizado
) => {

  setProductos(prev =>
    prev.map(p =>
      p._id === id
        ? productoActualizado
        : p
    )
  );

};

  // =========================
  // ELIMINAR PRODUCTO
  // =========================

const eliminarProducto = (id) => {

  setProductos(prev =>
    prev.filter(
      p => p._id !== id
    )
  );

};

  // =========================
  // CARGAR AL INICIAR
  // =========================

//  useEffect(() => {
//    fetchProducts();
//  }, []);

  return (
    <ProductsContext.Provider
      value={{
        productos,
        setProductos,
        fetchProducts,
        actualizarProducto,
        editarProducto: actualizarProducto,
        eliminarProducto
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}