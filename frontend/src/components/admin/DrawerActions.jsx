function DrawerActions({

    pedido,

    esVendedor,

    esComprador,

    mostrarCodigo,

    setMostrarCodigo,

    codigoEntrega,

    setCodigoEntrega,

    codigoValidado,

    validarCodigo,

    ejecutarAccion

}) {

    return (

        <div className="drawer-actions">

            {esVendedor && pedido.estado === "pendiente" && (

                <>

                    <button
                        className="primary"
                        onClick={() => ejecutarAccion("ACEPTAR")}
                    >
                        ✅ Aceptar pedido
                    </button>

                    <button
                        className="danger"
                        onClick={() => ejecutarAccion("CANCELAR")}
                    >
                        ❌ Cancelar pedido
                    </button>

                </>

            )}

            {esVendedor && pedido.estado === "aceptado" && (

                <button
                    className="primary"
                    onClick={() => ejecutarAccion("PREPARAR")}
                >
                    📦 Preparar pedido
                </button>

            )}

            {esVendedor && pedido.estado === "preparando" && (

                <button
                    className="success"
                    onClick={() => ejecutarAccion("ENTREGAR_REPARTIDOR")}
                >
                    🚚 Entregado al repartidor
                </button>

            )}

            {esComprador && pedido.estado === "entregado" && (

                <div className="delivery-code-box">

                    {!mostrarCodigo ? (

                        <button
                            className="success"
                            onClick={() => setMostrarCodigo(true)}
                        >
                            📦 Ya recibí el producto
                        </button>

                    ) : (

                        <>

                            <h3>🔐 Código de confirmación</h3>

                            <div className="codigo-visible">

                                <strong>{pedido.codigoEntrega}</strong>

                            </div>

                            <input
                                type="text"
                                placeholder="Ingresá el código"
                                value={codigoEntrega}
                                onChange={(e) =>
                                    setCodigoEntrega(e.target.value)
                                }
                            />

                            <button
                                className="primary"
                                onClick={validarCodigo}
                            >
                                🔐 Validar código
                            </button>

                            {codigoValidado && (

                                <button
                                    className="success"
                                    onClick={() =>
                                        ejecutarAccion("FINALIZAR")
                                    }
                                >
                                    ✅ Confirmar recepción
                                </button>

                            )}

                        </>

                    )}

                </div>

            )}

        </div>

    );

}

export default DrawerActions;