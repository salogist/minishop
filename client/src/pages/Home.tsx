import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setProducts, setLoading, setError } from '../store/slices/productSlice';
import { Product } from '../types/product';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  TruckIcon,
  CurrencyDollarIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import Image from '../components/Image';
import ProductCarousel from '../components/ProductCarousel';

const categories = [
  {
    id: 1,
    name: 'گوشی‌های اپل',
    image: '/images/categories/apple.webp',
    href: '/products?brand=apple',
  },
  {
    id: 2,
    name: 'گوشی‌های سامسونگ',
    image: '/images/categories/samsung.webp',
    href: '/products?brand=samsung',
  },
  {
    id: 3,
    name: 'گوشی‌های شیائومی',
    image: '/images/categories/xiaomi.webp',
    href: '/products?brand=xiaomi',
  },
  {
    id: 4,
    name: 'سایر برندها',
    image: '/images/categories/other.webp',
    href: '/products',
  },
];

const features = [
  {
    name: 'ضمانت اصالت کالا',
    description: 'تمامی محصولات دارای ضمانت اصالت و گارانتی معتبر هستند',
    icon: ShieldCheckIcon,
  },
  {
    name: 'ارسال سریع',
    description: 'ارسال سریع به تمام نقاط کشور با بسته‌بندی استاندارد',
    icon: TruckIcon,
  },
  {
    name: 'قیمت رقابتی',
    description: 'بهترین قیمت‌ها با تضمین برگشت وجه در صورت یافتن قیمت پایین‌تر',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'پشتیبانی ۲۴/۷',
    description: 'پشتیبانی شبانه‌روزی و مشاوره تخصصی قبل و بعد از خرید',
    icon: PhoneIcon,
  },
];

