import express from "express";

import authFirebase from "../middleware/authFirebase.js";

import {
    crearResena
} from "../controllers/reviewController.js";


const router = express.Router();


router.post("/", authFirebase, crearResena);


export default router;