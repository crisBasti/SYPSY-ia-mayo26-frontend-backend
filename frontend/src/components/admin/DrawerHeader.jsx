function DrawerHeader({ pedido, onClose }) {

    const fecha = new Date(pedido.createdAt).toLocaleString();

    return (

        <>

            <button
                className="drawer-close"
                onClick={onClose}
            >
                ✕
            </button>

            <div className="drawer-header">

                <div className="drawer-header-info">

    <span className="drawer-label">

        📦 Pedido #{pedido.numeroPedido}

    </span>

    <h2>

        ${pedido.total.toLocaleString()}

    </h2>

    <small>

        {fecha}

    </small>

</div>

                <span
                    className={`status-badge ${pedido.estado}`}
                >
                    {pedido.estado
                        .replaceAll("_", " ")
                        .toUpperCase()}
                </span>

            </div>

        </>

    );

}

export default DrawerHeader;