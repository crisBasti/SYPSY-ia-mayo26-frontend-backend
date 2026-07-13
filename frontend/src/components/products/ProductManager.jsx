import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase";

import {
    getMyProducts,
    deleteProductService,
    updateProductService
} from "../../services/productService";

import MyProducts from "../MyProducts";

function ProductManager() {

    const {

        productos,
        setProductos,
        eliminarProducto,
        editarProducto

    } = useContext(ProductsContext);

    const { user } = useContext(AuthContext);

    const [editingId, setEditingId] = useState(null);

    const [editForm, setEditForm] = useState({

        nombre: "",
        descripcion: "",
        precio: "",
        categoria: "",
        imagen: ""

    });

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

            console.error(error);

        }

    };

    const deleteProduct = async (id) => {

        const token =
            await auth.currentUser.getIdToken();

        if (!window.confirm("¿Eliminar producto?")) {

            return;

        }

        await deleteProductService(

            id,

            token

        );

        eliminarProducto(id);

    };

    const startEdit = (product) => {

        setEditingId(product._id);

        setEditForm({

            nombre: product.nombre,
            descripcion: product.descripcion,
            precio: product.precio,
            categoria: product.categoria,
            imagen: product.images?.[0]

        });

    };

    const updateProduct = async () => {

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

    };

    return (

        <MyProducts

            productos={productos}

            deleteProduct={deleteProduct}

            startEdit={startEdit}

            editingId={editingId}

            editForm={editForm}

            setEditForm={setEditForm}

            updateProduct={updateProduct}

        />

    );

}

export default ProductManager;