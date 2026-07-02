import { Router } from "express";
import { join, __dirname } from "../utils/index.js";
import { indexView, loginView, registerView, listProductsView,consultProductView,createProductView,updateProductView,deleteProductView } from "../controllers/view.controllers.js";
import { requireLogin } from "../middlewares/auth.middleware.js";

const router = Router();

// pagina que se mostrara apenas se inicie la app
router.get("/", indexView);

// rutas del admin
router.get("/auth", loginView);
router.get('/register', registerView)

router.get("/dashboard", requireLogin, listProductsView);
router.get("/dashboard/consultar", requireLogin, consultProductView);
router.get("/dashboard/crear", requireLogin, createProductView);
router.get("/dashboard/modificar", requireLogin, updateProductView);
router.get("/dashboard/eliminar", requireLogin, deleteProductView);


export default router;
