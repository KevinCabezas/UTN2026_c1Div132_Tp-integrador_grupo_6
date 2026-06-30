import { Router } from "express";
import { join, __dirname } from "../utils/index.js";
import { indexView, loginView } from "../controllers/view.controllers.js";

const router = Router();

// pagina que se mostrara apenas se inicie la app
router.get("/", loginView);

router.get("/dashboard", indexView);

export default router;
