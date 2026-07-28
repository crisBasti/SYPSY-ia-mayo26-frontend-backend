function DrawerInfo({ pedido, esVendedor }) {

    return (

        <>

            <div className="drawer-card">

                <div className="drawer-card-title">

                    📦 Producto

                </div>

                <div className="drawer-card-content">

                    <div className="product-preview">

                      <div className="product-preview-info">

                        <strong>

                          {pedido.producto?.nombre}

                        </strong>

                        <a
                          href={`/producto/${pedido.producto?._id}`}
                          className="seller-link"
                        >
                          Ver publicación →
                        </a>

                     </div>

                    </div>

                </div>

            </div>

            {!esVendedor && (

                <div className="drawer-card">

                    <div className="drawer-card-title">

                        🏪 Vendedor

                    </div>

                    <div className="drawer-card-content">

                        <div className="seller-avatar">

                         {pedido.vendedor?.name?.charAt(0).toUpperCase()}

                        </div>

                          <div>

                            <strong>

                              {pedido.vendedor?.name}

                            </strong>

                          </div>

                        <a
                            href={`/seller/${pedido.vendedor.uid}`}
                            className="seller-link"
                        >
                            👤 Ver perfil del vendedor
                        </a>

                    </div>

                </div>

            )}

            <div className="drawer-card">

                <div className="drawer-card-title">

                    💰 Resumen

                </div>

                <div className="drawer-card-content">

                    <div className="drawer-info-item">

                        <strong>Total</strong>

                        <span>

                            ${pedido.total.toLocaleString()}

                        </span>

                    </div>

                </div>

            </div>

        </>

    );

}

export default DrawerInfo;