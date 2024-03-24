import express from "express";

import { authenticate, restrict } from "../auth/verifyToken.js";
import {
  AddAdmin,
  getAdminProfile,
  getAllAdmin,
  getAllAppointmentsAdmin,
  getAllDocAdmin,
  getAllOrdersAdmin,
  getAllPrescriptionsAdmin,
  getAllReportsAdmin,
  getAllTestsAdmin,
  getAllUserAdmin,
} from "../Controllers/adminController.js";
// import prescriptionRouter from "./prescription.js";

// import labTestRouter from "./labTest.js";

const router = express.Router();

//nested route

router.get("/doctors", getAllDocAdmin);
router.get("/", getAllAdmin);
router.post("/add", AddAdmin);
router.get("/patients", getAllUserAdmin);
router.get("/appointments", getAllAppointmentsAdmin);
router.get("/tests", getAllTestsAdmin);
router.get("/prescriptions", getAllPrescriptionsAdmin);
router.get("/reports", getAllReportsAdmin);
router.get("/orders", getAllOrdersAdmin);
router.get("/profile/me", getAdminProfile);



export default router;
