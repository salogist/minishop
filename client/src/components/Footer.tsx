import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">درباره ما</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-base text-gray-500 hover:text-gray-900">
                  درباره فروشگاه
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-base text-gray-500 hover:text-gray-900">
                  سوالات متداول
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">خدمات</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/shipping" className="text-base text-gray-500 hover:text-gray-900">
                  نحوه ارسال
                </Link>
              </li>
              <li>
                <Link to="/payment" className="text-base text-gray-500 hover:text-gray-900">
                  روش‌های پرداخت
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-base text-gray-500 hover:text-gray-900">
                  گارانتی و ضمانت
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">قوانین</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                  حریم خصوصی
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-500 hover:text-gray-900">
                  قوانین و مقررات
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-base text-gray-500 hover:text-gray-900">
                  مرجوعی و استرداد
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">شبکه‌های اجتماعی</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                  اینستاگرام
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                  تلگرام
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                  واتساپ
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} فروشگاه آنلاین موبایل. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 