import { Router } from "express";
import { join, __dirname } from "../utils/index.js";
import { indexView, loginView, listProductsView,consultProductView,createProductView,updateProductView,deleteProductView } from "../controllers/view.controllers.js";

const router = Router();

// pagina que se mostrara apenas se inicie la app
router.get("/", indexView);

// rutas del admin
router.get("/auth", loginView);

router.get("/dashboard", listProductsView);
router.get("/dashboard/consultar", consultProductView);
router.get("/dashboard/crear", createProductView);
router.get("/dashboard/modificar", updateProductView);
router.get("/dashboard/eliminar", deleteProductView);


export default router;
