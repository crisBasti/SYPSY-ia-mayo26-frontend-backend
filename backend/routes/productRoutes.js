import express from "express";
import upload from "../middleware/upload.js";
import authFirebase from "../middleware/authFirebase.js";

import {
  getProducts,
  getMyProducts,
  getMyStats,
  createProduct,
  deleteProduct,
  updateProduct,
  incrementView,
  incrementWhatsappClick,
  reportProduct
} from "../controllers/productController.js";

const router = express.Router();
router.get("/", getProducts);
router.post("/:id/view", incrementView);
router.post("/:id/whatsapp", incrementWhatsappClick);
router.post("/:id/report", reportProduct);
router.get("/stats", authFirebase, getMyStats);
router.get( "/mine", authFirebase, getMyProducts );
router.post("/", authFirebase, upload.array("images", 5), createProduct);
router.put("/:id", authFirebase, updateProduct);
router.delete("/:id", authFirebase, deleteProduct);

export default router;