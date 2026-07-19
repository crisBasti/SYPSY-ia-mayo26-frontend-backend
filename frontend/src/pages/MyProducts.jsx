import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase";
import ProductSellerCard from "../components/seller/ProductSellerCard";

function MyProducts() {

    const [productos,setProductos]=useState([]);

    useEffect(()=>{

        cargarProductos();

    },[]);

    const cargarProductos = async()=>{

        try{

            const token =
                await auth.currentUser.getIdToken();

            const response =
                await axios.get(

                    `${import.meta.env.VITE_API_URL}/api/products/mine`,

                    {

                        headers:{

                            Authorization:`Bearer ${token}`

                        }

                    }

                );

            setProductos(response.data);

        }

        catch(error){

            console.error(error);

        }

    };


    const eliminarProductoLocal = (id) => {

    setProductos((prev) =>

        prev.filter(

            producto => producto._id !== id

        )

    );

};

    return(

        <div>

            <h2>📦 Mis Productos</h2>

            {

                productos.length===0 ?

                (

                    <p>

                        Todavía no publicaste productos.

                    </p>

                )

                :

                (

                    productos.map(producto => (

                       <ProductSellerCard

                       key={producto._id}

                       producto={producto}

                       onDelete={eliminarProductoLocal}

                       />

                    ))

                )

            }

        </div>

    );

}

export default MyProducts;