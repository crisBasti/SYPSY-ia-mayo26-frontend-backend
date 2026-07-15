import express from "express";

import authFirebase from "../middleware/authFirebase.js";

import { getDashboardStats } from "../controllers/adminController.js";

const router = express.Router();

router.get(
    "/dashboard",
    authFirebase,
    getDashboardStats
);

export default router;