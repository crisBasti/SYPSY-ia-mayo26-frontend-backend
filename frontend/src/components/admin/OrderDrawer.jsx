

import OrderTimeline from "./OrderTimeline";
import axios from "axios";
import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import DrawerHeader from "./DrawerHeader";
import DrawerInfo from "./DrawerInfo";
import DrawerPayment from "./DrawerPayment";
import DrawerActions from "./DrawerActions";


function OrderDrawer({

    pedido,

    onClose,

    onActualizarPedido


}){

    const { user, profile } = useAuth();

    console.log("Usuario Logueado:", user);

const esVendedor = user?.uid === pedido?.vendedor?.uid;

const esComprador = user?.uid === pedido?.comprador?.uid;

const [mostrarCodigo, setMostrarCodigo] = useState(false);

const [comprobante, setComprobante] = useState(null);    

const [codigoEntrega, setCodigoEntrega] = useState("");

const [codigoValidado, setCodigoValidado] = useState(false);

    if(!pedido) return null;


    const ejecutarAccion = async (accion) => {

    try {

        const token = await auth.currentUser.getIdToken();

        // Confirmación del comprador
        // let response;

if (accion === "FINALIZAR") {

    const response = await axios.post(

        `${import.meta.env.VITE_API_URL}/api/orders/${pedido._id}/confirmar`,

        {},

        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }

    );

}else{

    const response = await axios.put(

        `${import.meta.env.VITE_API_URL}/api/orders/${pedido._id}`,

        { accion },

        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }

    );

}

if (onActualizarPedido) {
    onActualizarPedido(response.data);
} else {
    window.location.reload();
}

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

            `${import.meta.env.VITE_API_URL}/api/orders/${pedido._id}/comprobante`,

            formData,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        alert("Comprobante enviado correctamente.");

        if (onActualizarPedido) {
            onActualizarPedido(response.data);
        } else {
          window.location.reload();
        }

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


const aprobarPago = async () => {

    try {

        const token = await auth.currentUser.getIdToken();

        const response = await axios.put(

            `${import.meta.env.VITE_API_URL}/api/orders/${pedido._id}/verificar-pago`,

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

        if (onActualizarPedido) {
            onActualizarPedido(response.data);
        } else {
            window.location.reload();
        }

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

            `${import.meta.env.VITE_API_URL}/api/orders/${pedido._id}/verificar-pago`,

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

        if (onActualizarPedido) {
            onActualizarPedido(response.data);
        } else {
          window.location.reload();
        }

    }

    catch(error){

        console.error(error);

        alert("No se pudo rechazar.");

    }

};





    return(

        <div className="drawer-overlay">

            <div className="order-drawer">

                <DrawerHeader
                   pedido={pedido}
                   onClose={onClose}
                />

                <DrawerInfo
                   pedido={pedido}
                   esVendedor={esVendedor}
                />


<DrawerPayment

    pedido={pedido}

    user={profile}

    esComprador={esComprador}

    comprobante={comprobante}

    setComprobante={setComprobante}

    subirComprobante={subirComprobante}

    aprobarPago={aprobarPago}

    rechazarPago={rechazarPago}

/>



{esVendedor && (

<p>

<strong>Comisión SYPSY</strong>

<br/>

$

{pedido.comision.toLocaleString()}

</p>

)}


                <hr />

                <DrawerActions
                   pedido={pedido}
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


                <OrderTimeline

                    historial={pedido.historial}

                />

            </div>

        </div>

    );

}

export default OrderDrawer;