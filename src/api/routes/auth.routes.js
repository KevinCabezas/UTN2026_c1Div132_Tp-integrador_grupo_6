import { Router } from "express";
import { login } from "../controllers/auth.controllers.js";
import { validateCredentials } from './../middlewares/auth.middleware.js'

const router = Router();

router.post('/login', validateCredentials, login);

export default router;