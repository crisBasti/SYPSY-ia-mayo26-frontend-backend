import express from "express";

import {
    obtenerPlanes,
    crearPromocion,
    activarPromocion,
    obtenerMisPromociones,
    finalizarPromocion,
    estadisticasPromocion,
    registrarImpresion,
    registrarClick

} from "../controllers/promotionController.js";

import { verifyFirebaseToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/planes", obtenerPlanes);

// Crear solicitud de promoción
router.post("/", verifyFirebaseToken, crearPromocion);

// Activar promoción
// (más adelante esta ruta quedará protegida para admin)
router.put("/:id/activar", verifyFirebaseToken, activarPromocion);

// Mis promociones como vendedor
router.get("/mine", verifyFirebaseToken, obtenerMisPromociones);

// Finalizar promoción
router.put("/:id/finalizar", verifyFirebaseToken, finalizarPromocion);

// Estadísticas
router.get("/:id/stats", verifyFirebaseToken, estadisticasPromocion);

router.post("/:productId/impression", registrarImpresion);

router.post("/:productId/click", registrarClick);




export default router;