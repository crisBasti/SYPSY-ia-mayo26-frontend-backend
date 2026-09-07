import Notification from "../models/Notification.js";
import {
    marcarNotificacionComoLeida,
    marcarTodasComoLeidas as marcarTodasService
} from "../services/notificationService.js";


// =====================================================
// OBTENER MIS NOTIFICACIONES
// =====================================================

export const obtenerMisNotificaciones = async (req, res) => {

    try {

        const notificaciones =
            await Notification.find({

                recipientUid: req.user.uid

            })
            .sort({
                createdAt: -1
            })
            .limit(50);


        res.json(notificaciones);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =====================================================
// OBTENER CANTIDAD NO LEÍDAS
// =====================================================

export const obtenerCantidadNoLeidas = async (req, res) => {

    try {

        const cantidad =
            await Notification.countDocuments({

                recipientUid: req.user.uid,

                leida: false

            });


        res.json({

            cantidad

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =====================================================
// MARCAR UNA COMO LEÍDA
// =====================================================

export const marcarComoLeida = async (req, res) => {

    try {

        const notificacion =
            await marcarNotificacionComoLeida({

                notificationId: req.params.id,

                recipientUid: req.user.uid

            });


        if (!notificacion) {

            return res.status(404).json({

                message:
                    "Notificación no encontrada."

            });

        }


        res.json(notificacion);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =====================================================
// MARCAR TODAS COMO LEÍDAS
// =====================================================

export const marcarTodasComoLeidas = async (req, res) => {

    try {

        const resultado =
          await marcarTodasService(
            req.user.uid
          );


        res.json({

            success: true,

            modificadas:
                resultado.modifiedCount

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};