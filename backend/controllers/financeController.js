import Order from "../models/order.js";
import Promotion from "../models/Promotion.js";

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

        const promociones = await Promotion.find();

const promocionesActivas =
    promociones.filter(
        p => p.estado === "activo"
    ).length;

const promocionesCobradas =
    promociones.filter(
        p => p.paymentStatus === "approved"
    ).length;

const ingresosPromociones =
    promociones.reduce(
        (acc, promo) => acc + (promo.spent || 0),
        0
    );

const facturacionTotal =
    pedidos.reduce(
        (acc, pedido) => acc + (pedido.total || 0),
        0
    );    

        res.json({

    totalPedidos,

    facturacionTotal,

    comisionTotal,

    dineroRetenido,

    dineroLiberado,

    pendienteLiquidar,

    promocionesActivas,

    promocionesCobradas,

    ingresosPromociones

});

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};