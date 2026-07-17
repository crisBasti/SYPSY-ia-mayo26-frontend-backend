
import OrderProgress from "./OrderProgress";
import OrderTimeline from "./OrderTimeline";
import axios from "axios";
import { auth } from "../../firebase";


function OrderDrawer({

    pedido,

    onClose

}){

    if(!pedido) return null;


    const ejecutarAccion = async (accion) => {

    try {

        const token = await auth.currentUser.getIdToken();

        await axios.put(

            `${import.meta.env.VITE_API_URL}/api/orders/${pedido._id}`,

            {

                accion

            },

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        window.location.reload();

    }

    catch(error){

        console.error(error);

        alert(error.response?.data?.message);

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

                <h2>

                    📦 {pedido.numeroPedido}

                </h2>

                <OrderProgress pedido={pedido} />

                <hr />

                <p>

                    <strong>Producto</strong>

                    <br/>

                    {pedido.producto?.nombre}

                </p>

                <p>

    <strong>

        🏪 Vendedor

    </strong>

    <br/>

    {pedido.vendedor?.name}

</p>

<p>

    📞

    {pedido.vendedor?.telefono}

</p>

<p>

    ✉

    {pedido.vendedor?.email}

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

    {pedido.estado==="pendiente" && (

        <>

            <button

                onClick={()=>ejecutarAccion("ACEPTAR")}

            >

                🟢 Aceptar Pedido

            </button>

            <button

                className="danger"

                onClick={()=>ejecutarAccion("CANCELAR")}

            >

                🔴 Cancelar

            </button>

        </>

    )}

    {pedido.estado==="aceptado" && (

        <button

            onClick={()=>ejecutarAccion("PREPARAR")}

        >

            📦 Preparando

        </button>

    )}

    {pedido.estado==="preparando" && (

        <button

            onClick={()=>ejecutarAccion("DESPACHAR")}

        >

            🚚 Despachar

        </button>

    )}

    {pedido.estado==="enviado" && (

        <button

            onClick={()=>ejecutarAccion("EN_REPARTO")}

        >

            🚛 En reparto

        </button>

    )}

    {pedido.estado==="en_reparto" && (

        <button

            onClick={()=>ejecutarAccion("ENTREGAR")}

        >

            ✅ Confirmar entrega

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