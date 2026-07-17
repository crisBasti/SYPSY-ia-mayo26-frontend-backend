import axios from "axios";

function OrderActions({ pedido, onRefresh }) {

    const cambiarEstado = async (estado) => {

        try {

            await axios.put(

                `${import.meta.env.VITE_API_URL}/api/orders/${pedido._id}`,

                { estado }

            );

            onRefresh();

        }

        catch(error){

            console.error(error);

        }

    };

    return (

        <div className="order-actions-panel">

            {pedido.estado === "pendiente" && (

                <>
                    <button
                        onClick={()=>
                            cambiarEstado("aceptado")
                        }
                    >
                        ✅ Aceptar
                    </button>

                    <button
                        onClick={()=>
                            cambiarEstado("cancelado")
                        }
                    >
                        ❌ Cancelar
                    </button>
                </>

            )}

            {pedido.estado === "aceptado" && (

                <button
                    onClick={()=>
                        cambiarEstado("preparando")
                    }
                >
                    📦 Preparando
                </button>

            )}

            {pedido.estado === "preparando" && (

                <button
                    onClick={()=>
                        cambiarEstado("enviado")
                    }
                >
                    🚚 Enviar
                </button>

            )}

            {pedido.estado === "enviado" && (

                <button
                    onClick={()=>
                        cambiarEstado("en_reparto")
                    }
                >
                    📍 En reparto
                </button>

            )}

            {pedido.estado === "en_reparto" && (

                <button
                    onClick={()=>
                        cambiarEstado("entregado")
                    }
                >
                    ✅ Entregado
                </button>

            )}

            {pedido.estado === "entregado" && (

                <button
                    onClick={()=>
                        cambiarEstado("finalizado")
                    }
                >
                    💰 Finalizar
                </button>

            )}

        </div>

    );

}

export default OrderActions;