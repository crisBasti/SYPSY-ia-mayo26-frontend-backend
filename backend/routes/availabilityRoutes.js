import express from "express";

import {
    crearConsultaDisponibilidad,
    responderConsultaDisponibilidad
} from "../controllers/availabilityController.js";

import authFirebase from "../middleware/authFirebase.js";

const router = express.Router();

// =====================================================
// CONSULTAS DE DISPONIBILIDAD
// =====================================================

router.post(
    "/",
    authFirebase,
    crearConsultaDisponibilidad
);

router.put(
    "/:id/responder",
    authFirebase,
    responderConsultaDisponibilidad
);

export default router;