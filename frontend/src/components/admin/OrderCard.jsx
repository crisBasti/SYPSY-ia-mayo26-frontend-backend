import { ORDER_STATUS } from "../../utils/orderStatus";

function OrderCard({

    pedido,

    onSelect

}) {

    const colorBarra =
        ORDER_STATUS[pedido.estado]?.color || "#999";

    const estadoPago = {

        pendiente: {
            texto: "Esperando pago",
            color: "#777"
        },

        pendiente_verificacion: {
            texto: "Verificando pago",
            color: "#f59e0b"
        },

        retenido: {
            texto: "Pago confirmado",
            color: "#10b981"
        },

        pagado: {
            texto: "Pago liberado",
            color: "#2563eb"
        },

        rechazado: {
            texto: "Pago rechazado",
            color: "#ef4444"
        }

    };

    const pago =

        estadoPago[pedido.estadoPago] ||

        {
            texto: pedido.estadoPago,
            color: "#777"
        };

    return (

        <div

            className="order-card"

            onClick={() => onSelect(pedido)}

        >

            <div

                className="order-status-bar"

                style={{

                    background: colorBarra

                }}

            />

            <div className="order-header">

                <div>

                    <strong>

                        📦 {pedido.numeroPedido}

                    </strong>

                    <br />

                    <small>

                        {

                            new Date(

                                pedido.createdAt

                            ).toLocaleString()

                        }

                    </small>

                </div>

                <span>

                    {

                        ORDER_STATUS[pedido.estado]?.text

                    }

                </span>

            </div>

            <div className="order-body">

                <h3>

                    {pedido.producto?.nombre}

                </h3>

                <p>

                    💰

                    <strong>

                        {" "}

                        $

                        {pedido.total.toLocaleString()}

                    </strong>

                </p>

                <p>

                    👤 {pedido.comprador?.name}

                </p>

                <p>

                    🏪 {pedido.vendedor?.name}

                </p>

                <p>

                    💸 Comisión:

                    {" "}

                    $

                    {pedido.comision.toLocaleString()}

                </p>

                <div

                    className="payment-status"

                    style={{

                        color: pago.color,

                        fontWeight: "bold"

                    }}

                >

                    ● {pago.texto}

                </div>

            </div>

        </div>

    );

}

export default OrderCard;