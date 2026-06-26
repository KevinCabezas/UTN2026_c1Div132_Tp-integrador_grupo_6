import { Router } from "express";
import { createSale, createSaleDetail } from "../controllers/sale.controllers.js";
import { validateSale } from "../middlewares/sale.middleware.js";

const router = Router();

router.post('/', validateSale, createSale);
 
// router.post('/details', createSaleDetail);



export default router;