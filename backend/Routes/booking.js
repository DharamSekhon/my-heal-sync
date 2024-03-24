import express from "express";
import { authenticate } from "./../auth/verifyToken.js";
import { getCheckoutSession } from "../Controllers/bookingController.js";
import { getLabCheckoutSession } from "../Controllers/labTestBookingController.js";
import { getProductCheckoutSession } from "../Controllers/bookingProductController.js";

const router = express.Router();

router.post("/checkout-session/:doctorId", authenticate, getCheckoutSession);
router.post("/labcheckout-session/:labTestid", authenticate, getLabCheckoutSession);
router.post("/productcheckout-session/:productid", authenticate, getProductCheckoutSession);
export default router;
