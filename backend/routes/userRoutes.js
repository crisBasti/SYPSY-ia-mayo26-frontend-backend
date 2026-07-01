import express from "express";

import {
  createUser,
  getUserByUid,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    mensaje: "Ruta users funcionando"
  });
});

router.get("/:uid", getUserByUid);

router.post("/", createUser);

export default router;