// محصولات نمونه
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'آیفون 16 پرو مکس',
    brand: 'apple',
    price: 89900000,
    images: ['/images/products/iphone-16-pro-finish-select-202409-6-3inch_GEO_EMEA_FMT_WHH.jpeg'],
    description: 'جدیدترین گوشی اپل با دوربین 48 مگاپیکسلی و پردازنده A16',
    specifications: {
      screen: {
        size: '6.7 اینچ',
        resolution: '2796 × 1290',
        technology: 'Super Retina XDR OLED',
      },
      camera: {
        main: '48 مگاپیکسل',
        selfie: '12 مگاپیکسل',
        features: ['حالت سینمایی', 'عکاسی شب', 'پرتره پیشرفته'],
      },
      battery: {
        capacity: '4323 میلی‌آمپر ساعت',
        type: 'لیتیوم-یون',
        features: ['شارژ سریع', 'شارژ بی‌سیم MagSafe'],
      },
      storage: {
        ram: '6 گیگابایت',
        internal: '256 گیگابایت',
        card: 'ندارد',
      },
      processor: {
        chipset: 'Apple A16 Bionic',
        cpu: '6 هسته‌ای',
        gpu: '5 هسته‌ای',
      },
    },
    stock: 10,
    colors: [
      { name: 'مشکی', code: '#000000' },
      { name: 'طلایی', code: '#FFD700' },
      { name: 'نقره‌ای', code: '#C0C0C0' },
      { name: 'بنفش', code: '#800080' },
    ],
    inStock: true,
    isFeatured: true,
    category: 'apple',
    rating: 4.9,
    numReviews: 128,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: ' گلکسی اولترا',
    brand: 'samsung',
    price: 75900000,
    images: ['/images/products/Samsung-Galaxy-S25-Ultra-colors-1024x650.jpg'],
    description: 'پرچمدار سامسونگ با قلم S Pen و دوربین 200 مگاپیکسلی',
    specifications: {
      screen: {
        size: '6.8 اینچ',
        resolution: '3088 × 1440',
        technology: 'Dynamic AMOLED 2X',
      },
      camera: {
        main: '200 مگاپیکسل',
        selfie: '12 مگاپیکسل',
        features: ['زوم اپتیکال 10x', 'لرزشگیر اپتیکال', 'فیلمبرداری 8K'],
      },
      battery: {
        capacity: '5000 میلی‌آمپر ساعت',
        type: 'لیتیوم-یون',
        features: ['شارژ سریع 45 وات', 'شارژ بی‌سیم'],
      },
      storage: {
        ram: '12 گیگابایت',
        internal: '256 گیگابایت',
        card: 'پشتیبانی از کارت حافظه تا 1 ترابایت',
      },
      processor: {
        chipset: 'Snapdragon 8 Gen 2',
        cpu: '8 هسته‌ای',
        gpu: 'Adreno 740',
      },
    },
    stock: 15,
    colors: [
      { name: 'مشکی', code: '#000000' },
      { name: 'کرم', code: '#F5DEB3' },
      { name: 'سبز', code: '#008000' },
      { name: 'بنفش', code: '#800080' },
    ],
    inStock: true,
    isFeatured: true,
    category: 'samsung',
    rating: 4.8,
    numReviews: 95,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'شیائومی 13 پرو',
    brand: 'xiaomi',
    price: 45900000,
    images: ['/images/products/Xiaomi-15-Ultra.jpg'],
    description: 'همکاری شیائومی با لایکا برای دوربین‌های حرفه‌ای',
    specifications: {
      screen: {
        size: '6.73 اینچ',
        resolution: '3200 × 1440',
        technology: 'AMOLED LTPO',
      },
      camera: {
        main: '50 مگاپیکسل',
        selfie: '32 مگاپیکسل',
        features: ['لنز لایکا', 'حالت شب', 'پرتره حرفه‌ای'],
      },
      battery: {
        capacity: '4820 میلی‌آمپر ساعت',
        type: 'لیتیوم-پلیمر',
        features: ['شارژ سریع 120 وات', 'شارژ بی‌سیم 50 وات'],
      },
      storage: {
        ram: '12 گیگابایت',
        internal: '256 گیگابایت',
        card: 'ندارد',
      },
      processor: {
        chipset: 'Snapdragon 8 Gen 2',
        cpu: '8 هسته‌ای',
        gpu: 'Adreno 740',
      },
    },
    stock: 8,
    colors: [
      { name: 'مشکی', code: '#000000' },
      { name: 'سفید', code: '#FFFFFF' },
      { name: 'سبز', code: '#008000' },
    ],
    inStock: true,
    isFeatured: true,
    category: 'xiaomi',
    rating: 4.7,
    numReviews: 64,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'هواوی P60 پرو',
    brand: 'huawei',
    price: 52900000,
    images: ['/images/products/Huawei-P70-teaser-image.jpg'],
    description: 'جدیدترین پرچمدار هواوی با دوربین‌های قدرتمند',
    specifications: {
      screen: {
        size: '6.67 اینچ',
        resolution: '2700 × 1220',
        technology: 'OLED',
      },
      camera: {
        main: '48 مگاپیکسل',
        selfie: '13 مگاپیکسل',
        features: ['دیافراگم متغیر', 'ثبات تصویر اپتیکال', 'عکاسی شب'],
      },
      battery: {
        capacity: '4815 میلی‌آمپر ساعت',
        type: 'لیتیوم-پلیمر',
        features: ['شارژ سریع 88 وات', 'شارژ بی‌سیم 50 وات'],
      },
      storage: {
        ram: '8 گیگابایت',
        internal: '256 گیگابایت',
        card: 'پشتیبانی از کارت حافظه NM تا 256 گیگابایت',
      },
      processor: {
        chipset: 'Snapdragon 8+ Gen 1',
        cpu: '8 هسته‌ای',
        gpu: 'Adreno 730',
      },
    },
    stock: 0,
    colors: [
      { name: 'مشکی', code: '#000000' },
      { name: 'سفید', code: '#FFFFFF' },
      { name: 'طلایی', code: '#FFD700' },
    ],
    inStock: false,
    isFeatured: true,
    category: 'huawei',
    rating: 4.6,
    numReviews: 42,
    createdAt: new Date().toISOString(),
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(setLoading(true));
    try {
      dispatch(setProducts({
        products: sampleProducts,
        page: 1,
        pages: 1,
        totalProducts: sampleProducts.length,
      }));
    } catch (error) {
      dispatch(setError('خطا در بارگذاری محصولات'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return (
    <PageTransition>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-right"
            >
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
                <span className="block">جدیدترین گوشی‌های</span>
                <span className="block text-primary-600">موبایل</span>
              </h1>
              <p className="text-lg leading-8 text-gray-700 mb-8">
                با ما به‌روزترین محصولات را با بهترین قیمت خریداری کنید. ضمانت اصالت کالا و پشتیبانی ۲۴/۷
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-300"
                >
                  مشاهده محصولات
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300"
                >
                  درباره ما
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-3xl"></div>
              <Image
                src="/images/main/iPhone-16-E-Feature-1.jpg"
                alt="iPhone 16"
                className="w-full h-full object-cover rounded-3xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary-500 text-white mb-4">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
                  <p className="text-base text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
              دسته‌بندی محصولات
            </h2>
            <p className="text-lg text-gray-600">
              محصولات مورد نظر خود را در دسته‌بندی‌های مختلف پیدا کنید
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={category.href} className="group block">
                  <div className="relative overflow-hidden rounded-2xl">
                    <div className="aspect-w-16 aspect-h-9">
                      <Image
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products Grid */}
      {products.length > 0 && (
        <div className="bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-3">
                محصولات ویژه
              </h2>
              <p className="text-lg text-gray-600">
                پرفروش‌ترین و محبوب‌ترین گوشی‌های موبایل
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {products
                .filter((p) => p.isFeatured)
                .map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link to={`/products/${product.id}`} className="group block h-full">
                      <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg h-full">
                        <div className="aspect-w-16 aspect-h-9">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-6 flex flex-col h-[calc(100%-16rem)]">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                              {product.name}
                            </h3>
                            <span className="text-sm text-gray-500">{product.brand}</span>
                          </div>
                          <div className="mt-auto pt-4 flex items-center justify-between">
                            <span className="text-lg font-bold text-primary-600">
                              {product.price.toLocaleString()} تومان
                            </span>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-500 ml-2">
                                {product.rating} ({product.numReviews})
                              </span>
                              <svg
                                className="h-5 w-5 text-yellow-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-8">
              آماده خرید هستید؟
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              با ثبت نام در فروشگاه ما، از مزایای ویژه‌ای مانند تخفیف‌های ویژه، ارسال رایگان و پشتیبانی ۲۴/۷ بهره‌مند شوید.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-primary-600 bg-white hover:bg-primary-50 transition-colors duration-300"
            >
              ثبت نام کنید
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Home; 