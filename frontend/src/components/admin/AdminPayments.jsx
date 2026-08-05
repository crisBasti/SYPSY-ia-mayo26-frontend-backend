import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../../firebase";

function AdminPayments() {

    const [pedidos, setPedidos] = useState([]);

    const cargarPedidos = async () => {

        try {

            const token =
                await auth.currentUser.getIdToken();

            const res = await axios.get(

                `${import.meta.env.VITE_API_URL}/api/orders`,

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );

            setPedidos(res.data);

        }

        catch(error){

            console.error(error);

        }

    };

    useEffect(()=>{

        cargarPedidos();

    },[]);

    return(

        <div>

            <h2>

                💳 Gestión de Pagos

            </h2>

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

                            👤 {pedido.comprador?.name}

                        </p>

                        <p>

                            🏪 {pedido.vendedor?.name}

                        </p>

                        <p>

                            💰 ${pedido.total.toLocaleString()}

                        </p>

                        <p>

                            Estado:

                            {pedido.estadoPago}

                        </p>


                        {pedido.comprobanteTransferencia && (

                          <a
                            href={pedido.comprobanteTransferencia}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-secondary"
                          >
                            📄 Ver comprobante de transferencia
                          </a>

                        )}

                    </div>

                ))

            }

        </div>

    );

}

export default AdminPayments;