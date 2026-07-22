

import OrderTimeline from "./OrderTimeline";
import axios from "axios";
import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";


function OrderDrawer({

    pedido,

    onClose

}){

    const { user } = useAuth();

const esVendedor =
    user?.uid === pedido?.vendedor?.uid;

const esComprador =
    user?.uid === pedido?.comprador?.uid;

const [comprobante, setComprobante] = useState(null);    

const [codigoEntrega, setCodigoEntrega] = useState("");

const [codigoValidado, setCodigoValidado] = useState(false);

    if(!pedido) return null;

    console.log("Pedido completo:", pedido);
console.log("Estado:", pedido.estado);
console.log("Usuario:", user?.uid);
console.log("Comprador:", pedido.comprador);
console.log("Vendedor:", pedido.vendedor);
console.log("esComprador:", esComprador);
console.log("esVendedor:", esVendedor);


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


const subirComprobante = async () => {

    if (!comprobante) {

        return alert("Seleccione una imagen.");

    }

    try {

        const token =
            await auth.currentUser.getIdToken();

        const formData = new FormData();

        formData.append(
            "comprobante",
            comprobante
        );

        await axios.post(

            `${import.meta.env.VITE_API_URL}/api/orders/${pedido._id}/comprobante`,

            formData,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        alert("Comprobante enviado correctamente.");

        window.location.reload();

    }

    catch(error){

        console.error(error);

        alert("No se pudo subir el comprobante.");

    }

};


const validarCodigo = async () => {

    try{

        const token =
            await auth.currentUser.getIdToken();

        await axios.post(

            `${import.meta.env.VITE_API_URL}/api/orders/${pedido._id}/validar-codigo`,

            {

                codigo: codigoEntrega

            },

            {

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        );

        setCodigoValidado(true);

        alert("Código correcto.");

    }

    catch(error){

        alert(

            error.response?.data?.message ||

            "Código incorrecto"

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
                  <br />

                  <a
                    href={`/producto/${pedido.producto?._id}`}
                    className="seller-link"
                  >
                    {pedido.producto?.nombre}
                  </a>
                </p>


                {!esVendedor && (

                  <p>

                    <strong>🏪 Vendedor</strong>

                      <br />

                    {pedido.vendedor?.name}

                  </p>

                )}
                
                  
                {!esVendedor && (

                  <a
                    href={`/seller/${pedido.vendedor.uid}`}
                    className="seller-link"
                  >

                    👤 Ver perfil del vendedor

                  </a>

                )}

                <p>

                    <strong>Total</strong>

                    <br/>

                    $

                    {pedido.total.toLocaleString()}

                </p>

                
                <p>

<strong>Pago</strong>

<br/>

{

pedido.estadoPago === "pendiente"

&&

"⚪ Esperando comprobante"

}

{

pedido.estadoPago === "pendiente_verificacion"

&&

"🟡 Comprobante enviado"

}

{

pedido.estadoPago === "retenido"

&&

"🟢 Pago confirmado"

}

{

pedido.estadoPago === "rechazado"

&&

"🔴 Comprobante rechazado"

}

</p>



                {esVendedor && pedido.codigoEntrega && (

                  <div className="delivery-code-box">

                    <h3>🔐 Código de entrega</h3>

                    <div className="delivery-code">

                      {pedido.codigoEntrega}

                    </div>

                    <small>

                      Entregá este código únicamente al comprador cuando reciba el producto.

                    </small>

                  </div>

                )}

                <p>

                    <strong>Comisión</strong>

                    <br/>

                    $

                    {pedido.comision.toLocaleString()}

                </p>

                {esComprador && pedido.estadoPago === "pendiente" && (

<div className="payment-box">

<h3>💳 Pago del pedido</h3>

<p>

Transferí el importe utilizando:

</p>

<p>

<strong>Alias:</strong> sypsy.arg

</p>

<p>

<strong>CVU:</strong>

0000003100014719845478

</p>

<p>

<strong>Titular:</strong>

Cristian Alejandro Portillo

</p>

<input

type="file"

accept="image/*"

onChange={(e)=>

setComprobante(e.target.files[0])

}

/>

<button

onClick={subirComprobante}

>

📤 Enviar comprobante

</button>

</div>

)}

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

    <>

        {!codigoValidado && (

            <>

                <input

                    type="text"

                    placeholder="Ingrese el código"

                    value={codigoEntrega}

                    onChange={(e)=>

                        setCodigoEntrega(

                            e.target.value

                        )

                    }

                />

                <button

                    onClick={validarCodigo}

                >

                    🔐 Validar código

                </button>

            </>

        )}

        {codigoValidado && (

            <button

                className="success"

                onClick={()=>

                    ejecutarAccion(

                        "FINALIZAR"

                    )

                }

            >

                ✅ Confirmar recepción

            </button>

        )}

    </>

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