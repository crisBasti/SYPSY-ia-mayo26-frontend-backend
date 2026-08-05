function DrawerPayment({

    pedido,
    user,
    esComprador,
    comprobante,
    setComprobante,
    subirComprobante,
    aprobarPago,
    rechazarPago

}) {

    const estadoPago = {

        pendiente: {
            texto: "⚪ Esperando comprobante"
        },

        pendiente_verificacion: {
            texto: "🟡 Comprobante enviado"
        },

        retenido: {
            texto: "🟢 Pago confirmado"
        },

        pagado: {
            texto: "💰 Pago liberado"
        },

        rechazado: {
            texto: "🔴 Comprobante rechazado"
        }

    };

    const pago =
        estadoPago[pedido.estadoPago] || {
            texto: pedido.estadoPago
        };

    return (

        <>

            <div className="drawer-card">

                <div className="drawer-card-title">

                    💳 Información del pago

                </div>

                <div className="drawer-card-content">

                    <div className="drawer-info-item">

                        <strong>Estado</strong>

                        <span>

                            {pago.texto}

                        </span>

                    </div>

                    <div className="drawer-info-item">

                        <strong>Código de entrega</strong>

                        <span>

                            {pedido.codigoEntrega}

                        </span>

                    </div>

                    {pedido.comprobantePago && (

                        <a
                            href={pedido.comprobantePago}
                            target="_blank"
                            rel="noreferrer"
                            className="seller-link"
                        >
                            📄 Ver comprobante
                        </a>

                    )}

                </div>

            </div>

            {user?.role === "admin" &&
                pedido.estadoPago === "pendiente_verificacion" && (

                <div className="drawer-card">

                    <div className="drawer-card-title">

                        🛡 Administración

                    </div>

                    <div className="drawer-actions">

                        <button
                            className="success"
                            onClick={aprobarPago}
                        >
                            ✅ Aprobar pago
                        </button>

                        <button
                            className="danger"
                            onClick={rechazarPago}
                        >
                            ❌ Rechazar pago
                        </button>

                    </div>

                </div>

            )}

            {esComprador &&
                pedido.estadoPago === "pendiente" && (

                <div className="drawer-card">

                    <div className="drawer-card-title">

                        🏦 Datos para la transferencia

                    </div>

                    <div className="drawer-card-content">

                        <div className="drawer-info-item">

                            <strong>Alias</strong>

                            <span>sypsy.arg</span>

                        </div>

                        <div className="drawer-info-item">

                            <strong>CVU</strong>

                            <span>0000003100014719845478</span>

                        </div>

                        <div className="drawer-info-item">

                            <strong>Titular</strong>

                            <span>Cristian Alejandro Portillo</span>

                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e)=>
                                setComprobante(e.target.files[0])
                            }
                        />

                        <button
                            className="primary"
                            onClick={subirComprobante}
                        >
                            📤 Enviar comprobante
                        </button>

                    </div>

                </div>

            )}

            {/* ==========================================
   COMPROBANTE DE TRANSFERENCIA AL VENDEDOR
========================================== */}

{pedido.transferProof && (

    <div className="drawer-card">

        <div className="drawer-card-title">

            💸 Transferencia al vendedor

        </div>

        <div className="drawer-card-content">

            <p>

                <strong>Estado:</strong> Pago enviado

            </p>

            <a

                href={pedido.transferProof}

                target="_blank"

                rel="noreferrer"

                className="btn-secondary"

            >

                📄 Ver comprobante de transferencia

            </a>

        </div>

    </div>

)}

        </>

    );

}

export default DrawerPayment;