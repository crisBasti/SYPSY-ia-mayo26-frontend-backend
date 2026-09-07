import express from "express";

import {
    obtenerMisNotificaciones,
    obtenerCantidadNoLeidas,
    marcarComoLeida,
    marcarTodasComoLeidas
} from "../controllers/notificationController.js";

import authFirebase from "../middleware/authFirebase.js";


const router = express.Router();


// =====================================================
// NOTIFICACIONES
// =====================================================

router.get(
    "/",
    authFirebase,
    obtenerMisNotificaciones
);


router.get(
    "/unread-count",
    authFirebase,
    obtenerCantidadNoLeidas
);


router.patch(
    "/read-all",
    authFirebase,
    marcarTodasComoLeidas
);


router.patch(
    "/:id/read",
    authFirebase,
    marcarComoLeida
);


export default router;