import express from "express";

import authFirebase from "../middleware/authFirebase.js";
import adminOnly from "../middleware/adminOnly.js";


import {
    obtenerMisRecompensas,
    obtenerTransaccionesUsuario
} from "../controllers/rewardController.js";

import {
    obtenerReglas,
    obtenerRegla,
    crearRegla,
    actualizarRegla,
    cambiarEstadoRegla,
    eliminarRegla
} from "../controllers/rewardRuleController.js";

import {
    probarReglaRSPY
} from "../controllers/rewardTestController.js";


const router = express.Router();


// =====================================================
// RSPY DEL USUARIO
// =====================================================

// Obtener saldo, totales y movimientos
router.get(
    "/mine",
    authFirebase,
    obtenerMisRecompensas
);


// =====================================================
// ADMIN - HISTORIAL DE TRANSACCIONES RSPY
// =====================================================

router.get(
    "/admin/:uid/transactions",
    authFirebase,
    adminOnly,
    obtenerTransaccionesUsuario
);


// =====================================================
// PRUEBA CONTROLADA DEL MOTOR RSPY
// =====================================================

router.post(
    "/test",
    authFirebase,
    adminOnly,
    probarReglaRSPY
);


// =====================================================
// ADMINISTRACIÓN DE REGLAS RSPY
// =====================================================

// Obtener todas las reglas
router.get(
    "/rules",
    authFirebase,
    adminOnly,
    obtenerReglas
);


// Obtener una regla específica
router.get(
    "/rules/:id",
    authFirebase,
    adminOnly,
    obtenerRegla
);


// Crear nueva regla
router.post(
    "/rules",
    authFirebase,
    adminOnly,
    crearRegla
);


// Modificar regla
router.put(
    "/rules/:id",
    authFirebase,
    adminOnly,
    actualizarRegla
);


// Activar / desactivar regla
router.patch(
    "/rules/:id/status",
    authFirebase,
    adminOnly,
    cambiarEstadoRegla
);


// Eliminar regla
router.delete(
    "/rules/:id",
    authFirebase,
    adminOnly,
    eliminarRegla
);





export default router;