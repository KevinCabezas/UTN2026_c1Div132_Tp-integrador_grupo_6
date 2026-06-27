import { Router } from "express";
import { addUser, getUserById } from "../controllers/auth.controllers.js";
const router = Router();

router.post('/', addUser);
 
router.post('/:id', getUserById);



export default router;