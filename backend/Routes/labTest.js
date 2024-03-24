import express from "express";

import { authenticate, restrict } from "./../auth/verifyToken.js";
import {
  createLabTest,
  deleteLabTest,
  getAllLabTest,
  getSingleLabTest,
  updateLabTest,
} from "../Controllers/labTestController.js";

const router = express.Router();

router.route("/").get(getAllLabTest).post(authenticate, restrict(["doctor"]), createLabTest)

router.get("/:id", getSingleLabTest)
router.put("/:id", authenticate, restrict(["doctor"]), updateLabTest);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteLabTest);

export default router;


