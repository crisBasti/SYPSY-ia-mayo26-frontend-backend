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

    return (

        <>

            <hr />

            <h3>💳 Información del pago</h3>

            <p>

                <strong>Pago</strong>

                <br />

                {pedido.estadoPago === "pendiente" && "⚪ Esperando comprobante"}

                {pedido.estadoPago === "pendiente_verificacion" && "🟡 Comprobante enviado"}

                {pedido.estadoPago === "retenido" && "🟢 Pago confirmado"}

                {pedido.estadoPago === "pagado" && "💰 Pago liberado"}

                {pedido.estadoPago === "rechazado" && "🔴 Comprobante rechazado"}

            </p>

            <p>

                <strong>Estado:</strong> {pedido.estadoPago}

            </p>

            {pedido.comprobantePago && (

                <div className="payment-proof">

                    <a
                        href={pedido.comprobantePago}
                        target="_blank"
                        rel="noreferrer"
                    >
                        📄 Ver comprobante
                    </a>

                </div>

            )}

            <div className="admin-box">

                <h3>🔐 Código de entrega</h3>

                <div className="delivery-code">

                    {pedido.codigoEntrega}

                </div>

            </div>

            {user?.role === "admin" &&
                pedido.estadoPago === "pendiente_verificacion" && (

                <div className="payment-admin-actions">

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
                        ❌ Rechazar
                    </button>

                </div>

            )}

            {esComprador &&
                pedido.estadoPago === "pendiente" && (

                <div className="payment-box">

                    <h3>💳 Pago del pedido</h3>

                    <p>Transferí el importe utilizando:</p>

                    <p>

                        <strong>Alias:</strong>

                        sypsy.arg

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

        </>

    );

}

export default DrawerPayment;