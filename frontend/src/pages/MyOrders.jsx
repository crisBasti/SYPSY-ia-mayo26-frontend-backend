import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase";
import OrderCard from "../components/admin/OrderCard";
import OrderDrawer from "../components/admin/OrderDrawer";

function MyOrders() {

    const [pedidos, setPedidos] = useState([]);

    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

    useEffect(() => {

        cargarPedidos();

    }, []);

    const cargarPedidos = async () => {

        try {

            const token = await auth.currentUser.getIdToken();

            const response = await axios.get(

                `${import.meta.env.VITE_API_URL}/api/orders/mis-compras`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

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

            <h1>📦 Mis Compras</h1>

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

                onClose={()=>setPedidoSeleccionado(null)}

            />

        </div>

    );

}

export default MyOrders;