import { Router } from "express";
import { join, __dirname } from "../utils/index.js";
import { indexView } from "../controllers/view.controllers.js";

const router = Router();

router.get("/index", indexView);

export default router;
