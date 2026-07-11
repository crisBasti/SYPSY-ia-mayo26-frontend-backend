import express from "express";
import authFirebase from "../middleware/authFirebase.js";

import {
  createUser,
  getUserByUid,
  getUsers,
  updateUserStatus,
  getCurrentUser
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/me", authFirebase, getCurrentUser);

router.get("/:uid", getUserByUid);

router.post("/", createUser);

router.put("/:id", updateUserStatus);

export default router;