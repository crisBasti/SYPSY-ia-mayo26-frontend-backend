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


        const tiempoTranscurrido = () => {

    const creado = new Date(pedido.createdAt);

    const ahora = new Date();

    const minutos = Math.floor((ahora - creado) / 60000);

    if (minutos < 60) {

        return {
            texto: `🟢 Hace ${minutos} min`,
            clase: "recent"
        };

    }

    const horas = Math.floor(minutos / 60);

    if (horas < 24) {

        return {
            texto: `🟡 Hace ${horas} h`,
            clase: "medium"
        };

    }

    const dias = Math.floor(horas / 24);

    return {

        texto: `🔴 Hace ${dias} día${dias > 1 ? "s" : ""}`,
        clase: "old"

    };

};

const antiguedad = tiempoTranscurrido();




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
                  📦 Pedido #{pedido.numeroPedido}
                </strong>

                <div className="order-date">

                  <small>

                    {new Date(pedido.createdAt).toLocaleString()}

                  </small>

                  <span className={`order-age ${antiguedad.clase}`}>

                    {antiguedad.texto}

                  </span>

                </div>

              </div>

              <span className="order-state">

                {ORDER_STATUS[pedido.estado]?.text}

              </span>

            </div>

            <div className="order-body">

    <h3>

        {pedido.producto?.nombre}

    </h3>

    <p>

        💰 <strong>${pedido.total.toLocaleString()}</strong>

    </p>

    <p>

        👤 {pedido.comprador?.name || "Sin comprador"}

    </p>

    <p>

        🏪 {pedido.vendedor?.name || "Sin vendedor"}

    </p>

    <p>

        💸 Comisión <strong>${pedido.comision.toLocaleString()}</strong>

    </p>

    <div

        className="payment-status"

        style={{

            color:pago.color,

            border:`1px solid ${pago.color}30`

        }}

    >

        ● {pago.texto}

    </div>

</div>

        </div>

    );

}

export default OrderCard;