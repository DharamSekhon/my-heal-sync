import express from "express";

import { authenticate, restrict } from "./../auth/verifyToken.js";
import { createPrescriptions, getAllPrescriptions, getSinglePrescription } from "../Controllers/prescriptionController.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllPrescriptions)
  .post(authenticate, restrict(["doctor"]), createPrescriptions);

  router.get("/:id", authenticate, restrict(["patient"]), getSinglePrescription)



export default router;
