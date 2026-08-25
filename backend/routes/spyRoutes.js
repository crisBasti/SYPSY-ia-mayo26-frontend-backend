import express from "express";

import {
    obtenerMiWallet,
    obtenerMisMovimientos
} from "../controllers/spyController.js";

import authFirebase from "../middleware/authFirebase.js";


const router = express.Router();


router.get(
    "/wallet",
    authFirebase,
    obtenerMiWallet
);


router.get(
    "/movimientos",
    authFirebase,
    obtenerMisMovimientos
);


export default router;