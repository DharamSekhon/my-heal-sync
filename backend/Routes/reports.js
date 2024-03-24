import express from "express";

import { authenticate, restrict } from "./../auth/verifyToken.js";
import { createReports, getAllReports, getSingleReport } from "../Controllers/testReportController.js";
// import { createPrescriptions, getAllPrescriptions, getSinglePrescription } from "../Controllers/prescriptionController.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReports)
  .post(authenticate, restrict(["doctor"]), createReports);

  router.get("/:id", authenticate, restrict(["patient"]), getSingleReport)



export default router;
