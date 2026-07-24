import {useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/admin.css";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import { ProductsContext } from "../context/ProductsContext";
import { getMyProducts, deleteProductService, updateProductService, createProductService } from "../services/productService";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import MyProducts from "../components/MyProducts";

import ProductWorkspace from "../components/products/ProductWorkspace";

function Admin() {
  const {
    productos,
    setProductos,
    eliminarProducto,
    editarProducto
  } = useContext(ProductsContext);

  // =========================
  // EDIT STATE
  // =========================

  const { profile } = useAuth();

  const [editingId, setEditingId] = useState(null);

  const { user } = useContext(AuthContext);

  const [editForm, setEditForm] =
    useState({
      nombre: "",
      descripcion: "",
      precio: "",
      categoria: "",
      imagen: ""
    });

  // =========================
  // LOAD PRODUCTS
  // =========================

  useEffect(() => {

  if (user) {
    loadProducts();
  }

}, [user]);



const loadProducts = async () => {

    try {

      const token = 
      await auth.currentUser.getIdToken();

      const data = 
      await getMyProducts(token);

      setProductos(data);

    } catch (error) {

      console.error(
        "Error loading products:",
        error
      );

    }
};

// =========================
// ADD PRODUCT
// =========================

const addProduct = async (productData, token) => {
  try {
    const newProduct =
    await createProductService(
      productData,
      token
    );
    
    
setProductos(prev => [
  newProduct,
  ...prev
]);
    } catch (error) {
      console.error(
        "Error creating product:",
        error
      );
    }
  };


  // =========================
  // DELETE PRODUCT
  // =========================

  const deleteProduct = async (id) => {
     const token =
    await auth.currentUser.getIdToken();


    const confirmar =
      window.confirm("¿Eliminar producto?");
    if (!confirmar) return;
    try {
      await deleteProductService( id, token );
      eliminarProducto(id);
    } catch (error) {
      console.error(
        "Error deleting product:",
        error
      );
    }
  };

  // =========================
  // START EDIT
  // =========================

  const startEdit = (
    product
  ) => {
    setEditingId(product._id);
    setEditForm({
      nombre:
        product.nombre,
      descripcion:
        product.descripcion,
      precio:
        product.precio,
      categoria:
        product.categoria,
      imagen:
        product.images?.[0]
    });
  };

  // =========================
  // UPDATE PRODUCT
  // =========================

  const updateProduct =
    async () => {
    try {
        const token =
  await auth.currentUser.getIdToken();

const updatedProduct =
  await updateProductService(
    editingId,
    editForm,
    token
  );
      editarProducto(
        editingId,
        updatedProduct
      );
      setEditingId(null);
    } catch (error) {
      console.error(
        "Error updating product:",
        error
      );
    }
  };



return (
  <div className="admin-container">
    <div className="admin-user-info">
  
  <div>
    👤<strong>{profile?.nombre}</strong>
    <p>{profile?.email}</p>
  </div>
</div>
    
    {/* STATS */}
    <div className="admin-stats">
      <div className="stat-card">
        <h3>
          Productos
        </h3>
        <p>
          {productos.length}
        </p>
      </div>
      <div className="stat-card">
        <h3>
          Categorías
        </h3>
        <p>
          {
            new Set(
              productos.map(
                p => p.categoria
              )
            ).size
          }
        </p>
      </div>
      <div className="stat-card">
        <h3>
          Marca
        </h3>
        <p>
          SYPSY
        </p>
      </div>
    </div>
    {/* FORM */}
    <ProductWorkspace />
  </div>
);
}

export default Admin;