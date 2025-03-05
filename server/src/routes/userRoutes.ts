import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';

const router = express.Router();

// مسیر ثبت نام
router.post('/register', registerUser);

// مسیر ورود
router.post('/login', loginUser);

export default router; 