import { Router } from "express";
import { login, register, logout } from "../controllers/auth.controllers.js";
import { validateCredentials } from './../middlewares/auth.middleware.js'

const router = Router();

router.post('/login', validateCredentials, login);
router.post('/register', validateCredentials, register);
router.post('/destroy', logout);

export default router;