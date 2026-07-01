import express from "express";


import {
  createUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    mensaje: "Ruta users funcionando"
  });
});

router.post("/", createUser);

export default router;