function OrderTimeline({ historial = [] }) {

    return (

        <div className="order-timeline">

            <h3>📜 Historial</h3>

            {

                historial.map((evento, index) => (

                    <div
                        key={index}
                        className="timeline-item"
                    >

                        <div className="timeline-dot" />

                        <div className="timeline-content">

                            <strong>

                                {evento.descripcion}

                            </strong>

                            <br />

                            <small>

                                {

                                    new Date(
                                        evento.fecha
                                    ).toLocaleString()

                                }

                            </small>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default OrderTimeline;