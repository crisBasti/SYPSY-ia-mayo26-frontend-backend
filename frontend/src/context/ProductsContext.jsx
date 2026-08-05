import { createContext, useEffect, useState } from "react";
import { useLocation } from "./LocationContext";
import calcularDistancia from "../utils/calcularDistancia";


export const ProductsContext = createContext();

export function ProductsProvider({
  children
}) {

  const [productos, setProductos] = useState([]);
  const location = useLocation();

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

const productosOrdenados = [...data];

if(location?.lat && location?.lng){

    productosOrdenados.sort((a,b)=>{

        const da = calcularDistancia(

            location.lat,

            location.lng,

            a?.ubicacion?.lat,

            a?.ubicacion?.lng

        ) ?? 999999;

        const db = calcularDistancia(

            location.lat,

            location.lng,

            b?.ubicacion?.lat,

            b?.ubicacion?.lng

        ) ?? 999999;

        return da-db;

    });

}

setProductos(productosOrdenados);

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