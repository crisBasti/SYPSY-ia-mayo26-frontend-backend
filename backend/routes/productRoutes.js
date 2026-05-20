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

router.delete("/:id", deleteProduct);

router.post("/", upload.single("image"), createProduct);

router.put("/:id", updateProduct);

export default router;