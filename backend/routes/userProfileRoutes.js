import express from "express";

import authFirebase from "../middleware/authFirebase.js";

import {

getProfile,

updateProfile

} from "../controllers/userProfileController.js";

const router = express.Router();

router.get(

"/",

authFirebase,

getProfile

);

router.put(

"/",

authFirebase,

updateProfile

);

export default router;