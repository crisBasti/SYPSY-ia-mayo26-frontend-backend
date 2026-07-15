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

// Actualizar estado
router.put("/:id", authFirebase, actualizarEstadoPedido);

// Cancelar pedido
router.delete("/:id", authFirebase, cancelarPedido);

export default router;