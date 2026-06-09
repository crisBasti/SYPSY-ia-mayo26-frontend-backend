import {useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/admin.css";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import { ProductsContext } from "../context/ProductsContext";
import { getProducts, deleteProductService, updateProductService, createProductService } from "../services/productService";

function Admin() {
  const {
    productos,
    setProductos,
    addProduct: addProductContext,
    eliminarProducto,
    editarProducto
  } = useContext(ProductsContext);

  // =========================
  // EDIT STATE
  // =========================

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
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data =
        await getProducts();
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

  const addProduct = async (productData) => {
    try {
      const newProduct =
        await createProductService(productData, user.token);
      addProductContext(newProduct);
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
    console.log("ID recibido:", id);
    const confirmar =
      window.confirm("¿Eliminar producto?");
    if (!confirmar) return;
    try {
      await deleteProductService(id);
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
      const updatedProduct =
        await updateProductService(
          editingId,
          editForm,
          user.token
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

  console.log("PRODUCTOS ADMIN", productos);

return (
  <div className="admin-container">
    {/* HERO ADMIN */}
    <div className="admin-hero">
      <img
        src="/logo-sypsy.png"
        alt="SYPSY Logo"
        className="admin-logo"
      />
      <div>
        <h1 className="admin-title">
          CEO Dashboard
        </h1>
        <p className="admin-subtitle">
          Gestión premium de productos SYPSY
        </p>
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
          SYPSY IA
        </p>
      </div>
    </div>
    {/* FORM */}
    <div className="admin-form-section">
      <h2>
        Crear nuevo producto
      </h2>
      <ProductForm
        addProduct={addProduct}
      />
    </div>
    {/* PRODUCTS */}
    <div className="products-section">
      <h2>
        Productos publicados
      </h2>
      <div className="products-grid">

        {productos.map((product) => (
          <ProductCard
          key={product._id}
          product={product}
          deleteProduct={deleteProduct}
          startEdit={startEdit}
          editingId={editingId}
          editForm={editForm}
          setEditForm={setEditForm}
          updateProduct={updateProduct}
            />
          ))
        }
      </div>
    </div>
  </div>
);
}

export default Admin;