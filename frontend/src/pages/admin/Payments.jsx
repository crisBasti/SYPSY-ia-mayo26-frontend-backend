import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../../firebase";

function Payments() {

    const [pedidos,setPedidos]=useState([]);

    useEffect(()=>{

        cargar();

    },[]);

    const cargar=async()=>{

        const token=
            await auth.currentUser.getIdToken();

        const res=await axios.get(

            `${import.meta.env.VITE_API_URL}/api/orders`,

            {

                headers:{
                    Authorization:`Bearer ${token}`
                }

            }

        );

        setPedidos(res.data);

    };

    return(

        <div className="admin-payments">

            <h1>

                💳 Gestión de Pagos

            </h1>

            {

                pedidos.map((pedido)=>(

                    <div

                        key={pedido._id}

                        className="payment-card"

                    >

                        <h3>

                            {pedido.numeroPedido}

                        </h3>

                        <p>

                            Comprador:

                            {pedido.comprador?.name}

                        </p>

                        <p>

                            Vendedor:

                            {pedido.vendedor?.name}

                        </p>

                        <p>

                            Total:

                            ${pedido.total.toLocaleString()}

                        </p>

                        <p>

                            Estado Pago:

                            {pedido.estadoPago}

                        </p>

                    </div>

                ))

            }

        </div>

    );

}

export default Payments;