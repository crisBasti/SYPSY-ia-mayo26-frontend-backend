function OrderCard({ pedido }) {

    return (

       <div

    className="order-card"

>

    <div

        className="order-status-bar"

        style={{

            background:colorBarra

        }}

    />


            <div className="order-header">

                <strong>

                    📦 {pedido.numeroPedido}

                </strong>

                <span>

                    {pedido.estado}

                </span>

            </div>

            <div className="order-body">

                <p>

                    <strong>Producto</strong>

                    <br />

                    {pedido.producto?.nombre}

                </p>

                <p>

                    <strong>Vendedor</strong>

                    <br />

                    {pedido.vendedor?.name}

                </p>

                <p>

                    <strong>Total</strong>

                    <br />

                    $

                    {pedido.total.toLocaleString()}

                </p>

                <p>

                    <strong>Comisión</strong>

                    <br />

                    $

                    {pedido.comision.toLocaleString()}

                </p>

            </div>

            <div className="order-actions">

                <button>

                    👁 Ver

                </button>

            </div>

        </div>

    );

}

const coloresEstado = {

    pendiente:"#FFC107",

    aceptado:"#28A745",

    pagado:"#0D6EFD",

    en_reparto:"#6F42C1",

    finalizado:"#198754",

    cancelado:"#DC3545"

};

const colorBarra =

    coloresEstado[pedido.estado]

    || "#999";

export default OrderCard;