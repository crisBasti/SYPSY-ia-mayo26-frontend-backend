import express from "express";

import authFirebase from "../middleware/authFirebase.js";

import {

    getConfiguration,

    updateConfiguration

} from "../controllers/configurationController.js";

const router = express.Router();

router.get(

    "/",

    authFirebase,

    getConfiguration

);

router.put(

    "/",

    authFirebase,

    updateConfiguration

);

export default router;