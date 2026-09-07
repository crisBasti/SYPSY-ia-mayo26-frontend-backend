import Notification from "../models/Notification.js";
import User from "../models/User.js";


// =====================================================
// CREAR NOTIFICACIÓN
// =====================================================

export const crearNotificacion = async ({

    recipientUid,

    tipo,

    titulo,

    mensaje,

    referencia = null,

    referenciaTipo = null,

    accion = null,

    metadata = {},

    expiresAt = null

}) => {

    if (!recipientUid) {

        throw new Error(
            "UID del destinatario requerido."
        );

    }


    if (!tipo) {

        throw new Error(
            "Tipo de notificación requerido."
        );

    }


    if (!titulo) {

        throw new Error(
            "Título de notificación requerido."
        );

    }


    if (!mensaje) {

        throw new Error(
            "Mensaje de notificación requerido."
        );

    }


    const notificacion =
        await Notification.create({

            recipientUid,

            tipo,

            titulo,

            mensaje,

            referencia,

            referenciaTipo,

            accion,

            metadata,

            expiresAt

        });


    return notificacion;

};


// =====================================================
// MARCAR COMO LEÍDA
// =====================================================

export const marcarNotificacionComoLeida = async ({
    notificationId,
    recipientUid
}) => {

    const notificacion =
        await Notification.findOneAndUpdate(

            {
                _id: notificationId,

                recipientUid

            },

            {
                leida: true
            },

            {
                new: true
            }

        );


    return notificacion;

};


// =====================================================
// MARCAR TODAS COMO LEÍDAS
// =====================================================

export const marcarTodasComoLeidas = async (
    recipientUid
) => {

    return await Notification.updateMany(

        {
            recipientUid,

            leida: false
        },

        {
            $set: {
                leida: true
            }
        }

    );

};


// =====================================================
// CREAR NOTIFICACIÓN PARA TODOS LOS ADMINISTRADORES
// =====================================================

export const crearNotificacionAdministradores = async ({

    tipo,

    titulo,

    mensaje,

    referencia = null,

    referenciaTipo = null,

    accion = null,

    metadata = {},

    expiresAt = null

}) => {

    const administradores =
        await User.find({

            role: "admin"

        }).select("uid");


    if (!administradores.length) {

        return [];

    }


    const notificaciones =
        administradores.map(admin => ({

            recipientUid:
                admin.uid,

            tipo,

            titulo,

            mensaje,

            referencia,

            referenciaTipo,

            accion,

            metadata,

            expiresAt

        }));


    return await Notification.insertMany(

        notificaciones

    );

};