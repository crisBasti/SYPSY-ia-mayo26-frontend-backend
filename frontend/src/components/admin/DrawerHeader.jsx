function DrawerHeader({ pedido, onClose }) {

    return (

        <>
            <button
                className="drawer-close"
                onClick={onClose}
            >
                ✕
            </button>

            <div className="drawer-header">

                <div>

                    <h2>
                        Pedido {pedido.numeroPedido}
                    </h2>

                    <small>
                        Estado actual
                    </small>

                </div>

                <span
                    className={`status-badge ${pedido.estado}`}
                >
                    {pedido.estado
                        .replaceAll("_"," ")
                        .toUpperCase()}
                </span>

            </div>
        </>

    );

}

export default DrawerHeader;