import express from "express";
import authFirebase from "../middleware/authFirebase.js";


import multer from "multer";
import { storage } from "../config/cloudinary.js";

const upload = multer({
    storage
});

import {
  crearPedido,
  obtenerPedidos,
  obtenerPedidoPorId,
  obtenerMisCompras,
  obtenerMisVentas,
  actualizarEstadoPedido,
  actualizarTracking,
  cancelarPedido,
  confirmarRecepcion,
  validarCodigoEntrega,
  subirComprobantePago,
  verificarPago,
  dejarReseña,
  subirComprobanteTransferencia,
  obtenerPagosPendientes
} from "../controllers/orderController.js";

const router = express.Router();

// Crear pedido
router.post("/", authFirebase, crearPedido);

// Obtener todos los pedidos (Admin)
router.get("/", authFirebase, obtenerPedidos);

// Obtener mis compras
router.get("/mis-compras", authFirebase, obtenerMisCompras);

// Obtener mis ventas
router.get("/mis-ventas", authFirebase, obtenerMisVentas);

// Obtener un pedido
router.get("/:id", authFirebase, obtenerPedidoPorId);

// Confirmar recepción por comprador
router.post("/:id/confirmar", authFirebase, confirmarRecepcion);

// Actualizar estado
router.put("/:id", authFirebase, actualizarEstadoPedido);

// Actualizar seguimiento
router.put("/:id/tracking", authFirebase, actualizarTracking);

// Cancelar pedido
router.delete("/:id", authFirebase, cancelarPedido);

// Validacion de pedido recibido con PIN
router.post("/:id/validar-codigo", authFirebase, validarCodigoEntrega);

router.post(
    "/:id/comprobante",
    authFirebase,
    upload.single("comprobante"),
    subirComprobantePago
);

router.put(
    "/:id/verificar-pago",
    authFirebase,
    verificarPago
);

// Dejar reseña del vendedor
router.post(
    "/:id/review",
    authFirebase,
    dejarReseña
);

router.get(
    "/admin/pagos-pendientes",
    authFirebase,
    obtenerPagosPendientes
);

router.post(
    "/:id/transfer-proof",
    authFirebase,
    upload.single("comprobante"),
    subirComprobanteTransferencia
);

export default router;