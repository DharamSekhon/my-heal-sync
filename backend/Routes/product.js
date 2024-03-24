import express from "express";

import { authenticate, restrict } from "../auth/verifyToken.js";
import { createProduct, deleteProduct, getAllProduct, getSingleProduct, updateProduct } from "../Controllers/productController.js";

// import prescriptionRouter from "./prescription.js";

// import labTestRouter from "./labTest.js";

const router = express.Router();

//nested route

router.get("/", getAllProduct);
router.get("/:id", getSingleProduct);
router.post("/",authenticate, restrict(["admin"]), createProduct);
router.put("/:id", authenticate, restrict(["admin"]), updateProduct);
router.delete("/:id", authenticate, restrict(["admin"]), deleteProduct)


export default router;
