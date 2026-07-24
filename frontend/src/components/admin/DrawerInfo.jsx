function DrawerInfo({ pedido, esVendedor }) {

    return (
        <>

            <p>
                <strong>Producto</strong>
                <br />

                <a
                    href={`/producto/${pedido.producto?._id}`}
                    className="seller-link"
                >
                    {pedido.producto?.nombre}
                </a>
            </p>

            {!esVendedor && (

                <>
                    <p>
                        <strong>🏪 Vendedor</strong>
                        <br />
                        {pedido.vendedor?.name}
                    </p>

                    <a
                        href={`/seller/${pedido.vendedor.uid}`}
                        className="seller-link"
                    >
                        👤 Ver perfil del vendedor
                    </a>
                </>

            )}

            <p>
                <strong>Total</strong>
                <br />
                $
                {pedido.total.toLocaleString()}
            </p>

        </>
    );

}

export default DrawerInfo;