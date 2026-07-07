import express from "express";
import upload from "../middleware/upload.js";
import authFirebase from "../middleware/authFirebase.js";

import {
  getProducts,
  getMyProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  incrementView,
  incrementWhatsappClick
} from "../controllers/productController.js";

const router = express.Router();
router.get("/", getProducts);
router.post("/:id/view", incrementView);
router.post("/:id/whatsapp", incrementWhatsappClick);
router.get( "/mine", authFirebase, getMyProducts );
router.post("/", authFirebase, upload.array("images", 5), createProduct);
router.put("/:id", authFirebase, updateProduct);
router.delete("/:id", authFirebase, deleteProduct);

export default router;