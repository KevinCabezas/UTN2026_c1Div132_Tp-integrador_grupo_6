import { Router } from "express";
import { join, __dirname } from "../utils/index.js";
import { indexView, loginView, listProductsView } from "../controllers/view.controllers.js";

const router = Router();

// pagina que se mostrara apenas se inicie la app
router.get("/", indexView);

// rutas del admin
router.get("/auth", loginView);

router.get("/dashboard", listProductsView);



export default router;
