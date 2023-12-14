import express from 'express';
import { getLoginController, getLogoutController, postLoginController } from '../controllers/auth.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.get('/login', authMiddleware, getLoginController)

router.post('/login', authMiddleware, postLoginController)

router.get('/logout', authMiddleware, getLogoutController)



export default router;