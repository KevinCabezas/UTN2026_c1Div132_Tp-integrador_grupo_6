import { Router } from "express";
import { createSale, createSurvey } from "../controllers/sale.controllers.js";
import { validateSale } from "../middlewares/sale.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.post('/', validateSale, createSale);

router.post('/survey', upload.single("image"), createSurvey);



export default router;