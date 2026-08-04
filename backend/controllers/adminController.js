import User from "../models/User.js";
import Product from "../models/Product.js";
import Advertisement from "../models/Advertisement.js";
import Order from "../models/order.js";
import Promotion from "../models/Promotion.js";
import Configuration from "../models/Configuration.js";

export const getDashboardStats = async (req, res) => {

    try {

        const [

    totalUsers,

    totalSellers,

    verifiedSellers,

    totalAdmins,

    totalProducts,

    activeAds,

    totalOrders,

    pendingOrders,

    preparingOrders,

    deliveredOrders,

    finishedOrders,

    cancelledOrders,

    promocionesActivas,

    promocionesVendidas

] = await Promise.all([

            User.countDocuments(),

            User.countDocuments({ role: "seller" }),

            User.countDocuments({ verifiedSeller: true }),

            User.countDocuments({ role: "admin" }),

            Product.countDocuments(),

            Advertisement.countDocuments({ active: true }),

            Order.countDocuments(),

Order.countDocuments({
    estado: "pendiente"
}),

Order.countDocuments({
    estado: "preparando"
}),

Order.countDocuments({
    estado: "entregado"
}),

Order.countDocuments({
    estado: "finalizado"
}),

Order.countDocuments({
    estado: "cancelado"
}),

Promotion.countDocuments({
    estado: "activo"
}),

Promotion.countDocuments({
    paymentStatus: "approved"
})

        ]);

        const configuracion = await Configuration.findOne();

const porcentajeComision =
    configuracion?.comisionGeneral || 5;

// Pedidos
const pedidos = await Order.find();

// Promociones aprobadas
const promociones = await Promotion.find({
    paymentStatus: "approved"
});

const facturacionProductos =
    pedidos.reduce(
        (acc, pedido) => acc + (pedido.total || 0),
        0
    );

const comisionesSYPSY =
    pedidos.reduce(
        (acc, pedido) => acc + (pedido.comision || 0),
        0
    );

const dineroRetenido =
    pedidos
        .filter(p => p.estadoPago === "retenido")
        .reduce(
            (acc, p) => acc + (p.total || 0),
            0
        );

const dineroLiberado =
    pedidos
        .filter(p => p.estadoPago === "liberado")
        .reduce(
            (acc, p) => acc + (p.total || 0),
            0
        );

const ingresosPromociones =
    promociones.reduce(
        (acc, p) => acc + (p.spent || 0),
        0
    );

        res.json({

            totalUsers,

            totalSellers,

            verifiedSellers,

            totalAdmins,

            totalProducts,

            activeAds,

            totalOrders,

            pendingOrders,

            preparingOrders,

            deliveredOrders,

            finishedOrders,

            cancelledOrders,

            promocionesActivas,

            promocionesVendidas,

            facturacionProductos,

            comisionesSYPSY,

            dineroRetenido,

            dineroLiberado,

            ingresosPromociones

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};