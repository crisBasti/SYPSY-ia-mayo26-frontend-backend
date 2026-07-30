import express from "express";

import authFirebase from "../middleware/authFirebase.js";

import {

getProfile,

updateProfile,

getPublicProfile

} from "../controllers/userProfileController.js";

const router = express.Router();

router.get("/public/:uid", getPublicProfile);

router.get("/", authFirebase, getProfile);

router.get("/:uid", getPublicProfile);

router.put("/", authFirebase, updateProfile);

export default router;