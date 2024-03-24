import express from "express"
import { authenticate, restrict } from "../auth/verifyToken.js";
import { getAllTestBookings, getSingleTestBook } from "../Controllers/labbookController.js";


const router = express.Router();

router.get("/",  getAllTestBookings)
router.get("/:id", authenticate,restrict(["doctor"]), getSingleTestBook)

export default router;