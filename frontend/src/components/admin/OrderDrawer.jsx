import OrderTimeline from "./OrderTimeline";
import axios from "axios";
import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import DrawerHeader from "./DrawerHeader";
import DrawerInfo from "./DrawerInfo";
import DrawerPayment from "./DrawerPayment";
import DrawerActions from "./DrawerActions";
import StarRating from "../StarRating";


function OrderDrawer({
    pedido,
    onClose,
    onActualizarPedido
}){

const { user, profile } = useAuth();
const [mostrarCodigo, setMostrarCodigo] = useState(false);
const [comprobante, setComprobante] = useState(null);    
const [codigoEntrega, setCodigoEntrega] = useState("");
const [codigoValidado, setCodigoValidado] = useState(false);
const [puntuacion, setPuntuacion] = useState(5);
const [comentario, setComentario] = useState("");
const [pedidoActual, setPedidoActual] = useState(pedido);

const [transportista, setTransportista] = useState("");
const [trackingNumber, setTrackingNumber] = useState("");
const [guardandoTracking, setGuardandoTracking] = useState(false);
const [editandoTracking, setEditandoTracking] = useState(false);
const [tipoEnvio, setTipoEnvio] = useState("particular");

const esComprador = user?.uid === pedidoActual?.comprador?.uid;
const esVendedor = user?.uid === pedidoActual?.vendedor?.uid;


useEffect(() => {

    setPedidoActual(pedido);

    setTransportista(
        pedido?.transportista || ""
    );

    setTrackingNumber(
        pedido?.trackingNumber || ""
    );

}, [pedido]);

    if(!pedidoActual) return null;


    const ejecutarAccion = async (accion) => {

    try {

        const token = await auth.currentUser.getIdToken();

        // Confirmación del comprador
        let response;

if (accion === "FINALIZAR") {

    response = await axios.post(

        `${import.meta.env.VITE_API_URL}/api/orders/${pedidoActual._id}/confirmar`,

        {},

        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }

    );

}else{

    response = await axios.put(

        `${import.meta.env.VITE_API_URL}/api/orders/${pedidoActual._id}`,

        { accion },

        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }

    );

}

setPedidoActual(response.data);

onActualizarPedido?.(response.data);

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

        const response = await axios.post(

            `${import.meta.env.VITE_API_URL}/api/orders/${pedidoActual._id}/comprobante`,

            formData,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        alert("Comprobante enviado correctamente.");

        setPedidoActual(response.data.pedido);

        onActualizarPedido?.(response.data.pedido);

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

        const response = await axios.post(

            `${import.meta.env.VITE_API_URL}/api/orders/${pedidoActual._id}/validar-codigo`,

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


const aprobarPago = async () => {

    try {

        const token = await auth.currentUser.getIdToken();

        const response = await axios.put(

            `${import.meta.env.VITE_API_URL}/api/orders/${pedidoActual._id}/verificar-pago`,

            {

                accion: "APROBAR"

            },

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        

        alert("Pago aprobado.");

        setPedidoActual(response.data);

        onActualizarPedido?.(response.data);

    }

    catch(error){

        console.error(error);

        alert("No se pudo aprobar.");

    }

};

const rechazarPago = async () => {

    try {

        const token = await auth.currentUser.getIdToken();

        const response = await axios.put(

            `${import.meta.env.VITE_API_URL}/api/orders/${pedidoActual._id}/verificar-pago`,

            {

                accion:"RECHAZAR"

            },

            {

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        );

        alert("Pago rechazado.");

        setPedidoActual(response.data);

        onActualizarPedido?.(response.data);

    }

    catch(error){

        console.error(error);

        alert("No se pudo rechazar.");

    }

};


const enviarReseña = async () => {

    try{

        const token =
            await auth.currentUser.getIdToken();

        const response = await axios.post(

            `${import.meta.env.VITE_API_URL}/api/orders/${pedidoActual._id}/review`,

            {

                puntuacion,

                comentario

            },

            {

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        );

        alert("¡Gracias por tu reseña!");

        setPedidoActual(response.data.pedido);

        onActualizarPedido?.(response.data.pedido);

    }

    catch(error){

        alert(

            error.response?.data?.message ||

            "No se pudo guardar la reseña."

        );

    }

};


const guardarTracking = async () => {

    if (!transportista.trim()) {

        alert(
            "Ingresá el nombre del transportista."
        );

        return;

    }

    if (!trackingNumber.trim()) {

        alert(
            "Ingresá el número de seguimiento."
        );

        return;

    }

    try {

        setGuardandoTracking(true);

        const token =
            await auth.currentUser.getIdToken();

        const response = await axios.put(

            `${import.meta.env.VITE_API_URL}/api/orders/${pedidoActual._id}/tracking`,

            {

                transportista,

                trackingNumber

            },

            {

                headers: {

                    Authorization:
                    `Bearer ${token}`

                }

            }

        );

        setPedidoActual(response.data);

          onActualizarPedido?.(
            response.data
          );

          setEditandoTracking(false);

          alert(
            "Seguimiento actualizado correctamente."
          );

    }

    catch (error) {

        console.error(error);

        alert(

            error.response?.data?.message ||

            "No se pudo actualizar el seguimiento."

        );

    }

    finally {

        setGuardandoTracking(false);

    }

};


return (

    <div className="drawer-overlay">

        <div className="order-drawer">

            <DrawerHeader
                pedido={pedidoActual}
                onClose={onClose}
            />

            <div className="drawer-body">

                <DrawerInfo
                    pedido={pedidoActual}
                    esVendedor={esVendedor}
                />

                <DrawerPayment
                    pedido={pedidoActual}
                    user={profile}
                    esComprador={esComprador}
                    comprobante={comprobante}
                    setComprobante={setComprobante}
                    subirComprobante={subirComprobante}
                    aprobarPago={aprobarPago}
                    rechazarPago={rechazarPago}
                />

                <div className="drawer-card">

    <div className="drawer-card-title">

        🚚 Seguimiento del envío

    </div>

    <div className="drawer-card-content">

        {esVendedor ? (

            pedidoActual?.transportista &&
            pedidoActual?.trackingNumber &&
            !editandoTracking ? (

                <>

                    <div className="drawer-info-item">

                        <strong>
                            Transportista
                        </strong>

                        <span>
                            {pedidoActual.transportista}
                        </span>

                    </div>

                    <div className="drawer-info-item">

                        <strong>
                            Número de seguimiento
                        </strong>

                        <span className="tracking-number">

                            {pedidoActual.trackingNumber}

                        </span>

                    </div>

                    <p>

                        🟢 Seguimiento registrado correctamente.

                    </p>

                    <button
                        type="button"
                        onClick={() => setEditandoTracking(true)}
                    >

                        ✏️ Modificar datos

                    </button>

                </>

            ) : (

                <>

                    <label>
                        Transportista
                    </label>

                    <input
                        type="text"
                        value={transportista}
                        onChange={(e) =>
                            setTransportista(e.target.value)
                        }
                        placeholder="Ej: Andreani, OCA, Correo Argentino..."
                    />

                    <label>
                        Número de seguimiento
                    </label>

                    <input
                        type="text"
                        value={trackingNumber}
                        onChange={(e) =>
                            setTrackingNumber(e.target.value)
                        }
                        placeholder="Ingresá el número de seguimiento"
                    />

                    <button
                        type="button"
                        onClick={guardarTracking}
                        disabled={guardandoTracking}
                    >

                        {guardandoTracking
                            ? "Guardando..."
                            : "💾 Guardar seguimiento"
                        }

                    </button>

                    {editandoTracking && (

                        <button
                            type="button"
                            onClick={() => {

                                setTransportista(
                                    pedidoActual?.transportista || ""
                                );

                                setTrackingNumber(
                                    pedidoActual?.trackingNumber || ""
                                );

                                setEditandoTracking(false);

                            }}
                        >

                            ↩️ Cancelar modificación

                        </button>

                    )}

                </>

            )

        ) : (

            pedidoActual?.transportista &&
            pedidoActual?.trackingNumber ? (

                <>

                    <div className="drawer-info-item">

                        <strong>
                            Transportista
                        </strong>

                        <span>
                            {pedidoActual.transportista}
                        </span>

                    </div>

                    <div className="drawer-info-item">

                        <strong>
                            Número de seguimiento
                        </strong>

                        <span className="tracking-number">

                            {pedidoActual.trackingNumber}

                        </span>

                    </div>

                    <div className="tracking-status">

                        🟢 Datos de seguimiento disponibles

                    </div>

                    <button
                        type="button"
                        disabled
                        title="Se habilitará cuando exista una URL real del transportista."
                    >

                        🔗 Seguir envío

                    </button>

                    <small>

                        El seguimiento externo estará disponible
                        cuando el transportista proporcione un enlace
                        válido para este envío.

                    </small>

                </>

            ) : (

                <p>

                    📦 El vendedor todavía no
                    cargó los datos de seguimiento.

                </p>

            )

        )}

    </div>

</div>

                {esVendedor && (

                    <p>

                        <strong>Comisión SYPSY</strong>

                        <br />

                        $

                        {(pedidoActual?.comision ?? 0).toLocaleString()}

                    </p>

                )}

                <hr />

                <DrawerActions
                    pedido={pedidoActual}
                    esVendedor={esVendedor}
                    esComprador={esComprador}
                    mostrarCodigo={mostrarCodigo}
                    setMostrarCodigo={setMostrarCodigo}
                    codigoEntrega={codigoEntrega}
                    setCodigoEntrega={setCodigoEntrega}
                    codigoValidado={codigoValidado}
                    validarCodigo={validarCodigo}
                    ejecutarAccion={ejecutarAccion}
                />

                {esComprador &&
                    pedidoActual?.estado === "finalizado" &&
                    !pedidoActual?.reseña?.puntuacion && (

                  <div className="drawer-card">

                    <div className="drawer-card-title">

                      ⭐ Calificar vendedor

                    </div>

                    <div className="drawer-card-content">

                      <label>

                        Puntuación

                      </label>

                      <StarRating

                        value={puntuacion}

                        onChange={setPuntuacion}

                      />

                    <br/><br/>

                    <textarea

                      rows="4"

                      placeholder="Contanos tu experiencia..."

                      value={comentario}

                      onChange={(e)=>

                        setComentario(e.target.value)

                      }

                    />

                    <br/><br/>

                      <button

                        onClick={enviarReseña}

                      >

                        ⭐ Enviar reseña

                      </button>

                    </div>

                  </div>

                )  
            }

                <OrderTimeline
                  historial={pedidoActual?.historial || []}
                />

            </div>

        </div>

    </div>

);

}

export default OrderDrawer;