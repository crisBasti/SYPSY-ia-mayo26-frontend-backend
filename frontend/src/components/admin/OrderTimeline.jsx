function OrderTimeline({ historial = [] }) {

    const iconos = {

        pendiente: "📝",

        aceptado: "✅",

        preparando: "📦",

        entregado: "🚚",

        finalizado: "🎉",

        cancelado: "❌"

    };

    return (

        <div className="drawer-card">

            <div className="drawer-card-title">

                📜 Historial del pedido

            </div>

            <div className="order-timeline">

                {historial.length === 0 ? (

                    <div className="timeline-empty">

                        Sin movimientos registrados.

                    </div>

                ) : (

                    historial.map((evento, index) => {

                        const ultimo = index === historial.length - 1;

                        return (

                            <div

                                key={index}

                                className={`timeline-step ${ultimo ? "active" : "completed"}`}

                            >

                                <div className="timeline-icon">

                                    {iconos[evento.estado] || "📍"}

                                </div>

                                <div className="timeline-content">

                                    <div className="timeline-title">

                                        {evento.descripcion || evento.estado}

                                    </div>

                                    {evento.fecha && (

                                        <div className="timeline-date">

                                            {new Date(evento.fecha).toLocaleString()}

                                        </div>

                                    )}

                                </div>

                            </div>

                        );

                    })

                )}

            </div>
            

        </div>

    );

}

export default OrderTimeline;