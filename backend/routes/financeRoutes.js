import express from "express";

import authFirebase from "../middleware/authFirebase.js";

import {

    obtenerResumenFinanciero

} from "../controllers/financeController.js";

const router = express.Router();

router.get(

    "/resumen",

    authFirebase,

    obtenerResumenFinanciero

);

export default router;