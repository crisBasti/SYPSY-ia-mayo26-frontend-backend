import express from "express";
import authFirebase from "../middleware/authFirebase.js";

import {
  crearPedido,
  obtenerPedidos,
  obtenerPedidoPorId,
  obtenerMisCompras,
  obtenerMisVentas,
  actualizarEstadoPedido,
  cancelarPedido,
  confirmarRecepcion,
  validarCodigoEntrega
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

// Cancelar pedido
router.delete("/:id", authFirebase, cancelarPedido);

// Validacion de pedido recibido con PIN
router.post("/:id/validar-codigo", authFirebase, validarCodigoEntrega);

export default router;