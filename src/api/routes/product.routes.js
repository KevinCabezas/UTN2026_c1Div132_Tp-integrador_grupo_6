import { Router } from "express";
import { validateId, validateProduct } from "../middlewares/middlewares.js";
import { createProduct, getAllProducts, getProductById, modifyProduct, removeProduct } from "../controllers/product.controllers.js";

const router = Router();


// GET all products
router.get("/", getAllProducts);


// GET by id
router.get("/:id", validateId, getProductById);


// POST product
router.post("/", validateProduct, createProduct);


// UPDATE product
router.put("/", modifyProduct);


// DELETE product
router.delete("/:id", validateId, removeProduct);

export default router;