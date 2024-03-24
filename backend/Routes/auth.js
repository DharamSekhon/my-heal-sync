import express from "express";
import { register, login, loginAdmin } from "../Controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/adminlogin", loginAdmin)

export default router;
