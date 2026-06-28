import { Router } from "express";
import { validateProduct } from "../middlewares/product.middleware.js";
import { createProduct, getAllProducts, getProductById, modifyProduct, removeProduct, getProductStockById } from "../controllers/product.controllers.js";
import { requireLogin } from "../middlewares/auth.middleware.js";

const router = Router();

// GET all products
router.get("/", getAllProducts);
// GET by id
router.get("/:id", getProductById);
// GET product s`Stock by id
router.get("/:id", getProductStockById);

// POST product
router.post("/", requireLogin, validateProduct, createProduct);
// UPDATE product
router.put("/", requireLogin, validateProduct, modifyProduct);
// DELETE product
router.delete("/:id", requireLogin, removeProduct);

export default router;