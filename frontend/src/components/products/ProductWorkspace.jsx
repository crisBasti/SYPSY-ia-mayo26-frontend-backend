import ProductForm from "../ProductForm";
import ProductManager from "./ProductManager";

import { auth } from "../../firebase";

import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";

import {
    createProductService
} from "../../services/productService";

function ProductWorkspace() {

    const {

        setProductos

    } = useContext(ProductsContext);

    const addProduct = async (

        productData,

        token

    ) => {

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

        }

        catch(error){

            console.error(error);

        }

    };

    return(

        <>

            <div className="admin-form-section">

                <h2>

                    Crear nuevo producto

                </h2>

                <ProductForm

                    addProduct={addProduct}

                />

            </div>

            <ProductManager/>

        </>

    );

}

export default ProductWorkspace;