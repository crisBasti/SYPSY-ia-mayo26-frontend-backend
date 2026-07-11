import express from "express";

import authFirebase from "../middleware/authFirebase.js";

import {

    getAdvertisements,

    createAdvertisement,

    updateAdvertisement,

    deleteAdvertisement,

    registerImpression,

    registerClick

} from "../controllers/advertisementController.js";

const router = express.Router();

// Públicas (el Home las usará)

router.get("/", getAdvertisements);

// Métricas publicitarias

router.post(

    "/:id/impression",

    registerImpression

);


router.post(

    "/:id/click",

    registerClick

);

// Administración

router.post(

    "/",

    authFirebase,

    createAdvertisement

);

router.put(

    "/:id",

    authFirebase,

    updateAdvertisement

);

router.delete(

    "/:id",

    authFirebase,

    deleteAdvertisement

);

export default router;