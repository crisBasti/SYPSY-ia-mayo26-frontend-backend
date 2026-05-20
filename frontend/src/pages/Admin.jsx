import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";

import ProductForm from "../components/ProductForm";

import {
  useContext
} from "react";

import {
  ProductsContext
} from "../context/ProductsContext";

import {

  getProducts,

  deleteProductService,

  updateProductService,

  createProductService

} from "../services/productService";



function Admin() {

  const { productos, setProductos, agregarProducto, eliminarProducto, editarProducto } = useContext(ProductsContext);

  const [editingId, setEditingId] =
    useState(null);

  const [editForm, setEditForm] =
    useState({

      nombre: "",

      descripcion: "",

      precio: "",

      categoria: ""
    });



useEffect(() => {

  getProducts()
    .then((data) => {

      setProductos(data);

    })
    .catch((error) => {

      console.error(error);
    });

}, []);






const deleteProduct = async (id) => {

  const confirmar =
    window.confirm(
      "¿Eliminar producto?"
    );

  if (!confirmar) return;

  try {

    await deleteProductService(id);

    eliminarProducto(id);

  } catch (error) {

    console.error(error);
  }
};




  const startEdit = (product) => {

    setEditingId(product._id);

    setEditForm({

      nombre: product.nombre,

      descripcion:
        product.descripcion,

      precio: product.precio,

      categoria:
        product.categoria
    });
  };




const updateProduct = async () => {

  try {

    const updatedProduct =
      await updateProductService(
        editingId,
        editForm
      );

    editarProducto(
      editingId,
      updatedProduct
    );

    setEditingId(null);

  } catch (error) {

    console.error(error);
  }
};

const addProduct = async (
  productData
) => {

  try {

    const newProduct =
      await createProductService(
        productData
      );

    agregarProducto(newProduct);

  } catch (error) {

    console.error(error);
  }
};



  return (

    <div style={{ padding: "20px" }}>

      <h1>
        Panel Admin SYPSY
      </h1>

      <ProductForm addProduct={addProduct} />

      {

        productos.map((product) => (

          <ProductCard

            key={product._id}

            product={product}

            deleteProduct={
              deleteProduct
            }

            startEdit={startEdit}

            editingId={editingId}

            editForm={editForm}

            setEditForm={setEditForm}

            updateProduct={
              updateProduct
            }
          />
        ))
      }

    </div>
  );
}

export default Admin;