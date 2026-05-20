import { createContext, useEffect, useState } from "react";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {

  const [productos, setProductos] = useState(() => {
    const productosGuardados = localStorage.getItem("productos");

    return productosGuardados
      ? JSON.parse(productosGuardados)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "productos",
      JSON.stringify(productos)
    );
  }, [productos]);

  // CREAR
  const agregarProducto = (nuevoProducto) => {
    setProductos([
      ...productos,
      nuevoProducto
    ]);
  };

  // ELIMINAR
  const eliminarProducto = (id) => {
    const nuevosProductos =
      productos.filter(
        producto => producto.id !== id
      );

    setProductos(nuevosProductos);
  };

  // EDITAR
  const editarProducto = (
    id,
    productoActualizado
  ) => {

    const nuevosProductos =
      productos.map(producto => {
        
        if (producto.id === id) {
          return productoActualizado;
        }
        
        return producto;
        console.log(producto);
      });
      
      setProductos(nuevosProductos);
    };
    
    
  return (
    <ProductsContext.Provider
      value={{
        productos,
        setProductos,
        agregarProducto,
        eliminarProducto,
        editarProducto
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}