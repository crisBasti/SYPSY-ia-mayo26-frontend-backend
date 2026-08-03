import express from "express";

import {
    obtenerPlanes,
    crearPromocion,
    activarPromocion,
    obtenerMisPromociones,
    finalizarPromocion,
    estadisticasPromocion,
    subirComprobantePromocion,
    verificarPagoPromocion,
    registrarImpresion,
    registrarClick,
    obtenerPromocionesPendientes

} from "../controllers/promotionController.js";

import { verifyFirebaseToken } from "../middleware/authMiddleware.js";
import multer from "multer";
import { storage } from "../config/cloudinary.js";

const upload = multer({
    storage
});

const router = express.Router();

router.get("/planes", obtenerPlanes);

// Crear solicitud de promoción
router.post("/", verifyFirebaseToken, crearPromocion);

// Activar promoción
// (más adelante esta ruta quedará protegida para admin)
router.put("/:id/activar", verifyFirebaseToken, activarPromocion);

// Mis promociones como vendedor
router.get("/mine", verifyFirebaseToken, obtenerMisPromociones);

router.get("/pending-verification", verifyFirebaseToken, obtenerPromocionesPendientes);

router.get("/admin/pending", verifyFirebaseToken, obtenerPromocionesPendientes);

// Finalizar promoción
router.put("/:id/finalizar", verifyFirebaseToken, finalizarPromocion);

// Estadísticas
router.get("/:id/stats", verifyFirebaseToken, estadisticasPromocion);

router.post("/:id/upload-proof", verifyFirebaseToken, upload.single("comprobante"), subirComprobantePromocion);

router.put("/:id/verify-payment", verifyFirebaseToken, verificarPagoPromocion);

router.post("/:productId/impression", registrarImpresion);

router.post("/:productId/click", registrarClick);




export default router;