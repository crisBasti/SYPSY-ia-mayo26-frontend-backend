import Order from "../models/order.js";

export const obtenerResumenFinanciero = async (req, res) => {

    try {

        const pedidos = await Order.find();

        const totalPedidos = pedidos.length;

        const comisionTotal = pedidos.reduce(

            (acc, pedido) => acc + (pedido.comision || 0),

            0

        );

        const dineroRetenido = pedidos

            .filter(

                p =>

                p.estado !== "finalizado" &&

                p.estado !== "cancelado"

            )

            .reduce(

                (acc, pedido) => acc + pedido.total,

                0

            );

        const dineroLiberado = pedidos

            .filter(

                p => p.estado === "finalizado"

            )

            .reduce(

                (acc, pedido) => acc + pedido.total,

                0

            );

        const pendienteLiquidar = pedidos

            .filter(

                p =>

                p.estado === "entregado"

            )

            .reduce(

                (acc, pedido) => acc + pedido.total,

                0

            );

        res.json({

            totalPedidos,

            comisionTotal,

            dineroRetenido,

            dineroLiberado,

            pendienteLiquidar

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};