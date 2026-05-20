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

  // =========================
  // PRODUCTOS DEMO
  // =========================

const demoProducts = [

  {
    id: 1,

    nombre:
      "Notebook Gamer",

    descripcion:
      "Potencia extrema para gaming y trabajo.",

    precio: 2500,

    categoria:
      "Electrónica",

    imagen:
      "https://picsum.photos/500/500?1"
  },

  {
    id: 2,

    nombre:
      "Auriculares RGB",

    descripcion:
      "Sonido envolvente profesional.",

    precio: 320,

    categoria:
      "Tecnología",

    imagen:
      "https://picsum.photos/500/500?2"
  },

  {
    id: 3,

    nombre:
      "Smartphone Premium",

    descripcion:
      "Velocidad y cámara increíble.",

    precio: 1800,

    categoria:
      "Tecnología",

    imagen:
      "https://picsum.photos/500/500?3"
  },

  {
    id: 4,

    nombre:
      "Zapatillas Urban",

    descripcion:
      "Comodidad y estilo moderno.",

    precio: 220,

    categoria:
      "Moda",

    imagen:
      "https://picsum.photos/500/500?4"
  }

];

  // =========================
  // STATE
  // =========================

  const [productos, setProductos] =
    useState(() => {

      const savedProducts =
        localStorage.getItem(
          "productos"
        );

      return savedProducts
        ? JSON.parse(savedProducts)
        : demoProducts;
    });

  // =========================
  // LOCAL STORAGE
  // =========================

  useEffect(() => {

    localStorage.setItem(
      "productos",

      JSON.stringify(productos)
    );

  }, [productos]);

  // =========================
  // AGREGAR
  // =========================

  const agregarProducto = (
    nuevoProducto
  ) => {

    setProductos((prev) => [

      ...prev,

      {
        ...nuevoProducto,

        id: Date.now()
      }

    ]);
  };

  // =========================
  // ELIMINAR
  // =========================

  const eliminarProducto = (
    id
  ) => {

    const nuevosProductos =
      productos.filter(
        (producto) =>
          producto.id !== id
      );

    setProductos(
      nuevosProductos
    );
  };

  // =========================
  // EDITAR
  // =========================

  const editarProducto = (

    id,

    productoActualizado

  ) => {

    const nuevosProductos =
      productos.map(
        (producto) => {

          if (
            producto.id === id
          ) {

            return {

              ...productoActualizado,

              id
            };
          }

          return producto;
        }
      );

    setProductos(
      nuevosProductos
    );
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