import { Router } from "express";
import { join, __dirname } from "../utils/index.js";
import { indexView, loginView, productsView, listProductsView, customerView } from "../controllers/view.controllers.js";

const router = Router();

// pagina que se mostrara apenas se inicie la app
router.get("/", indexView);

// rutas del admin
router.get("/auth", loginView);

router.get("/dashboard", listProductsView);


// rutas del customer
router.get("/shop", customerView);
router.get("/shop/products", productsView);



export default router;
