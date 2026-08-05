import { createContext, useEffect, useState } from "react";
import { useLocation } from "./LocationContext";


export const ProductsContext = createContext();

export function ProductsProvider({
  children
}) {

  const location = useLocation();
  const [productos, setProductos] = useState([]);

  // =========================
  // OBTENER PRODUCTOS
  // =========================

  const fetchProducts = async () => {

    try{

        const params = new URLSearchParams();

        if(location?.lat && location?.lng){

            params.append("lat",location.lat);

            params.append("lng",location.lng);

        }

        const res = await fetch(

            `${import.meta.env.VITE_API_URL}/api/products?${params.toString()}`

        );

        const data = await res.json();

        setProductos(data);

    }

    catch(error){

        console.log(

            "Error obteniendo productos:",

            error

        );

    }

};


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

  useEffect(() => {
    fetchProducts();
  }, [location]);

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