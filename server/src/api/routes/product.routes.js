import { Router } from "express";
import { validateProduct, validateId } from "../middlewares/product.middleware.js";
import { createProduct, getAllProducts, getProductById, modifyProduct, removeProduct, getProductStockById,getProductsForLine, activateProduct, getProductByIdAdmin  } from "../controllers/product.controllers.js";
import { requireLogin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";


const router = Router();

router.get("/", getAllProducts);
router.get("/line/:id", getProductsForLine);
router.get("/:id", validateId, getProductById);
router.get("/stock/:id", validateId, getProductStockById);

router.get("/admin/:id", requireLogin, validateId, getProductByIdAdmin)
router.post("/:id/activar", requireLogin, validateId, activateProduct);
// POST product
router.post("/", requireLogin,  upload.single("image"), validateProduct, createProduct);
// UPDATE product
router.put("/", requireLogin, validateProduct, modifyProduct);
// DELETE product
router.delete("/:id", requireLogin, validateId, removeProduct);

export default router;