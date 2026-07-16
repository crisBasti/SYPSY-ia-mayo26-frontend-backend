


function OrderDrawer({

    pedido,

    onClose

}){

    if(!pedido) return null;

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

                

            </div>

        </div>

    );

}

export default OrderDrawer;