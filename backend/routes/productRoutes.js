import express from "express";
import upload from "../middleware/upload.js";

import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct
} from "../controllers/productController.js";

const router = express.Router();
router.get("/", getProducts);
router.post("/", upload.array("images", 5), createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;