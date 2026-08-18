import express from "express";

import authFirebase from "../middleware/authFirebase.js";

import {
    agregarFavorito,
    eliminarFavorito,
    obtenerFavoritos
} from "../controllers/favoriteController.js";

const router = express.Router();


router.get(
    "/",
    authFirebase,
    obtenerFavoritos
);


router.post(
    "/:productId",
    authFirebase,
    agregarFavorito
);


router.delete(
    "/:productId",
    authFirebase,
    eliminarFavorito
);


export default router;