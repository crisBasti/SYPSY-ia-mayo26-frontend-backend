import express from "express";

import authFirebase from "../middleware/authFirebase.js";

import {

    getReports,
    approveReport,
    rejectReport,
    deleteReportedProduct,
    updateReportStatus

} from "../controllers/reportController.js";

const router = express.Router();

router.get(
    "/",
    authFirebase,
    getReports
);

router.put(
    "/:id/approve",
    authFirebase,
    approveReport
);

router.put(
    "/:id/reject",
    authFirebase,
    rejectReport
);

router.delete(
    "/:id/product",
    authFirebase,
    deleteReportedProduct
);

router.put(
    "/:id",
    authFirebase,
    updateReportStatus
);

export default router;