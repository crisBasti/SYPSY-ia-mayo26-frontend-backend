import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import axios from "axios";
import { obtenerConfiguracion } from "../services/configurationService";

function OrderPayment() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [pedido, setPedido] = useState(null);
    const [config, setConfig] = useState(null);

    const [archivo, setArchivo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [subiendo, setSubiendo] = useState(false);

    useEffect(() => {

        cargarPedido();

    }, [id]);


    const cargarPedido = async () => {

        try {

            const token =
                await auth.currentUser.getIdToken();

            const response = await axios.get(

                `${import.meta.env.VITE_API_URL}/api/orders/${id}`,

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );

            setPedido(response.data);


            const configuration =
                await obtenerConfiguracion(token);

            setConfig(configuration);

        } catch (error) {

            console.error(
                "Error cargando pedido:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    const subirComprobante = async () => {

        if (!archivo) {

            alert(
                "Seleccioná el comprobante de pago."
            );

            return;

        }

        try {

            setSubiendo(true);

            const token =
                await auth.currentUser.getIdToken();

            const formData =
                new FormData();

            formData.append(
                "comprobante",
                archivo
            );

            await axios.post(

                `${import.meta.env.VITE_API_URL}/api/orders/${id}/comprobante`,

                formData,

                {
                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }
                }

            );

            alert(
                "Comprobante enviado correctamente. SYPSY verificará el pago."
            );

            await cargarPedido();

        } catch (error) {

            console.error(
                "Error enviando comprobante:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Error enviando comprobante."
            );

        } finally {

            setSubiendo(false);

        }

    };


    if (loading) {

        return (
            <div className="order-payment-container">

                <h2>
                    💳 Preparando tu pago...
                </h2>

            </div>
        );

    }


    if (!pedido) {

        return (
            <div className="order-payment-container">

                <h2>
                    Pedido no encontrado
                </h2>

            </div>
        );

    }


    return (

        <div className="order-payment-container">

            <div className="order-payment-card">

                <h1>
                    💳 Finalizar compra
                </h1>

                <p className="payment-subtitle">
                    Completá el pago para que SYPSY pueda verificar y retener los fondos antes de continuar con tu pedido.
                </p>


                {/* ========================= */}
                {/* RESUMEN DEL PEDIDO */}
                {/* ========================= */}

                <div className="order-payment-summary">

                    <h3>
                        🛒 Resumen de tu compra
                    </h3>

                    <p>
                        <strong>
                            Pedido:
                        </strong>{" "}
                        {pedido.numeroPedido}
                    </p>

                    <p>
                        <strong>
                            Producto:
                        </strong>{" "}
                        {pedido.producto?.nombre ||
                            "Producto"}
                    </p>

                    <p>
                        <strong>
                            Cantidad:
                        </strong>{" "}
                        {pedido.cantidad}
                    </p>

                    <p className="order-payment-total">
                        Total: ${pedido.total}
                    </p>

                </div>


                {/* ========================= */}
                {/* PAGO */}
                {/* ========================= */}

                {pedido.estadoPago === "pendiente" && config && (

                    <div className="payment-card">

                        <h2>
                            💳 Realizar pago
                        </h2>

                        <p className="payment-text">

                            Podés abonar tu compra mediante
                            Mercado Pago o transferencia bancaria.

                        </p>


                        <a

                            className="mercadopago-main-btn"

                            href={
                                `https://link.mercadopago.com.ar/${config.mercadoPago.linkPago}`
                            }

                            target="_blank"

                            rel="noreferrer"

                        >

                            💳 Abonar ahora con Mercado Pago

                        </a>


                        <p className="payment-help">

                            Una vez realizado el pago,
                            subí el comprobante debajo para
                            que nuestro equipo pueda verificarlo.

                        </p>


                        <div className="payment-data">

                            <p>

                                Alias:

                                <strong>

                                    {config.mercadoPago.alias}

                                </strong>

                            </p>

                            <p>

                                Titular:

                                <strong>

                                    {config.mercadoPago.titular}

                                </strong>

                            </p>

                        </div>


                        <hr />


                        <h3>
                            📤 Ya realizaste el pago
                        </h3>


                        <input

                            type="file"

                            accept="image/*,.pdf"

                            onChange={(e) =>
                                setArchivo(
                                    e.target.files[0]
                                )
                            }

                        />


                        <button

                            className="upload-btn"

                            disabled={
                                !archivo ||
                                subiendo
                            }

                            onClick={
                                subirComprobante
                            }

                        >

                            {subiendo

                                ? "Enviando..."

                                : "📤 Enviar comprobante"}

                        </button>

                    </div>

                )}


                {/* ========================= */}
                {/* PAGO EN VERIFICACIÓN */}
                {/* ========================= */}

                {pedido.estadoPago ===
                    "pendiente_verificacion" && (

                    <div className="payment-status pending">

                        <h3>
                            ⏳ Pago enviado
                        </h3>

                        <p>

                            Recibimos tu comprobante.
                            Nuestro equipo está verificando
                            el pago.

                        </p>

                        <strong>
                            No necesitás realizar ninguna
                            otra acción por ahora.
                        </strong>

                    </div>

                )}


                {/* ========================= */}
                {/* PAGO RETENIDO */}
                {/* ========================= */}

                {pedido.estadoPago ===
                    "retenido" && (

                    <div className="payment-status success">

                        <h3>
                            ✅ Pago verificado
                        </h3>

                        <p>

                            Tu pago fue verificado y los
                            fondos quedaron retenidos por SYPSY.

                        </p>

                        <button

                            className="buy-btn"

                            onClick={() =>
                                navigate(
                                    "/micuenta"
                                )
                            }

                        >

                            📦 Ver mis compras

                        </button>

                    </div>

                )}


                {/* ========================= */}
                {/* PAGO RECHAZADO */}
                {/* ========================= */}

                {pedido.estadoPago ===
                    "rechazado" && (

                    <div className="payment-status rejected">

                        <h3>
                            ❌ Pago rechazado
                        </h3>

                        <p>

                            El comprobante no pudo ser
                            verificado.

                        </p>

                        <p>

                            Podés realizar nuevamente
                            el pago y enviar otro comprobante.

                        </p>

                    </div>

                )}

            </div>

        </div>

    );

}

export default OrderPayment;