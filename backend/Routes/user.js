import express from "express";

import {
  updateUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  getUserProfile,
  getMyAppointments,
  getMyTests,
  getMyPrescriptions,
  getMyProducts,
} from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import prescriptionRouter from "./prescription.js";
import reportsRouter from "./reports.js";

const router = express.Router();

router.use("/:userId/prescriptions", prescriptionRouter);
router.use("/:userId/reports", reportsRouter);

router.get("/:id", authenticate, getSingleUser);
router.get("/", authenticate, restrict(["doctor"]), getAllUser);
router.put("/:id", authenticate, restrict(["patient"]), updateUser);
router.delete("/:id", authenticate, restrict(["patient", "admin"]), deleteUser);
router.get(
  "/profile/me",
  authenticate,
  restrict(["patient", "admin"]),
  getUserProfile
);
router.get(
  "/appointments/my-appointments",
  authenticate,
  restrict(["patient"]),
  getMyAppointments
);
router.get(
  "/appointments/my-tests",
  authenticate,
  restrict(["patient"]),
  getMyTests
);

router.get(
  "/appointments/my-products",
  authenticate,
  restrict(["patient"]),
  getMyProducts
);

router.get(
  "/appointments/my-prescriptions",
  authenticate,
  restrict(["patient"]),
  getMyPrescriptions
);

export default router;
