function OrderProgress({ pedido }) {

    const pasos = [

        { key: "pendiente", label: "Pedido" },

        { key: "aceptado", label: "Aceptado" },

        { key: "preparando", label: "Preparando" },

        { key: "enviado", label: "Enviado" },

        { key: "en_reparto", label: "Reparto" },

        { key: "entregado", label: "Entregado" },

        { key: "finalizado", label: "Finalizado" }

    ];

    const indiceActual = pasos.findIndex(

        p => p.key === pedido.estado

    );

    return (

        <div className="order-progress">

            {

                pasos.map((paso,index)=>(

                    <div

                        key={paso.key}

                        className="progress-step"

                    >

                        <div

                            className={

                                index<=indiceActual

                                ? "circle active"

                                : "circle"

                            }

                        >

                            {index+1}

                        </div>

                        <span>

                            {paso.label}

                        </span>

                    </div>

                ))

            }

        </div>

    );

}

export default OrderProgress;