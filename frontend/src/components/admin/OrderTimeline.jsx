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

        <div className="order-timeline">

            <h3>📜 Historial del pedido</h3>

            {

                historial.map((evento,index)=>(

                    <div

                        key={index}

                        className="timeline-step completed"

                    >

                        <div className="timeline-icon">

                            {

                                iconos[evento.estado] ||

                                "📍"

                            }

                        </div>

                        <div className="timeline-content">

                            <div className="timeline-title">

                                {

                                    evento.descripcion ||

                                    evento.estado

                                }

                            </div>

                            <div className="timeline-date">

                                {

                                    evento.fecha

                                    ?

                                    new Date(evento.fecha)

                                    .toLocaleString()

                                    :

                                    ""

                                }

                            </div>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default OrderTimeline;