# فروشگاه آنلاین موبایل

یک فروشگاه آنلاین مدرن برای فروش گوشی‌های موبایل با استفاده از React، TypeScript و Tailwind CSS.

## ویژگی‌های اصلی

- 🎨 طراحی مدرن و ریسپانسیو با Tailwind CSS
- 🔒 احراز هویت کاربران با JWT
- 🛒 سبد خرید با قابلیت ذخیره در localStorage
- 📱 پشتیبانی از تمام دستگاه‌ها
- 🌙 حالت تاریک/روشن
- 🔍 جستجوی پیشرفته محصولات
- 📦 مدیریت سفارشات
- 💳 درگاه پرداخت
- 📊 داشبورد مدیریتی

## تکنولوژی‌های استفاده شده

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Router
- Framer Motion
- Axios
- React Query
- React Hook Form
- Zod

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Multer
- Bcrypt
- Morgan
- Cors
- Helmet

## نصب و راه‌اندازی

### پیش‌نیازها
- Node.js (نسخه 18 یا بالاتر)
- MongoDB
- npm یا yarn

### نصب پروژه

1. کلون کردن پروژه:
```bash
git clone https://github.com/yourusername/mobile-store.git
cd mobile-store
```

2. نصب وابستگی‌های سرور:
```bash
cd server
npm install
```

3. نصب وابستگی‌های کلاینت:
```bash
cd ../client
npm install
```

4. تنظیم متغیرهای محیطی:
```bash
# در پوشه server
cp .env.example .env

# در پوشه client
cp .env.example .env
```

5. اجرای پروژه:

در یک ترمینال:
```bash
cd server
npm run dev
```

در ترمینال دیگر:
```bash
cd client
npm run dev
```

## ساختار پروژه

```
mobile-store/
├── client/                 # فرانت‌اند React
│   ├── public/            # فایل‌های استاتیک
│   ├── src/
│   │   ├── components/   # کامپوننت‌های React
│   │   ├── pages/       # صفحات اصلی
│   │   ├── store/       # Redux store
│   │   ├── types/       # TypeScript types
│   │   ├── utils/       # توابع کمکی
│   │   └── App.tsx      # کامپوننت اصلی
│   └── package.json
│
└── server/               # بک‌اند Node.js
    ├── src/
    │   ├── config/      # تنظیمات
    │   ├── controllers/ # کنترلرها
    │   ├── middleware/  # میدلورها
    │   ├── models/      # مدل‌های MongoDB
    │   ├── routes/      # مسیرها
    │   ├── services/    # سرویس‌ها
    │   └── app.ts       # فایل اصلی
    └── package.json
```

## API Endpoints

### محصولات
- `GET /api/products` - دریافت لیست محصولات
- `GET /api/products/:id` - دریافت جزئیات محصول
- `POST /api/products` - ایجاد محصول جدید
- `PUT /api/products/:id` - بروزرسانی محصول
- `DELETE /api/products/:id` - حذف محصول

### کاربران
- `POST /api/auth/register` - ثبت نام
- `POST /api/auth/login` - ورود
- `GET /api/auth/profile` - دریافت پروفایل
- `PUT /api/auth/profile` - بروزرسانی پروفایل

### سفارشات
- `POST /api/orders` - ایجاد سفارش
- `GET /api/orders` - دریافت لیست سفارشات
- `GET /api/orders/:id` - دریافت جزئیات سفارش
- `PUT /api/orders/:id` - بروزرسانی وضعیت سفارش

## ویژگی‌های امنیتی

- احراز هویت با JWT
- رمزنگاری پسورد با Bcrypt
- محافظت در برابر حملات XSS با Helmet
- CORS برای امنیت API
- Rate Limiting برای جلوگیری از حملات Brute Force
- Validation داده‌ها با Zod

## تست‌ها

### تست‌های سرور
```bash
cd server
npm test
```

### تست‌های کلاینت
```bash
cd client
npm test
```

## Deployment

### سرور
```bash
cd server
npm run build
npm start
```

### کلاینت
```bash
cd client
npm run build
```

## مشارکت در پروژه

1. Fork کردن پروژه
2. ایجاد Branch جدید (`git checkout -b feature/AmazingFeature`)
3. Commit تغییرات (`git commit -m 'Add some AmazingFeature'`)
4. Push به Branch (`git push origin feature/AmazingFeature`)
5. باز کردن Pull Request

## لایسنس

این پروژه تحت لایسنس MIT منتشر شده است. برای اطلاعات بیشتر به فایل [LICENSE](LICENSE) مراجعه کنید.

## تماس با من

- ایمیل: your.email@example.com
- وبسایت: [your-website.com](https://your-website.com)
- لینکدین: [your-linkedin](https://linkedin.com/in/your-profile) 