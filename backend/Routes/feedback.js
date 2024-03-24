import express from "express";

import { authenticate, restrict } from "./../auth/verifyToken.js";
import {
  createFeedback,
  getAllFeedbacks,
} from "../Controllers/feebackController.js";


const router = express.Router();

router.get("/", getAllFeedbacks);
router.post("/", createFeedback);

export default router;
