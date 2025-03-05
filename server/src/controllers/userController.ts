import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { createError, handleAsync } from '../utils/errorHandler';
import { validateUserInput } from '../utils/validators';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const TOKEN_EXPIRY = '30d';

// تولید توکن JWT
const generateToken = (id: string): string => 
  jwt.sign({ id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

// ثبت نام کاربر جدید
export const registerUser = handleAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  
  validateUserInput({ name, email, password });
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError('این ایمیل قبلاً ثبت شده است', 400);
  }

  const user = await User.create({ name, email, password });
  if (!user) {
    throw createError('اطلاعات کاربر نامعتبر است', 400);
  }

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

// ورود کاربر
export const loginUser = handleAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw createError('ایمیل یا رمز عبور اشتباه است', 401);
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
}); 