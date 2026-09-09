import AvailabilityInquiry from "../models/AvailabilityInquiry.js";
import Product from "../models/Product.js";
import { crearNotificacion } from "../services/notificationService.js";

// =====================================================
// CREAR CONSULTA DE DISPONIBILIDAD
// =====================================================

export const crearConsultaDisponibilidad = async (req, res) => {
    try {

        const { productoId } = req.body;

        const compradorUid = req.user.uid;

        // ---------------------------------------------
        // VALIDAR PRODUCTO
        // ---------------------------------------------

        if (!productoId) {
            return res.status(400).json({
                message: "Producto requerido."
            });
        }

        const producto = await Product.findById(productoId);

        if (!producto) {
            return res.status(404).json({
                message: "Producto no encontrado."
            });
        }

        // ---------------------------------------------
        // VALIDAR ESTADO DEL PRODUCTO
        // ---------------------------------------------

        if (producto.estado !== "activo") {
            return res.status(400).json({
                message: "Este producto no está disponible actualmente."
            });
        }

        // ---------------------------------------------
        // VALIDAR VENDEDOR
        // ---------------------------------------------

        const vendedorUid = producto.vendedor?.uid;

        if (!vendedorUid) {
            return res.status(400).json({
                message: "El producto no tiene un vendedor válido."
            });
        }

        // ---------------------------------------------
        // EVITAR CONSULTAR PRODUCTO PROPIO
        // ---------------------------------------------

        if (compradorUid === vendedorUid) {
            return res.status(400).json({
                message: "No puedes consultar la disponibilidad de tu propio producto."
            });
        }

        // ---------------------------------------------
        // EVITAR CONSULTAS DUPLICADAS PENDIENTES
        // ---------------------------------------------

        const consultaExistente =
            await AvailabilityInquiry.findOne({
                compradorUid,
                productoId,
                estado: "pendiente"
            });

        if (consultaExistente) {
            return res.status(200).json({
                message: "Ya tienes una consulta pendiente para este producto.",
                consulta: consultaExistente
            });
        }

        // ---------------------------------------------
        // CREAR CONSULTA
        // ---------------------------------------------

        const consulta =
            await AvailabilityInquiry.create({

                compradorUid,

                vendedorUid,

                productoId,

                estado: "pendiente"

            });

        // ---------------------------------------------
        // NOTIFICAR AL VENDEDOR
        // ---------------------------------------------

        await crearNotificacion({

            recipientUid: vendedorUid,

            tipo: "consulta_disponibilidad",

            titulo: "Nueva consulta de disponibilidad",

            mensaje:
                `Un comprador quiere saber si "${producto.nombre}" sigue disponible.`,

            referencia: consulta._id.toString(),

            referenciaTipo: "AvailabilityInquiry",

            accion: "responder_disponibilidad",

            metadata: {
                productoId: producto._id.toString(),
                productoNombre: producto.nombre,
                compradorUid
            }

        });

        // ---------------------------------------------
        // RESPUESTA
        // ---------------------------------------------

        return res.status(201).json({

            success: true,

            message:
                "Consulta enviada al vendedor.",

            consulta

        });

    } catch (error) {

        console.error(
            "Error creando consulta de disponibilidad:",
            error
        );

        return res.status(500).json({
            message: "Error creando consulta de disponibilidad."
        });
    }
};



// =====================================================
// RESPONDER CONSULTA DE DISPONIBILIDAD
// =====================================================

export const responderConsultaDisponibilidad = async (req, res) => {
    try {

        const { estado, respuesta = null } = req.body;

        const vendedorUid = req.user.uid;

        const { id } = req.params;

        // ---------------------------------------------
        // VALIDAR ESTADO
        // ---------------------------------------------

        if (
            !["disponible", "no_disponible"].includes(estado)
        ) {
            return res.status(400).json({
                message: "Respuesta de disponibilidad inválida."
            });
        }

        // ---------------------------------------------
        // BUSCAR CONSULTA
        // ---------------------------------------------

        const consulta =
            await AvailabilityInquiry.findById(id);

        if (!consulta) {
            return res.status(404).json({
                message: "Consulta no encontrada."
            });
        }

        // ---------------------------------------------
        // VALIDAR VENDEDOR
        // ---------------------------------------------

        if (consulta.vendedorUid !== vendedorUid) {
            return res.status(403).json({
                message: "No tienes permiso para responder esta consulta."
            });
        }

        // ---------------------------------------------
        // VALIDAR ESTADO ACTUAL
        // ---------------------------------------------

        if (consulta.estado !== "pendiente") {
            return res.status(400).json({
                message: "Esta consulta ya fue respondida."
            });
        }

        // ---------------------------------------------
        // ACTUALIZAR CONSULTA
        // ---------------------------------------------

        consulta.estado = estado;

        consulta.respuesta =
            respuesta?.trim() || null;

        consulta.respondedAt = new Date();

        await consulta.save();

        // ---------------------------------------------
        // OBTENER PRODUCTO
        // ---------------------------------------------

        const producto =
            await Product.findById(
                consulta.productoId
            );

        const nombreProducto =
            producto?.nombre || "el producto";

        // ---------------------------------------------
        // NOTIFICAR AL COMPRADOR
        // ---------------------------------------------

        await crearNotificacion({

            recipientUid:
                consulta.compradorUid,

            tipo:
                "consulta_disponibilidad",

            titulo:
                estado === "disponible"
                    ? "Producto disponible 🟢"
                    : "Producto no disponible 🔴",

            mensaje:
                estado === "disponible"
                    ? `"${nombreProducto}" sigue disponible.`
                    : `"${nombreProducto}" ya no está disponible.`,

            referencia:
                consulta._id.toString(),

            referenciaTipo:
                "AvailabilityInquiry",

            accion:
                estado === "disponible"
                    ? "comprar_producto"
                    : "ver_consulta",

            metadata: {

                productoId:
                    consulta.productoId.toString(),

                productoNombre:
                    nombreProducto,

                vendedorUid,

                respuesta:
                    consulta.respuesta

            }

        });

        // ---------------------------------------------
        // RESPUESTA
        // ---------------------------------------------

        return res.json({

            success: true,

            message:
                "Consulta respondida correctamente.",

            consulta

        });

    } catch (error) {

        console.error(
            "Error respondiendo consulta de disponibilidad:",
            error
        );

        return res.status(500).json({
            message:
                "Error respondiendo consulta de disponibilidad."
        });
    }
};