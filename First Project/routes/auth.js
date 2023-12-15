import express from 'express';
import { getLoginController, getRegisterController, postRegisterController, getLogoutController, postLoginController } from '../controllers/auth.js';
import { authMiddleware } from '../middlewares/auth.js';
import { registerValidation } from '../validations/register-validation.js';

const router = express.Router();


// get
router.get('/register', authMiddleware, getRegisterController)
router.get('/login', authMiddleware, getLoginController)
router.get('/logout', authMiddleware, getLogoutController)

//post
router.post('/login', authMiddleware, postLoginController)
router.post('/register', authMiddleware, registerValidation(),  postRegisterController)


export default router;