import { Router } from "express";
import { createSale, createSurvey, getAllSales, downloadSalesExcel } from "../controllers/sale.controllers.js";
import { validateSale } from "../middlewares/sale.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { requireLogin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/', requireLogin, getAllSales);
router.get('/excel', requireLogin, downloadSalesExcel);
router.post('/', validateSale, createSale);
router.post('/survey', upload.single("image"), createSurvey);

export default router;