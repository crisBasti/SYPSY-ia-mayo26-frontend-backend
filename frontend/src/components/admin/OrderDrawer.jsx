

import OrderTimeline from "./OrderTimeline";
import axios from "axios";
import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";


function OrderDrawer({

    pedido,

    onClose

}){

    const { user } = useAuth();

const esVendedor =
    user?.uid === pedido?.vendedor?.uid;

const esComprador =
    user?.uid === pedido?.comprador?.uid;

    if(!pedido) return null;


    const ejecutarAccion = async (accion) => {

    try {

        const token = await auth.currentUser.getIdToken();

        // Confirmación del comprador
        if (accion === "FINALIZAR") {

            await axios.post(

                `${import.meta.env.VITE_API_URL}/api/orders/${pedido._id}/confirmar`,

                {},

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

        }

        // Acciones normales del vendedor
        else {

            await axios.put(

                `${import.meta.env.VITE_API_URL}/api/orders/${pedido._id}`,

                { accion },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

        }

        window.location.reload();

    }

    catch(error){

        console.error(error);

        alert(
            error.response?.data?.message ||
            "Ocurrió un error"
        );

    }

};





    return(

        <div className="drawer-overlay">

            <div className="order-drawer">

                <button

                    className="drawer-close"

                    onClick={onClose}

                >

                    ✕

                </button>

                <div className="drawer-header">

                  <div>

                    <h2>Pedido {pedido.numeroPedido}</h2>

                    <small>

                      Estado actual

                    </small>

                  </div>

                  <span className={`status-badge ${pedido.estado}`}>

                    {pedido.estado.replaceAll("_"," ").toUpperCase()}

                  </span>

                </div>

                <p>

                  <strong>Producto</strong>

                <br/>

                  <a

                  href={`/producto/${pedido.producto?._id}`}

                  className="seller-link"

                  >

                    {pedido.producto?.nombre}

                  </a>

                </p>


                <p>

                    <strong>

                      🏪 Vendedor

                    </strong>

                    <br/>

                    {pedido.vendedor?.name}

                </p>

                <a

                  href={`/seller/${pedido.vendedor.uid}`}

                  className="seller-link"

                >

                  👤 Ver Perfil del Vendedor

                </a>

                <p>

                    <strong>Total</strong>

                    <br/>

                    $

                    {pedido.total.toLocaleString()}

                </p>

                <p>

                    <strong>Comisión</strong>

                    <br/>

                    $

                    {pedido.comision.toLocaleString()}

                </p>

                <hr />

                <div className="drawer-actions">

    {/* ===============================
        ACCIONES DEL VENDEDOR
    ================================ */}

    {esVendedor && pedido.estado === "pendiente" && (

        <>
            <button
                onClick={() => ejecutarAccion("ACEPTAR")}
            >
                ✅ Aceptar pedido
            </button>

            <button
                className="danger"
                onClick={() => ejecutarAccion("CANCELAR")}
            >
                ❌ Cancelar pedido
            </button>
        </>

    )}

    {esVendedor && pedido.estado === "aceptado" && (

        <button
            onClick={() => ejecutarAccion("PREPARAR")}
        >
            📦 Preparar pedido
        </button>

    )}

    {esVendedor && pedido.estado === "preparando" && (

    <button
        className="success"
        onClick={() => ejecutarAccion("ENTREGAR_REPARTIDOR")}
    >
        🚚 Entregado al repartidor
    </button>

    )}

    {/* ===============================
        ACCIONES DEL COMPRADOR
    ================================ */}

    {esComprador && pedido.estado === "entregado" && (

        <button
            className="success"
            onClick={() => ejecutarAccion("FINALIZAR")}
        >
            🎉 Confirmar recepción
        </button>

    )}

</div>


                <OrderTimeline

                    historial={pedido.historial}

                />

            </div>

        </div>

    );

}

export default OrderDrawer;