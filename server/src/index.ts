import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173'], // اضافه کردن پورت‌های development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// میدلور‌ها
app.use(cors(corsOptions));
app.use(express.json());

// سرو کردن فایل‌های استاتیک
app.use('/images', express.static(path.join(__dirname, '../../client/public/images')));

// مدیریت خطای JSON نامعتبر
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON format' });
  }
  next();
});

// مسیرهای API
app.use('/api/users', userRoutes);

// مسیر تست برای اطمینان از کارکرد سرور
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// مدیریت خطای 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// مدیریت خطاهای عمومی
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// اتصال به دیتابیس
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mobile-shop')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// پورت سرور
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 