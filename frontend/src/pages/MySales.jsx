import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase";
import OrderCard from "../components/admin/OrderCard";
import OrderDrawer from "../components/admin/OrderDrawer";

function MySales() {

    const [pedidos,setPedidos]=useState([]);

    const [pedidoSeleccionado,setPedidoSeleccionado]=useState(null);

    const [searchParams] = useSearchParams();

    useEffect(()=>{

        cargarPedidos();

    },[]);

    useEffect(() => {

    const orderId = searchParams.get("orderId");

    if (!orderId || pedidos.length === 0) return;

    const pedido = pedidos.find(
        (item) => item._id === orderId
    );

    if (pedido) {

        setPedidoSeleccionado(pedido);

    }

}, [searchParams, pedidos]);

    const cargarPedidos = async()=>{

        try{

            const token =
                await auth.currentUser.getIdToken();

            const response =
                await axios.get(

                    `${import.meta.env.VITE_API_URL}/api/orders/mis-ventas`,

                    {

                        headers:{

                            Authorization:`Bearer ${token}`

                        }

                    }

                );

            setPedidos(response.data);

        }

        catch(error){

            console.error(error);

        }

    };

    return(

        <div className="my-orders-container">

            <h1>🏪 Mis Ventas</h1>

            {

                pedidos.map((pedido)=>(

                    <OrderCard

                        key={pedido._id}

                        pedido={pedido}

                        onSelect={setPedidoSeleccionado}

                    />

                ))

            }

            <OrderDrawer
              pedido={pedidoSeleccionado}
              onClose={() => setPedidoSeleccionado(null)}
              onActualizarPedido={(pedidoActualizado) => {

                setPedidos((prev) =>
                  prev.map((pedido) =>
                    pedido._id === pedidoActualizado._id
                      ? pedidoActualizado
                      : pedido
                  )
                );

               setPedidoSeleccionado(pedidoActualizado);

              }}
            />

            </div>

    );

}

export default MySales;