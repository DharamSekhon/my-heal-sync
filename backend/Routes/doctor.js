import express from "express";

import {
  updateDoctor,
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
  getDoctorProfile,
  
  
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from "./review.js";
// import prescriptionRouter from "./prescription.js";

// import labTestRouter from "./labTest.js";

const router = express.Router();

//nested route
router.use("/:doctorId/reviews", reviewRouter);
// router.use("/:doctorId/prescriptions", prescriptionRouter);
// router.use("/labs", labTestRouter);

router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctor);

router.put("/:id", authenticate, restrict(["doctor","admin"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
router.get("/profile/me", authenticate, restrict(['doctor']), getDoctorProfile)

export default router;
